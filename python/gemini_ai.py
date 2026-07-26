from google import genai

# Apni NEW API key yahan lagao
client = genai.Client(api_key="AQ.Ab8RN6J_T9v5GZhRif9LBp2GPsbbs6rqnbk272lyg7P3FiVixA")


def analyse_resume(text):

    prompt = f"""
You are an ATS Resume Expert.

Analyze the following resume.

Give your response in simple English.

Resume:
{text}

Return the result in this format:

Resume Summary:
(2-3 lines)

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Suggestions:
- Point 1
- Point 2
- Point 3

Interview Tips:
- Point 1
- Point 2
"""

    try:
        response = client.models.generate_content(
    model="gemini-2.0-flash-lite-001",
    contents=prompt

        )

        return response.text

    except Exception as e:
        return f"Error: {e}"