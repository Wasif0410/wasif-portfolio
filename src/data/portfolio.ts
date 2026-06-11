export const profile = {
  name: "Wasif Saeed",
  role: "AI & Software Developer",
  location: "Toronto",
  intro:
    "Building intelligent software systems, automation tools, and AI-powered products that solve real-world problems.",
  email: "wsaeed@torontomu.ca",
};

export const links = {
  github: "https://github.com/Wasif0410",
  linkedin: "https://www.linkedin.com/in/wasif-saeed-077169203/",
  resume: "/WasifSaeed_Updated_ML_AI_Resume.pdf",
};

export const navSections = [
  { id: "top", label: "Home", number: "00" },
  { id: "about", label: "About", number: "01" },
  { id: "experience", label: "Experience", number: "02" },
  { id: "works", label: "Projects", number: "03" },
  { id: "writing", label: "Writing", number: "04" },
  { id: "skills", label: "Skills", number: "05" },
  { id: "education", label: "Education", number: "06" },
] as const;

export const aboutContent = {
  headline: "Building AI products that ship.",
  headlineAccent: "ship.",
  paragraphs: [
    "CS co-op student at Toronto Metropolitan University — focused on RAG, agents, and full-stack software that works outside the notebook.",
    "I've interned across enterprise, healthcare, and ML teams, from vector search at Saige to GenAI evaluation at Dayforce.",
  ],
  interestsNote: "What I gravitate toward outside the day-to-day grind.",
  highlights: [
    { label: "Based in", value: "Toronto, Canada", icon: "location" as const },
    { label: "Currently", value: "CS Co-op @ TMU", icon: "school" as const },
    { label: "Latest role", value: "AI Dev Intern @ Dayforce", icon: "briefcase" as const },
  ],
  interests: [
    { label: "Traveling", icon: "travel" as const },
    { label: "Gym", icon: "gym" as const },
    { label: "Basketball", icon: "basketball" as const },
    { label: "Table Tennis", icon: "tableTennis" as const },
    { label: "Pokemon", icon: "pokemon" as const },
    { label: "Planting", icon: "planting" as const },
    { label: "Photography", icon: "photography" as const },
    { label: "Videography", icon: "videography" as const },
    { label: "Editing", icon: "editing" as const },
  ],
};

export type AboutHighlight = (typeof aboutContent.highlights)[number];
export type AboutInterest = (typeof aboutContent.interests)[number];

export type WritingEntry = {
  titleLead: string;
  titleRest: string;
  date: string;
  excerpt: string;
  tags: string[];
  href?: string;
};

export const writingEntries: WritingEntry[] = [
  {
    titleLead: "Frontier Coding Agents",
    titleRest: ": 3D Front-End Test",
    date: "2026",
    excerpt:
      "We tested Claude Fable 5, Opus 4.8, ChatGPT 5.5, and Composer 2.5 on the same 3D front-end brief — comparing layout fidelity, component structure, polish, and how each agent handled real shipping constraints.",
    tags: ["LLM Benchmark", "Front-End", "Model Comparison"],
  },
  {
    titleLead: "What Survey Data Says",
    titleRest: " About ChatGPT in the Classroom",
    date: "2025",
    excerpt:
      "Students aren't a monolith — some treat ChatGPT like a tutor, others like a shortcut. A structured survey turned vague campus debate into charts you can actually argue with.",
    tags: ["AI Ethics", "Data Study", "Education"],
  },
];

export const experiences = [
  {
    year: "2026",
    company: "Dayforce",
    role: "Product & AI Developer Intern",
    description:
      "Working on GenAI evaluation, RAG/MCP agent workflows, multilingual LLM testing, product usage analytics, and AI feature experimentation.",
    bullets: [
      "GenAI evaluation frameworks",
      "RAG & MCP agent systems",
      "Intent modelling & classification",
      "Product usage analytics",
    ],
  },
  {
    year: "2025",
    company: "IQonsulting",
    role: "Applied AI Developer Intern",
    description:
      "Built healthcare-focused AI automation prototypes for Healthlytics.ai using LLMs, text-to-speech, speech tools, and computer vision workflows.",
    bullets: [
      "Healthcare AI automation",
      "LLM & NLP retrieval design",
      "Speech & computer vision pipelines",
      "Full-stack AI application development",
    ],
  },
  {
    year: "2024",
    company: "Saige",
    role: "Software Developer Intern (ML/AI)",
    description:
      "Developed AI-powered backend features and agent workflows using LangChain, vector databases, and full-stack tooling.",
    bullets: [
      "LangChain agent workflows",
      "Vector search & embeddings",
      "Semantic retrieval systems",
      "Scalable data pipelines",
    ],
  },
  {
    year: "2024",
    company: "RCMP",
    role: "Junior Programmer Analyst",
    description:
      "Improved internal software systems, automated workflows, and optimized database-backed applications.",
    bullets: [
      "Enterprise web interface design",
      "Database query optimization",
      "Workflow automation systems",
      "Business intelligence reporting",
    ],
  },
];

