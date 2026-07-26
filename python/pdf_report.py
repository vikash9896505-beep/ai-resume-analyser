from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime
import os

def create_pdf_report(filename, ats_score, job_match, skills, missing_skills, suggestions):

    # reports folder create karo agar nahi hai
    if not os.path.exists("reports"):
        os.makedirs("reports")

    pdf_path = f"reports/{filename}.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>AI Resume Analyser Report</b>", styles["Title"]))

    story.append(Paragraph(f"Date : {datetime.now()}", styles["Normal"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph(f"<b>Resume :</b> {filename}", styles["Heading2"]))

    story.append(Paragraph(f"<b>ATS Score :</b> {ats_score}/100", styles["Normal"]))

    story.append(Paragraph(f"<b>Job Match :</b> {job_match}%", styles["Normal"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph("<b>Skills</b>", styles["Heading2"]))

    for skill in skills:
        story.append(Paragraph("• " + skill, styles["Normal"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph("<b>Missing Skills</b>", styles["Heading2"]))

    for skill in missing_skills:
        story.append(Paragraph("• " + skill, styles["Normal"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph("<b>Suggestions</b>", styles["Heading2"]))

    for item in suggestions:
        story.append(Paragraph("• " + item, styles["Normal"]))

    doc.build(story)

    return pdf_path