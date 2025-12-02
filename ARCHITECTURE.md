# AI Career Coach - Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER (Browser)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Homepage   │  │  Dashboard   │  │  Interview   │  │   Resume     │   │
│  │   (Hero)     │  │  (Insights)  │  │   Agent      │  │   Builder    │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │                  │            │
│         └─────────────────┴──────────────────┴──────────────────┘            │
│                                      │                                       │
│                            Next.js App Router                                │
│                                      │                                       │
└──────────────────────────────────────┼───────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                        ┌──────────────────────┐                             │
│                        │   Clerk Auth         │                             │
│                        │  - Sign In/Sign Up   │                             │
│                        │  - User Management   │                             │
│                        │  - Session Tokens    │                             │
│                        └──────────┬───────────┘                             │
│                                   │                                          │
└───────────────────────────────────┼──────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MIDDLEWARE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  middleware.js - Route Protection & User Sync               │            │
│  │  - Checks authentication status                             │            │
│  │  - Redirects to onboarding if needed                        │            │
│  │  - Syncs Clerk user with database                           │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                   │                                          │
└───────────────────────────────────┼──────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVER ACTIONS LAYER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   user.js    │  │dashboard.js  │  │interview.js  │  │  resume.js   │   │
│  │              │  │              │  │              │  │              │   │
│  │ - Onboard    │  │ - Get        │  │ - Get        │  │ - Generate   │   │
│  │   User       │  │   Industry   │  │   Assessments│  │   Resume     │   │
│  │ - Update     │  │   Insights   │  │ - Save Quiz  │  │ - Update     │   │
│  │   Profile    │  │ - AI Gen     │  │   Results    │  │   Sections   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │                  │            │
└─────────┼─────────────────┼──────────────────┼──────────────────┼────────────┘
          │                 │                  │                  │
          └─────────────────┴──────────────────┴──────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          API ROUTES LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ /api/interview   │  │  /api/history    │  │ /api/inngest     │          │
