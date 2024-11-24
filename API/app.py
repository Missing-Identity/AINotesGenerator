# fastapi_app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class TextRequest(BaseModel):
    text: str

@app.post("/process-text/")
def process_text(request: TextRequest):
    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""Analyze and transform the following text into a comprehensive markdown document with two main sections:

SECTION 1 - CONTENT ANALYSIS
- Start with a brief executive summary (2-3 sentences)
- Create an introduction that sets the context
- Transform the content into detailed bullet points with:
  * Clear hierarchy and organization
  * Examples and elaboration where relevant
  * Logical grouping of related concepts
- End with a concise conclusion of key takeaways

SECTION 2 - VISUAL REPRESENTATION
- Create 2-4 markdown tables that:
  * Categorize and compare key points from Section 1
  * Show relationships and patterns in the data
  * Include relevant metrics where possible
  * Serve as quick-reference summaries
  * Use clear headers and organized columns

Use proper markdown syntax including ##, ###, -, *, and | for tables.
Each table should provide unique insights and complement the narrative.

Text to analyze:
{request.text}"""

        result = model.generate_content(prompt)
        return {"markdown": result.text}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

# Optional: Add a simple health check endpoint
@app.get("/")
async def root():
    return {"status": "API is running"}
