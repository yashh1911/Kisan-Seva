import os
import time
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load environment variables FIRST
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use ONE model consistently
model = genai.GenerativeModel("gemini-2.5-flash")

# 🔁 Retry logic (for rate limits)
def generate_with_retry(prompt, retries=3, wait=5):
    for attempt in range(retries):
        try:
            response = model.generate_content(prompt)
            return response.text if response else "No response generated"
        except Exception as e:
            if "429" in str(e) and attempt < retries - 1:
                print(f"Rate limited. Retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise e


# 🌱 Diagnose Crop (image-based)
async def diagnose_crop(image_bytes: bytes, mime_type: str, language: str = "English") -> dict:
    prompt = f"""
You are an expert agronomist helping a small farmer in India.

Analyze the crop image and respond in {language}.

Return ONLY JSON:
{{
    "diseaseName": "",
    "confidence": 0,
    "severity": "",
    "description": "",
    "treatments": [],
    "preventions": []
}}
"""

    try:
        response = model.generate_content([
            {"mime_type": mime_type, "data": image_bytes},
            prompt
        ])

        text = response.text.strip()

        # Clean markdown
        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "")

        return json.loads(text)

    except Exception as e:
        print("Diagnose Error:", e)
        raise e


# 📊 Market Analysis
async def analyze_market(crop_name: str, market_data: dict, language: str = "English") -> dict:
    prompt = f"""
You are a market analyst helping a farmer.

Crop: {crop_name}
Market Data: {market_data}

Return ONLY JSON:
{{
    "priceRange": "",
    "bestMarket": "",
    "trend": "",
    "recommendation": ""
}}
"""

    try:
        text = generate_with_retry(prompt)

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "")

        return json.loads(text)

    except Exception as e:
        print("Market Error:", e)
        raise e


# 🌾 General Crop Query
async def general_query(question, language):
    prompt = f"""
You are an expert agricultural assistant.

STRICT RULES:
- Answer ONLY crop/farming related questions
- If unrelated → say:
  "Sorry, I can only help with crop and farming-related questions."

Answer in {language}.

Question: {question}
"""

    try:
        text = generate_with_retry(prompt)
        return text

    except Exception as e:
        print("Query Error:", e)
        raise e