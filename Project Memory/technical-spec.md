# Technical Specification - AI PM Interview Prep

## Phase 1 Breakdown

Phase 1 focuses on establishing core infrastructure and the Question Page with Google Sheets integration.

---

## Task Breakdown (Ordered by Dependency)

### 1. Project Setup
**Goal**: Scaffolded React + Tailwind project with proper configuration

| Task | Description | Validation |
|------|-------------|------------|
| 1.1 | Initialize Vite + React project | `npm run dev` starts without errors |
| 1.2 | Configure Tailwind CSS | Test utility class renders correctly |
| 1.3 | Set up folder structure per spec | All directories exist |
| 1.4 | Configure environment variables | `.env.example` exists, `.env` in `.gitignore` |
| 1.5 | Add React Router | Navigate between `/` and `/resources` |

**Deliverable**: Empty app with routing between two placeholder pages

---

### 2. Google Sheets Integration
**Goal**: Fetch questions from Google Sheets with fallback to static data

| Task | Description | Validation |
|------|-------------|------------|
| 2.1 | Create questions service module | Unit tests pass for data transformation |
| 2.2 | Implement fetch with API key | Console logs fetched data |
| 2.3 | Add static fallback JSON | App works without API key |
| 2.4 | Create build-time fetch script | `npm run fetch-questions` updates JSON |
| 2.5 | Add error handling & loading states | UI shows appropriate states |

**Deliverable**: Questions available in app from Google Sheets or fallback

---

### 3. Core Hooks & Utilities
**Goal**: Reusable logic separated from UI components

| Task | Description | Validation |
|------|-------------|------------|
| 3.1 | `useLocalStorage` hook | Values persist across page refresh |
| 3.2 | `useTimer` hook | Timer counts up, resets, pauses correctly |
| 3.3 | `useQuestions` hook | Returns random question, filters by category |
| 3.4 | Question utility functions | Unit tests for randomization, deduplication |

**Deliverable**: All hooks working independently with tests

---

### 4. Question Page - Core UI
**Goal**: Display questions with basic interaction

| Task | Description | Validation |
|------|-------------|------------|
| 4.1 | Layout component (Header, Nav) | Responsive at all breakpoints |
| 4.2 | QuestionCard component | Displays question text and category badge |
| 4.3 | "Next Question" button | Fetches new random question |
| 4.4 | Category filter dropdown | Filters question pool correctly |
| 4.5 | Timer display with toggle | Shows/hides, resets on new question |

**Deliverable**: Functional question display with filtering and timer

---

### 5. Progress Tracking
**Goal**: Persist and display user progress

| Task | Description | Validation |
|------|-------------|------------|
| 5.1 | ProgressContext provider | State accessible throughout app |
| 5.2 | StatusSelector component | Three buttons update question status |
| 5.3 | ProgressDashboard component | Shows counts and progress bar |
| 5.4 | Recent questions tracking | Last 10 questions not repeated |
| 5.5 | Reset progress with confirmation | Modal confirms, clears localStorage |

**Deliverable**: Full progress tracking persisted to localStorage

---

### 6. Resources Page
**Goal**: Static page with curated content

| Task | Description | Validation |
|------|-------------|------------|
| 6.1 | Companies JSON data file | All 15 companies with valid links |
| 6.2 | Resources JSON data file | All topics with resources |
| 6.3 | CompanyCard component | Displays name, description, link |
| 6.4 | ResourceCard component | Displays title, description, link |
| 6.5 | TopicSection with tabs/accordion | Groups resources by topic |
| 6.6 | Responsive grid layout | Cards stack on mobile |

**Deliverable**: Complete resources page with all content

---

### 7. Polish & Testing
**Goal**: Production-ready quality

| Task | Description | Validation |
|------|-------------|------------|
| 7.1 | Cross-browser testing | Works in Chrome, Firefox, Safari, Edge |
| 7.2 | Mobile responsive testing | No layout breaks at any width |
| 7.3 | Accessibility audit | No critical WCAG violations |
| 7.4 | Performance audit | Lighthouse > 90 |
| 7.5 | Error boundary component | Graceful error handling |

**Deliverable**: Polished, tested application ready for deployment

---

## Google Sheets API Integration Architecture

### Overview

