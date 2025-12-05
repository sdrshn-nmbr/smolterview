# Frontend/Product Engineer Interview

## Overview

Welcome! This interview evaluates your ability to build and extend a real-world React application. You'll be working on **Smolpo** - a lightweight customer feedback management dashboard.

**Time Allotment:** 90 minutes (flexible)

**What we're evaluating:**
- React & TypeScript proficiency
- API integration and data handling
- Component architecture decisions
- Problem-solving approach
- Code quality and organization

**What we're NOT evaluating:**
- Memorization of syntax (use Coderpad AI, Google, docs freely)
- CSS/styling perfection (functional > pretty)
- Speed over quality

---

## The Product

Smolpo is a customer feedback dashboard that allows product teams to:
1. View incoming feedback from customers
2. Categorize and prioritize feedback
3. Track feedback status (new → in-review → resolved → archived)
4. View analytics on feedback trends

You've been given a partially implemented codebase. Your job is to complete the missing functionality.

---

## Part 1: Practical Implementation (60 minutes)

### Task 1: Complete the Feedback List Component
**File:** `src/components/FeedbackList.tsx`

The FeedbackList component is partially implemented. You need to:
- [ ] Fetch feedback data from the API on component mount
- [ ] Implement filtering by status (dropdown is provided but not wired up)
- [ ] Implement sorting by date or priority
- [ ] Handle loading and error states appropriately

### Task 2: Build the Feedback Detail Modal
**File:** `src/components/FeedbackDetail.tsx`

When a user clicks on a feedback item, show a modal with:
- [ ] Full feedback details (currently only shows a placeholder)
- [ ] Ability to change the feedback status via dropdown
- [ ] A notes field where team members can add internal notes
- [ ] Save changes to the API (optimistic updates preferred)

### Task 3: Implement the Analytics Summary
**File:** `src/components/AnalyticsSummary.tsx`

Build a summary component that shows:
- [ ] Total feedback count
- [ ] Breakdown by status (new, in-review, resolved, archived)
- [ ] Average time to resolution (for resolved items)
- [ ] This data should update when feedback changes

### Task 4: Add Search Functionality
**File:** `src/components/SearchBar.tsx`

Implement a search feature that:
- [ ] Searches across feedback title AND content
- [ ] Debounces API calls (300ms recommended)
- [ ] Shows search results with highlighted matches (bonus)

---

## Part 2: Theoretical Questions (20 minutes)

Answer these in `ANSWERS.md`. Be concise but thorough.

### Question 1: State Management
The current app uses React's built-in useState/useContext. At what point would you recommend migrating to a dedicated state management library (Redux, Zustand, Jotai, etc.)? What factors would influence your decision?

### Question 2: Performance
A customer reports that the feedback list becomes sluggish when they have 10,000+ feedback items. Without changing the backend, what frontend optimizations would you implement? List at least 3 approaches with trade-offs.

### Question 3: API Design
You notice the current API returns ALL feedback data in a single call. Propose a better API design that would improve performance and UX. Include endpoint signatures.

### Question 4: Testing Strategy
If you had to add tests to this codebase, what would you prioritize? Describe your testing strategy including what tools you'd use and what you'd test first.

### Question 5: Accessibility
What accessibility concerns do you see in this codebase? How would you address them?

---

## Part 3: Bonus Challenges (if time permits)

- [ ] Add keyboard navigation to the feedback list
- [ ] Implement real-time updates using polling or websockets mock
- [ ] Add bulk actions (select multiple → change status)
- [ ] Create a simple chart visualization for the analytics

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run tests (if you write any)
npm test
```

The mock API server runs automatically with the dev server.

---

## Project Structure

```
src/
├── api/
│   └── feedbackApi.ts      # API client - DO NOT MODIFY
├── components/
│   ├── FeedbackList.tsx    # Task 1
│   ├── FeedbackDetail.tsx  # Task 2
│   ├── AnalyticsSummary.tsx# Task 3
│   ├── SearchBar.tsx       # Task 4
│   └── common/             # Reusable components
├── hooks/
│   └── useFeedback.ts      # Custom hooks (extend as needed)
├── types/
│   └── feedback.ts         # TypeScript types
├── context/
│   └── FeedbackContext.tsx # Global state
├── utils/
│   └── helpers.ts          # Utility functions
└── App.tsx                 # Main app component
```

---

## Evaluation Rubric

| Criteria | Poor | Good | Excellent |
|----------|------|------|-----------|
| **Functionality** | Tasks incomplete or broken | Core tasks work | All tasks + bonus |
| **Code Quality** | Messy, hard to follow | Clean, organized | Exemplary patterns |
| **TypeScript** | Many `any` types | Proper typing | Advanced types |
| **Error Handling** | None | Basic try/catch | Graceful UX |
| **Architecture** | All in one file | Good separation | Reusable patterns |

---

## Tips

1. **Read the existing code first** - understand the patterns before adding new code
2. **Start with Task 1** - it unlocks context for other tasks
3. **Ask questions** - clarifying requirements shows good product sense
4. **Commit often** - we want to see your thought process
5. **It's okay to not finish** - quality over quantity

Good luck!
