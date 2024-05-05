from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle,
    Flowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from PIL import Image as PILImage
from io import BytesIO
import datetime

from .models import Report


def get_report_by_id(report_id):
    try:
        report = Report.objects.get(id=report_id)
        return report
    except Report.DoesNotExist:
        return None


def get_reports_for_user(user):
    return user.reports.all()


class MCLine(Flowable):
    def __init__(self, width, height=0):
        Flowable.__init__(self)
        self.width = width
        self.height = height

    def draw(self):
        self.canv.line(0, self.height, self.width, self.height)


def generate_pdf(report):
    left_margin = right_margin = 1 * inch

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=left_margin,
        rightMargin=right_margin,
        topMargin=20,
        bottomMargin=20,
    )
    elements = []
    pil_image = PILImage.open(report.logo.path)

    aspect_ratio = pil_image.height / pil_image.width
    page_width, page_height = letter
    image_width = page_width * 0.25
    image_height = image_width * aspect_ratio
    usable_width = page_width - (left_margin + right_margin)

    styles = getSampleStyleSheet()
    left_body_text = ParagraphStyle(
        "CustomBodyText",
        parent=styles["BodyText"],
        fontSize=12,
        leading=15,
        alignment=TA_RIGHT,
    )
    left_header = ParagraphStyle(
        "CustomHeader",
        parent=styles["Heading1"],
        fontSize=14,
        leading=18,
        spaceAfter=12,
        alignment=TA_RIGHT,
    )

    custom_body_text = ParagraphStyle(
        "CustomBodyText", parent=styles["BodyText"], fontSize=12, leading=15
    )
    custom_header = ParagraphStyle(
        "CustomHeader",
        parent=styles["Heading1"],
        fontSize=14,
        leading=18,
        spaceAfter=12,
        alignment=TA_LEFT,
    )

    clinic_logo_img = Image(report.logo.path, width=image_width, height=image_height)

    column_width = usable_width / 2
    colWidths = [column_width] * 2

    header_table = Table(
        [
            [
                clinic_logo_img,
                [
                    Paragraph(report.clinic_name, left_header),
                    Paragraph(
                        f"Physician: {report.physician_name}<br/>Contact: {report.physician_contact}",
                        left_body_text,
                    ),
                ],
            ],
        ],
        colWidths=colWidths,
    )
    header_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (0, 0), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
            ]
        )
    )
    elements.append(header_table)

    line = MCLine(usable_width)

    elements.append(line)

    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Patient Details", styles["Heading2"]))
    header_table = Table(
        [
            [
                Paragraph("Name: ", custom_body_text),
                Paragraph(
                    f"{report.patient_first_name} {report.patient_last_name}",
                    custom_body_text,
                ),
            ],
            [
                Paragraph("Date of Birth: ", custom_body_text),
                Paragraph(str(report.patient_dob), custom_body_text),
            ],
            [
                Paragraph("Contact: ", custom_body_text),
                Paragraph(report.patient_contact, custom_body_text),
            ],
        ],
        colWidths=[90.0, 378.0],
    )

    elements.append(header_table)
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Chief Complaint:", styles["Heading2"]))
    elements.append(Paragraph(report.chief_complaint, custom_body_text))
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Consultation Notes:", styles["Heading2"]))
    elements.append(Paragraph(report.consultation_notes, custom_body_text))

    def draw_footer(canvas, doc):
        footer_text = f"This report was generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        canvas.saveState()
        canvas.setFont("Helvetica", 10)
        canvas.drawString(inch, 0.75 * 20, footer_text)
        canvas.restoreState()

    doc.build(elements, onFirstPage=draw_footer, onLaterPages=draw_footer)
    buffer.seek(0)
    return buffer
