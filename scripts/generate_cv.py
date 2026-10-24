import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas

# Theme Palette (Consistent with portfolio & resume styling)
COLOR_TITLE = colors.Color(0.094118, 0.094118, 0.105882)       # #18181b
COLOR_SUBTITLE = colors.Color(0.321569, 0.321569, 0.356863)    # #52525b
COLOR_SECTION = colors.Color(0.298039, 0.113725, 0.584314)     # #4c1d95 (accent violet)
COLOR_BODY = colors.Color(0.152941, 0.152941, 0.164706)        # #27272a
COLOR_MUTED = colors.Color(0.247059, 0.247059, 0.27451)        # #3f3f46
COLOR_PLACEHOLDER = colors.Color(0.45, 0.3, 0.7)                # Highlighted placeholder color
COLOR_FOOTER_LINE = colors.Color(0.894118, 0.894118, 0.905882) # #e4e4e7
COLOR_FOOTER_TEXT = colors.Color(0.443137, 0.443137, 0.478431) # #71717a

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute and print 'Page X of Y'."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Bottom footer line & labels
        self.setStrokeColor(COLOR_FOOTER_LINE)
        self.setLineWidth(0.75)
        self.line(41.76, 30.24, 570.24, 30.24)
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(COLOR_FOOTER_TEXT)
        self.drawString(41.76, 18, "Luigi Carl Brezuela — Curriculum Vitae (CV)")
        self.drawRightString(570.24, 18, f"Page {self._pageNumber} of {page_count}")

        # Top running header for Page 2+
        if self._pageNumber > 1:
            self.setStrokeColor(COLOR_FOOTER_LINE)
            self.setLineWidth(0.5)
            self.line(41.76, 755, 570.24, 755)
            self.setFont("Helvetica", 7.5)
            self.setFillColor(COLOR_SUBTITLE)
            self.drawString(41.76, 760, "Luigi Carl Brezuela — Curriculum Vitae | BSIT")
            self.drawRightString(570.24, 760, "Sorsogon State University – Bulan Campus")
        self.restoreState()

