# AI Instagram Post Generator

A sophisticated system that generates Instagram posts with AI-powered content and image generation using multi-agent architecture. This assessment project demonstrates full-stack development with FastAPI, Next.js, and Generative AI integration.

## 🎯 Overview

The AI Instagram Post Generator leverages multiple specialized AI agents to:
- **Content Agent**: Generate engaging captions (max 150 words) and hashtags (5-10)
- **Image Agent**: Create visually appealing images using DALL-E 3
- **Post Orchestrator**: Manage parallel agent execution for optimal performance

## 📋 Architecture

### System Design

```
Frontend (Next.js)
    ↓ HTTP/JSON
FastAPI Backend
    ├─ POST /generate-post → Content + Image Agents (parallel)
    └─ POST /post → Store & Return Preview
    
Storage (In-Memory Dict with UUID)
    ├─ Draft Posts (temporary)
    └─ Published Posts (final)
```

### Multi-Agent Pattern

```
PostOrchestrator (Main Controller)
├── ContentAgent (Anthropic Claude 3.5)
│   └─ Generates: Caption + Hashtags
└── ImageAgent (OpenAI DALL-E 3)
    └─ Generates: Instagram-optimized image (1024x1024)
```

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **AI Models**: 
  - Claude 3.5 Sonnet (Content generation)
  - DALL-E 3 (Image generation)
- **Async**: asyncio + aiohttp
- **Validation**: Pydantic v2

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **UI Components**: React hooks
- **HTTP Client**: fetch API


## 🚀 Getting Started

### Prerequisites
```
- Python 3.10+
- Node.js 18+
- OpenAI API Key (with GPT-4 Vision & DALL-E access)
- Anthropic API Key (Claude)
```

### Backend Setup

1. **Clone Repository**
```bash
git clone <repo-url>
cd ai_instagram_post/backend
```

2. **Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your API keys
```

5. **Run Backend**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to Frontend**
```bash
cd ../frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

4. **Run Frontend**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## 📡 API Endpoints

### 1. Generate Post Draft
```http
POST /generate-post
Content-Type: application/json

{
  "topic": "Sustainable Fashion",
  "tone": "professional"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "draft_post": {
    "caption": "Sustainable fashion is transforming the industry...",
    "hashtags": ["#sustainable", "#fashion", "#eco-friendly"],
    "image_url": "https://..."
  },
  "preview": {
    "id": "uuid",
    "username": "ai_content_creator",
    "timestamp": "2024-03-18T...",
    "caption": "...",
    "image_url": "https://...",
    "hashtags": [...],
    "likes": 0,
    "comments": 0,
    "shares": 0
  }
}
```

### 2. Submit Post (Simulate Publishing)
```http
POST /post
Content-Type: application/json

{
  "draft_id": "uuid-from-generate-post"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "post_id": "published-uuid",
  "message": "Post published successfully!",
  "posted_at": "2024-03-18T...",
  "preview": { ... }
}
```

### 3. Get All Posts
```http
GET /posts
```

### 4. Get Specific Post
```http
GET /posts/{post_id}
```

### 5. Health Check
```http
GET /health
```

## 🧠 Agent Implementation Details

### Content Agent

**Approach**:
1. Accepts topic and tone parameters
2. Constructs detailed prompt for Claude 3.5
3. Claude generates engaging caption (≤150 words)
4. Extracts 8 relevant hashtags from response
5. Validates output and returns structured data

**Prompt Strategy**:
- Context: Topic + Tone specification
- Constraints: Word limit, hashtag count
- Format: Structured sections (CAPTION: / HASHTAGS:)
- Tone: Professional (corporate, formal) vs Casual (fun, relatable)

### Image Agent

**Approach**:
1. Takes topic, caption, and tone as input
2. Crafts DALL-E 3 prompt emphasizing:
   - Social media aesthetics (1024x1024)
   - Tone-appropriate visual style
   - High contrast and visibility
   - Instagram-optimized composition
3. Generates image and returns URL

**Image Specifications**:
- Resolution: 1024x1024px (Instagram square format)
- Quality: Standard
- Style: Professional/Casual based on tone
- Fallback: Placeholder if generation fails

### Post Orchestrator

**Flow**:
```
generate_complete_post(topic, tone)
├─ Parallel:
│  ├─ content_agent.generate_content()
│  └─ image_agent.generate_image()
└─ Combine results → {caption, hashtags, image_url}
```

**Benefits**:
- Parallel execution reduces latency
- Modular design allows agent swapping
- Error handling at orchestration level

## 💾 Data Storage

### In-Memory Storage Structure

```python
# Draft Posts
draft_posts = {
    "uuid-1": {
        "topic": "...",
        "tone": "...",
        "content": {
            "caption": "...",
            "hashtags": [...],
            "image_url": "..."
        },
        "created_at": "2024-03-18T...",
        "status": "draft"
    }
}

# Published Posts
posted_posts = {
    "uuid-2": {
        "draft_id": "uuid-1",
        "topic": "...",
        "posted_at": "2024-03-18T...",
        "status": "published",
        ...
    }
}
```

