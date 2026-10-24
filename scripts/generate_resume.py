import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Colors matching the original resume
COLOR_TITLE = colors.Color(0.094118, 0.094118, 0.105882)      # #18181b
COLOR_SUBTITLE = colors.Color(0.321569, 0.321569, 0.356863)   # #52525b
COLOR_SECTION = colors.Color(0.298039, 0.113725, 0.584314)    # #4c1d95
COLOR_BODY = colors.Color(0.152941, 0.152941, 0.164706)       # #27272a
COLOR_MUTED = colors.Color(0.247059, 0.247059, 0.27451)       # #3f3f46
COLOR_FOOTER_LINE = colors.Color(0.894118, 0.894118, 0.905882)# #e4e4e7
COLOR_FOOTER_TEXT = colors.Color(0.443137, 0.443137, 0.478431)# #71717a

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(COLOR_FOOTER_LINE)
    canvas.setLineWidth(0.75)
    canvas.line(41.76, 30.24, 570.24, 30.24)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(COLOR_FOOTER_TEXT)
    canvas.drawString(41.76, 18, "Luigi Carl Brezuela")
    canvas.drawRightString(570.24, 18, "Software Development Internship Candidate")
    canvas.restoreState()

def build_pdf(filename):
    # Page setup: letter is 612 x 792 pt
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=47.76,
        rightMargin=41.76,
        topMargin=36,
        bottomMargin=38,
    )

    styles = {
        "Name": ParagraphStyle(
            "Name",
            fontName="Helvetica-Bold",
            fontSize=17,
            leading=20,
            textColor=COLOR_TITLE,
            alignment=TA_CENTER,
        ),
        "Title": ParagraphStyle(
            "Title",
            fontName="Helvetica",
            fontSize=9.2,
            leading=12,
            textColor=COLOR_SUBTITLE,
            alignment=TA_CENTER,
        ),
        "Contact": ParagraphStyle(
            "Contact",
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            textColor=COLOR_SUBTITLE,
            alignment=TA_CENTER,
        ),
        "SectionHeading": ParagraphStyle(
            "SectionHeading",
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=COLOR_SECTION,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "ProfileBody": ParagraphStyle(
            "ProfileBody",
            fontName="Helvetica",
            fontSize=8.1,
            leading=10.5,
            textColor=COLOR_BODY,
        ),
        "SkillLabel": ParagraphStyle(
            "SkillLabel",
            fontName="Helvetica-Bold",
            fontSize=7.8,
            leading=9.8,
            textColor=COLOR_MUTED,
        ),
        "SkillValue": ParagraphStyle(
            "SkillValue",
            fontName="Helvetica",
            fontSize=7.8,
            leading=9.8,
            textColor=COLOR_MUTED,
        ),
        "ProjectTitle": ParagraphStyle(
            "ProjectTitle",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.2,
            textColor=COLOR_TITLE,
        ),
        "ProjectDesc": ParagraphStyle(
            "ProjectDesc",
            fontName="Helvetica",
            fontSize=7.8,
            leading=9.8,
            textColor=COLOR_MUTED,
        ),
        "Education": ParagraphStyle(
            "Education",
            fontName="Helvetica",
            fontSize=8.1,
            leading=10.5,
            textColor=COLOR_BODY,
        ),
    }

    story = []

    # Header
    story.append(Paragraph("Luigi Carl Brezuela", styles["Name"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("IT Student | Full-Stack Developer in Training", styles["Title"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("luigi.brezuela@sorsu.edu.ph | portfolio.luigicarl.tech | github.com/LuigiCarl | linkedin.com/in/luigi-carl-brezuela-317825445", styles["Contact"]))
    story.append(Spacer(1, 9))

    # Profile
    story.append(Paragraph("PROFILE", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))
    profile_text = (
        "BS Information Technology student at Sorsogon State University – Bulan Campus with practical project "
        "experience developing web and mobile applications. Familiar with React, React Native, TypeScript, Laravel, "
        "and REST APIs through academic coursework and personal projects. Eager to learn from experienced engineers, "
        "receive code reviews, and strengthen software engineering fundamentals as a software development intern."
    )
    story.append(Paragraph(profile_text, styles["ProfileBody"]))
    story.append(Spacer(1, 8))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS & TOOLS", styles["SectionHeading"]))
    story.append(Spacer(1, 3))

    skills_data = [
        [Paragraph("Languages", styles["SkillLabel"]), Paragraph("TypeScript, JavaScript, PHP, SQL", styles["SkillValue"])],
        [Paragraph("Frontend & Mobile", styles["SkillLabel"]), Paragraph("React, Next.js, React Native, Expo, Tailwind CSS", styles["SkillValue"])],
        [Paragraph("Backend & APIs", styles["SkillLabel"]), Paragraph("Laravel, PHP, REST API Development, Sanctum, Reverb, Auth.js", styles["SkillValue"])],
        [Paragraph("Databases & ORM", styles["SkillLabel"]), Paragraph("MySQL, PostgreSQL (Neon), Drizzle ORM", styles["SkillValue"])],
        [Paragraph("Tools & Platforms", styles["SkillLabel"]), Paragraph("Git, GitHub, VS Code, Vercel, AWS EC2", styles["SkillValue"])],
    ]

    skills_table = Table(skills_data, colWidths=[95, 427])
    skills_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 0.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 8))

    # Selected Projects
    story.append(Paragraph("SELECTED PROJECTS", styles["SectionHeading"]))
    story.append(Spacer(1, 4))

    projects = [
        {
            "title": "Labada | Capstone Mobile Application",
            "desc": "Built a laundry service and delivery platform supporting customer, shop owner, rider, and administrator workflows, with authentication, order tracking, live rider updates, and order-scoped chat.",
            "tech": "React Native, Expo, TypeScript, PHP, Laravel, Sanctum, Reverb",
        },
        {
            "title": "DevStash | Full-Stack Web Application",
            "desc": "Built a responsive developer resource management platform for bookmarking, categorizing, and filtering technical links with guest preview access and authenticated private libraries.",
            "tech": "Next.js, React, TypeScript, Tailwind CSS, Drizzle ORM, Neon Postgres, Auth.js",
        },
        {
            "title": "FinanEase | Full-Stack Web Application",
            "desc": "Developed a personal finance application for income, expense, budget, and transaction management through responsive dashboards backed by a Laravel REST API.",
            "tech": "React, TypeScript, Tailwind CSS, Recharts, PHP, Laravel, Sanctum, SQL",
        },
        {
            "title": "GIMATA | Web Application / PWA",
            "desc": "Created a fisheries data visualization application with interactive maps, seasonal catch dashboards, species profiles, and ecology summaries from survey records.",
            "tech": "React, TypeScript, Tailwind CSS, Leaflet, Recharts, Zustand, Vite, PWA",
        },
        {
            "title": "UNLABEL | Interactive Educational Website",
            "desc": "Built an interactive educational website using visual storytelling, quizzes, data visualizations, reflection activities, legal-information resources, and a pledge generator.",
            "tech": "Next.js, React, TypeScript, Tailwind CSS, Three.js, GSAP, Motion",
        },
    ]

    for proj in projects:
        story.append(Paragraph(proj["title"], styles["ProjectTitle"]))
        story.append(Spacer(1, 1.5))
        story.append(Paragraph(proj["desc"], styles["ProjectDesc"]))
        story.append(Spacer(1, 1.5))
        tech_p = Paragraph(f"<b>Technologies:</b> {proj['tech']}", styles["ProjectDesc"])
        story.append(tech_p)
        story.append(Spacer(1, 5.5))

    story.append(Spacer(1, 2.5))

    # Education
    story.append(Paragraph("EDUCATION", styles["SectionHeading"]))
    story.append(Spacer(1, 3))
    edu_text = "<b>Bachelor of Science in Information Technology</b> | Sorsogon State University – Bulan Campus | Expected 2027"
    story.append(Paragraph(edu_text, styles["Education"]))

    doc.build(story, onFirstPage=footer)

if __name__ == "__main__":
    out_path = os.path.join(os.path.dirname(__file__), "..", "public", "resume.pdf")
    build_pdf(out_path)
    print("Generated resume at:", out_path)
