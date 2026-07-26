job_keywords = [
    "python",
    "html",
    "css",
    "javascript",
    "react",
    "node",
    "mongodb",
    "mysql",
    "fastapi",
    "git",
    "github",
    "docker"
]

def calculate_job_match(text):

    text = text.lower()

    found = 0

    for skill in job_keywords:
        if skill in text:
            found += 1

    score = int((found / len(job_keywords)) * 100)

    return score