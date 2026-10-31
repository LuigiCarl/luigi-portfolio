import os
import sys
import argparse
from PIL import Image as PILImage
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Flowable,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.pdfgen import canvas

# Palette
COLOR_TITLE = colors.Color(0.094118, 0.094118, 0.105882)       # #18181b
COLOR_SUBTITLE = colors.Color(0.321569, 0.321569, 0.356863)    # #52525b
COLOR_SECTION = colors.Color(0.298039, 0.113725, 0.584314)     # #4c1d95 (accent violet)
COLOR_BODY = colors.Color(0.152941, 0.152941, 0.164706)        # #27272a
COLOR_MUTED = colors.Color(0.247059, 0.247059, 0.27451)        # #3f3f46
COLOR_RULE = colors.Color(0.85, 0.85, 0.88)                    # #d9d9e0
COLOR_FOOTER_TEXT = colors.Color(0.443137, 0.443137, 0.478431) # #71717a

# 2x2 inch dimension in points (1 inch = 72 pt)
PHOTO_2X2_WIDTH = 144
PHOTO_2X2_HEIGHT = 144


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


class PhotoBox(Flowable):
    """
    Standard 2x2 inch ID Photo component (144 pt x 144 pt).
    - If a valid photo path is supplied, it center-crops and renders the photo cleanly.
    - If no photo is supplied, it renders a professional 2x2 placeholder box with
      dashed guidelines, silhouette, and text for printing or physical pasting.
    """
    def __init__(self, photo_path=None, width=PHOTO_2X2_WIDTH, height=PHOTO_2X2_HEIGHT):
        super().__init__()
        self.photo_path = photo_path
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        canv = self.canv
        canv.saveState()

        has_image = False
        if self.photo_path and os.path.isfile(self.photo_path):
            try:
                with PILImage.open(self.photo_path) as img:
                    img_w, img_h = img.size

                scale = max(self.width / img_w, self.height / img_h)
                scaled_w = img_w * scale
                scaled_h = img_h * scale
                offset_x = (self.width - scaled_w) / 2
                # In ReportLab, (0, 0) is bottom-left. For portrait orientation (excess height),
                # bias towards the top so hair/head is preserved with natural headroom.
                if scaled_h > self.height:
                    offset_y = -(scaled_h - self.height) * 0.75
                else:
                    offset_y = (self.height - scaled_h) / 2

                clip_path = canv.beginPath()
                clip_path.rect(0, 0, self.width, self.height)
                canv.clipPath(clip_path, stroke=0, fill=0)

                canv.drawImage(
                    self.photo_path,
                    offset_x,
                    offset_y,
                    width=scaled_w,
                    height=scaled_h,
                    mask="auto",
                )
                has_image = True
            except Exception as e:
                print(f"[Warning] Failed to render photo at {self.photo_path}: {e}")
                has_image = False

        if has_image:
            canv.restoreState()
            canv.saveState()
            canv.setStrokeColor(COLOR_RULE)
            canv.setLineWidth(0.8)
            canv.rect(0, 0, self.width, self.height, fill=0, stroke=1)
            canv.restoreState()
        else:
            # Subtle background fill
            canv.setFillColor(colors.HexColor("#f8fafc"))
            canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

            # Dashed 2x2 boundary
            canv.setStrokeColor(colors.HexColor("#94a3b8"))
            canv.setLineWidth(0.8)
            canv.setDash(3, 3)
            canv.rect(0, 0, self.width, self.height, fill=0, stroke=1)

            # Inner alignment guide
            canv.setDash([])
            canv.setStrokeColor(colors.HexColor("#e2e8f0"))
            canv.setLineWidth(0.5)
            canv.rect(3, 3, self.width - 6, self.height - 6, fill=0, stroke=1)

            # Avatar silhouette
            cx = self.width / 2
            cy = self.height / 2 + 18
            canv.setFillColor(colors.HexColor("#cbd5e1"))
            canv.circle(cx, cy + 4, 11, fill=1, stroke=0)
            
            p = canv.beginPath()
            p.arc(cx - 18, cy - 18, cx + 18, cy + 4, 0, 180)
            p.lineTo(cx + 18, cy - 8)
            p.lineTo(cx - 18, cy - 8)
            p.close()
            canv.drawPath(p, fill=1, stroke=0)

            # Professional labels
            canv.setFont("Helvetica-Bold", 9.5)
            canv.setFillColor(COLOR_SECTION)
            canv.drawCentredString(cx, self.height / 2 - 12, "2 x 2")

            canv.setFont("Helvetica-Bold", 8)
            canv.setFillColor(COLOR_TITLE)
            canv.drawCentredString(cx, self.height / 2 - 24, "ID PHOTO")

            canv.setFont("Helvetica", 6.8)
            canv.setFillColor(COLOR_SUBTITLE)
            canv.drawCentredString(cx, self.height / 2 - 35, "Attach / Paste Here")

            canv.restoreState()