def build_cv(filename):
    # Standard Letter Size: 612 x 792 pt
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=47.76,
        rightMargin=41.76,
        topMargin=36,
        bottomMargin=40,
    )

    styles = {
        "Name": ParagraphStyle(
            "Name",
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=21,
            textColor=COLOR_TITLE,
            alignment=TA_CENTER,
        ),
        "Title": ParagraphStyle(
            "Title",
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=COLOR_SUBTITLE,
            alignment=TA_CENTER,
        ),
        "Contact": ParagraphStyle(
            "Contact",
            fontName="Helvetica",
            fontSize=8,
            leading=11,
            textColor=COLOR_SUBTITLE,
            alignment=TA_CENTER,
        ),
        "SectionHeading": ParagraphStyle(
            "SectionHeading",
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=COLOR_SECTION,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "SubHeading": ParagraphStyle(
            "SubHeading",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.5,
            textColor=COLOR_TITLE,
        ),
        "DateRight": ParagraphStyle(
            "DateRight",
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            textColor=COLOR_SUBTITLE,
            alignment=TA_RIGHT,
        ),
        "Body": ParagraphStyle(
            "Body",
            fontName="Helvetica",
            fontSize=8,
            leading=10.6,
            textColor=COLOR_BODY,
        ),
        "Bullet": ParagraphStyle(
            "Bullet",
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.2,
            textColor=COLOR_MUTED,
            leftIndent=11,
            firstLineIndent=-11,
        ),
        "SkillLabel": ParagraphStyle(
            "SkillLabel",
            fontName="Helvetica-Bold",
            fontSize=7.8,
            leading=10,
            textColor=COLOR_MUTED,
        ),
        "SkillValue": ParagraphStyle(
            "SkillValue",
            fontName="Helvetica",
            fontSize=7.8,
            leading=10,
            textColor=COLOR_MUTED,
        ),
        "Placeholder": ParagraphStyle(
            "Placeholder",
            fontName="Helvetica-Oblique",
            fontSize=7.8,
            leading=10,
            textColor=COLOR_PLACEHOLDER,
        ),
    }

    story = []

    # ================= PAGE 1 =================
    # 1. Header
    story.append(Paragraph("Luigi Carl Brezuela", styles["Name"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("IT Student | Full-Stack Software Developer in Training", styles["Title"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("luigi.brezuela@sorsu.edu.ph | +63 994 286 8565 | Bulan, Sorsogon, Philippines", styles["Contact"]))
    story.append(Paragraph("Portfolio: portfolio.luigicarl.tech | GitHub: github.com/LuigiCarl | LinkedIn: linkedin.com/in/luigi-carl-brezuela-317825445", styles["Contact"]))
    story.append(Spacer(1, 9))

    # 2. Professional & Academic Profile
    story.append(Paragraph("ACADEMIC & PROFESSIONAL SUMMARY", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))
    summary_text = (
        "Bachelor of Science in Information Technology (BSIT) student at Sorsogon State University – Bulan Campus with hands-on "
        "project experience in web and mobile application development. Experienced in building practical full-stack projects using "
        "React, React Native (Expo), Next.js, Laravel, TypeScript, and relational databases (MySQL, PostgreSQL). Comfortable connecting "
        "frontend interfaces with backend REST APIs, working with state management, and designing clear database schemas. Seeking a "
        "Software Development Internship where I can learn from experienced engineers, receive constructive code reviews, and contribute "
        "to real-world applications while strengthening software engineering fundamentals."
    )
    story.append(Paragraph(summary_text, styles["Body"]))
    story.append(Spacer(1, 8))

    # 3. Education
    story.append(Paragraph("EDUCATION", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))
    edu_header = [
        [
            Paragraph("<b>Bachelor of Science in Information Technology (BSIT)</b>", styles["SubHeading"]),
            Paragraph("Expected Graduation: 2027", styles["DateRight"]),
        ],
        [
            Paragraph("Sorsogon State University – Bulan Campus · Bulan, Sorsogon, Philippines", styles["Body"]),
            Paragraph("Status: Ongoing (Regular)", styles["DateRight"]),
        ],
    ]
    edu_table = Table(edu_header, colWidths=[360, 162])
    edu_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 0.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 3))

    edu_details = [
        [Paragraph("Academic Honors / GWA:", styles["SkillLabel"]), Paragraph("<i>[e.g., Dean's Lister, 1st Sem / 2nd Sem / Cumulative GWA: 1.XX]</i>", styles["Placeholder"])],
        [Paragraph("Relevant Coursework:", styles["SkillLabel"]), Paragraph("Data Structures & Algorithms, Database Management Systems, Web Systems & Technologies, Mobile Application Development, Software Engineering, Object-Oriented Programming, Networking Fundamentals", styles["SkillValue"])],
    ]
    t_edu_details = Table(edu_details, colWidths=[120, 402])
    t_edu_details.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_edu_details)
    story.append(Spacer(1, 8))

    # 4. Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS & TOOLS (PROJECT EXPERIENCE)", styles["SectionHeading"]))
    story.append(Spacer(1, 3))

    skills_data = [
        [Paragraph("Programming Languages", styles["SkillLabel"]), Paragraph("TypeScript, JavaScript (ES6+), PHP, SQL, HTML5, CSS3", styles["SkillValue"])],
        [Paragraph("Frontend Frameworks", styles["SkillLabel"]), Paragraph("React, Next.js (App Router), React Native, Expo, Tailwind CSS, Zustand, Recharts", styles["SkillValue"])],
        [Paragraph("Backend & Architecture", styles["SkillLabel"]), Paragraph("Laravel, PHP, RESTful API Development, Laravel Sanctum, Laravel Reverb (WebSockets)", styles["SkillValue"])],
        [Paragraph("Databases & ORM", styles["SkillLabel"]), Paragraph("MySQL, PostgreSQL (Neon), Drizzle ORM, Relational Database Modeling", styles["SkillValue"])],
        [Paragraph("Authentication & Tools", styles["SkillLabel"]), Paragraph("Auth.js (NextAuth), Sanctum Token Authentication, Git, GitHub, VS Code, Vercel, AWS EC2", styles["SkillValue"])],
    ]
    skills_table = Table(skills_data, colWidths=[120, 402])
    skills_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 8))

    # 5. Capstone / Flagship Project
    story.append(Paragraph("CAPSTONE & SELECTED PROJECTS", styles["SectionHeading"]))
    story.append(Spacer(1, 4))

    # Project 1: Labada
    p1_header = [
        [Paragraph("<b>Labada | Laundry Service & Delivery Management Platform</b>", styles["SubHeading"]), Paragraph("Capstone Project", styles["DateRight"])]
    ]
    t_p1 = Table(p1_header, colWidths=[380, 142])
    t_p1.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p1)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<i>Technologies: React Native, Expo, TypeScript, PHP, Laravel, Sanctum, Reverb, MySQL</i>", styles["Body"]))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Developed a full-stack mobile platform supporting 4 distinct user roles: Customers, Shop Owners, Delivery Riders, and System Administrators.", styles["Bullet"]))
    story.append(Paragraph("• Implemented real-time location and status notifications using <b>Laravel Reverb (WebSockets)</b> for active delivery tracking and order-scoped direct chat.", styles["Bullet"]))
    story.append(Paragraph("• Secured API communication using Laravel Sanctum multi-auth tokens and verified mobile builds on EAS (Expo Application Services).", styles["Bullet"]))
    story.append(Spacer(1, 6))

    # Project 2: DevStash
    p2_header = [
        [Paragraph("<b>DevStash | Developer Resource Management Platform</b>", styles["SubHeading"]), Paragraph("Full-Stack Web App", styles["DateRight"])]
    ]
    t_p2 = Table(p2_header, colWidths=[380, 142])
    t_p2.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p2)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<i>Technologies: Next.js (App Router), React, TypeScript, Tailwind CSS, Drizzle ORM, Neon Postgres, Auth.js</i>", styles["Body"]))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Developed a developer resource management platform for saving, tagging, and categorizing useful technical links and documentation.", styles["Bullet"]))
    story.append(Paragraph("• Used <b>Drizzle ORM</b> to define relational tables and execute database queries on a serverless <b>Neon PostgreSQL</b> instance.", styles["Bullet"]))
    story.append(Paragraph("• Implemented public guest access modes alongside private authenticated personal libraries with OAuth integration.", styles["Bullet"]))

    # ================= PAGE 2 =================
    story.append(PageBreak())
    story.append(Spacer(1, 12))  # Below running header

    # Project 3: FinanEase
    story.append(Paragraph("SELECTED PROJECTS (CONTINUED)", styles["SectionHeading"]))
    story.append(Spacer(1, 4))

    p3_header = [
        [Paragraph("<b>FinanEase | Personal Finance & Budget Management System</b>", styles["SubHeading"]), Paragraph("Full-Stack Web App", styles["DateRight"])]
    ]
    t_p3 = Table(p3_header, colWidths=[380, 142])
    t_p3.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p3)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<i>Technologies: React, TypeScript, Vite, Tailwind CSS, Recharts, PHP, Laravel, Sanctum, SQL</i>", styles["Body"]))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Built a responsive personal budget management system featuring income/expense analytics, budget planning thresholds, and transaction ledgers.", styles["Bullet"]))
    story.append(Paragraph("• Implemented a decoupled backend REST API on Laravel with token-based authentication deployed on Render.", styles["Bullet"]))
    story.append(Paragraph("• Visualized monthly spending habits and cash-flow breakdowns with interactive charts using Recharts.", styles["Bullet"]))
    story.append(Spacer(1, 6))

    # Project 4: GIMATA
    p4_header = [
        [Paragraph("<b>GIMATA | Fisheries Data Visualization Application & PWA</b>", styles["SubHeading"]), Paragraph("Web Application / PWA", styles["DateRight"])]
    ]
    t_p4 = Table(p4_header, colWidths=[380, 142])
    t_p4.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p4)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<i>Technologies: React, TypeScript, Tailwind CSS, Leaflet, Recharts, Zustand, Vite, PWA</i>", styles["Body"]))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Transformed coastal survey catch records from Bulan, Sorsogon into an interactive geospatial data visualization platform with Leaflet.", styles["Bullet"]))
    story.append(Paragraph("• Implemented species and seasonal filters, ecological summaries, and offline-ready installable Progressive Web App (PWA) capabilities.", styles["Bullet"]))
    story.append(Spacer(1, 6))

    # Project 5: UNLABEL
    p5_header = [
        [Paragraph("<b>UNLABEL | Interactive Educational Website</b>", styles["SubHeading"]), Paragraph("Interactive Web Experience", styles["DateRight"])]
    ]
    t_p5 = Table(p5_header, colWidths=[380, 142])
    t_p5.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p5)
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<i>Technologies: Next.js, React, TypeScript, Tailwind CSS, Three.js, GSAP, Motion</i>", styles["Body"]))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Designed an educational storytelling website exploring gender stereotypes through interactive quiz challenges, data visualizer, and pledge generator.", styles["Bullet"]))
    story.append(Paragraph("• Leveraged Three.js and GSAP for performance-optimized hardware-accelerated animations and interactive visual components.", styles["Bullet"]))
    story.append(Spacer(1, 9))

    # 6. Certifications & Trainings (Placeholders)
    story.append(Paragraph("CERTIFICATIONS & CONTINUING EDUCATION", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))

    cert_rows = [
        [
            Paragraph("<b>[Course / Certification Name 1]</b> — <i>[e.g., Meta Front-End Developer / DICT Web Development]</i>", styles["SubHeading"]),
            Paragraph("<i>[e.g., 2026]</i>", styles["Placeholder"]),
        ],
        [
            Paragraph("Issuing Organization: <i>[e.g., Coursera / DICT / freeCodeCamp / Cisco NetAcad]</i> · Credential ID: <i>[Optional / Insert ID]</i>", styles["Placeholder"]),
            Paragraph("", styles["Body"]),
        ],
        [
            Paragraph("<b>[Course / Certification Name 2]</b> — <i>[e.g., Responsive Web Design / Full-Stack Open]</i>", styles["SubHeading"]),
            Paragraph("<i>[e.g., 2025]</i>", styles["Placeholder"]),
        ],
        [
            Paragraph("Issuing Organization: <i>[e.g., freeCodeCamp / Udemy / LinkedIn Learning]</i>", styles["Placeholder"]),
            Paragraph("", styles["Body"]),
        ],
    ]
    t_certs = Table(cert_rows, colWidths=[420, 102])
    t_certs.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_certs)
    story.append(Spacer(1, 9))

    # 7. Seminars, Workshops & Tech Events (Placeholders)
    story.append(Paragraph("SEMINARS, WORKSHOPS & CONFERENCES", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))

    seminar_rows = [
        [
            Paragraph("• <b>[Seminar / Workshop Title 1]</b> — <i>[Topic / e.g., Cloud Computing & Modern Backend Architecture]</i>", styles["Bullet"]),
            Paragraph("<i>[e.g., Nov 2025]</i>", styles["Placeholder"]),
        ],
        [
            Paragraph("  Organizer: <i>[e.g., GDG / Campus IT Summit / Sorsogon State University]</i> · <i>[Location / Online]</i>", styles["Placeholder"]),
            Paragraph("", styles["Body"]),
        ],
        [
            Paragraph("• <b>[Seminar / Workshop Title 2]</b> — <i>[Topic / e.g., Cybersecurity Fundamentals & Web App Security]</i>", styles["Bullet"]),
            Paragraph("<i>[e.g., May 2025]</i>", styles["Placeholder"]),
        ],
        [
            Paragraph("  Organizer: <i>[e.g., DICT Region V / University College of Information and Communications Technology]</i>", styles["Placeholder"]),
            Paragraph("", styles["Body"]),
        ],
    ]
    t_seminars = Table(seminar_rows, colWidths=[420, 102])
    t_seminars.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_seminars)
    story.append(Spacer(1, 9))

    # 8. Organizations & Extracurricular Leadership
    story.append(Paragraph("ORGANIZATIONS & LEADERSHIP", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))

    org_rows = [
        [
            Paragraph("• <b>[Organization Name 1]</b> — <i>[e.g., Junior Philippine Computer Society (JPCS) / Campus IT Society]</i>", styles["Bullet"]),
            Paragraph("<i>[e.g., 2023 – Present]</i>", styles["Placeholder"]),
        ],
        [
            Paragraph("  Role: <i>[e.g., Active Member / Committee Member / Technical Team]</i> · Sorsogon State University", styles["Placeholder"]),
            Paragraph("", styles["Body"]),
        ],
    ]
    t_orgs = Table(org_rows, colWidths=[420, 102])
    t_orgs.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_orgs)
    story.append(Spacer(1, 9))

    # 9. Character References
    story.append(Paragraph("CHARACTER REFERENCES", styles["SectionHeading"]))
    story.append(Spacer(1, 3.5))

    ref_rows = [
        [
            Paragraph("<b>[Professor / Faculty Name 1]</b><br/><i>[Academic Title, e.g., Instructor / Program Chairperson]</i><br/>Sorsogon State University – Bulan Campus<br/>Email: <i>[faculty.email@sorsu.edu.ph]</i>", styles["Placeholder"]),
            Paragraph("<b>[Professor / Faculty Name 2]</b><br/><i>[Academic Title, e.g., Capstone Adviser / IT Faculty]</i><br/>Sorsogon State University – Bulan Campus<br/>Email: <i>[faculty.email@sorsu.edu.ph]</i>", styles["Placeholder"]),
        ]
    ]
    t_refs = Table(ref_rows, colWidths=[261, 261])
    t_refs.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_refs)
    story.append(Spacer(1, 2))
    story.append(Paragraph("<i>Professional and academic references are also available upon request.</i>", styles["Body"]))

    doc.build(story, canvasmaker=NumberedCanvas)

if __name__ == "__main__":
    out_path = os.path.join(os.path.dirname(__file__), "..", "public", "cv.pdf")
    build_cv(out_path)
    print("Generated CV layout at:", out_path)
