# System Architecture & Design Document

## Executive Summary

The AI Instagram Post Generator is a full-stack application that demonstrates:
- **Multi-Agent AI Architecture** with parallel agent execution
- **Scalable FastAPI backend** with async/await patterns
- **Modern React-based frontend** with real-time previews
- **Production-ready deployment** with Docker & cloud integration

## 1. System Overview

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                         User Interface                             │
│                        (Next.js + React)                           │
│  • Post Generator Form  • Instagram Preview  • Published Posts     │
└────────────────┬───────────────────────────────────────────────────┘
                 │
                 │ HTTP/REST API
                 ↓
┌────────────────────────────────────────────────────────────────────┐
│                      API Gateway (FastAPI)                         │
│  • Route Management  • CORS  • Error Handling  • Validation       │
├────────────────────────────────────────────────────────────────────┤
│                    Core Business Logic                             │
│  ┌──────────────────┐        ┌──────────────────────────┐         │
│  │   Content Agent  │        │    Image Agent           │         │
│  │  (Claude 3.5)    │        │   (DALL-E 3)             │         │
│  │                  │        │                          │         │
│  │ • Caption Gen    │        │ • Image Prompt Crafting  │         │
│  │ • Hashtag Gen    │        │ • Image Generation       │         │
│  │ • Tone Matching  │        │ • Fallback Handling      │         │
│  └──────────────────┘        └──────────────────────────┘         │
│        ↓ Parallel Execution ↓                                      │
│  ┌──────────────────────────────────────────────────────┐         │
│  │         PostOrchestrator                             │         │
│  │  • Coordinate agents  • Manage state  • Error handle │         │
│  └──────────────────────────────────────────────────────┘         │
├────────────────────────────────────────────────────────────────────┤
│                      Data Storage                                   │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────┐        │
│  │ Draft Posts     │  │ Published Posts  │  │  User     │        │
│  │ (In-Memory)     │  │ (In-Memory)      │  │ Sessions  │        │
│  └─────────────────┘  └──────────────────┘  └────────────┘        │
└────────────────────────────────────────────────────────────────────┘
         │                     │
         └─ Easy to replace with DB (PostgreSQL/MongoDB) ─┘
```

## 2. Component Architecture

### Backend Components

```
backend/
├── main.py
│   ├── FastAPI Application
│   ├── Route Handlers
│   │   ├── POST /generate-post
│   │   ├── POST /post
│   │   ├── GET /posts
│   │   └── GET /health
│   ├── Middleware (CORS, Error Handling)
│   └── In-Memory Storage Management
│
├── agents.py
│   ├── ContentAgent
│   │   ├── __init__(api_key)
│   │   └── generate_content(topic, tone)
│   │       ├── Prompt engineering
│   │       ├── Claude API call
│   │       ├── Response parsing
│   │       └── Validation
│   │
│   ├── ImageAgent
│   │   ├── __init__(api_key)
│   │   └── generate_image(topic, caption, tone)
│   │       ├── Prompt crafting
│   │       ├── DALL-E 3 API call
│   │       ├── URL extraction
│   │       └── Fallback handling
│   │
│   └── PostOrchestrator
│       ├── __init__()
│       └── generate_complete_post(topic, tone)
│           ├── Parallel agent execution
│           ├── Result aggregation
│           └── Error handling
│
├── models.py
│   ├── PostGenerationRequest (Pydantic)
│   ├── PostContent
│   ├── InstagramPreview
│   ├── GeneratePostResponse
│   ├── PostSubmissionRequest
│   └── PostSubmissionResponse
│
└── config.py
    ├── Environment loading
    ├── API credentials
    └── Model configuration
```

### Frontend Components

```
frontend/
├── app/
│   ├── page.tsx (Main Page)
│   │   ├── Tab navigation
│   │   ├── PostGenerator component
│   │   └── InstagramPreview component
│   │
│   ├── components/
│   │   ├── PostGenerator.tsx
│   │   │   ├── Form inputs (topic, tone)
│   │   │   ├── API call handling
│   │   │   ├── Loading state
│   │   │   └── Error handling
│   │   │
│   │   ├── InstagramPreview.tsx
│   │   │   ├── Instagram mockup
│   │   │   ├── Image display
│   │   │   ├── Caption rendering
│   │   │   ├── Hashtag display
│   │   │   ├── Publish button
│   │   │   └── Stats display
│   │   │
│   │   └── PostsList.tsx
│   │       ├── Posts grid
│   │       ├── Post cards
│   │       ├── Image lazy loading
│   │       └── Pagination
│   │
│   └── globals.css
│       ├── Tailwind directives
│       └── Custom styles
│
└── Configuration
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## 3. Data Models