export const projectNotebooks = [
  {
    id: "ai-ml",
    label: "AI / ML",
    projects: [
      {
        title: "Medical RAG Agent",
        description:
          "A textbook search engine for medical PDFs — chapters are auto-detected, split into chunks, embedded with sentence transformers, and indexed in FAISS so you can semantically search across multiple nursing and emergency medicine books in seconds.",
        tools: ["Python", "LangChain", "FAISS", "Sentence Transformers", "PyPDF2"],
        image: "/projects/medical-rag-agent.svg",
        imageAlt: "Toon-sketch SVG preview of the Medical RAG Agent textbook search interface",
        github: "https://github.com/Wasif0410/Medical-RAG-Agent",
      },
      {
        title: "Korean Food Recognition App",
        description:
          "Built while studying in Korea — a fully offline desktop app where you photograph a dish and instantly see which of 10 Korean foods it is, trained with PyTorch on custom-augmented images so inference stays under 200ms without WiFi.",
        tools: ["Python", "PyTorch", "OpenCV", "Pandas", "Tkinter"],
        image: "/projects/korean-food.svg",
        imageAlt: "Preview of the Korean Food Recognition app interface",
      },
      {
        title: "Character One-Shot Classification",
        description:
          "The idea: recognize a handwritten character from a single example, not thousands of labels — ink strokes are compared as pixel maps using Modified Hausdorff Distance to find the closest match in a small reference set.",
        tools: ["Python", "NumPy", "SciPy", "MATLAB", "PIL"],
        image: "/projects/character-classifier.svg",
        imageAlt: "Preview of the character one-shot classification workflow",
      },
    ],
  },
  {
    id: "data-science",
    label: "Data Science",
    projects: [
      {
        title: "ChatGPT in Academia: A Data Study",
        description:
          "Asked a simple question with messy real-world stakes: are students actually using ChatGPT for learning, or just worried about cheating? Ran a structured survey, cleaned responses in Pandas, and charted adoption, usefulness, and integrity concerns in Jupyter to map where AI belongs in the classroom.",
        tools: ["Python", "Pandas", "Matplotlib", "Jupyter"],
        image: "/projects/chatgpt-academia.svg",
        imageAlt: "Toon-sketch SVG preview of the ChatGPT in Academia survey research paper",
        github: "https://github.com/Wasif0410/AI-SurveyData",
      },
      {
        title: "MiniSpotify",
        description:
          "A Java music store and MP3 player — browse the catalog, download songs, build playlists, and search by title, artist, or genre from a text-based interface that feels like a real streaming app.",
        tools: ["Java"],
        image: "/projects/minispotify.svg",
        imageAlt: "Toon-sketch SVG preview of the MiniSpotify library dashboard",
        github: "https://github.com/Wasif0410/Music-Store-Manager",
      },
    ],
  },
  {
    id: "full-stack",
    label: "Full Stack",
    projects: [
      {
        title: "Smart Full Stack Gym Manager",
        description:
          "A gym runs on trust and timing — this full-stack app gives members a secure login, live dashboards for membership and attendance, and gives admins SQL-backed analytics across 1,000+ accounts so front-desk chaos becomes one source of truth.",
        tools: ["Python", "JavaScript", "TypeScript", "React", "MySQL", "HTML", "CSS"],
        image: "/projects/gym-manager.svg",
        imageAlt: "Preview of the Smart Full Stack Gym Manager dashboard",
        github: "https://github.com/Wasif0410/FULL-STACK-GYM-APPLICATION",
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "JSON",
      "SQL",
      "NoSQL",
      "C",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Rust",
      "Bash",
      "Perl",
      "Elixir",
      "Haskell",
      "Lisp",
      "ASP",
      "Smalltalk",
    ],
  },
  {
    title: "AI, Automation & Data",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Pandas",
      "OpenCV",
      "LangChain",
      "RAG",
      "LLMs",
      "BERTopic",
      "Databricks",
      "OpenAI",
      "ChatGPT",
      "n8n",
      "Make",
    ],
  },
  {
    title: "Tools & Frameworks",
    skills: [
      "Git/GitHub",
      "React",
      "Node.js",
      "Docker",
      "AWS",
      "GCP",
      "Linux",
      ".NET",
      "Selenium",
      "MATLAB",
      "SVG",
    ],
  },
];

export const educationEntries = [
  {
    school: "Toronto Metropolitan University",
    country: "Canada",
    degree: "Bachelor of Science in Computer Science, Co-op",
    yearRange: "2022 – 2027",
    highlights: ["CGPA: 3.89 / 4.33"],
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Discrete Math & Structures",
      "Probability & Statistics",
      "Linear Algebra",
      "Unix / C / C++",
      "Web Systems Development",
      "Database Systems",
    ],
  },
  {
    school: "Chung-Ang University",
    country: "South Korea",
    degree: "Exchange semester focused on artificial intelligence and machine learning",
    yearRange: "2024 – 2025",
    highlights: ["Perfect course completion — all credits earned"],
    coursework: [
      "Artificial Intelligence",
      "Machine Learning",
      "Image Processing",
      "Database Systems",
      "Korean Language",
    ],
  },
];
