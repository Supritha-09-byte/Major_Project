# AI Career Coach - Complete Setup Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

AI Career Coach is a Next.js-based application that provides personalized career guidance, AI-powered interview preparation, and industry insights using Google Gemini AI.

## ✨ Features

- 🔐 **Authentication**: Secure user authentication via Clerk
- 📊 **Industry Insights**: AI-generated salary ranges, growth rates, and market trends
- 🎤 **Interview Preparation**: 
  - AI-powered question generation
  - Real-time answer evaluation
  - Voice input support
  - Single/Session modes
  - Difficulty levels
- 📈 **Analytics Dashboard**: 
  - Performance tracking
  - Progress visualization
  - Historical data analysis
- 🎮 **Gamification**: 
  - Points and levels
  - Streak tracking
  - Achievement badges
- 📄 **Resume Builder**: AI-assisted resume generation
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS

## 🛠 Technology Stack

- **Framework**: Next.js 15.1.4 (App Router)
- **Language**: JavaScript/JSX
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **AI**: Google Gemini AI (via LangChain)
- **UI Library**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Background Jobs**: Inngest
- **Notifications**: Sonner

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.17.0 or higher
- **npm** or **pnpm**: Latest version
- **PostgreSQL**: v14 or higher (or use cloud service)
- **Git**: For version control

## 🚀 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/Supritha-09-byte/Major_Project.git
cd Major_Project/ai-career-coach
```

### Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 3: Required Packages

The following packages are already included in `package.json`:

```json
{
  "dependencies": {
    "@clerk/nextjs": "^6.14.3",
    "@google/generative-ai": "^0.21.0",
    "@hookform/resolvers": "^3.9.1",
    "@inngest/react": "^1.1.1",
    "@langchain/google-genai": "^0.1.3",
    "@neondatabase/serverless": "^0.10.4",
    "@prisma/adapter-neon": "^6.2.0",
    "@prisma/client": "^6.2.0",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-radio-group": "^1.2.2",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "inngest": "^3.28.2",
    "langchain": "^0.3.10",
    "lucide-react": "^0.469.0",
    "next": "15.1.4",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "sonner": "^1.7.3",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "postcss": "^8",
    "prisma": "^6.2.0",
    "tailwindcss": "^3.4.1"
  }
}
```

## 🔑 Environment Variables

### Step 4: Create Environment File

Create a `.env` file in the `ai-career-coach` directory:

```bash
touch .env
```

### Step 5: Add Required Variables

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/ai_career_coach?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxx"

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key_here"

# Inngest (Optional - for background jobs)
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"
```

### Getting API Keys:

#### 1. PostgreSQL Database (Choose one):

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu/Debian
sudo apt-get install postgresql-14
sudo service postgresql start

# Windows
# Download installer from https://www.postgresql.org/download/windows/

# Create database
psql -U postgres
CREATE DATABASE ai_career_coach;
\q
```

**Option B: Neon (Recommended - Free tier available)**
1. Visit [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Replace in `.env`:
```env
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
```

**Option C: Supabase (Free tier available)**
1. Visit [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Replace in `.env`

#### 2. Clerk Authentication:
1. Visit [clerk.com](https://clerk.com)
2. Sign up for free account
3. Create a new application
4. Go to API Keys
5. Copy Publishable Key and Secret Key
6. Paste into `.env`

#### 3. Google Gemini AI:
1. Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Paste into `.env` as `GEMINI_API_KEY`

#### 4. Inngest (Optional):
1. Visit [inngest.com](https://inngest.com)
2. Sign up for free account
3. Create a new app
4. Copy Event Key and Signing Key
5. Paste into `.env`

## 🗄 Database Setup

### Step 6: Setup Prisma and Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### Database Schema

The application uses the following models:

```prisma
model User {
  id               String            @id @default(cuid())
  clerkUserId      String            @unique
  email            String            @unique
  name             String
  imageUrl         String?
  industry         String?
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  
  resume           Resume?
  industryInsight  IndustryInsight?
  assessments      Assessment[]
  interviewHistory InterviewHistory[]
  gamification     Gamification?
}

model IndustryInsight {
  id             String   @id @default(cuid())
  industry       String   @unique
  salaryRanges   Json
  growthRate     Float
  demandLevel    String
  topSkills      String[]
  marketOutlook  String
  keyTrends      String[]
  recommendedSkills String[]
  nextUpdate     DateTime
  createdAt      DateTime @default(now())
  
  user           User?    @relation(fields: [industry], references: [industry])
}

model InterviewHistory {
  id        String   @id @default(cuid())
  userId    String?
  topic     String
  question  String
  answer    String
  feedback  String
  rating    Int
  createdAt DateTime @default(now())
  
  user      User?    @relation(fields: [userId], references: [id])
}

model Gamification {
  id        String   @id @default(cuid())
  userId    String   @unique
  points    Int      @default(0)
  level     Int      @default(1)
  streak    Int      @default(0)
  badges    String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id])
}
```

## 🏃 Running Locally

### Step 7: Start Development Server

```bash
# Start the development server
npm run dev
# or
pnpm dev

