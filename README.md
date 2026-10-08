<<<<<<< HEAD
# Straight to the Top ⇡

> A GitHub-inspired daily habit tracker and reflection journal built for continuous, visible self-improvement.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**Straight to the Top** translates the proven motivation of GitHub's contribution system into everyday personal habits and mindfulness. 

Every day of the month is represented by a small tile whose color and count reflect the percentage of habits completed. Combined with an end-of-day reflection journal, tomorrow's preset planner, and a gamified mountain climb visualizer, it turns daily discipline into an engaging journey.

---

## ✨ Features

### 1. 📅 Day by Day Improvement (Monthly Grid Heatmap)
* **Monthly Grid View**: Navigate across months with `‹ Month ›` arrows.
* **Accessible 4-Color Scale + Numeric Counts**:
  * 🟥 **Red (0% done)**: e.g. `0/5`
  * 🟧 **Orange (1% – 49% done)**: e.g. `2/5`
  * 🟨 **Yellow (50% – 99% done)**: e.g. `3/5`, `4/5`
  * 🟩 **Green (100% done)**: e.g. `5/5`
  * ⬛ **Dark Gray**: No tasks scheduled
* **Dual Signal for Color Blindness**: Every box displays its explicit ratio (`3/5`), ensuring accessibility.
* **Interactive Day Inspection**: Click any day in the calendar to load its complete snapshot into the Insights panel.

### 2. 📋 Today's Tasks
* **Interactive Checklist**: Custom checkboxes (`✓`), completion ratio (e.g. `2 of 5 done`), and task deletion.
* **Celebration Confetti**: Particle burst triggers automatically when all daily goals are finished.
* **Add Task Modal with Suggestions**:
  * Type custom tasks or browse the scrollable suggestion drawer.
  * Curated categories: *Health & Nutrition*, *Fitness & Activity*, *Learning & Growth*, *Rest & Well-being*, and *Focus & Productivity*.
  * Single-click **Quick Add** or click-to-autofill.
* **Set Tasks for Tomorrow**: Preset tomorrow's routine in advance.
* **Daily Midnight Reset**: Incomplete tasks do not roll over and pile up — tomorrow starts fresh while yesterday's snapshot is preserved permanently.

### 3. 📝 Daily Reflection Journal
* Auto-saving prompt: *"Write about your day: what happened, how you felt, and what areas you can improve on..."*
* Saved permanently per day to preserve your personal growth journal.

### 4. 📊 Insights & The Climb
* **Day Detail**: View historical tasks (completed and missed) and the saved reflection for any clicked date.
* **Streak & Stats**: Current streak (consecutive days $\ge 50\%$), longest streak, completion rate %, and monthly color badges.
* **Weakest Task Detector**: Identifies the most frequently missed habit with a progress bar (e.g., *"Study 15 min — Missed 4 of 6 days"*), giving concrete data to reflect on.
* **The Climb Visual**: Mountain SVG graphic with a glowing climber marker that scales from **Base Camp** $\rightarrow$ **Mid-Climb** $\rightarrow$ **Summit** based on your streak!

### 5. 📱 Responsive Layout
* **Desktop**: Three-column dashboard (Today | Calendar | Insights).
* **Mobile**: Bottom navigation bar with 3 tabs (Today | Calendar | Insights).

### 6. 🔒 Local-First & Offline
* Stored entirely on-device via `localStorage`.
* Includes **Export JSON** for local backup and data portability.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or newer)
* npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/straight-to-the-top.git
   cd straight-to-the-top
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
straight-to-the-top/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    ├── App.tsx                    # Main layout (desktop 3-col & mobile tabs)
    ├── main.tsx                   # Entry point
    ├── index.css                  # Tailwind and custom scrollbars
    ├── types.ts                   # TypeScript interfaces & types
    ├── components/
    │   ├── Header.tsx             # Brand header, actions & guide modal
    │   ├── TodayTasks.tsx         # Left panel: task checklist & reflection
    │   ├── AddTaskModal.tsx       # Add task modal + suggestion catalog
    │   ├── TomorrowPresetModal.tsx# Plan routine for tomorrow
    │   ├── DayByDayCalendar.tsx   # Center panel: GitHub-style month grid
    │   ├── InsightsPanel.tsx      # Right panel: day detail, stats & weakest task
    │   ├── ClimbVisual.tsx        # Mountain streak visualizer SVG
    │   └── MobileNav.tsx          # Mobile bottom navigation tabs
    ├── data/
    │   ├── suggestions.ts         # Habit suggestions catalog
    │   └── seedData.ts            # Initial showcase demo data
    └── utils/
        ├── calendar.ts            # Grid math, color tiers, streaks & stats
        └── storage.ts             # localStorage & rollover handlers
```

---

## 📄 License

MIT License — feel free to use, modify, and build upon this project!
=======
# Straight-to-the-top
An early version of application
>>>>>>> 59ecf8c67bb528807e4bf6b99d241482a6aa7460
