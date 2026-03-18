"""
Environment configuration
Supports both Google Gemini and OpenAI APIs
"""
import os
from dotenv import load_dotenv

load_dotenv()

# API Keys (choose one provider)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# API Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))

# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# AI Provider Configuration
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini")  # Options: "gemini" or "openai"
IMAGE_PROVIDER = os.getenv("IMAGE_PROVIDER", "placeholder")  # Options: "dall-e" or "placeholder"

# Model Configuration
if AI_PROVIDER == "gemini":
    CONTENT_MODEL = os.getenv("CONTENT_MODEL", "gemini-2.5-flash")
else:
    CONTENT_MODEL = os.getenv("CONTENT_MODEL", "claude-3-5-sonnet-20241022")

IMAGE_MODEL = os.getenv("IMAGE_MODEL", "dall-e-3")
