import { expect, test, type Page, type TestInfo } from "@playwright/test";

const sectionLinks = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

const technologies = [
  "React",
  "React Native",
  "Expo",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "REST API Development",
  "PostgreSQL",
  "MySQL",
  "Drizzle ORM",
  "Git",
  "GitHub",
  "Visual Studio Code",
  "Vercel",
  "AWS EC2",
] as const;

const projectNames = ["DevStash", "Labada", "FinanEase", "Klinika", "UNLABEL"] as const;

function annotate(testInfo: TestInfo, severity: "Critical" | "High" | "Medium" | "Low", suggestedFix: string) {
  testInfo.annotations.push(
    { type: "severity", description: severity },
    { type: "suggested-fix", description: suggestedFix },
  );
}

async function collectRuntimeProblems(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText ?? "unknown error";
    if (!failure.includes("ERR_ABORTED") && !failure.includes("NS_BINDING_ABORTED")) {
      failedRequests.push(`${request.method()} ${request.url()} — ${failure}`);
    }
  });

  return { consoleErrors, pageErrors, failedRequests };
}

test.describe("Navigation and routing", () => {
  test("desktop navigation reaches every portfolio section", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Repair any incorrect anchor targets and ensure the sticky header does not hide section headings.");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    for (const [label, id] of sectionLinks) {
      await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test("mobile navigation opens, navigates, and closes", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Fix the mobile menu state, accessible label, or breakpoint visibility if navigation cannot be completed.");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const toggle = page.locator(".menu-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("Close navigation menu");
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  });

  test("unknown route renders the not-found page", async ({ page }, testInfo) => {
    annotate(testInfo, "Medium", "Add or repair the Next.js not-found boundary so invalid URLs return a clear 404 experience.");
    const response = await page.goto("/definitely-not-a-real-page");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Buttons, documents, and external links", () => {
  test("primary calls to action and resume document are valid", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Correct missing CTA targets or restore the resume asset under public/cv.pdf.");
    await page.goto("/");

    await expect(page.getByRole("link", { name: /Explore My Projects/ })).toHaveAttribute("href", "#projects");
    const resumeLinks = page.getByRole("link", { name: /View (CV|Resume)/ });
    expect(await resumeLinks.count()).toBeGreaterThan(0);
    await expect(resumeLinks.first()).toHaveAttribute("target", "_blank");
    await expect(resumeLinks.first()).toHaveAttribute("rel", /noopener/);

    const cvResponse = await page.request.get("/cv.pdf");
    expect(cvResponse.status()).toBe(200);
    expect(cvResponse.headers()["content-type"]).toContain("application/pdf");
  });

  test("external links use secure new-tab attributes and parseable URLs", async ({ page }, testInfo) => {
    annotate(testInfo, "Medium", "Add rel=\"noopener noreferrer\" to new-tab links and correct any malformed external URL.");
    await page.goto("/");

    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const link = externalLinks.nth(index);
      const href = await link.getAttribute("href");
      expect(href, `link ${index + 1} is missing href`).toBeTruthy();
      expect(await link.getAttribute("rel")).toContain("noopener");
      if (href?.startsWith("http")) expect(() => new URL(href)).not.toThrow();
    }
  });
});

test.describe("Theme behavior", () => {
  test("light and dark color schemes produce distinct page themes", async ({ page }, testInfo) => {
    annotate(testInfo, "Medium", "Implement a light color palette through prefers-color-scheme or an accessible theme toggle if dual-theme support is intended.");

    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const darkBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);

    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    const lightBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);

    expect(lightBackground, "The page uses the same body background in light and dark OS modes").not.toBe(darkBackground);
  });
});

test.describe("Tech Stack", () => {
  test("all technology names and SVG icons render", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Correct the Iconify name, provide local icon data, or ensure the visible fallback renders when the icon API is unavailable.");
    await page.goto("/#skills");
    const cards = page.locator(".skill-badge");
    await expect(cards).toHaveCount(technologies.length);

    for (const name of technologies) {
      const card = cards.filter({ has: page.locator("span").getByText(name, { exact: true }) });
      await expect(card, `${name} card`).toBeVisible();
      await expect(card.locator(".skill-logo svg, .skill-logo-fallback"), `${name} icon or fallback`).toHaveCount(1);
    }
  });
});

test.describe("Project cards", () => {
  test("all projects, screenshots, and configured links render", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Restore missing project content, image assets, or configured links in the portfolio data source.");
    await page.goto("/#projects");
    await expect(page.locator(".project-card")).toHaveCount(projectNames.length);

    for (const project of projectNames) {
      const card = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: project, exact: true }) });
      await expect(card).toBeVisible();
      await expect(card.getByRole("img").first()).toBeVisible();
    }

    await expect(page.getByRole("link", { name: "Expo build evidence for Labada" })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.getByRole("link", { name: "Live preview of DevStash" })).toHaveAttribute("href", "https://devstash-gamma-hazel.vercel.app/");
    await expect(page.getByRole("link", { name: "Source code for DevStash" })).toHaveAttribute("href", "https://github.com/LuigiCarl/devstash");
    await expect(page.getByRole("link", { name: "Live preview of FinanEase" })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.getByRole("link", { name: "Live preview of Klinika" })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.getByRole("link", { name: "Live preview of UNLABEL" })).toHaveAttribute("href", /^https:\/\//);
  });
});

