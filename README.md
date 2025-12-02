# 🎯 AI Career Coach

[![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.2.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Your Smart Guide for Professional Success - An AI-powered career development platform with personalized interview preparation, industry insights, and intelligent resume building.

![AI Career Coach Banner](public/banner.png)

## ✨ Features

### 🔐 **Secure Authentication**
- Seamless sign-in/sign-up with Clerk
- Protected routes and user session management
- OAuth integration support

### 📊 **Industry Insights Dashboard**
- AI-generated salary ranges by role and location
- Real-time growth rate analysis
- Market demand indicators
- Top skills recommendations
- Industry-specific trends and outlook

### 🎤 **AI Interview Preparation**
- **Smart Question Generation**
  - Topic-based questions (JavaScript, Python, Data Structures, etc.)
  - Multiple difficulty levels (Beginner, Intermediate, Advanced)
  - Industry-specific scenarios
  
- **Intelligent Answer Evaluation**
  - Real-time AI scoring (1-10 scale)
  - Detailed constructive feedback
  - Personalized improvement suggestions
  
- **Flexible Interview Modes**
  - Single Question: Practice one question at a time
  - Session Mode: Complete structured interview sessions
  - Timer support for realistic practice
  - Voice input capability

### 📈 **Performance Analytics**
- Comprehensive history tracking
- Progress visualization with charts
- Performance trends over time
- Topic-wise analysis
- Score breakdown and statistics

### 🎮 **Gamification System**
- Points and XP system
- Level progression (1-100)
- Daily streak tracking
- Achievement badges
- Leaderboard (coming soon)

### 📄 **AI Resume Builder**
- Intelligent resume generation
- Industry-optimized formatting
- ATS-friendly templates
- Dynamic section editing

### 🎨 **Modern UI/UX**
- Beautiful gradient animations
- Dark mode support
- Responsive design for all devices
- Smooth transitions and interactions
- Accessibility-focused components

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ 
- PostgreSQL 14+ (or cloud database)
- npm/pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Supritha-09-byte/Major_Project.git

# Navigate to project directory
cd Major_Project/ai-career-coach

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma generate
npx prisma migrate deploy

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_career_coach"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Inngest (Optional)
INNGEST_EVENT_KEY="your_event_key"
INNGEST_SIGNING_KEY="your_signing_key"
```

### Getting API Keys

1. **Database** ([Neon](https://neon.tech) / [Supabase](https://supabase.com))
   - Sign up and create a new project
   - Copy the PostgreSQL connection string

2. **Clerk** ([clerk.com](https://clerk.com))
   - Create an application
   - Get API keys from the dashboard

3. **Google Gemini AI** ([makersuite.google.com](https://makersuite.google.com/app/apikey))
   - Sign in with Google
   - Generate an API key

4. **Inngest** ([inngest.com](https://inngest.com)) - Optional
   - Create an app
   - Get event and signing keys

## 🏗 Project Structure

```
ai-career-coach/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application
│   │   ├── dashboard/     # Industry insights
│   │   ├── interview/     # Interview preparation
│   │   ├── resume/        # Resume builder
│   │   └── onboarding/    # User onboarding
│   └── api/               # API routes
├── actions/               # Server actions
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                   # Utilities & helpers
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── data/                 # Static data files
```

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | JavaScript (JSX) |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | Clerk |
| **AI/ML** | Google Gemini AI (LangChain) |
| **UI Components** | Shadcn/ui + Radix UI |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Notifications** | Sonner |
| **Background Jobs** | Inngest |
| **Deployment** | Vercel |

## 📖 Documentation

- [Complete Setup Guide](SETUP_GUIDE.md) - Detailed installation and configuration
- [Architecture Diagram](ARCHITECTURE.md) - System design and data flow
- [API Documentation](SETUP_GUIDE.md#-api-documentation) - Endpoint reference

## 🎯 Usage Examples

### Interview Preparation Flow

1. **Sign In** → Navigate to Interview section
2. **Select Settings** → Choose topic, difficulty, and mode
3. **Generate Question** → AI creates a relevant question
4. **Type/Speak Answer** → Provide your response
5. **Get Feedback** → Receive AI evaluation and score
6. **Track Progress** → View analytics and history

### Industry Insights

1. **Complete Onboarding** → Select your industry
2. **View Dashboard** → See AI-generated insights
3. **Explore Data** → Salary ranges, growth rates, skills
4. **Update Weekly** → Fresh insights every 7 days

## 📊 Screenshots

<div align="center">
  <img src="docs/screenshots/homepage.png" alt="Homepage" width="45%">
  <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="45%">
  <img src="docs/screenshots/interview.png" alt="Interview" width="45%">
  <img src="docs/screenshots/analytics.png" alt="Analytics" width="45%">
</div>

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database management
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create migration
npx prisma db push       # Push schema changes
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use meaningful variable names
- Comment complex logic
- Write clean, maintainable code

## 🐛 Known Issues & Fixes

### Database Connection Error
```bash
# Regenerate Prisma client
npx prisma generate
```

### Unique Constraint Error
```bash
# Reset database (caution: deletes data)
npx prisma migrate reset
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

## 📝 Changelog

### Version 1.0.0 (November 2025)
- ✅ Initial release
- ✅ AI-powered interview preparation
- ✅ Industry insights dashboard
- ✅ Performance analytics
- ✅ Gamification system
- ✅ Resume builder
- ✅ Modern UI with animations

### Upcoming Features
- 🔜 Cover letter generation
- 🔜 Mock video interviews
- 🔜 Peer comparison leaderboard
- 🔜 Advanced analytics
- 🔜 Mobile app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev) - Powering intelligent features
- [Clerk](https://clerk.com) - Authentication solution
- [Vercel](https://vercel.com) - Hosting platform
- [Shadcn/ui](https://ui.shadcn.com) - UI components
- [Prisma](https://prisma.io) - Database ORM
- All open-source contributors

## 📞 Support

- 📧 Email: support@aicareercoach.com
- 🐛 Issues: [GitHub Issues](https://github.com/Supritha-09-byte/Major_Project/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Supritha-09-byte/Major_Project/discussions)

## 👥 Team

- **Supritha** - Lead Developer - [@Supritha-09-byte](https://github.com/Supritha-09-byte)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

## 🔗 Links

- **Live Demo**: [https://ai-career-coach.vercel.app](https://ai-career-coach.vercel.app)
- **Documentation**: [Setup Guide](SETUP_GUIDE.md)
- **Architecture**: [System Design](ARCHITECTURE.md)
- **Repository**: [GitHub](https://github.com/Supritha-09-byte/Major_Project)

---

<div align="center">
  Made with ❤️ by Supritha
  
  **[Website](https://ai-career-coach.vercel.app)** • 
  **[Documentation](SETUP_GUIDE.md)** • 
  **[Report Bug](https://github.com/Supritha-09-byte/Major_Project/issues)** • 
  **[Request Feature](https://github.com/Supritha-09-byte/Major_Project/issues)**
</div>
