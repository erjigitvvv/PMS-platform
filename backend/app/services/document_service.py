import os
import io
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

class DocumentGenerator:
    @staticmethod
    def generate_contract_docx(
        contract_number: str,
        student_name: str,
        university_name: str,
        company_name: str,
        director_name: str,
        start_date: str,
        end_date: str,
        output_path: str
    ) -> str:
        doc = Document()

        # Title
        title_p = doc.add_paragraph()
        title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = title_p.add_run(f"UCH TOMONLAMA AMALIYOT SHARTNOMASI № {contract_number}\n")
        run.bold = True
        run.font.size = Pt(14)

        subtitle = title_p.add_run("(OTM, Korxona va Talaba o'rtasida)")
        subtitle.italic = True
        subtitle.font.size = Pt(11)

        doc.add_paragraph(f"Toshkent shahri                                                   \"{start_date}\" yil\n")

        p1 = doc.add_paragraph()
        p1.paragraph_format.first_line_indent = Inches(0.5)
        director_text = director_name if director_name else "Mas'ul rahbar"
        p1.add_run(
            f"Bir tomondan \"{university_name}\" (keyingi o'rinlarda OTM), ikkinchi tomondan \"{company_name}\" "
            f"(rahbari: {director_text}, keyingi o'rinlarda Korxona), va uchinchi tomondan "
            f"talaba {student_name} (keyingi o'rinlarda Amaliyotchi) quyidagilar haqida mazkur shartnomani tuzdilar:"
        )

        doc.add_heading("1. Shartnoma predmeti", level=2)
        p2 = doc.add_paragraph()
        p2.paragraph_format.first_line_indent = Inches(0.5)
        p2.add_run(
            f"Mazkur shartnomaga muvofiq Korxona talaba {student_name}ga {start_date}dan {end_date}gacha "
            f"belgilangan mutaxassislik bo'yicha amaliyot o'tash uchun tegishli ish joyi, shart-sharoit va malakali mentor biriktirish majburiyatini oladi."
        )

        doc.add_heading("2. Tomonlarning huquq va majburiyatlari", level=2)
        p3 = doc.add_paragraph()
        p3.add_run(
            "2.1. OTM talabani amaliyot dasturi, xavfsizlik texnikasi va zarur yo'llanma hujjatlari bilan ta'minlaydi.\n"
            "2.2. Korxona amaliyotchi talabani ichki mehnat tartib-qoidalari bilan tanishtiradi va kunlik nazorat olib boradi.\n"
            "2.3. Talaba korxonaning ichki tartib-qoidalariga qat'iy rioya etadi, amaliyot kundaligini o'z vaqtida elektron tizimda yuritadi."
        )

        doc.add_heading("3. Tomonlarning rekvizitlari va imzolari", level=2)
        table = doc.add_table(rows=2, cols=3)
        hdr_cells = table.rows[0].cells
        hdr_cells[0].text = "OTM Tomonidan:"
        hdr_cells[1].text = "Korxona Tomonidan:"
        hdr_cells[2].text = "Amaliyotchi Talaba:"

        row_cells = table.rows[1].cells
        row_cells[0].text = f"{university_name}\n\nImzo: _________\nM.O'."
        row_cells[1].text = f"{company_name}\n\nImzo: _________\nM.O'."
        row_cells[2].text = f"{student_name}\n\nImzo: _________"

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        doc.save(output_path)
        return output_path

    @staticmethod
    def generate_contract_pdf(
        contract_number: str,
        student_name: str,
        university_name: str,
        company_name: str,
        start_date: str,
        end_date: str,
        output_path: str
    ) -> str:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
        styles = getSampleStyleSheet()

        story = []
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontSize=14,
            leading=18,
            alignment=1, # Center
            spaceAfter=15
        )
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontSize=10,
            leading=14,
            alignment=4 # Justify
        )

        story.append(Paragraph(f"<b>UCH TOMONLAMA AMALIYOT SHARTNOMASI № {contract_number}</b>", title_style))
        story.append(Paragraph(f"Toshkent shahri &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sana: {start_date}", body_style))
        story.append(Spacer(1, 15))

        text = (
            f"Mazkur shartnoma <b>{university_name}</b> (OTM), <b>{company_name}</b> (Korxona) "
            f"va talaba <b>{student_name}</b> o'rtasida tuzildi. Talaba korxonada {start_date}dan {end_date}gacha "
            f"belgilangan amaliyot dasturi bo'yicha ishlab chiqarish amaliyotini o'taydi."
        )
        story.append(Paragraph(text, body_style))
        story.append(Spacer(1, 20))

        # Signatures table
        table_data = [
            ["OTM Mas'uli", "Korxona Rahbari", "Amaliyotchi Talaba"],
            [f"{university_name}\n\n(Imzo / Muhr)", f"{company_name}\n\n(Imzo / Muhr)", f"{student_name}\n\n(Imzo)"]
        ]
        t = Table(table_data, colWidths=[170, 170, 170])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor("#1e293b")),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,0), (-1,-1), 9),
            ('BOTTOMPADDING', (0,0), (-1,-1), 12),
            ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ]))
        story.append(t)

        doc.build(story)
        return output_path
