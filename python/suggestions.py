def generate_suggestions(text, skills):

    suggestions = []

    if len(text) < 500:
        suggestions.append("Increase resume content.")

    if "project" not in text.lower():
        suggestions.append("Add Projects section.")

    if "experience" not in text.lower():
        suggestions.append("Add Internship or Experience.")

    if "certification" not in text.lower():
        suggestions.append("Add Certifications.")

    if "github" not in text.lower():
        suggestions.append("Add GitHub Profile.")

    if "linkedin" not in text.lower():
        suggestions.append("Add LinkedIn Profile.")

    if len(skills) < 5:
        suggestions.append("Add more technical skills.")

    return suggestions