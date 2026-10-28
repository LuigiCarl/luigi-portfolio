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
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas

# Palette
COLOR_TITLE = colors.Color(0.094118, 0.094118, 0.105882)       # #18181b
COLOR_SUBTITLE = colors.Color(0.321569, 0.321569, 0.356863)    # #52525b
COLOR_SECTION = colors.Color(0.298039, 0.113725, 0.584314)     # #4c1d95 (accent violet)
COLOR_BODY = colors.Color(0.152941, 0.152941, 0.164706)        # #27272a
COLOR_MUTED = colors.Color(0.247059, 0.247059, 0.27451)        # #3f3f46
COLOR_RULE = colors.Color(0.85, 0.85, 0.88)                    # #d9d9e0
COLOR_FOOTER_TEXT = colors.Color(0.443137, 0.443137, 0.478431) # #71717a

class SinglePageCVCanvas(canvas.Canvas):
    """Enforce exact 1-page canvas with custom bottom footer, metadata, and clickable link."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_count = 0
        self.setTitle("Luigi Carl Brezuela - Curriculum Vitae")
        self.setAuthor("Luigi Carl Brezuela")
        self.setSubject("Curriculum Vitae")
        self.setCreator("Luigi Carl Brezuela")

    def showPage(self):
        self.page_count += 1
        self.draw_footer()
        super().showPage()

    def draw_footer(self):
        self.saveState()
        self.setStrokeColor(COLOR_RULE)
        self.setLineWidth(0.6)
        self.line(38, 28, 574, 28)
        
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(COLOR_SECTION)
        self.drawString(38, 17, "LUIGI CARL BREZUELA — CURRICULUM VITAE")
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(COLOR_FOOTER_TEXT)
        self.drawRightString(574, 17, "portfolio.luigicarl.tech  |  Bulan, Sorsogon, Philippines")
        self.linkURL("https://portfolio.luigicarl.tech", (370, 10, 480, 24), relative=0)
        self.restoreState()


def build_cv(filename):
    # Standard Letter Size: 612 x 792 pt
    # Margins: 38pt left/right, 32pt top, 38pt bottom -> 536pt width, 722pt usable height
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=38,
        rightMargin=38,
        topMargin=32,
        bottomMargin=38,
        title="Luigi Carl Brezuela - Curriculum Vitae",
        author="Luigi Carl Brezuela",
        subject="Curriculum Vitae",
        creator="Luigi Carl Brezuela",
    )

    styles = {
        "Name": ParagraphStyle(
            "Name",
            fontName="Helvetica-Bold",
            fontSize=20.5,
            leading=23.5,
            textColor=COLOR_TITLE,
            alignment=TA_CENTER,
        ),
        "Title": ParagraphStyle(
            "Title",
            fontName="Helvetica-Bold",
            fontSize=9.4,
            leading=12.0,
            textColor=COLOR_SECTION,
            alignment=TA_CENTER,
        ),
        "Contact": ParagraphStyle(
            "Contact",
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.4,
            textColor=COLOR_SUBTITLE,
            alignment=TA_CENTER,
        ),
        "SectionHeading": ParagraphStyle(
            "SectionHeading",
            fontName="Helvetica-Bold",
            fontSize=9.6,
            leading=12.2,
            textColor=COLOR_SECTION,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "SubHeading": ParagraphStyle(
            "SubHeading",
            fontName="Helvetica",
            fontSize=8.9,
            leading=11.4,
            textColor=COLOR_TITLE,
        ),
        "BadgeRight": ParagraphStyle(
            "BadgeRight",
            fontName="Helvetica",
            fontSize=8.1,
            leading=11.4,
            textColor=COLOR_SUBTITLE,
            alignment=TA_RIGHT,
        ),
        "Body": ParagraphStyle(
            "Body",
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.8,
            textColor=COLOR_BODY,
        ),
        "Bullet": ParagraphStyle(
            "Bullet",
            fontName="Helvetica",
            fontSize=8.2,
            leading=11.2,
            textColor=COLOR_MUTED,
            leftIndent=10,
            firstLineIndent=-10,
        ),
        "TechStack": ParagraphStyle(
            "TechStack",
            fontName="Helvetica-Oblique",
            fontSize=7.9,
            leading=10.4,
            textColor=COLOR_SUBTITLE,
        ),
        "SkillLabel": ParagraphStyle(
            "SkillLabel",
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=11.4,
            textColor=COLOR_MUTED,
        ),
        "SkillValue": ParagraphStyle(
            "SkillValue",
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.4,
            textColor=COLOR_BODY,
        ),
    }

    story = []

    # 1. Header with Clickable Links
    story.append(Paragraph("LUIGI CARL BREZUELA", styles["Name"]))
    story.append(Spacer(1, 3.5))
    story.append(Paragraph("CURRICULUM VITAE  •  BSIT STUDENT  •  ASPIRING FULL-STACK DEVELOPER", styles["Title"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Bulan, Sorsogon, Philippines  •  "
        "<a href='mailto:luigi.brezuela@sorsu.edu.ph' color='#4c1d95'><u>luigi.brezuela@sorsu.edu.ph</u></a>  •  "
        "<a href='tel:+639942868565' color='#3f3f46'>+63 994 286 8565</a>",
        styles["Contact"]
    ))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph(
        "<a href='https://portfolio.luigicarl.tech' color='#4c1d95'><u>portfolio.luigicarl.tech</u></a>  •  "
        "<a href='https://github.com/LuigiCarl' color='#4c1d95'><u>github.com/LuigiCarl</u></a>  •  "
        "<a href='https://linkedin.com/in/luigi-carl-brezuela-317825445' color='#4c1d95'><u>linkedin.com/in/luigi-carl-brezuela-317825445</u></a>",
        styles["Contact"]
    ))
    story.append(Spacer(1, 12))

    # Helper for horizontal rule section headers
    def make_section_header(title):
        t = Table(
            [[Paragraph(title, styles["SectionHeading"])]],
            colWidths=[536]
        )
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
            ("LINEBELOW", (0, 0), (-1, -1), 0.8, COLOR_RULE),
        ]))
        return t

    # 2. Profile
    story.append(make_section_header("ACADEMIC & PROFESSIONAL PROFILE"))
    story.append(Spacer(1, 5.5))
    profile_text = (
        "Fourth-year Bachelor of Science in Information Technology (BSIT) student at Sorsogon State University – Bulan Campus "
        "with hands-on project experience in web and mobile application development. Proficient in TypeScript, React, React Native, "
        "Next.js, and Laravel REST APIs with MySQL and PostgreSQL databases. Seeking a Software Development Internship to "
        "contribute to production software, collaborate in team engineering workflows, and strengthen software engineering fundamentals."
    )
    story.append(Paragraph(profile_text, styles["Body"]))
    story.append(Spacer(1, 11))

    # 3. Technical Skills
    story.append(make_section_header("TECHNICAL SKILLS & TOOLS"))
    story.append(Spacer(1, 5))
    skills_data = [
        [Paragraph("Languages", styles["SkillLabel"]), Paragraph("TypeScript, JavaScript, PHP, SQL, HTML5, CSS3", styles["SkillValue"])],
        [Paragraph("Frontend & Mobile", styles["SkillLabel"]), Paragraph("React, React Native (Expo), Next.js, Tailwind CSS", styles["SkillValue"])],
        [Paragraph("Backend & APIs", styles["SkillLabel"]), Paragraph("PHP, Laravel, RESTful APIs", styles["SkillValue"])],
        [Paragraph("Databases & Tools", styles["SkillLabel"]), Paragraph("MySQL, PostgreSQL, Git, GitHub, VS Code, Vercel", styles["SkillValue"])],
    ]
    t_skills = Table(skills_data, colWidths=[115, 421])
    t_skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 11))

    # 4. Projects (All 5 Projects with Clickable Links)
    story.append(make_section_header("TECHNICAL PROJECTS & ACADEMIC PORTFOLIO"))
    story.append(Spacer(1, 5.5))

    def make_project_header(title_markup, badge_markup):
        t = Table(
            [[Paragraph(title_markup, styles["SubHeading"]), Paragraph(badge_markup, styles["BadgeRight"])]],
            colWidths=[380, 156]
        )
        t.setStyle(TableStyle([
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        return t

    # Project 1: Labada
    p1_title = "<a href='https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357' color='#18181b'><b>Labada</b></a> — Laundry Service & Delivery Platform"
    p1_badge = "Capstone · Mobile App  <a href='https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357' color='#4c1d95'><u>[EAS Build]</u></a>"
    story.append(make_project_header(p1_title, p1_badge))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Technologies: React Native, Expo, TypeScript, PHP, Laravel, MySQL", styles["TechStack"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("• Built a cross-platform mobile application supporting 4 user roles (Customers, Shop Owners, Delivery Riders, Administrators).", styles["Bullet"]))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("• Implemented real-time order tracking, delivery status updates, and in-app chat for active orders; verified EAS builds.", styles["Bullet"]))
    story.append(Spacer(1, 10))

    # Project 2: DevStash
    p2_title = "<a href='https://devstash-gamma-hazel.vercel.app/' color='#18181b'><b>DevStash</b></a> — Developer Resource Management Platform"
    p2_badge = "Web App  <a href='https://devstash-gamma-hazel.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/devstash' color='#4c1d95'><u>[GitHub]</u></a>"
    story.append(make_project_header(p2_title, p2_badge))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Technologies: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL", styles["TechStack"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("• Developed a developer bookmarking system to organize, tag, and search technical links with public guest and private user libraries.", styles["Bullet"]))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("• Designed database tables and implemented OAuth authentication for secure user logins.", styles["Bullet"]))
    story.append(Spacer(1, 10))

    # Project 3: FinanEase
    p3_title = "<a href='https://frontend-budget-tracker.vercel.app/' color='#18181b'><b>FinanEase</b></a> — Personal Finance & Budget Management System"
    p3_badge = "Web App  <a href='https://frontend-budget-tracker.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/FinanEase' color='#4c1d95'><u>[GitHub]</u></a>"
    story.append(make_project_header(p3_title, p3_badge))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Technologies: React, TypeScript, Tailwind CSS, PHP, Laravel, MySQL", styles["TechStack"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("• Created a responsive budget tracking dashboard featuring income and expense logging, category budgets, and spending charts.", styles["Bullet"]))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("• Built and integrated a decoupled Laravel RESTful API backend to securely manage financial records and user transactions.", styles["Bullet"]))
    story.append(Spacer(1, 10))

    # Project 4: GIMATA
    p4_title = "<a href='https://gimata.vercel.app/' color='#18181b'><b>GIMATA</b></a> — Fisheries Data Visualization Application"
    p4_badge = "Web App · PWA  <a href='https://gimata.vercel.app/' color='#4c1d95'><u>[Live Demo]</u></a>"
    story.append(make_project_header(p4_title, p4_badge))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Technologies: React, TypeScript, Tailwind CSS, Leaflet, PWA", styles["TechStack"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("• Transformed coastal survey catch records from Bulan, Sorsogon into an interactive geospatial map and seasonal catch dashboard.", styles["Bullet"]))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("• Implemented species and seasonal filters, ecological summaries, and offline-capable Progressive Web App (PWA) features.", styles["Bullet"]))
    story.append(Spacer(1, 10))

    # Project 5: UNLABEL
    p5_title = "<a href='https://unlabel-dusky.vercel.app/' color='#18181b'><b>UNLABEL</b></a> — Interactive Educational Website"
    p5_badge = "Interactive Web  <a href='https://unlabel-dusky.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/Unlabel' color='#4c1d95'><u>[GitHub]</u></a>"
    story.append(make_project_header(p5_title, p5_badge))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Technologies: Next.js, React, TypeScript, Tailwind CSS", styles["TechStack"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("• Designed an interactive educational website exploring gender stereotypes through visual storytelling, quizzes, and a pledge generator.", styles["Bullet"]))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("• Built responsive UI components and smooth web animations for an engaging learning experience.", styles["Bullet"]))
    story.append(Spacer(1, 12))

    # 5. Education
    story.append(make_section_header("EDUCATION"))
    story.append(Spacer(1, 5))
    edu_head = [
        [
            Paragraph("<b>Bachelor of Science in Information Technology (BSIT)</b>", styles["SubHeading"]),
            Paragraph("Expected Graduation: 2027", styles["BadgeRight"]),
        ],
        [
            Paragraph("Sorsogon State University – Bulan Campus · Bulan, Sorsogon, Philippines", styles["Body"]),
            Paragraph("Status: Ongoing (Regular)", styles["BadgeRight"]),
        ],
    ]
    t_edu = Table(edu_head, colWidths=[380, 156])
    t_edu.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 4.5))
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures & Algorithms, Database Management Systems, Web Systems & Technologies, Mobile Application Development, Software Engineering, Object-Oriented Programming", styles["Bullet"]))

    doc.build(story, canvasmaker=SinglePageCVCanvas)


if __name__ == "__main__":
    out_cv = os.path.join(os.path.dirname(__file__), "..", "public", "cv.pdf")
    out_resume = os.path.join(os.path.dirname(__file__), "..", "public", "resume.pdf")
    build_cv(out_cv)
    build_cv(out_resume)
    print("Generated perfectly balanced 1-page CV successfully!")