test.describe("Responsive layout and visual evidence", () => {
  const viewports = [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ] as const;

  for (const viewport of viewports) {
    test(`${viewport.name} ${viewport.width}x${viewport.height} has no horizontal overflow or clipped core content`, async ({ page }, testInfo) => {
      annotate(testInfo, "High", "Constrain the overflowing element at this breakpoint and verify grid/card minimum widths.");
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      await page.locator("footer").scrollIntoViewIfNeeded();

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth, `horizontal overflow: ${dimensions.scrollWidth - dimensions.clientWidth}px`).toBeLessThanOrEqual(dimensions.clientWidth);

      for (const selector of ["#top", "#about", "#skills", "#projects", "#education", "#contact", "footer"]) {
        const box = await page.locator(selector).boundingBox();
        expect(box, `${selector} has no box`).not.toBeNull();
        expect(box!.x, `${selector} starts outside viewport`).toBeGreaterThanOrEqual(-1);
        expect(box!.x + box!.width, `${selector} extends past viewport`).toBeLessThanOrEqual(viewport.width + 1);
      }

      await page.screenshot({
        path: `qa-results/screenshots/${testInfo.project.name}-${viewport.name}-${viewport.width}x${viewport.height}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});

test.describe("Runtime health and assets", () => {
  test("page has no console errors, uncaught exceptions, or failed requests", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Resolve the reported client exception or failed resource; self-host critical third-party assets when reliability is required.");
    const problems = await collectRuntimeProblems(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1_000);

    expect(problems.pageErrors, `page errors:\n${problems.pageErrors.join("\n")}`).toEqual([]);
    expect(problems.consoleErrors, `console errors:\n${problems.consoleErrors.join("\n")}`).toEqual([]);
    expect(problems.failedRequests, `failed requests:\n${problems.failedRequests.join("\n")}`).toEqual([]);
  });

  test("all page images load with non-zero intrinsic dimensions", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Restore the missing asset, correct its source path, or update image configuration.");
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
      await expect(images.nth(index), `image ${index + 1}`).toHaveJSProperty("complete", true);
      expect(await images.nth(index).evaluate((image: HTMLImageElement) => image.naturalWidth), `image ${index + 1}`).toBeGreaterThan(0);
    }
  });
});

test.describe("Keyboard accessibility", () => {
  test("desktop interactive controls are reachable and visibly focused", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Restore semantic controls, logical DOM order, and a visible :focus-visible indicator.");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const homeLink = page.getByRole("link", { name: "LCB home" });
    for (let attempt = 0; attempt < 3 && !(await homeLink.evaluate((element) => element === document.activeElement)); attempt += 1) {
      await page.keyboard.press("Tab");
    }
    await expect(homeLink).toBeFocused();
    const focusStyle = await homeLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    expect(focusStyle.outlineStyle).not.toBe("none");
    expect(focusStyle.outlineWidth).not.toBe("0px");

    for (const label of sectionLinks.map(([label]) => label)) {
      await page.keyboard.press("Tab");
      await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: label })).toBeFocused();
    }
  });

  test("mobile menu can be operated with keyboard only", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Ensure the menu control is a native button with correct expanded state and keyboard-operable links.");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const toggle = page.locator(".menu-toggle");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("Close navigation menu");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" })).toBeFocused();
  });
});

test.describe("Animation and visibility", () => {
  test("hero entrance content settles visible", async ({ page }, testInfo) => {
    annotate(testInfo, "High", "Ensure entrance animations finish at full opacity and do not leave important hero content hidden.");
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Luigi Carl/ })).toBeVisible();
    await expect(page.getByText("Seeking Software Development Internship Opportunities", { exact: true })).toBeVisible();
    await expect.poll(() => page.getByRole("heading", { name: /Luigi Carl/ }).evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  });

  test("reduced-motion preference suppresses long animations", async ({ page }, testInfo) => {
    annotate(testInfo, "Medium", "Add a prefers-reduced-motion override that reduces animation and transition durations to near zero.");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const durations = await page.locator(".animate-in").first().evaluate((element) => {
      const style = getComputedStyle(element);
      return { animationDuration: style.animationDuration, transitionDuration: style.transitionDuration };
    });
    expect(parseFloat(durations.animationDuration)).toBeLessThanOrEqual(0.01);
    expect(parseFloat(durations.transitionDuration)).toBeLessThanOrEqual(0.01);
  });
});
