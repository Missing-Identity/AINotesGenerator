from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama
from dotenv import load_dotenv
import os
# Load environment variables
load_dotenv()
# Initialize FastAPI app
app = FastAPI()
class TextRequest(BaseModel):
   text: str

@app.post("/process-text/")
def process_text(request: TextRequest):
   try:
       # Create the prompt with the same structure as before
       prompt = f"""Analyze and transform the following text into a comprehensive markdown document with two main sections:
SECTION 1 - CONTENT ANALYSIS
 Start with a brief executive summary (2-3 sentences)
 Create an introduction that sets the context
 Transform the content into detailed bullet points with:
 * Clear hierarchy and organization
 * Examples and elaboration where relevant
 * Logical grouping of related concepts
 End with a concise conclusion of key takeaways
SECTION 2 - VISUAL REPRESENTATION
 Create 2-4 markdown tables that:
 * Categorize and compare key points from Section 1
 * Show relationships and patterns in the data
 * Include relevant metrics where possible
 * Serve as quick-reference summaries
 * Use clear headers and organized columns
Use proper markdown syntax including ##, ###, -, *, and | for tables.
ach table should provide unique insights and complement the narrative.
Text to analyze:
{request.text}"""
        # Use Ollama to generate the response
       response = ollama.chat(
           model='llama3.2',  # You can change this to any model you have installed
           messages=[{
               'role': 'user',
               'content': prompt,
               'options': {
                   'temperature': 0.0,
                   'seed': 42
               }
           }]
       )
        # Return the generated markdown
       return {"markdown": response['message']['content']}
   
   except Exception as error:
       raise HTTPException(status_code=500, detail=str(error))
# Optional: Add a simple health check endpoint
@app.get("/")
def root():
   return {"status": "API is running"}