## 🎨 Frontend Features

### Post Generation Page
- Topic input field
- Tone selector (Professional/Casual)
- Generate button with loading state
- Real-time preview of:
  - Caption with word count
  - Generated image
  - Hashtags list

### Instagram Preview
- Realistic Instagram post layout
- User profile section
- Image display area
- Engagement metrics (likes, comments, shares)
- Action buttons (Like, Comment, Share, Save)

### Post Management
- View generated drafts
- Submit/Publish posts
- View all published posts
- Delete drafts functionality

## 🔄 Workflow

```
User Input
    ↓
Frontend Form (Topic + Tone)
    ↓
POST /generate-post
    ↓
Content Agent (Caption + Hashtags) ←→ Image Agent (DALL-E 3)
    ↓
Return Draft with Preview
    ↓
User Reviews & Clicks "Post"
    ↓
POST /post endpoint
    ↓
Move Draft → Published
    ↓
Return Confirmation + Instagram Preview
```

## 🧪 Testing

### Test Cases

1. **Content Generation**
   - Valid topic + tone
   - Edge cases (empty, very long topic)
   - Different tone variations

2. **Image Generation**
   - Verify image URL generation
   - Check fallback handling
   - Validate image specifications

3. **API Endpoints**
   - Generate post flow
   - Submit post flow
   - Error handling (404, 400, 500)

### Example Test Request

```bash
# Test Content Generation
curl -X POST http://localhost:8000/generate-post \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Machine Learning in Healthcare",
    "tone": "professional"
  }'

# Test Post Submission
curl -X POST http://localhost:8000/post \
  -H "Content-Type: application/json" \
  -d '{"draft_id": "your-draft-id"}'
```

## 📊 Performance Considerations

### Optimization Strategies

1. **Parallel Agent Execution**
   - Content and image generation run concurrently
   - Reduces total latency significantly

2. **Async/Await Pattern**
   - Non-blocking API calls
   - Handles multiple concurrent requests

3. **Caching**
   - Could implement Redis for frequently accessed posts
   - Image URL caching

4. **Prompt Engineering**
   - Optimized prompts for faster responses
   - Structured output format reduces parsing errors

## 🚨 Error Handling

### Validation
- Tone must be "professional" or "casual"
- Topic cannot be empty
- Draft ID validation for post submission

### API Errors
- 400: Bad request (invalid tone)
- 404: Resource not found (draft/post not found)
- 500: Server error (API failures, model errors)

### Fallback Mechanisms
- Placeholder image if DALL-E fails
- Error messages returned to client
- Graceful degradation

## 📈 Scalability

### Current Implementation
- In-memory storage (single instance)
- Suitable for demo/assessment purposes

### Production Upgrades
1. **Database**: PostgreSQL/MongoDB for persistence
2. **Caching**: Redis for image URLs and frequent queries
3. **Queue**: Celery/RabbitMQ for async task processing
4. **Load Balancing**: Multiple API instances behind load balancer
5. **CDN**: Store generated images on S3/GCS

## 🔐 Security

### Best Practices Implemented
- API key management via environment variables
- CORS middleware for frontend communication
- Input validation using Pydantic
- Error handling without exposing sensitive info


## 📝 Code Structure

```
ai_instagram_post/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── models.py         # Pydantic data models
│   ├── agents.py         # AI agents (Content, Image)
│   ├── config.py         # Configuration management
│   ├── requirements.txt   # Python dependencies
│   └── __init__.py
├── frontend/
│   ├── app/
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── components/
│   │       ├── PostGenerator.tsx
│   │       ├── InstagramPreview.tsx
│   │       └── LoadingSpinner.tsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore
└── README.md             # This file
```

## 🎬 Demo Walkthrough

1. **Home Page**: User sees the post generator interface
2. **Input**: Enter topic (e.g., "AI in Education") and select tone
3. **Generation**: Click "Generate Post"
4. **Preview**: View caption, hashtags, and generated image
5. **Publishing**: Click "Post" to simulate publishing
6. **Confirmation**: See Instagram preview with post ID

## ⚙️ Configuration

### Environment Variables

```env
# API Keys (Required)
OPENAI_API_KEY=sk-...

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Models
CONTENT_MODEL=claude-3-5-sonnet-20241022
IMAGE_MODEL=dall-e-3
```

## 🐛 Troubleshooting

### Common Issues

1. **"API Key not found"**
   - Ensure OPENAI_API_KEY is set in .env
   - Check if key has access to Claude API

2. **CORS Error**
   - Verify frontend URL in CORS_ORIGINS
   - Ensure backend is running on correct port

3. **Image Generation Fails**
   - Check DALL-E access in OpenAI account
   - Verify image prompt is not too long

4. **Slow Response**
   - Image generation takes ~30 seconds
   - Content generation ~5-10 seconds
   - Network latency may add delay


**Built with ❤️ for CareerGuide.com assessment**