│  │                  │  │                  │  │                  │          │
│  │ POST: Generate   │  │ GET: Fetch       │  │ POST: Trigger    │          │
│  │       Question   │  │      History     │  │       Background │          │
│  │ POST: Evaluate   │  │ POST: Save       │  │       Jobs       │          │
│  │       Answer     │  │       Record     │  │                  │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                      │                     │
└───────────┼─────────────────────┼──────────────────────┼─────────────────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI INTEGRATION LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────┐                 │
│  │           Google Gemini AI (LangChain)                 │                 │
│  │                                                         │                 │
│  │  ┌──────────────────┐  ┌──────────────────┐           │                 │
│  │  │ Question         │  │ Answer           │           │                 │
│  │  │ Generation       │  │ Evaluation       │           │                 │
│  │  │                  │  │                  │           │                 │
│  │  │ - Topic-based    │  │ - Rating (1-10)  │           │                 │
│  │  │ - Difficulty     │  │ - Feedback       │           │                 │
│  │  │ - Industry-      │  │ - Structured     │           │                 │
│  │  │   specific       │  │   Output         │           │                 │
│  │  └──────────────────┘  └──────────────────┘           │                 │
│  │                                                         │                 │
│  │  ┌──────────────────────────────────────────────────┐  │                 │
│  │  │        Industry Insights Generation              │  │                 │
│  │  │  - Salary Ranges                                 │  │                 │
│  │  │  - Growth Rate                                   │  │                 │
│  │  │  - Top Skills                                    │  │                 │
│  │  │  - Market Outlook                                │  │                 │
│  │  └──────────────────────────────────────────────────┘  │                 │
│  └────────────────────────────────────────────────────────┘                 │
│                                                                              │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER (Prisma)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          PostgreSQL Database                                 │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │    User      │  │ Industry     │  │  Interview   │  │ Gamification │   │
│  │              │  │   Insight    │  │   History    │  │              │   │
│  │ - clerkId    │  │              │  │              │  │ - points     │   │
│  │ - email      │  │ - industry   │  │ - topic      │  │ - level      │   │
│  │ - name       │  │ - salary     │  │ - question   │  │ - streak     │   │
│  │ - industry   │  │ - growth     │  │ - answer     │  │ - badges     │   │
│  │ - imageUrl   │  │ - skills     │  │ - feedback   │  │              │   │
│  │              │  │ - outlook    │  │ - rating     │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Interview Agent Flow (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     INTERVIEW AGENT WORKFLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

    User Interaction
         │
         ▼
    ┌────────────────────────┐
    │  1. Select Mode        │
    │  - Single Question     │
    │  - Session (Multiple)  │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  2. Choose Settings    │
    │  - Topic               │
    │  - Difficulty          │
    │  - Timer (optional)    │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  3. Generate Question  │
    │                        │
    │  API Call:             │
    │  POST /api/interview   │
    └───────────┬────────────┘
                │
                ▼
    ┌─────────────────────────────────────┐
    │  Server Processing                  │
    │                                     │
    │  1. Validate Request                │
    │  2. Build AI Prompt                 │
    │  3. Call Gemini AI                  │
    │  4. Parse Response                  │
    │  5. Return Question                 │
    └───────────┬─────────────────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  4. Display Question   │
    │  - Show timer          │
    │  - Text input area     │
    │  - Voice input option  │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  5. User Types Answer  │
    │  (or uses voice)       │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  6. Submit for Eval    │
    │                        │
    │  API Call:             │
    │  POST /api/interview   │
    │  { action: "evaluate" }│
    └───────────┬────────────┘
                │
                ▼
    ┌─────────────────────────────────────┐
    │  AI Evaluation Processing           │
    │                                     │
    │  1. Receive question + answer       │
    │  2. Build evaluation prompt         │
    │  3. Call Gemini with structured     │
    │     output schema                   │
    │  4. Parse rating & feedback         │
    │  5. Return evaluation               │
    └───────────┬─────────────────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  7. Display Results    │
    │  - Rating (1-10)       │
    │  - Detailed Feedback   │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  8. Update Gamification│
    │  - Add points          │
    │  - Update streak       │
    │  - Check level up      │
    │  - Award badges        │
    │  (localStorage)        │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  9. Save to History    │
    │                        │
    │  API Call:             │
    │  POST /api/history     │
    │  (fire-and-forget)     │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │  10. Next Action       │
    │  - Next Question       │
    │  - End Session         │
    │  - View Analytics      │
    └────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DATA FLOW DIAGRAM                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ (1) User signs in
       ▼
┌─────────────┐
│    Clerk    │◄─────────────────┐
└──────┬──────┘                  │
       │                         │
       │ (2) Auth token          │
       ▼                         │
┌─────────────┐                  │
│ Middleware  │                  │
└──────┬──────┘                  │
       │                         │
       │ (3) Check/Create user   │
       ▼                         │
┌─────────────┐                  │
│  checkUser  │                  │
│   Helper    │                  │
└──────┬──────┘                  │
       │                         │
       │ (4) Find/Create in DB   │
       ▼                         │
┌─────────────┐                  │
│  Prisma DB  │                  │
└──────┬──────┘                  │
       │                         │
       │ (5) Return user object  │
       ▼                         │
┌─────────────┐                  │
│ Dashboard   │                  │
└──────┬──────┘                  │
       │                         │
       │ (6) Check onboarding    │
       ├──────────────────────┐  │
       │                      │  │
       ▼                      │  │
  Not Onboarded               │  │
       │                      │  │
       ▼                      │  │
┌─────────────┐               │  │
│ Onboarding  │               │  │
│    Page     │               │  │
└──────┬──────┘               │  │
       │                      │  │
       │ (7) Select industry  │  │
       ▼                      │  │
┌─────────────┐               │  │
│Update User  │               │  │
│  Industry   │               │  │
└──────┬──────┘               │  │
       │                      │  │
       └──────────────────────┤  │
                              │  │
                              ▼  │
                         Onboarded
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Industry   │      │  Interview  │      │   Resume    │
│  Insights   │      │    Agent    │      │   Builder   │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                     │                     │
       │ (8) Request AI      │ (9) Generate Q      │ (10) Generate
       ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Gemini AI (LangChain)                 │
│  - Natural language understanding                       │
│  - Context-aware responses                              │
│  - Structured output generation                         │
└──────┬──────────────────────┬─────────────────────┬────┘
       │                      │                     │
       │ (11) Insights        │ (12) Question       │ (13) Resume
       ▼                      ▼                     ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Save to   │      │   Display   │      │   Display   │
│  Database   │      │  Question   │      │   Resume    │
└─────────────┘      └──────┬──────┘      └─────────────┘
                            │
                            │ (14) User answers
                            ▼
                     ┌─────────────┐
                     │  Evaluate   │
                     │   Answer    │
                     └──────┬──────┘
                            │
                            │ (15) Save results
                            ▼
                     ┌─────────────┐
                     │  History +  │
                     │ Gamification│
                     └─────────────┘
```

## Key Components

### 1. **Frontend (Client Components)**
- React Server Components for initial render
- Client components for interactivity
- Real-time state management
- LocalStorage for gamification persistence

### 2. **Authentication**
- Clerk for user management
- Middleware for route protection
- Automatic user sync to database

### 3. **Server Actions**
- Type-safe server functions
- Direct database access
- AI integration layer

### 4. **AI Integration**
- Google Gemini AI via LangChain
- Structured output parsing
- Context-aware prompts
- Retry logic with fallbacks

### 5. **Database**
- PostgreSQL via Prisma ORM
- Relational data model
- Type-safe queries
- Migrations management

### 6. **Analytics**
- Interview history tracking
- Performance metrics
- Progress visualization
- Inline SVG charts

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Clerk Authentication                                  │
│  ✓ JWT token validation                                         │
│  ✓ Session management                                           │
│  ✓ OAuth providers                                              │
│                                                                  │
│  Layer 2: Middleware Protection                                 │
│  ✓ Route guards                                                 │
│  ✓ User verification                                            │
│  ✓ Automatic redirects                                          │
│                                                                  │
│  Layer 3: Server Actions                                        │
│  ✓ User ID validation                                           │
│  ✓ Data sanitization                                            │
│  ✓ Error handling                                               │
│                                                                  │
│  Layer 4: Database                                              │
│  ✓ Prisma ORM (SQL injection protection)                        │
│  ✓ Unique constraints                                           │
│  ✓ Data validation                                              │
│                                                                  │
│  Layer 5: API Protection                                        │
│  ✓ Rate limiting                                                │
│  ✓ Request validation                                           │
│  ✓ CORS configuration                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                                               │
│  │   Vercel     │  (Frontend + API Routes)                      │
│  │              │  - Next.js hosting                            │
│  │              │  - Edge functions                             │
│  │              │  - Automatic SSL                              │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ├──────────┐                                            │
│         │          │                                            │
│         ▼          ▼                                            │
│  ┌──────────┐  ┌──────────┐                                    │
│  │PostgreSQL│  │ Clerk    │                                    │
│  │ (Neon/   │  │ Auth     │                                    │
│  │ Supabase)│  │ Service  │                                    │
│  └──────────┘  └──────────┘                                    │
│                                                                  │
│  External Services:                                             │
│  - Google Gemini AI (API)                                       │
│  - Inngest (Background jobs)                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/JSX
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: Clerk
- **AI**: Google Gemini (via LangChain)
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Background Jobs**: Inngest
- **Deployment**: Vercel

---

**Created**: November 30, 2025  
**Version**: 1.0
