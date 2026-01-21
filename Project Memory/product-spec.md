# AI PM Interview Prep - Product Specification

## Overview

A web application designed to help Product Managers prepare for AI-focused PM interviews. The platform provides randomized practice questions with progress tracking and curated AI learning resources.

---

## Tech Stack

- **Frontend Framework**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: React Context + localStorage
- **Build Tool**: Vite
- **Deployment**: Static hosting (Vercel, Netlify, or GitHub Pages)

---

## Design Requirements

### Responsive Design
- **Desktop**: Full-featured layout with sidebar navigation
- **Tablet**: Adaptive layout with collapsible navigation
- **Mobile**: Single-column layout with hamburger menu
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### UI Principles
- Clean, minimal interface focused on content
- High contrast for readability
- Accessible (WCAG 2.1 AA compliant)
- Dark/light mode support (optional enhancement)

---

## Site Structure

```
/                     → Interview Question Page (Home)
/resources            → AI Resources Page
```

---

## Page 1: Interview Question Page

### Purpose
Allow PMs to practice AI interview questions one at a time with progress tracking and timing.

### Data Source
- **Source**: [Google Sheets - AI PM Interview Questions](https://docs.google.com/spreadsheets/d/1tNUIgrWR_e9BOLioJmAxqvi-BOIV6C8X4UfF8zWDUWk/edit?usp=sharing)
- **Integration**: Export as JSON/CSV and bundle with app, or fetch via Google Sheets API
- **Assumed Data Structure**:
  ```json
  {
    "id": "string (unique identifier)",
    "question": "string (the interview question text)",
    "category": "string (e.g., 'Product Strategy', 'AI/ML Concepts', 'Ethics')"
  }
  ```

### Features

#### 1. Question Display
- Show one randomly selected question at a time
- Display question text prominently (large, readable font)
- Show question category as a badge/tag above the question
- **"Next Question" button**: Fetches a new random question
  - Should not repeat recently shown questions (track last 10)
  - Visual feedback on click (loading state)

#### 2. Category Filtering
- Dropdown or button group to filter questions by category
- "All Categories" option as default
- Show count of questions per category
- Filter persists across sessions (stored in localStorage)

#### 3. Timer (Stopwatch)
- **Behavior**: Counts up from 0:00 when question is displayed
- **Format**: MM:SS (e.g., 02:45)
- **Reset**: Timer resets when "Next Question" is clicked
- **Toggle visibility**: Show/hide button (eye icon)
  - Default state: visible
  - Preference saved to localStorage
- **Display**: Positioned prominently but not distracting (top-right or below question)

#### 4. Progress Tracking
- **Storage**: localStorage (no authentication required)
- **Status Options** for each question:
  - `not_practiced` (default) - Gray indicator
  - `needs_practice` - Red/orange indicator
  - `comfortable` - Yellow indicator
  - `mastered` - Green indicator

- **UI Elements**:
  - Status selector buttons below each question
  - Quick-action to mark status while practicing
  - Status persists and shows when question appears again

- **Progress Dashboard** (sidebar or header component):
  - Total questions practiced: X / Total
  - Breakdown by status:
    - Needs Practice: X
    - Comfortable: X
    - Mastered: X
  - Progress bar visualization
  - "Reset Progress" button with confirmation modal

#### 5. Question History
- Track which questions have been practiced (with timestamps)
- Option to "Practice Again" for previously seen questions
- Filter to show only unpracticed questions

### Wireframe - Question Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] AI PM Interview Prep          [Questions] [Resources]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Category: [Product Strategy ▼]     Timer: 02:45 [👁]│    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │  "How would you prioritize features for an AI       │    │
│  │   product when you have limited training data?"     │    │
│  │                                                      │    │
│  │  [AI/ML Concepts]                                   │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Mark as:  [Needs Practice] [Comfortable] [Mastered]        │
│                                                              │
│            ┌──────────────────┐                              │
│            │   Next Question  │                              │
│            └──────────────────┘                              │
│                                                              │
│  ─────────────────────────────────────────────────────      │
│  Progress: ████████░░░░░░░░░░ 45/100 practiced              │
│  Mastered: 12 | Comfortable: 20 | Needs Practice: 13        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### localStorage Schema

```javascript
{
  "aipm_questions_progress": {
    "q_001": {
      "status": "mastered",
      "lastPracticed": "2024-01-15T10:30:00Z",
      "practiceCount": 3
    },
    "q_002": {
      "status": "needs_practice",
      "lastPracticed": "2024-01-14T09:00:00Z",
      "practiceCount": 1
    }
  },
  "aipm_settings": {
    "timerVisible": true,
    "selectedCategory": "all",
    "recentQuestions": ["q_005", "q_012", "q_003"]
  }
}
```

---

## Page 2: AI Resources Page

### Purpose
Curated collection of free resources to help PMs learn about AI concepts and find job opportunities.

### Sections

#### 1. Top AI Companies Hiring

A curated list of leading AI companies with direct links to their careers pages.

| Company | Description | Careers Link |
|---------|-------------|--------------|
| OpenAI | Creator of ChatGPT and GPT models | careers.openai.com |
| Anthropic | AI safety company, creator of Claude | anthropic.com/careers |
| Google DeepMind | AI research laboratory | deepmind.google/careers |
| Meta AI | AI research at Meta | metacareers.com |
| Microsoft AI | Azure AI and Copilot products | careers.microsoft.com |
| Amazon (AWS AI) | AI/ML services on AWS | amazon.jobs |
| Cohere | Enterprise LLM platform | cohere.com/careers |
| Hugging Face | Open-source AI community | huggingface.co/jobs |
| Scale AI | Data platform for AI | scale.com/careers |
| Runway | AI for creative tools | runwayml.com/careers |
| Stability AI | Open generative AI | stability.ai/careers |
| Midjourney | AI image generation | (link) |
| Perplexity | AI-powered search | perplexity.ai/careers |
| Character.AI | Conversational AI | character.ai/careers |
| Inflection AI | Personal AI assistants | inflection.ai/careers |

**Display Format**:
- Card layout (grid on desktop, stack on mobile)
- Company logo (if available) or placeholder
- Company name (prominent)
- One-line description
- "View Careers" button/link

#### 2. Topic-Based Learning Resources

Resources grouped by key AI concepts relevant to PM interviews.

##### MCP (Model Context Protocol)
| Title | Description | Link |
|-------|-------------|------|
| Anthropic MCP Documentation | Official docs for Model Context Protocol | modelcontextprotocol.io |
| MCP Quickstart Guide | Getting started with MCP integration | (link) |
| Building with MCP | Tutorial on building MCP servers | (link) |

##### RAG (Retrieval-Augmented Generation)
| Title | Description | Link |
|-------|-------------|------|
| What is RAG? | LangChain's comprehensive RAG guide | langchain.com |
| RAG vs Fine-tuning | When to use each approach | (blog link) |
| Building RAG Applications | Practical tutorial with examples | (link) |

##### Fine-tuning
| Title | Description | Link |
|-------|-------------|------|
| OpenAI Fine-tuning Guide | Official fine-tuning documentation | platform.openai.com |
| When to Fine-tune | Decision framework for fine-tuning | (link) |
| Fine-tuning Best Practices | Tips for effective model customization | (link) |

##### AI Ethics & Safety
| Title | Description | Link |
|-------|-------------|------|
| AI Ethics Guidelines | Google's responsible AI practices | ai.google/responsibility |
| Anthropic's Core Views on AI Safety | AI safety research principles | anthropic.com |
| NIST AI Risk Framework | Government AI risk management | nist.gov |

##### Prompt Engineering
| Title | Description | Link |
|-------|-------------|------|
| Prompt Engineering Guide | Comprehensive prompting techniques | promptingguide.ai |
| OpenAI Prompt Best Practices | Official prompting documentation | platform.openai.com |
| Anthropic Prompt Library | Example prompts and patterns | docs.anthropic.com |

##### LLM Fundamentals
| Title | Description | Link |
|-------|-------------|------|
| What are LLMs? | Beginner's guide to large language models | (link) |
| Transformer Architecture | Visual explanation of transformers | jalammar.github.io |
| Token Economics | Understanding tokens and pricing | (link) |

##### AI Product Management
| Title | Description | Link |
|-------|-------------|------|
| AI Product Management 101 | Lenny's Newsletter guide | lennysnewsletter.com |
| Building AI Products | Reforge's AI PM course overview | reforge.com |
| AI PM Interview Guide | Common questions and frameworks | (link) |

### Wireframe - Resources Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] AI PM Interview Prep          [Questions] [Resources]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  # AI Resources for PM Interview Prep                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ## Top AI Companies Hiring                          │    │
│  │                                                      │    │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐             │    │
│  │ │  OpenAI  │ │Anthropic │ │ DeepMind │             │    │
│  │ │  ──────  │ │  ──────  │ │  ──────  │             │    │
│  │ │ ChatGPT  │ │  Claude  │ │ Research │             │    │
│  │ │[Careers] │ │[Careers] │ │[Careers] │             │    │
│  │ └──────────┘ └──────────┘ └──────────┘             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ## Learning Resources                               │    │
│  │                                                      │    │
│  │ [MCP] [RAG] [Fine-tuning] [Ethics] [Prompting] ... │    │
│  │                                                      │    │
│  │ ### MCP (Model Context Protocol)                    │    │
│  │ ┌────────────────────────────────────────────────┐ │    │
│  │ │ Anthropic MCP Documentation                    │ │    │
│  │ │ Official docs for Model Context Protocol  [→] │ │    │
│  │ └────────────────────────────────────────────────┘ │    │
│  │ ┌────────────────────────────────────────────────┐ │    │
│  │ │ MCP Quickstart Guide                          │ │    │
│  │ │ Getting started with MCP integration      [→] │ │    │
│  │ └────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── Questions/
│   │   ├── QuestionCard.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Timer.jsx
│   │   ├── StatusSelector.jsx
│   │   └── ProgressDashboard.jsx
│   └── Resources/
│       ├── CompanyCard.jsx
│       ├── ResourceCard.jsx
│       └── TopicSection.jsx
├── pages/
│   ├── QuestionsPage.jsx
│   └── ResourcesPage.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── useTimer.js
│   └── useQuestions.js
├── context/
│   └── ProgressContext.jsx
├── data/
│   ├── questions.json
│   ├── companies.json
│   └── resources.json
├── utils/
│   └── questionUtils.js
└── App.jsx
```

---

## User Flows

### Flow 1: First-Time User Practicing Questions

1. User lands on Question Page
2. Random question displayed with timer starting at 0:00
3. User reads question and thinks through answer
4. User clicks status button (Needs Practice / Comfortable / Mastered)
5. User clicks "Next Question"
6. New random question appears, timer resets
7. Progress bar updates to show 1/X practiced

### Flow 2: Returning User Filtering by Category

1. User returns to site (localStorage loads previous progress)
2. User clicks category dropdown
3. Selects "AI Ethics" category
4. Question pool filtered to ethics questions only
5. Random question from filtered pool displayed
6. Category filter persists on next visit

### Flow 3: User Exploring Resources

1. User clicks "Resources" in navigation
2. Scrolls through AI companies section
3. Clicks "View Careers" on Anthropic card
4. Opens career page in new tab
5. Returns to app, scrolls to learning resources
6. Clicks on RAG topic tab
7. Browses RAG resources, clicks to read article

---

## Data Management

### Questions Data
- Source from Google Sheets (export to JSON)
- Bundle with application build
- Update periodically via manual export or CI/CD pipeline

### Progress Data
- Stored entirely in localStorage
- No server-side persistence
- User can export/import progress (optional enhancement)

### Resources Data
- Curated manually in JSON files
- Easy to update without code changes
- Validate links periodically

---

## Accessibility Requirements

- All interactive elements keyboard navigable
- ARIA labels on buttons and controls
- Color contrast ratio minimum 4.5:1
- Focus indicators visible
- Screen reader compatible
- Timer can be hidden for reduced distraction

---

## Performance Requirements

- Initial load: < 2 seconds on 3G
- Time to interactive: < 3 seconds
- Bundle size: < 200KB gzipped
- Lighthouse score: > 90 (Performance, Accessibility, Best Practices)

---

## Future Enhancements (Out of Scope for V1)

1. **Answer Hints**: Optional hints or model answers for questions
2. **Spaced Repetition**: Smart algorithm to resurface questions needing practice
3. **Mock Interview Mode**: Timed series of questions simulating real interview
4. **Community Answers**: User-submitted answers (requires backend)
5. **Dark Mode**: Theme toggle for dark/light mode
6. **Export Progress**: Download progress as JSON for backup
7. **Share Progress**: Generate shareable progress card image
8. **Additional Question Sources**: Integration with more question banks

---

## Success Metrics

- **Engagement**: Average questions practiced per session
- **Retention**: Users returning within 7 days
- **Completion**: % of users who practice all questions
- **Resource Clicks**: CTR on resource and career links

---

## Launch Checklist

- [ ] Questions data imported from Google Sheets
- [ ] All company career links verified
- [ ] All resource links verified
- [ ] Mobile responsive testing complete
- [ ] localStorage functionality tested across browsers
- [ ] Accessibility audit passed
- [ ] Performance audit passed
- [ ] Analytics/tracking configured (optional)
- [ ] Deployed to production hosting