The integration follows a **hybrid approach**: build-time fetching with runtime fallback, optimizing for reliability and simplicity.

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │ Google Sheet │────▶│ Build Script │────▶│ questions.json│    │
│  │   (Source)   │     │ (fetch-questions)  │   (Bundled)  │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│         │                                          │            │
│         │ (Runtime fallback if enabled)            │            │
│         ▼                                          ▼            │
│  ┌──────────────┐                         ┌──────────────┐      │
│  │ Sheets API   │────────────────────────▶│ questionsService│   │
│  │  (Optional)  │                         │   (React App)  │    │
│  └──────────────┘                         └──────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Simplicity** | Single service module, no complex state management |
| **Testability** | Pure functions, dependency injection, mock-friendly |
| **Separation** | Data fetching isolated from UI components |
| **Security** | API key in `.env`, never in client bundle for runtime |

---

### Architecture Components

#### 1. Environment Configuration

```
.env.example
├── VITE_GOOGLE_SHEETS_ID=your_sheet_id_here
├── VITE_GOOGLE_API_KEY=your_api_key_here
└── VITE_ENABLE_RUNTIME_FETCH=false
```

**Security Rules**:
- API key only used in build scripts (Node.js environment)
- Runtime fetch disabled by default (uses bundled JSON)
- If runtime fetch enabled, use a restricted API key (HTTP referrer locked)

#### 2. File Structure

```
src/
├── services/
│   └── questionsService.js    # Data fetching logic
├── data/
│   └── questions.json         # Static fallback (committed)
├── hooks/
│   └── useQuestions.js        # React hook consuming service
└── utils/
    └── questionTransformers.js # Data transformation functions

scripts/
└── fetch-questions.js         # Build-time fetch script
```

#### 3. Service Module Design

```javascript
// src/services/questionsService.js

// Clean interface - components don't know data source
export const questionsService = {
  getAll: () => Promise<Question[]>,
  getByCategory: (category: string) => Promise<Question[]>,
  getCategories: () => Promise<string[]>,
  getRandom: (exclude?: string[]) => Promise<Question>
}
```

**Implementation Strategy**:

```javascript
// Simplified pseudocode
async function getAll() {
  // 1. Try runtime fetch if enabled
  if (RUNTIME_FETCH_ENABLED && API_KEY) {
    try {
      return await fetchFromGoogleSheets();
    } catch (error) {
      console.warn('Runtime fetch failed, using fallback');
    }
  }

  // 2. Fall back to bundled JSON
  return import('../data/questions.json');
}
```

#### 4. Data Transformation Layer

```javascript
// src/utils/questionTransformers.js

// Transform raw sheet data to app format
export function transformSheetRow(row) {
  return {
    id: generateId(row),
    question: sanitizeText(row.question),
    category: normalizeCategory(row.category)
  };
}

// Validate data integrity
export function validateQuestion(q) {
  return Boolean(q.id && q.question && q.category);
}

// Filter invalid entries
export function sanitizeQuestions(questions) {
  return questions.filter(validateQuestion);
}
```

#### 5. Build Script

```javascript
// scripts/fetch-questions.js
// Run with: node scripts/fetch-questions.js

// 1. Fetch from Google Sheets API
// 2. Transform to app format
// 3. Validate data
// 4. Write to src/data/questions.json
// 5. Log summary (count, categories)
```

**NPM Script**:
```json
{
  "scripts": {
    "fetch-questions": "node scripts/fetch-questions.js",
    "prebuild": "npm run fetch-questions"
  }
}
```

---

### Google Sheets API Setup

#### Option A: Public Sheet (Simplest)
1. Make Google Sheet publicly viewable
2. Use Sheets API with just the sheet ID
3. No API key required for read-only public data

**Pros**: Simple, no key management
**Cons**: Sheet must be public

#### Option B: API Key (Recommended)
1. Create Google Cloud project
2. Enable Google Sheets API
3. Create API key with restrictions:
   - HTTP referrers (for runtime): `https://yourdomain.com/*`
   - API restrictions: Google Sheets API only

**Pros**: Sheet can remain private, controlled access
**Cons**: Key management, quota limits

#### API Endpoint

```
GET https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}
```

**Example**:
```
GET https://sheets.googleapis.com/v4/spreadsheets/1tNUIgrWR_e9BOLioJmAxqvi-BOIV6C8X4UfF8zWDUWk/values/Sheet1!A:C?key=YOUR_KEY
```

**Response Format**:
```json
{
  "values": [
    ["Question", "Category", "Difficulty"],
    ["How would you...", "Product Strategy", "Medium"],
    ["Describe a time...", "Behavioral", "Easy"]
  ]
}
```

---

### Error Handling Strategy

