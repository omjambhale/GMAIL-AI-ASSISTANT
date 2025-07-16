from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from openai import OpenAI
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Validate API key on startup
if not os.getenv("OPENAI_API_KEY"):
    logger.error("OPENAI_API_KEY not found in environment variables")
    raise ValueError("OPENAI_API_KEY is required")

# Initialize FastAPI
app = FastAPI()

# Configure CORS - specifically for Chrome extensions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://*", "http://localhost:*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class ReplyRequest(BaseModel):
    email_content: str
    user_context: str
    tone: str = "professional"

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "Gmail AI Assistant"}

@app.post("/api/generate-reply")
async def generate_reply(request: ReplyRequest):
    try:
        logger.info(f"Generating reply with tone: {request.tone}")
        
        # Tone-specific system prompts
        tone_prompts = {
            "professional": "You are a professional email assistant. Write formal, clear, and respectful responses.",
            "friendly": "You are a friendly email assistant. Write warm, conversational, and approachable responses.",
            "brief": "You are a concise email assistant. Write short, direct responses that get to the point."
        }
        
        # Construct the prompt
        system_prompt = tone_prompts.get(request.tone, tone_prompts["professional"])
        user_prompt = f"""Original email context: {request.email_content}

User wants to say: {request.user_context}

Write a complete email reply based on what the user wants to say, matching the requested tone."""

        # Call OpenAI API (v1.0+ syntax)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        reply_text = response.choices[0].message.content
        logger.info("Reply generated successfully")
        
        return {"reply": reply_text, "success": True}
        
    except Exception as e:
        logger.error(f"Error generating reply: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate reply: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Gmail AI Assistant backend on port 8000")
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="info")