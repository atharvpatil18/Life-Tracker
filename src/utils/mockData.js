// High fidelity default data to populate AtharvOS on first load
export const defaultState = {
  profile: {
    name: "Atharv Patil",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120",
    level: 14,
    xp: 450,
    xpForNextLevel: 1000,
    title: "Elite Builder",
  },
  settings: {
    geminiApiKey: "",
    githubUsername: "atharvpatil18",
    leetcodeUsername: "atharvpatil18",
    gatePrepEnabled: true,
  },
  academicMetrics: {
    cgpa: 10.0,
    targetCgpa: 10.0,
    attendance: 92,
    subjects: [
      { name: "Java programming", health: 95, classCount: 40, attendedCount: 38 },
      { name: "Database Systems", health: 88, classCount: 40, attendedCount: 35 },
      { name: "Machine Learning", health: 79, classCount: 40, attendedCount: 32 },
      { name: "Operating Systems", health: 68, classCount: 40, attendedCount: 27 },
    ],
  },
  careerMetrics: {
    resumeScore: 82,
    openSourcePrs: 4,
    linkedinPostsThisWeek: 3,
  },
  dsaMetrics: {
    solvedCount: 245,
    solvedEasy: 110,
    solvedMedium: 95,
    solvedHard: 40,
    topicMastery: {
      "Arrays & Strings": 90,
      "Dynamic Programming": 45,
      "Graphs & Trees": 61,
      "Linked Lists": 75,
      "Sorting & Searching": 80,
    },
    contestRating: 1650,
    interviewReadiness: 68,
  },
  aimlMetrics: {
    papersReadCount: 21,
    modelsBuilt: 4,
    datasetsExplored: 7,
    currentFocus: "Computer Vision & LLM RAG",
  },
  leadershipMetrics: {
    clubName: "SRM ACM SIGCHI",
    eventsConducted: 12,
    participantsImpacted: 950,
    score: 87,
  },
  personalMetrics: {
    familyCallsThisWeek: 4,
    meaningfulConversations: 12,
    relationshipHealth: 91,
  },
  growthAnalytics: {
    last90Days: {
      coding: 22,
      learning: 15,
      sleep: -8,
      fitness: 31,
    },
  },
  habits: [
    { id: "h1", name: "Daily LeetCode (DSA)", area: "dsa", streak: 17, lastLogged: "2026-05-30", frequency: "daily", xpValue: 10 },
    { id: "h2", name: "Exercise / Gym Workout", area: "health", streak: 8, lastLogged: "2026-05-30", frequency: "daily", xpValue: 15 },
    { id: "h3", name: "Read Research Papers", area: "research", streak: 4, lastLogged: "2026-05-29", frequency: "daily", xpValue: 15 },
    { id: "h4", name: "German Language Practice", area: "personal", streak: 6, lastLogged: "2026-05-30", frequency: "daily", xpValue: 5 },
    { id: "h5", name: "Weekly LinkedIn Post", area: "career", streak: 3, lastLogged: "2026-05-27", frequency: "weekly", xpValue: 20 },
    { id: "h6", name: "Write Smart Journal", area: "personal", streak: 12, lastLogged: "2026-05-30", frequency: "daily", xpValue: 5 },
    { id: "h7", name: "Sleep >= 7.5 Hours", area: "health", streak: 0, lastLogged: "", frequency: "daily", xpValue: 10 },
  ],
  habitLogs: {
    "h1": { "2026-05-30": true, "2026-05-29": true, "2026-05-28": true },
    "h2": { "2026-05-30": true, "2026-05-29": true, "2026-05-28": true },
    "h3": { "2026-05-29": true, "2026-05-27": true },
    "h4": { "2026-05-30": true, "2026-05-29": true },
    "h5": { "2026-05-27": true },
    "h6": { "2026-05-30": true, "2026-05-29": true, "2026-05-28": true },
  },
  projects: [
    { id: "p1", name: "GotYourBack", description: "Personal safety web application", status: "Completed", area: "career", progress: 100, components: { frontend: 100, backend: 100, database: 100, presentation: 100 } },
    { id: "p2", name: "CrowdSense", description: "ML research project on crowdsourced data modeling", status: "In Progress", area: "research", progress: 65, components: { frontend: 80, backend: 60, database: 90, research: 80, documentation: 40 } },
    { id: "p3", name: "Academy Management System", description: "SRM Student Hub portal", status: "Completed", area: "career", progress: 100, components: { frontend: 100, backend: 100, database: 100, presentation: 100 } },
    { id: "p4", name: "Portfolio Website v2", description: "Sleek interactive portfolio built with WebGL & React", status: "In Progress", area: "career", progress: 45, components: { frontend: 70, backend: 10, research: 40, documentation: 20 } },
  ],
  tasks: [
    { id: "t1", title: "Complete literature review for CrowdSense paper", description: "Read at least 5 top CVPR papers on crowdsourcing modeling", projectId: "p2", priority: "High", status: "in_progress", area: "research", dueDate: "2026-06-03" },
    { id: "t2", title: "Set up PostgreSQL models in CrowdSense repo", description: "Create relational tables and indexes", projectId: "p2", priority: "Medium", status: "done", area: "research", dueDate: "2026-05-28" },
    { id: "t3", title: "Solve 15 dynamic programming questions", description: "Topic: Knapsack and LIS on LeetCode", projectId: "", priority: "High", status: "todo", area: "dsa", dueDate: "2026-06-01" },
    { id: "t4", title: "ACM SIGCHI - Plan Web Dev workshop syllabus", description: "Organize speakers list and check lab booking at SRM", projectId: "", priority: "High", status: "in_progress", area: "leadership", dueDate: "2026-06-02" },
    { id: "t5", title: "Prepare GATE Mock Test 3", description: "Focus on Discrete Maths and Operating Systems", projectId: "", priority: "Medium", status: "todo", area: "academics", dueDate: "2026-06-06" },
  ],
  visions: [
    {
      id: "v1",
      title: "Maintain SRM Academic Dominance (CGPA 9.8+)",
      timeFrame: "1yr",
      completed: false,
      steps: [
        { id: "vs1_1", title: "Achieve 10/10 in 4th Semester", completed: true },
        { id: "vs1_2", title: "Complete NPTEL Gold Cert in DBMS", completed: true },
        { id: "vs1_3", title: "Score >90% in internal tests", completed: false },
      ]
    },
    {
      id: "v2",
      title: "Publish 1st Author Research Paper in IEEE/CVPR",
      timeFrame: "1yr",
      completed: false,
      steps: [
        { id: "vs2_1", title: "Literature survey completed", completed: true },
        { id: "vs2_2", title: "Model implementation & training", completed: false },
        { id: "vs2_3", title: "Draft writing & revision", completed: false },
      ]
    },
    {
      id: "v3",
      title: "Secure Dream IT/AI Placement or MS Admits in Top US Univs",
      timeFrame: "3yr",
      completed: false,
      steps: [
        { id: "vs3_1", title: "LeetCode 400+ problems & master DP/Graphs", completed: false },
        { id: "vs3_2", title: "Build robust resume & portfolio website", completed: false },
        { id: "vs3_3", title: "Maintain high CGPA above 9.8", completed: false },
      ]
    },
    {
      id: "v4",
      title: "Tech Entrepreneur & AI Product Architect",
      timeFrame: "10yr",
      completed: false,
      steps: [
        { id: "vs4_1", title: "Establish deep specialized ML knowledge", completed: false },
        { id: "vs4_2", title: "Learn leadership and business scaling", completed: false },
      ]
    }
  ],
  journal: [
    { id: "j1", content: "Had an amazing brainstorming session with ACM members. We discussed conducting a major national level hackathon on AI/ML in SRM next semester. The response is highly positive!", date: "2026-05-29", tags: ["leadership", "career"] },
    { id: "j2", content: "Successfully resolved a nagging bug in the CrowdSense deep learning training loop. Loss is finally descending below 0.12! Feeling extremely satisfied today. Reading papers helps so much.", date: "2026-05-30", tags: ["learning", "project", "research"] },
    { id: "j3", content: "Spent some lovely quality time talking to family back home. Refreshed my energy completely.", date: "2026-05-31", tags: ["family", "relationship"] },
  ],
  decisions: [
    {
      id: "d1",
      chosenChoice: "Focus on AI Career Track over Web Development",
      reasoning: "AI research offers much higher long term value, MS options, and university research opportunities align perfectly with my ML interest.",
      expectations: "Secure research publications and much stronger ML placement roles in top product firms.",
      date: "2026-05-26",
      mood: "Confident",
      outcome: "Extremely Correct Choice. Published CVPR paper, secured research internship at premium ML lab, and resume is super outstanding.",
      outcomeDate: "2026-11-26",
      checked: true
    },
    {
      id: "d2",
      chosenChoice: "Accept SRM ACM SIGCHI Chairperson position",
      reasoning: "Will boost leadership skill, team management, and networking with international chapters, despite taking 5 hours/week from coding.",
      expectations: "Conduct major SRM events, impact 500+ students, build exceptional leadership traits.",
      date: "2026-05-30",
      mood: "Excited",
      outcome: "",
      outcomeDate: "2026-09-30",
      checked: false
    }
  ],
  notes: [
    { id: "n1", title: "LLM RAG Best Practices", content: "# Retrieval Augmented Generation (RAG)\n\nKey components:\n1. **Document Chunking**: Overlap of 10-20% is ideal.\n2. **Vector Embeddings**: Use OpenAI text-embedding-3-small.\n3. **Hybrid Search**: Dense (semantic) + Sparse (BM25) search improves precision.\n4. **Reranking**: Cohere Rerank increases context relevance drastically.", date: "2026-05-28", area: "research", tags: ["learning", "research"] },
    { id: "n2", title: "Duolingo German Vocab Logs", content: "### Everyday Phrases\n\n* **Guten Morgen** - Good Morning\n* **Wie geht es dir?** - How are you?\n* **Mir geht's gut, danke** - I'm doing well, thank you\n* **Auf Wiedersehen** - Goodbye\n* **Entschuldigung** - Excuse me / Sorry", date: "2026-05-30", area: "personal", tags: ["learning"] },
  ],
  weeklyReviews: [
    {
      id: "w1",
      date: "2026-05-24",
      wins: "Solved 20 DP problems, successfully organized ACM onboarding event with 200 participants.",
      mistakes: "Spent too much time scrolling LeetCode discuss forums instead of coding.",
      learning: "Learned about spaced repetition and advanced knapsack optimization.",
      improvements: "Use an app blocker during morning coding hours, allocate distinct hours for club emails."
    }
  ],
  achievements: [
    { id: "a1", title: "DSA Warrior", desc: "Maintained a 15+ LeetCode streak", icon: "Code", dateUnlocked: "2026-05-28" },
    { id: "a2", title: "Academic Elite", desc: "Achieved a solid 10.0 CGPA", icon: "GraduationCap", dateUnlocked: "2026-05-15" },
    { id: "a3", title: "Impact Architect", desc: "Impacted 500+ participants via events", icon: "Users", dateUnlocked: "2026-05-20" },
  ]
};
