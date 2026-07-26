SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Machine Learning",
    "Data Structures",
    "FastAPI",
    "Flask",
    "Django",
    "Bootstrap",
    "Tailwind CSS",
    "REST API"
]


def extract_skills(text):

    found = []

    text = text.lower()

    for skill in SKILLS:
        if skill.lower() in text:
            found.append(skill)

    return sorted(list(set(found)))


def missing_skills(found_skills):

    missing = []

    for skill in SKILLS:
        if skill not in found_skills:
            missing.append(skill)

    return missing