# Server will start at http://localhost:3000
```

### Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code (if prettier is configured)
npm run format

# Database commands
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Create new migration
npx prisma migrate reset   # Reset database
npx prisma db push         # Push schema without migration
```

## 📁 Project Structure

```
ai-career-coach/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group routes
│   │   ├── sign-in/[[...sign-in]]/page.jsx
│   │   └── sign-up/[[...sign-up]]/page.jsx
│   ├── (main)/                   # Main app routes
│   │   ├── dashboard/
│   │   │   ├── page.jsx
│   │   │   └── _component/
│   │   │       └── dashboard-view.jsx
│   │   ├── interview/
│   │   │   ├── page.jsx
│   │   │   ├── analytics/page.jsx
│   │   │   ├── performance/page.jsx
│   │   │   ├── history/page.jsx
│   │   │   └── _components/
│   │   │       └── interview-agent.jsx
│   │   ├── resume/
│   │   │   ├── page.jsx
│   │   │   └── _components/
│   │   │       └── resume-builder.jsx
│   │   └── onboarding/
│   │       ├── page.jsx
│   │       └── _components/
│   │           └── onboarding-form.jsx
│   ├── api/                      # API routes
│   │   ├── interview/route.js
│   │   ├── history/route.js
│   │   └── inngest/route.js
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Homepage
│   └── globals.css               # Global styles
├── actions/                      # Server actions
│   ├── user.js
│   ├── dashboard.js
│   ├── interview.js
│   ├── resume.js
│   └── cover-letter.js
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── ... (other UI components)
│   ├── header.jsx
│   ├── hero.jsx
│   └── theme-provider.jsx
├── lib/                          # Utility functions
│   ├── checkUser.js              # User sync helper
│   ├── prisma.js                 # Prisma client
│   ├── utils.js                  # General utilities
│   └── inngest/
│       ├── client.js
│       └── function.js
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Migration files
├── public/                       # Static assets
│   ├── logo.png
│   ├── banner.png
│   └── ... (other images)
├── data/                         # Static data
│   ├── features.js
│   ├── industries.js
│   └── testimonial.js
├── .env                          # Environment variables
├── .gitignore
├── middleware.js                 # Auth middleware
├── next.config.mjs              # Next.js config
├── tailwind.config.mjs          # Tailwind config
├── components.json              # Shadcn config
├── package.json
├── ARCHITECTURE.md              # Architecture diagram
└── README.md                    # This file
```

## 📚 API Documentation

### Interview API (`/api/interview`)

#### Generate Question
```javascript
POST /api/interview
Content-Type: application/json

{
  "action": "generate",
  "topic": "JavaScript",
  "difficulty": "Medium"
}

Response:
{
  "question": "Explain closures in JavaScript..."
}
```

#### Evaluate Answer
```javascript
POST /api/interview
Content-Type: application/json

{
  "action": "evaluate",
  "question": "Explain closures...",
  "answer": "A closure is..."
}

Response:
{
  "rating": 8,
  "feedback": "Good explanation..."
}
```

### History API (`/api/history`)

#### Save History
```javascript
POST /api/history
Content-Type: application/json

{
  "topic": "JavaScript",
  "question": "Explain closures...",
  "answer": "A closure is...",
  "feedback": "Good explanation...",
  "rating": 8
}

Response:
{
  "success": true,
  "item": { ... }
}
```

#### Get History
```javascript
GET /api/history

Response:
{
  "items": [
    {
      "id": "...",
      "topic": "JavaScript",
      "rating": 8,
      "createdAt": "..."
    }
  ]
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin master
```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables (same as `.env`)
   - Click "Deploy"

3. **Configure Database**:
   - Update `DATABASE_URL` to production database
   - Run migrations: `npx prisma migrate deploy`

### Environment Variables on Vercel

Add all variables from `.env` to Vercel:
- Go to Project Settings > Environment Variables
- Add each variable one by one
- Redeploy after adding all variables

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Check connection string format
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Generate Prisma client again
npx prisma generate
```

#### 2. Clerk Authentication Error
```bash
# Verify environment variables are set
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY

# Check Clerk dashboard for correct keys
# Ensure redirect URLs are configured in Clerk
```

#### 3. Gemini AI Errors
```bash
# Verify API key is valid
# Check rate limits on Google AI Studio
# Ensure proper error handling in code
```

#### 4. Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### 5. Port Already in Use
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

## 📝 Development Tips

### Hot Reload
- The dev server supports hot module replacement
- Changes reflect automatically without refresh

### Database Changes
```bash
# After modifying schema.prisma
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Adding New UI Components
```bash
# Use Shadcn CLI
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

### Environment-specific Config
- Development: `npm run dev`
- Production: `npm run build && npm start`
- Preview builds on Vercel automatically

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run e2e tests
npm run test:e2e
```

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Supritha** - [GitHub](https://github.com/Supritha-09-byte)

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI features
- Clerk for authentication
- Vercel for hosting
- All open-source contributors

---

**Need Help?** Open an issue on GitHub or contact the development team.

**Last Updated**: November 30, 2025