```
┌─────────────────────────────────────────┐
│           Error Scenarios               │
├─────────────────────────────────────────┤
│                                         │
│  API Key Invalid ──▶ Use fallback JSON  │
│  Network Error ────▶ Use fallback JSON  │
│  Rate Limited ─────▶ Use fallback JSON  │
│  Invalid Data ─────▶ Filter + warn      │
│  Empty Response ───▶ Use fallback JSON  │
│  Fallback Missing ─▶ Show error UI      │
│                                         │
└─────────────────────────────────────────┘
```

**User-Facing States**:
- Loading: Skeleton/spinner while fetching
- Success: Display questions
- Fallback: Display questions (user unaware)
- Error: "Unable to load questions. Please refresh."

---

### Testing Strategy

#### Unit Tests (questionsService)

```javascript
describe('questionsService', () => {
  it('returns questions from API when available', async () => {
    mockFetch(mockApiResponse);
    const questions = await questionsService.getAll();
    expect(questions).toHaveLength(50);
  });

  it('falls back to static JSON on API error', async () => {
    mockFetch(new Error('Network error'));
    const questions = await questionsService.getAll();
    expect(questions).toHaveLength(/* fallback count */);
  });

  it('filters by category correctly', async () => {
    const questions = await questionsService.getByCategory('Ethics');
    expect(questions.every(q => q.category === 'Ethics')).toBe(true);
  });

  it('excludes recently shown questions', async () => {
    const exclude = ['q1', 'q2', 'q3'];
    const question = await questionsService.getRandom(exclude);
    expect(exclude).not.toContain(question.id);
  });
});
```

#### Integration Tests (useQuestions hook)

```javascript
describe('useQuestions', () => {
  it('provides loading state while fetching', () => {
    const { result } = renderHook(() => useQuestions());
    expect(result.current.isLoading).toBe(true);
  });

  it('provides questions after loading', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useQuestions());
    await waitForNextUpdate();
    expect(result.current.questions.length).toBeGreaterThan(0);
  });
});
```

---

### Security Checklist

- [ ] API key stored in `.env` (not committed)
- [ ] `.env` listed in `.gitignore`
- [ ] `.env.example` has placeholder values only
- [ ] API key restricted to Sheets API only
- [ ] API key restricted by HTTP referrer (if runtime)
- [ ] No sensitive data in client bundle
- [ ] Build script runs in Node.js (server-side)
- [ ] Fallback JSON contains no sensitive data

---

### Caching Strategy

| Layer | Strategy | TTL |
|-------|----------|-----|
| Build-time | JSON bundled in app | Until next deploy |
| Runtime (if enabled) | Browser memory | Session |
| Service worker (future) | Cache API | 24 hours |

**Recommendation**: Start with build-time only. Add runtime fetch later if real-time updates needed.

---

## Data Schema

### questions.json

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-15T10:00:00Z",
  "questions": [
    {
      "id": "q_001",
      "question": "How would you prioritize features for an AI product with limited training data?",
      "category": "Product Strategy"
    }
  ],
  "categories": [
    "Product Strategy",
    "AI/ML Concepts",
    "Ethics",
    "Behavioral",
    "Technical"
  ]
}
```

### localStorage Schema

```json
{
  "aipm_progress": {
    "q_001": {
      "status": "mastered",
      "lastPracticed": "2024-01-15T10:30:00Z",
      "practiceCount": 3
    }
  },
  "aipm_settings": {
    "timerVisible": true,
    "selectedCategory": "all",
    "recentQuestions": ["q_005", "q_012"]
  }
}
```

---

## Development Workflow

1. **Local Development**
   - Copy `.env.example` to `.env`
   - Add API key (or use fallback JSON)
   - Run `npm run dev`

2. **Updating Questions**
   - Run `npm run fetch-questions`
   - Review changes in `questions.json`
   - Commit updated JSON

3. **Deployment**
   - CI runs `npm run fetch-questions` before build
   - Fresh questions bundled with each deploy
   - No runtime API calls needed

---

## Recommended Implementation Order

```
Week 1: Foundation
├── Task 1.1-1.5 (Project Setup)
├── Task 2.1-2.3 (Sheets Integration Core)
└── Task 3.1-3.4 (Hooks & Utilities)

Week 2: Question Page
├── Task 4.1-4.5 (Question UI)
├── Task 5.1-5.5 (Progress Tracking)
└── Task 2.4-2.5 (Build Script & Polish)

Week 3: Resources & Polish
├── Task 6.1-6.6 (Resources Page)
└── Task 7.1-7.5 (Testing & Polish)
```
