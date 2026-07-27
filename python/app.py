from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import pdfplumber
import os

from auth import router as auth_router
from skills import extract_skills, missing_skills
from ats import calculate_ats_score
from suggestions import generate_suggestions
from job_match import calculate_job_match
from pdf_report import create_pdf_report

app = FastAPI()

app.include_router(auth_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create folders
os.makedirs("resumes", exist_ok=True)
os.makedirs("reports", exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "AI Resume Analyser Running Successfully"
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # Save Resume
    file_path = os.path.join("resumes", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read PDF
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    # Skills
    skills = extract_skills(text)

    # Missing Skills
    missing = missing_skills(skills)

    # Suggestions
    suggestions = generate_suggestions(text, skills)

    # ATS Score
    ats_score = calculate_ats_score(text, skills)

    # Job Match
    job_match = calculate_job_match(text)

    # Create PDF Report
    pdf_path = create_pdf_report(
        file.filename.replace(".pdf", ""),
        ats_score,
        job_match,
        skills,
        missing[:10],
        suggestions
    )

    print("\n========== API RESPONSE ==========")

    print({
        "filename": file.filename,
        "ats_score": ats_score,
        "skills": skills,
        "missing_skills": missing[:10],
        "suggestions": suggestions,
        "job_match": job_match,
        "pdf": os.path.basename(pdf_path)
    })

    print("=================================\n")

    return {
        "filename": file.filename,
        "ats_score": ats_score,
        "skills": skills,
        "missing_skills": missing[:10],
        "suggestions": suggestions,
        "job_match": job_match,
        "pdf": os.path.basename(pdf_path)
    }


# ==========================
# Download PDF Report
# ==========================

@app.get("/reports/{filename}")
def download_report(filename: str):

    file_path = os.path.join("reports", filename)

    if os.path.exists(file_path):

        return FileResponse(
            path=file_path,
            media_type="application/pdf",
            filename=filename
        )

    return {
        "error": "File not found"
    }