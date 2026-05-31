# AtharvOS
> *"A digital twin of your growth."*

**AtharvOS** is a premium, highly aesthetic personal growth operating system designed specifically for a high-achieving engineering student managing academics, competitive coding (DSA), research, leadership, and personal life. 

Instead of asking *"What tasks did I complete today?"*, AtharvOS asks: ***"Am I becoming the person I want to become?"***

---

## 🌟 Core Modules (All-in-One Growth Suite)

AtharvOS consolidates **15 P0/P1 modules** into a single glassmorphic cyber-dark dashboard interface:

1. **Dashboard & Life Score radial gauge**: A composite metric (0-100) recalculated dynamically from academics, LeetCode solving rates, ML research papers read, and habit consistency.
2. **Active Burn Streaks**: Highlights consistency streaks (e.g., Coding, Workout, Journaling) with animated fire elements.
3. **Academic Growth Center**: Tracks SRM CGPA (Current vs. Target) and subject-level lecture attendance health (Java, DBMS, ML, Operating Systems) with attended/missed logger nodes.
4. **Career & Resume Hub**: Monitors Resume Quality Scores, open source merged PR logs, and showcases active portfolios.
5. **DSA Prep Console**: Tracks solved counts (Easy, Medium, Hard), topic masteries (Arrays, DP, Graphs, Sorting), contest ratings, and interview readiness indexes.
6. **AI/ML Research Node**: Records PyTorch/TensorFlow models built, research papers read, datasets explored, and current research vectors (e.g., Computer Vision, NLP).
7. **SIGCHI Club Leadership**: Specifically tuned for managing the **SRM ACM SIGCHI** chapter operations, tracking events conducted, participant reach, and leadership rating scores.
8. **Personal Life & Balance**: Mindful, non-invasive connection logs (family calls, deep dialogues) with emotional harmony reflections.
9. **Vision Board**: Formulates 1-Year, 3-Year, and 10-Year horizons. Features expandable goal decomposition trees where checking sub-steps updates parent progress.
10. **Architecture Project Tracker**: Decomposes complex repositories into component progress bars (Frontend, Backend, Database, Research, Documentation) where overall progress is computed as the average.
11. **Rational Decision Journal**: Records critical choices, expectations, and rationales. Resolves outcomes post-reflection to mitigate cognitive biases.
12. **Weekly Retrospectives**: Triggers Sunday review prompts (Wins, Mistakes, Learnings, Improvements) to compile rolling weekly retros.
13. **Life Timeline**: Visual chronological roadmaps of historic academic and project achievements.
14. **Smart Reflection Journal**: Secure writing pad with category tagging (`#learning`, `#career`, `#research`) and real-time filtering search.
15. **Knowledge Vault**: obsidian-style note-taking vault with markdown inputs and search capability.

---

## ⚙️ Advanced Integrations

- **GitHub REST API Integration**: Directly queries the public GitHub API to fetch live repository counts and follower counts based on your username.
- **LeetCode API Proxy Integration**: Pulls live submission stats (Easy, Medium, Hard, and Totals) via public proxies to synchronize your DSA prep progress automatically.
- **Gemini Core AI Coach**: Equipped with the official `@google/generative-ai` SDK! Accesses your client-stored API key to analyze your actual live database state (CGPA, habits, projects, journal logs) and generate hyper-specific growth reviews and Q&A suggestions.

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22.20.0 recommended)
- **NPM**: v9.0.0 or higher (v10.9.3 recommended)

### Quick Start
1. **Clone the repository**:
   ```bash
   git clone https://github.com/atharvpatil18/Life-Tracker.git
   cd Life-Tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` (or the port specified in your terminal) to explore your operating system!

4. **Compile static assets for production**:
   ```bash
   npm run build
   ```
   The compiled assets will be built into the `dist/` directory.

---

## 🔐 Security & Persistence
All data generated inside AtharvOS (habits checked, tasks created, journal reflections written, and API keys entered) is **100% secure, private, and client-centric**. 

Data is persisted dynamically using the browser's `localStorage` and is never sent to any external server (except for direct requests to Google's Gemini API endpoints and public developer profiles).
