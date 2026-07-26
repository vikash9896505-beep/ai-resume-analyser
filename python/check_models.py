import google.generativeai as genai

genai.configure(api_key="AQ.Ab8RN6LsXFKjpdF6NC3ROB8b1L3ymlNTIDUHWTMHD48ZesGfjA")

for model in genai.list_models():
    print(model.name)
    print(model.supported_generation_methods)
    print("------------------")