### Request/Response Flow

```
Client Request:
{
  "topic": "Sustainable Fashion",
  "tone": "professional"
}
       ↓
FastAPI Validation (Pydantic)
       ↓
Agent Orchestration
       ↓
API Response:
{
  "status": "success",
  "draft_post": {
    "caption": "...",
    "hashtags": [...],
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

### In-Memory Storage Structure

```
draft_posts = {
  "uuid-123": {
    "topic": "AI in Healthcare",
    "tone": "professional",
    "content": {
      "caption": "Exploring AI applications...",
      "hashtags": ["#AI", "#Healthcare", ...],
      "image_url": "https://..."
    },
    "created_at": "2024-03-18T10:30:00",
    "status": "draft"
  }
}

posted_posts = {
  "uuid-456": {
    "draft_id": "uuid-123",
    "topic": "AI in Healthcare",
    "tone": "professional",
    "content": {...},
    "created_at": "2024-03-18T10:30:00",
    "posted_at": "2024-03-18T10:35:00",
    "status": "published"
  }
}
```

## 4. API Specification

### Endpoint: POST /generate-post

**Purpose**: Generate a draft Instagram post

**Request**:
```json
{
  "topic": "string (required, 1-500 chars)",
  "tone": "professional | casual (required)"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "draft_post": {
    "caption": "string (max 150 words)",
    "hashtags": ["#tag1", "#tag2", ...],
    "image_url": "string"
  },
  "preview": {
    "id": "uuid",
    "username": "ai_content_creator",
    "timestamp": "ISO8601",
    "caption": "string",
    "image_url": "string",
    "hashtags": [...],
    "likes": 0,
    "comments": 0,
    "shares": 0
  }
}
```

**Error Responses**:
- 400: Invalid tone (must be professional or casual)
- 500: API error (OpenAI/Claude unavailable)

**Processing Time**: 35-50 seconds
- Content generation: 5-10s
- Image generation: 30-45s

---

### Endpoint: POST /post

**Purpose**: Publish a draft post (simulate Instagram posting)

**Request**:
```json
{
  "draft_id": "uuid (required)"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "post_id": "uuid",
  "message": "Post published successfully!",
  "posted_at": "ISO8601",
  "preview": {...}
}
```

**Error Responses**:
- 404: Draft post not found
- 500: Server error

---

### Endpoint: GET /posts

**Purpose**: Retrieve all published posts

**Response** (200 OK):
```json
{
  "status": "success",
  "total_posts": 5,
  "posts": [
    {
      "draft_id": "uuid-123",
      "topic": "string",
      "tone": "string",
      "content": {...},
      "created_at": "ISO8601",
      "posted_at": "ISO8601",
      "status": "published"
    }
  ]
}
```

---

### Endpoint: GET /health

**Purpose**: Health check for monitoring

**Response** (200 OK):
```json
{
  "status": "healthy",
  "timestamp": "ISO8601",
  "draft_posts": 3,
  "published_posts": 5
}
```

## 5. Sequence Diagrams

### Post Generation Flow

```
┌──────┐          ┌─────────┐         ┌──────────────┐     ┌────────┐
│Client│          │FastAPI  │         │Orchestrator  │     │  APIs  │
└──────┘          └─────────┘         └──────────────┘     └────────┘
   │                  │                      │                  │
   │─ POST /generate  │                      │                  │
   │ (topic, tone)    │                      │                  │
   │                  │──> validate          │                  │
   │                  │ (Pydantic)           │                  │
   │                  │◄──────────────────   │                  │
   │                  │                      │                  │
   │                  │─────────────────────>│                  │
   │                  │ generate_complete()  │                  │
   │                  │                      │──┐ parallel      │
   │                  │                      │  │                │
   │                  │                      ├──────────────────│
   │                  │                      │  │ ContentAgent  │
   │                  │                      │  │                │
   │                  │                      │  │  Claude API   │
   │                  │                      │◄──────────────────│
   │                  │                      │  │ caption +     │
   │                  │                      │  │ hashtags      │
   │                  │                      │  │                │
   │                  │                      ├──────────────────│
   │                  │                      │  │ ImageAgent    │
   │                  │                      │  │                │
   │                  │                      │  │ DALL-E API    │
   │                  │                      │◄──────────────────│
   │                  │                      │  │ image_url     │
   │                  │                      │                  │
   │                  │◄─────────────────────│                  │
   │                  │ (caption, hashtags,   │                  │
   │                  │  image_url)          │                  │
   │                  │                      │                  │
   │                  │─> create_draft       │                  │
   │                  │ (UUID generation)    │                  │
   │                  │◄─────────────────────│                  │
   │◄──────────────────│ 200 OK              │                  │
   │ (preview + draft) │                      │                  │
   │                  │                      │                  │
