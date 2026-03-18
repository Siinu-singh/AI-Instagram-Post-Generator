"""
Models for Instagram Post Generator
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PostGenerationRequest(BaseModel):
    """Request model for generating a post"""
    topic: str = Field(..., description="Topic for the Instagram post")
    tone: str = Field(..., description="Tone of the post: 'professional' or 'casual'")

class PostContent(BaseModel):
    """Model for generated post content"""
    caption: str = Field(..., description="Generated caption (max 150 words)")
    hashtags: List[str] = Field(..., description="List of 5-10 hashtags")
    image_url: str = Field(..., description="URL of generated image")

class InstagramPreview(BaseModel):
    """Model for Instagram post preview"""
    id: str
    username: str = "ai_content_creator"
    avatar_url: str = "https://via.placeholder.com/40"
    timestamp: str
    caption: str
    image_url: str
    hashtags: List[str]
    likes: int = 0
    comments: int = 0
    shares: int = 0

class GeneratePostResponse(BaseModel):
    """Response model for /generate-post endpoint"""
    status: str
    draft_post: PostContent
    preview: InstagramPreview

class PostSubmissionRequest(BaseModel):
    """Request model for submitting a post"""
    draft_id: str = Field(..., description="ID of draft post to submit")

class PostSubmissionResponse(BaseModel):
    """Response model for /post endpoint"""
    status: str
    post_id: str
    message: str
    posted_at: str
    preview: InstagramPreview
