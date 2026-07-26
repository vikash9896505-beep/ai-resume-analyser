def calculate_ats_score(text, skills):

    score = 0

    # Resume Length
    if len(text) > 500:
        score += 20

    # Skills Score
    score += min(len(skills) * 5, 40)

    # Important Sections
    sections = [
        "education",
        "skills",
        "project",
        "experience",
        "certification"
    ]

    for section in sections:
        if section.lower() in text.lower():
            score += 8

    return min(score, 100)