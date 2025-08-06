# 🧠 MindfulAI Chat - Your AI-Powered Mental Wellness Companion

[![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Overview

**MindfulAI Chat** is an innovative AI-powered platform designed to combat online harassment and promote digital well-being. Built with cutting-edge technology, it provides real-time support, intelligent monitoring, and personalized wellness recommendations to create a safer digital environment for everyone.

## ✨ Key Features

### 🤖 AI-Powered Support
- **Real-time AI Chat Support** with advanced sentiment analysis
- **24/7 Emotional Support** through intelligent conversation
- **Personalized Recommendations** based on user behavior patterns

### 🛡️ Safety & Monitoring
- **Advanced Harassment Detection** using AI algorithms
- **Real-time Monitoring Dashboard** with comprehensive analytics
- **Automated Safety Alerts** and intervention triggers
- **Digital Threat Assessment** and reporting

### 👥 Community Support
- **AI-matched Support Groups** based on shared experiences
- **Safe Community Spaces** for peer support
- **Professional Help Matching** with verified mental health resources
- **Emergency Response System** with quick access to crisis support

### 📊 Wellness Analytics
- **Digital Well-being Tracking** with detailed insights
- **Mood Pattern Analysis** over time
- **Social Media Usage Monitoring** and healthy habit recommendations
- **Progress Tracking** with visual dashboards

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MindfulAI-Chat.git
cd MindfulAI-Chat

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_COHERE_API_KEY=your_cohere_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: Cohere AI + OpenAI GPT
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js for data visualization
- **Routing**: React Router v6
- **Build Tool**: Vite

### Project Structure
```
MindfulAI-Chat/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   ├── lib/               # Utility functions & API clients
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles
├── public/                # Static assets
├── docs/                  # Documentation
└── tests/                 # Test files
```

## 🎯 Core Components

### AI Chat Interface (`src/components/AIChat.tsx`)
- Real-time conversational AI
- Sentiment analysis integration
- Context-aware responses

### Monitoring Dashboard (`src/components/MonitoringDashboard.tsx`)
- Real-time harassment detection
- User activity analytics
- Safety score visualization

### Support Circle (`src/pages/SupportCircle.tsx`)
- Community support matching
- Group chat functionality
- Resource sharing

### Safety Plan (`src/components/SafetyPlan.tsx`)
- Personalized safety protocols
- Emergency contact management
- Crisis intervention workflows

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run test suite
npm run test:ui      # Run tests with UI
```

### API Integration

The application integrates with multiple AI services:

- **Cohere AI**: Natural language processing and sentiment analysis
- **OpenAI GPT**: Advanced conversation and content generation
- **Supabase**: Real-time database and authentication

## 🎨 UI/UX Design

### Design Principles
- **Accessibility First**: WCAG 2.1 compliant
- **Mobile Responsive**: Works on all device sizes
- **Dark Mode Support**: System preference detection
- **Intuitive Navigation**: User-friendly interface

### Color Palette
- **Primary**: Calming blues (#3B82F6, #1E40AF)
- **Secondary**: Warm oranges (#F97316, #EA580C)
- **Success**: Positive greens (#10B981, #059669)
- **Warning**: Attention yellows (#F59E0B, #D97706)
- **Error**: Safety reds (#EF4444, #DC2626)

## 🛡️ Security & Privacy

- **End-to-end encryption** for sensitive conversations
- **GDPR compliant** data handling
- **Anonymous usage** options available
- **Regular security audits** and updates

## 📊 Performance

- **Lightning Fast**: Optimized with Vite and code splitting
- **PWA Ready**: Installable as a progressive web app
- **Offline Support**: Service worker integration
- **SEO Optimized**: Meta tags and structured data

## 🙏 Acknowledgments

- Built with love for mental health awareness
- Thanks to all contributors and the open-source community
- Special thanks to mental health professionals who provided guidance

---

<div align="center">
  
**Made with ❤️ for a safer digital world**

[⭐ Star this repo](https://github.com/yourusername/MindfulAI-Chat) | [🐛 Report Bug](https://github.com/yourusername/MindfulAI-Chat/issues) | [💡 Request Feature](https://github.com/yourusername/MindfulAI-Chat/issues)

</div>
