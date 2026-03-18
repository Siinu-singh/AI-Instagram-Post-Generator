"""
Main FastAPI Application for Instagram Post Generator
"""
import os
import uuid
from datetime import datetime
from typing import Dict, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio

from models import (
    PostGenerationRequest,
    GeneratePostResponse,
    PostSubmissionRequest,
    PostSubmissionResponse,
    InstagramPreview,
    PostContent
)
from agents import PostOrchestrator

# Initialize FastAPI app
app = FastAPI(
    title="AI Instagram Post Generator",
    description="Generate Instagram posts using AI agents",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
draft_posts: Dict[str, Dict] = {}  # Stores draft posts (temporary)
posted_posts: Dict[str, Dict] = {}  # Stores published posts

# Initialize orchestrator
orchestrator = PostOrchestrator()


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Instagram Post Generator API",
        "endpoints": {
            "generate_post": "POST /generate-post",
            "submit_post": "POST /post",
            "get_posts": "GET /posts",
            "get_post": "GET /posts/{post_id}"
        }
    }


@app.post("/generate-post", response_model=GeneratePostResponse)
async def generate_post(request: PostGenerationRequest):
    """
    Generate a draft Instagram post
    
    Request:
    - topic: str (Topic for the post)
    - tone: str (professional or casual)
    
    Returns:
    - Draft post with caption, hashtags, and generated image
    """
    try:
        # Validate tone
        if request.tone.lower() not in ["professional", "casual"]:
            raise HTTPException(
                status_code=400,
                detail="Tone must be either 'professional' or 'casual'"
            )
        
        # Generate content and image using agents
        post_content = await orchestrator.generate_complete_post(
            topic=request.topic,
            tone=request.tone
        )
        
        # Create draft with unique ID
        draft_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        # Store draft
        draft_posts[draft_id] = {
            "topic": request.topic,
            "tone": request.tone,
            "content": post_content,
            "created_at": timestamp,
            "status": "draft"
        }
        
        # Create preview
        preview = InstagramPreview(
            id=draft_id,
            username="ai_content_creator",
            timestamp=timestamp,
            caption=post_content["caption"],
            image_url=post_content["image_url"],
            hashtags=post_content["hashtags"],
            likes=0,
            comments=0,
            shares=0
        )
        
        # Create draft post
        draft_post = PostContent(
            caption=post_content["caption"],
            hashtags=post_content["hashtags"],
            image_url=post_content["image_url"]
        )
        
        return GeneratePostResponse(
            status="success",
            draft_post=draft_post,
            preview=preview
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating post: {str(e)}")


@app.post("/post", response_model=PostSubmissionResponse)
async def submit_post(request: PostSubmissionRequest):
    """
    Submit a draft post to be published (simulated)
    
    Request:
    - draft_id: str (ID of draft post)
    
    Returns:
    - Confirmation with posted post details
    """
    try:
        # Check if draft exists
        if request.draft_id not in draft_posts:
            raise HTTPException(
                status_code=404,
                detail=f"Draft post with ID {request.draft_id} not found"
            )
        
        # Get draft post
        draft = draft_posts[request.draft_id]
        
        # Create published post
        post_id = str(uuid.uuid4())
        posted_at = datetime.now().isoformat()
        
        posted_posts[post_id] = {
            "draft_id": request.draft_id,
            "topic": draft["topic"],
            "tone": draft["tone"],
            "content": draft["content"],
            "created_at": draft["created_at"],
            "posted_at": posted_at,
            "status": "published"
        }
        
        # Create preview for response
        preview = InstagramPreview(
            id=post_id,
            username="ai_content_creator",
            timestamp=posted_at,
            caption=draft["content"]["caption"],
            image_url=draft["content"]["image_url"],
            hashtags=draft["content"]["hashtags"],
            likes=0,
            comments=0,
            shares=0
        )
        
        return PostSubmissionResponse(
            status="success",
            post_id=post_id,
            message=f"Post published successfully! Post ID: {post_id}",
            posted_at=posted_at,
            preview=preview
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting post: {str(e)}")


@app.get("/posts")
async def get_all_posts():
    """Get all posted posts"""
    return {
        "status": "success",
        "total_posts": len(posted_posts),
        "posts": list(posted_posts.values())
    }


@app.get("/posts/{post_id}")
async def get_post(post_id: str):
    """Get a specific posted post"""
    if post_id not in posted_posts:
        raise HTTPException(status_code=404, detail=f"Post {post_id} not found")
    
    return {
        "status": "success",
        "post": posted_posts[post_id]
    }


@app.get("/drafts")
async def get_all_drafts():
    """Get all draft posts"""
    return {
        "status": "success",
        "total_drafts": len(draft_posts),
        "drafts": list(draft_posts.values())
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "draft_posts": len(draft_posts),
        "published_posts": len(posted_posts)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
