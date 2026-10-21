import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const resultsPath = path.join(root, "qa-results", "results.json");
const outputPath = path.join(root, "qa-results", "qa-summary.html");

if (!fs.existsSync(resultsPath)) {
  throw new Error(`Playwright JSON report not found at ${resultsPath}`);
}

const report = JSON.parse(fs.readFileSync(resultsPath, "utf8"));
const tests = [];

function visitSuite(suite, parents = []) {
  const titles = suite.title ? [...parents, suite.title] : parents;
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const result = test.results?.at(-1) ?? {};
      const annotations = Object.fromEntries((test.annotations ?? []).map((item) => [item.type, item.description ?? ""]));
      const isWebKitKeyboardResult = test.projectName === "webkit" && spec.title.toLowerCase().includes("keyboard");
      tests.push({
        title: [...titles, spec.title].filter(Boolean).join(" › "),
        project: test.projectName ?? "unknown",
        status: result.status ?? test.status ?? "unknown",
        duration: result.duration ?? 0,
        error: result.errors?.map((item) => item.message ?? String(item)).join("\n") ?? "",
        severity: isWebKitKeyboardResult ? "Medium" : (annotations.severity ?? "Low"),
        suggestedFix: isWebKitKeyboardResult
          ? "Reproduce in real Safari with Full Keyboard Access / ‘Press Tab to highlight each item’ enabled before changing markup; if it persists, review focus order and explicit focus management."
          : (annotations["suggested-fix"] ?? "Review the failure evidence and affected implementation."),
        attachments: (result.attachments ?? []).filter((item) => item.path).map((item) => ({ name: item.name, path: item.path })),
      });
    }
  }
  for (const child of suite.suites ?? []) visitSuite(child, titles);
}

for (const suite of report.suites ?? []) visitSuite(suite);

const failed = tests.filter((item) => !["passed", "skipped"].includes(item.status));
const passed = tests.filter((item) => item.status === "passed");
const skipped = tests.filter((item) => item.status === "skipped");
const escape = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

const rows = tests.map((item) => {
  const attachments = item.attachments.map((attachment) => {
    const relative = path.relative(path.dirname(outputPath), attachment.path).replaceAll("\\", "/");
    return `<a href="${escape(relative)}">${escape(attachment.name)}</a>`;
  }).join(" · ");
  return `<tr class="${escape(item.status)}">
    <td><span class="status">${escape(item.status)}</span></td>
    <td>${escape(item.project)}</td>
    <td>${escape(item.severity)}</td>
    <td>${escape(item.title)}</td>
    <td>${Math.round(item.duration)} ms</td>
    <td><pre>${escape(item.error || "—")}</pre></td>
    <td>${escape(item.suggestedFix)}</td>
    <td>${attachments || "—"}</td>
  </tr>`;
}).join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Portfolio QA Summary</title>
<style>
body{margin:0;padding:32px;background:#09090b;color:#fafafa;font:14px/1.5 system-ui,sans-serif}main{max-width:1500px;margin:auto}h1{margin:0 0 8px}p{color:#a1a1aa}.summary{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}.metric{padding:14px 18px;border:1px solid #3f3f46;border-radius:10px;background:#151518}.metric strong{display:block;font-size:24px}.table-wrap{overflow:auto;border:1px solid #29292e;border-radius:10px}table{width:100%;border-collapse:collapse;min-width:1100px}th,td{padding:12px;border-bottom:1px solid #29292e;text-align:left;vertical-align:top}th{background:#1d1d21}pre{max-width:520px;white-space:pre-wrap;margin:0;color:#d4d4d8}.status{font-weight:700;text-transform:capitalize}.passed .status{color:#4ade80}.failed .status,.timedOut .status{color:#f87171}.skipped .status{color:#facc15}a{color:#c4b5fd}
</style></head><body><main>
<h1>Developer Portfolio — Playwright QA Report</h1>
<p>Generated ${escape(new Date().toISOString())}. Tests were executed against Chromium, Firefox, and WebKit. Screenshot comparison baselines were intentionally not approved.</p>
<section class="summary"><div class="metric"><strong>${tests.length}</strong>Total</div><div class="metric"><strong>${passed.length}</strong>Passed</div><div class="metric"><strong>${failed.length}</strong>Failed</div><div class="metric"><strong>${skipped.length}</strong>Skipped</div></section>
<p><strong>Manual screenshot review:</strong> The nine Chromium, Firefox, and WebKit captures at 375×812, 768×1024, and 1440×900 showed consistent responsive stacking and no detected horizontal clipping. No visual baseline was created or approved. The sticky header’s placement in stitched full-page desktop captures should be reviewed in a real viewport before treating it as a regression.</p>
<div class="table-wrap"><table><thead><tr><th>Status</th><th>Browser</th><th>Severity</th><th>Test / reproduction path</th><th>Duration</th><th>Error message</th><th>Suggested fix</th><th>Evidence</th></tr></thead><tbody>${rows}</tbody></table></div>
<p>Detailed Playwright traces, steps, videos, and failure screenshots are available in the linked HTML report and test-results directory.</p>
</main></body></html>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html);
console.log(outputPath);