def find_default_photo():
    """
    Searches for an existing ID photo in public/ or scripts/ directories.
    Supported file names: id-photo, id_photo, 2x2, profile, avatar (.png, .jpg, .jpeg).
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(base_dir, ".."))
    
    env_photo = os.environ.get("CV_PHOTO") or os.environ.get("ID_PHOTO")
    if env_photo and os.path.isfile(env_photo):
        return env_photo

    search_dirs = [
        os.path.join(project_root, "public"),
        base_dir,
        project_root,
    ]
    candidate_names = [
        "id-photo.png", "id-photo.jpg", "id-photo.jpeg",
        "id_photo.png", "id_photo.jpg", "id_photo.jpeg",
        "2x2.png", "2x2.jpg", "2x2.jpeg",
        "profile.png", "profile.jpg", "profile.jpeg",
        "avatar.png", "avatar.jpg", "avatar.jpeg",
    ]

    for d in search_dirs:
        for name in candidate_names:
            path = os.path.join(d, name)
            if os.path.isfile(path):
                return path

    return None


def build_cv(filename, photo_path=None, enable_photo=True):
    # Standard Letter Size: 612 x 792 pt
    # Margins: 38pt left/right, 30pt top, 36pt bottom -> 536pt width, 726pt usable height
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=38,
        rightMargin=38,
        topMargin=30,
        bottomMargin=36,
        title="Luigi Carl Brezuela - Curriculum Vitae",
        author="Luigi Carl Brezuela",
        subject="Curriculum Vitae",
        creator="Luigi Carl Brezuela",
    )

    styles = {
        "Name": ParagraphStyle(
            "Name",
            fontName="Helvetica-Bold",
            fontSize=18.5,
            leading=21.5,
            textColor=COLOR_TITLE,
            alignment=TA_LEFT if enable_photo else TA_CENTER,
        ),
        "Title": ParagraphStyle(
            "Title",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11.0,
            textColor=COLOR_SECTION,
            alignment=TA_LEFT if enable_photo else TA_CENTER,
        ),
        "Contact": ParagraphStyle(
            "Contact",
            fontName="Helvetica",
            fontSize=8.0,
            leading=10.8,
            textColor=COLOR_SUBTITLE,
            alignment=TA_LEFT if enable_photo else TA_CENTER,
        ),
        "SecHeadLeft": ParagraphStyle(
            "SecHeadLeft",
            fontName="Helvetica-Bold",
            fontSize=9.0,
            leading=11.5,
            textColor=COLOR_SECTION,
        ),
        "ProfileBody": ParagraphStyle(
            "ProfileBody",
            fontName="Helvetica",
            fontSize=8.0,
            leading=11.0,
            textColor=COLOR_BODY,
        ),
        "SectionHeading": ParagraphStyle(
            "SectionHeading",
            fontName="Helvetica-Bold",
            fontSize=9.4,
            leading=12.0,
            textColor=COLOR_SECTION,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "SubHeading": ParagraphStyle(
            "SubHeading",
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.2,
            textColor=COLOR_TITLE,
        ),
        "BadgeRight": ParagraphStyle(
            "BadgeRight",
            fontName="Helvetica",
            fontSize=8.0,
            leading=11.2,
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
            fontSize=8.1,
            leading=11.0,
            textColor=COLOR_MUTED,
            leftIndent=10,
            firstLineIndent=-10,
        ),
        "TechStack": ParagraphStyle(
            "TechStack",
            fontName="Helvetica-Oblique",
            fontSize=7.8,
            leading=10.2,
            textColor=COLOR_SUBTITLE,
        ),
        "SkillLabel": ParagraphStyle(
            "SkillLabel",
            fontName="Helvetica-Bold",
            fontSize=8.3,
            leading=11.2,
            textColor=COLOR_MUTED,
        ),
        "SkillValue": ParagraphStyle(
            "SkillValue",
            fontName="Helvetica",
            fontSize=8.3,
            leading=11.2,
            textColor=COLOR_BODY,
        ),
    }

    story = []

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
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.0),
            ("LINEBELOW", (0, 0), (-1, -1), 0.8, COLOR_RULE),
        ]))
        return t

    profile_text = (
        "Fourth-year Bachelor of Science in Information Technology (BSIT) student at Sorsogon State University – Bulan Campus "
        "with hands-on project experience in web and mobile application development. Proficient in TypeScript, React, React Native, "
        "Next.js, and Laravel REST APIs with MySQL and PostgreSQL databases. Seeking a Software Development Internship to "
        "contribute to production software, collaborate in team engineering workflows, and strengthen software engineering fundamentals."
    )

    # Resolve photo if not explicitly provided
    resolved_photo = photo_path if photo_path else find_default_photo()

    if enable_photo:
        # Side-by-side header: Contact details & Profile on left, 2x2 ID Photo on right
        left_elements = [
            Paragraph("LUIGI CARL BREZUELA", styles["Name"]),
            Spacer(1, 2.5),
            Paragraph("CURRICULUM VITAE  •  BSIT STUDENT  •  ASPIRING FULL-STACK DEVELOPER", styles["Title"]),
            Spacer(1, 3.5),
            Paragraph(
                "Bulan, Sorsogon, Philippines  •  "
                "<a href='mailto:luigi.brezuela@sorsu.edu.ph' color='#4c1d95'><u>luigi.brezuela@sorsu.edu.ph</u></a>  •  "
                "<a href='tel:+639942868565' color='#3f3f46'>+63 994 286 8565</a>",
                styles["Contact"]
            ),
            Spacer(1, 2.0),
            Paragraph(
                "<a href='https://portfolio.luigicarl.tech' color='#4c1d95'><u>portfolio.luigicarl.tech</u></a>  •  "
                "<a href='https://github.com/LuigiCarl' color='#4c1d95'><u>github.com/LuigiCarl</u></a>  •  "
                "<a href='https://linkedin.com/in/luigi-carl-brezuela-317825445' color='#4c1d95'><u>linkedin.com/in/luigi-carl-brezuela-317825445</u></a>",
                styles["Contact"]
            ),
            Spacer(1, 5.0),
            Paragraph("ACADEMIC &amp; PROFESSIONAL PROFILE", styles["SecHeadLeft"]),
            Spacer(1, 2.5),
            Paragraph(profile_text, styles["ProfileBody"]),
        ]

        top_table = Table([[left_elements, PhotoBox(photo_path=resolved_photo, width=PHOTO_2X2_WIDTH, height=PHOTO_2X2_HEIGHT)]], colWidths=[380, 156])
        top_table.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(top_table)
        story.append(Spacer(1, 8.5))
    else:
        # Classic centered header (without photo slot)
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
        story.append(Spacer(1, 10))
        story.append(make_section_header("ACADEMIC &amp; PROFESSIONAL PROFILE"))
        story.append(Spacer(1, 4.5))
        story.append(Paragraph(profile_text, styles["Body"]))
        story.append(Spacer(1, 10))

    # Technical Skills
    story.append(make_section_header("TECHNICAL SKILLS &amp; TOOLS"))
    story.append(Spacer(1, 4.0))
    skills_data = [
        [Paragraph("Languages", styles["SkillLabel"]), Paragraph("TypeScript, JavaScript, PHP, SQL, HTML5, CSS3", styles["SkillValue"])],
        [Paragraph("Frontend & Mobile", styles["SkillLabel"]), Paragraph("React, React Native (Expo), Next.js, Tailwind CSS", styles["SkillValue"])],
        [Paragraph("Backend & APIs", styles["SkillLabel"]), Paragraph("PHP, Laravel, RESTful APIs", styles["SkillValue"])],
        [Paragraph("Databases & Tools", styles["SkillLabel"]), Paragraph("MySQL, PostgreSQL, Git, GitHub, VS Code, Vercel", styles["SkillValue"])],
    ]
    t_skills = Table(skills_data, colWidths=[115, 421])
    t_skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 8.5))

    # Projects
    story.append(make_section_header("TECHNICAL PROJECTS &amp; ACADEMIC PORTFOLIO"))
    story.append(Spacer(1, 4.5))

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

    projects = [
        (
            "<a href='https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357' color='#18181b'><b>Labada</b></a> — Laundry Service & Delivery Platform",
            "Capstone · Mobile App  <a href='https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357' color='#4c1d95'><u>[EAS Build]</u></a>",
            "Technologies: React Native, Expo, TypeScript, PHP, Laravel, MySQL",
            [
                "• Built a cross-platform mobile application supporting 4 user roles (Customers, Shop Owners, Delivery Riders, Administrators).",
                "• Implemented real-time order tracking, delivery status updates, and in-app chat for active orders; verified EAS builds.",
            ]
        ),
        (
            "<a href='https://devstash-gamma-hazel.vercel.app/' color='#18181b'><b>DevStash</b></a> — Developer Resource Management Platform",
            "Web App  <a href='https://devstash-gamma-hazel.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/devstash' color='#4c1d95'><u>[GitHub]</u></a>",
            "Technologies: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL",
            [
                "• Developed a developer bookmarking system to organize, tag, and search technical links with public guest and private user libraries.",
                "• Designed database tables and implemented OAuth authentication for secure user logins.",
            ]
        ),
        (
            "<a href='https://frontend-budget-tracker.vercel.app/' color='#18181b'><b>FinanEase</b></a> — Personal Finance & Budget Management System",
            "Web App  <a href='https://frontend-budget-tracker.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/FinanEase' color='#4c1d95'><u>[GitHub]</u></a>",
            "Technologies: React, TypeScript, Tailwind CSS, PHP, Laravel, MySQL",
            [
                "• Created a responsive budget tracking dashboard featuring income and expense logging, category budgets, and spending charts.",
                "• Built and integrated a decoupled Laravel RESTful API backend to securely manage financial records and user transactions.",
            ]
        ),
        (
            "<a href='https://klinika-web.onrender.com' color='#18181b'><b>Klinika</b></a> — Healthcare Appointment & Clinic Operations Engine",
            "Web App  <a href='https://klinika-web.onrender.com' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/klinika-web' color='#4c1d95'><u>[GitHub]</u></a>",
            "Technologies: PHP, Laravel, Livewire, PostgreSQL, Docker, Tailwind CSS",
            [
                "• Engineered a concurrency-safe booking engine with atomic slot reservations using PostgreSQL row-level locks.",
                "• Built an executive clinic KPI analytics dashboard tracking doctor utilization, specialty demand, and queue triage.",
            ]
        ),
        (
            "<a href='https://unlabel-dusky.vercel.app/' color='#18181b'><b>UNLABEL</b></a> — Interactive Educational Website",
            "Interactive Web  <a href='https://unlabel-dusky.vercel.app/' color='#4c1d95'><u>[Live]</u></a>  <a href='https://github.com/LuigiCarl/Unlabel' color='#4c1d95'><u>[GitHub]</u></a>",
            "Technologies: Next.js, React, TypeScript, Tailwind CSS",
            [
                "• Designed an interactive educational website exploring gender stereotypes through visual storytelling, quizzes, and a pledge generator.",
                "• Built responsive UI components and smooth web animations for an engaging learning experience.",
            ]
        ),
    ]

    for title, badge, tech, bullets in projects:
        story.append(make_project_header(title, badge))
        story.append(Spacer(1, 1.8))
        story.append(Paragraph(tech, styles["TechStack"]))
        story.append(Spacer(1, 2.0))
        for b in bullets:
            story.append(Paragraph(b, styles["Bullet"]))
            story.append(Spacer(1, 1.0))
        story.append(Spacer(1, 7.0))

    # Education
    story.append(make_section_header("EDUCATION"))
    story.append(Spacer(1, 4.0))
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
        ("TOPPADDING", (0, 0), (-1, -1), 2.0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 3.5))
    story.append(Paragraph(
        "<b>Relevant Coursework:</b> Data Structures &amp; Algorithms, Database Management Systems, Web Systems &amp; Technologies, "
        "Mobile Application Development, Software Engineering, Object-Oriented Programming",
        styles["Bullet"]
    ))

    doc.build(story, canvasmaker=SinglePageCVCanvas)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate 1-page CV/Resume with 2x2 ID Photo support.")
    parser.add_argument("--photo", type=str, default=None, help="Path to 2x2 photo file (PNG/JPG).")
    parser.add_argument("--no-photo", action="store_true", help="Generate classic CV layout without 2x2 photo slot.")
    parser.add_argument("--output", type=str, default=None, help="Custom output PDF path.")
    args = parser.parse_args()

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    out_cv = os.path.join(project_root, "public", "cv.pdf")
    out_resume = os.path.join(project_root, "public", "resume.pdf")

    enable_photo = not args.no_photo
    resolved_photo = args.photo if args.photo else find_default_photo()

    if args.output:
        build_cv(args.output, photo_path=resolved_photo, enable_photo=enable_photo)
        print(f"Generated CV at: {args.output}")
    else:
        build_cv(out_cv, photo_path=resolved_photo, enable_photo=enable_photo)
        build_cv(out_resume, photo_path=resolved_photo, enable_photo=enable_photo)
        status = "with custom photo" if resolved_photo else "with 2x2 ID placeholder slot"
        if not enable_photo:
            status = "without photo slot (classic layout)"
        print(f"Generated 1-page CV & Resume successfully ({status})!")
