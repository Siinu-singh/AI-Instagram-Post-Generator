"""
AI Agents for content and image generation
Supports both Google Gemini and OpenAI APIs
"""
import os
from typing import Dict, List, Tuple
import asyncio
from datetime import datetime
from dotenv import load_dotenv
import google.generativeai as genai
from openai import AsyncOpenAI

# Load environment variables from .env file
load_dotenv()

class ContentAgent:
    """Agent responsible for generating captions and hashtags"""
    
    def __init__(self, api_key: str = None, provider: str = None):
        self.provider = provider or os.getenv("AI_PROVIDER", "gemini")  # Default: gemini
        self.api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")
        
        if self.provider == "gemini":
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.client = AsyncOpenAI(api_key=self.api_key)
    
    async def generate_content(self, topic: str, tone: str) -> Tuple[str, List[str]]:
        """
        Generate caption and hashtags for a given topic and tone
        
        Args:
            topic: Topic for the Instagram post
            tone: Tone of the post ('professional' or 'casual')
        
        Returns:
            Tuple of (caption, hashtags_list)
        """
        prompt = f"""
        Create an engaging Instagram post for the following:
        
        Topic: {topic}
        Tone: {tone}
        
        Requirements:
        1. Caption should be maximum 150 words
        2. Make it engaging and appropriate for the tone
        3. Include a call-to-action if suitable
        4. Generate exactly 8 relevant hashtags
        
        Format your response as:
        CAPTION:
        [Your caption here]
        
        HASHTAGS:
        #hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5 #hashtag6 #hashtag7 #hashtag8
        """
        
        try:
            if self.provider == "gemini":
                response = self.model.generate_content(prompt)
                content = response.text
            else:
                response = await self.client.messages.create(
                    model="claude-3-5-sonnet-20241022",
                    max_tokens=500,
                    messages=[
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ]
                )
                content = response.content[0].text
            
            # Parse caption and hashtags
            caption = ""
            hashtags = []
            
            if "CAPTION:" in content:
                caption_section = content.split("CAPTION:")[1]
                if "HASHTAGS:" in caption_section:
                    caption = caption_section.split("HASHTAGS:")[0].strip()
                else:
                    caption = caption_section.strip()
            
            if "HASHTAGS:" in content:
                hashtags_section = content.split("HASHTAGS:")[1].strip()
                # Extract hashtags
                hashtags = [tag.strip() for tag in hashtags_section.split("#") if tag.strip()]
                hashtags = [f"#{tag}" for tag in hashtags]
            
            return caption, hashtags[:10]  # Max 10 hashtags
        
        except Exception as e:
            print(f"Error generating content: {e}")
            raise


class ImageAgent:
    """Agent responsible for generating images"""
    
    def __init__(self, api_key: str = None, provider: str = None):
        self.provider = provider or os.getenv("IMAGE_PROVIDER", "placeholder")  # Default: placeholder (free)
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = None
        
        if self.provider == "dall-e":
            if not self.api_key:
                raise ValueError("OPENAI_API_KEY is required for DALL-E image generation")
            self.client = AsyncOpenAI(api_key=self.api_key)
    
    async def generate_image(self, topic: str, caption: str, tone: str) -> str:
        """
        Generate an image for the Instagram post using DALL-E or placeholder
        
        Args:
            topic: Topic for the post
            caption: Generated caption
            tone: Tone of the post
        
        Returns:
            URL of generated image
        """
        prompt = f"""
        Create a vibrant, engaging, and professional Instagram post image for:
        Topic: {topic}
        Tone: {tone}
        
        The image should:
        1. Be visually appealing and suitable for social media
        2. Match the tone (professional: clean and corporate; casual: fun and relaxed)
        3. Include relevant visual elements related to the topic
        4. Be in landscape orientation (1080x1080px Instagram format)
        5. Have good contrast and readability
        
        Focus on creating an eye-catching design that would perform well on Instagram.
        """
        
        try:
            if self.provider == "dall-e":
                response = await self.client.images.generate(
                    model="dall-e-3",
                    prompt=prompt,
                    size="1024x1024",
                    quality="standard",
                    n=1
                )
                return response.data[0].url
            else:
                # Fallback for other providers
                return f"https://via.placeholder.com/1024x1024?text={topic.replace(' ', '+')}"
        
        except Exception as e:
            print(f"Error generating image: {e}")
            # Return placeholder if generation fails
            return f"https://via.placeholder.com/1024x1024?text=AI+Generated+{topic.replace(' ', '+')}"


class PostOrchestrator:
    """Orchestrator for managing multiple agents"""
    
    def __init__(self):
        ai_provider = os.getenv("AI_PROVIDER", "gemini")
        image_provider = os.getenv("IMAGE_PROVIDER", "placeholder")
        
        self.content_agent = ContentAgent(provider=ai_provider)
        self.image_agent = ImageAgent(provider=image_provider)
    
    async def generate_complete_post(self, topic: str, tone: str) -> Dict:
        """
        Orchestrate generation of complete post using multiple agents
        
        Args:
            topic: Topic for the post
            tone: Tone of the post
        
        Returns:
            Dictionary containing caption, hashtags, and image_url
        """
        try:
            # Run content and image generation in parallel
            caption, hashtags = await self.content_agent.generate_content(topic, tone)
            
            # Generate image based on caption and topic
            image_url = await self.image_agent.generate_image(topic, caption, tone)
            
            return {
                "caption": caption,
                "hashtags": hashtags,
                "image_url": image_url
            }
        
        except Exception as e:
            print(f"Error in orchestrator: {e}")
            raise