```

### Post Publishing Flow

```
┌──────┐          ┌─────────┐         ┌──────────────┐
│Client│          │FastAPI  │         │ In-Memory    │
└──────┘          └─────────┘         │   Storage    │
   │                  │                └──────────────┘
   │─ POST /post      │
   │ (draft_id)       │
   │                  │──> find_draft(id)──────┐
   │                  │                        │
   │                  │◄───────────────────────│
   │                  │ draft_data
   │                  │
   │                  │─> move_draft_to_posts
   │                  │ (generate new UUID)──┐
   │                  │                      │
   │                  │◄─────────────────────│
   │                  │ posted_data
   │                  │
   │◄──────────────────│ 200 OK
   │ (post_id +       │
   │  preview)        │
```

## 6. Technology Stack Details

### Backend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | FastAPI 0.104+ | REST API, async support |
| Runtime | Python 3.10+ | Backend language |
| Server | Uvicorn 0.24+ | ASGI server |
| Validation | Pydantic 2.5+ | Data validation & serialization |
| AI - Content | Anthropic Claude | Caption & hashtag generation |
| AI - Image | OpenAI DALL-E 3 | Image generation |
| HTTP Client | httpx, aiohttp | Async HTTP calls |
| Deployment | Docker | Containerization |
| Orchestration | Docker Compose | Multi-service management |

### Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14+ | React metaframework |
| Language | TypeScript | Type-safe JavaScript |
| Styling | Tailwind CSS 3.3+ | Utility-first CSS |
| HTTP Client | Axios 1.6+ | API requests |
| State | React Hooks | Component state management |
| Deployment | Vercel/Docker | Hosting & deployment |

## 7. Error Handling Strategy

### Validation Errors (400)
```python
# Handled by Pydantic
if tone not in ["professional", "casual"]:
    raise HTTPException(400, "Invalid tone")
```

### Not Found Errors (404)
```python
if draft_id not in draft_posts:
    raise HTTPException(404, "Draft not found")
```

### Server Errors (500)
```python
try:
    # API call
except Exception as e:
    logger.error(f"Error: {e}")
    raise HTTPException(500, "Failed to generate post")
```

### Graceful Degradation
```python
# If image generation fails, use placeholder
try:
    image_url = await image_agent.generate_image(...)
except:
    image_url = "https://placeholder.com/image"
```

## 8. Security Considerations

- **API Keys**: Stored in environment variables (not hardcoded)
- **CORS**: Configured for frontend domain only
- **Input Validation**: Pydantic models validate all inputs
- **Error Messages**: Don't expose sensitive info
- **HTTPS**: Required in production (SSL/TLS)
- **Rate Limiting**: Can be added per endpoint

## 9. Performance Metrics

| Operation | Time | Notes |
|-----------|------|-------|
| Caption generation | 5-10s | Claude API call |
| Image generation | 30-45s | DALL-E 3 API call |
| Total request | 35-50s | Parallel execution |
| API response | <100ms | JSON serialization |
| Frontend render | <500ms | React component mount |

## 10. Scalability Path

### Current (Assessment)
- In-memory storage
- Single instance
- Basic error handling

### Phase 1 (MVP)
- PostgreSQL database
- Redis caching
- Load balancer (2-3 instances)
- Monitoring & logging

### Phase 2 (Production)
- Kubernetes orchestration
- Database replication
- CDN for images
- Async task queue (Celery)
- Advanced monitoring (DataDog/New Relic)

### Phase 3 (Enterprise)
- Multi-region deployment
- Auto-scaling based on load
- Advanced caching strategies
- API gateway (Kong/AWS API Gateway)
- Analytics & business intelligence

## Conclusion

This architecture provides a solid foundation for an AI-powered Instagram post generator with clear separation of concerns, scalable design, and production-ready practices. The multi-agent pattern demonstrates sophisticated AI orchestration, while the full-stack implementation showcases modern web development practices.
