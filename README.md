# AI PM Interview Prep

A web application to help Product Managers prepare for AI-focused interviews. Practice with curated questions, track your progress, and explore resources from top AI companies.

## Features

- **Question Practice** - Random questions from 7 categories with timer
- **Progress Tracking** - Mark questions as "Needs Practice", "Comfortable", or "Mastered"
- **Category Filtering** - Focus on specific topics like AI Ethics, Product Strategy, etc.
- **Timer** - Track how long you spend on each question (toggleable)
- **AI Resources** - Curated links to 15 top AI companies and 21 learning resources
- **Offline Support** - All data stored locally, works without internet

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:data` | Run data validation tests |
| `npm run fetch-questions` | Fetch questions from Google Sheets |

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Header, navigation
│   ├── Questions/       # Question card, timer, progress
│   └── Resources/       # Company and resource cards
├── pages/
│   ├── QuestionsPage.jsx
│   └── ResourcesPage.jsx
├── hooks/               # useLocalStorage, useTimer, useQuestions
├── services/            # Questions service with CSV parser
└── data/                # JSON data files
```

## Google Sheets Integration

To sync questions from a Google Sheet:

1. Copy `.env.example` to `.env`
2. Add your Google Sheets ID and API key
3. Run `npm run fetch-questions`

```bash
cp .env.example .env
# Edit .env with your credentials
npm run fetch-questions
```

**Security Note**: API keys are only used in build scripts and are never exposed to the browser.

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router

## Data

- **25 practice questions** across 7 categories
- **15 AI companies** with career links
- **21 learning resources** covering MCP, RAG, fine-tuning, ethics, and more

## License

MIT
