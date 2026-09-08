window.PORTFOLIO_DATA = {
  accounts: ["HasnatKhan010"],
  extraRepositories: [],
  featuredOrder: [
    "HasnatKhan010/raabta",
    "HasnatKhan010/prognostix-ml",
    "HasnatKhan010/dataprep-studio",
    "HasnatKhan010/koha-plugin-opac-ai-assistant",
    "HasnatKhan010/portfolio-3d",
    "HasnatKhan010/ITSimplera_Institute_AI-ML_internship"
  ],
  projectCopy: {
    raabta: {
      description: "Cross-script retrieval for Roman-Urdu questions over Urdu-script documents: BM25, multilingual dense search, romanized-title n-grams, fusion, reranking, and explicit abstention.",
      topics: ["information-retrieval", "roman-urdu", "transformers"],
      proof: "0.983 Recall@10"
    },
    "prognostix-ml": {
      description: "Predictive-maintenance platform spanning ingest, training, evaluation, FastAPI serving, drift monitoring, and scheduled retraining.",
      topics: ["mlops", "predictive-maintenance", "docker"],
      proof: "5 lifecycle stages"
    },
    "dataprep-studio": {
      description: "Local-first data cleaning for files too large for a Python dataframe, with a Rust columnar engine and a Windows desktop interface.",
      topics: ["rust", "data-engineering", "desktop-app"],
      proof: "1M rows in 189 ms"
    },
    "koha-plugin-opac-ai-assistant": {
      description: "Installable Koha catalogue assistant translating natural-language requests into safe, parameterised library searches across fourteen intent types.",
      topics: ["koha", "fastapi", "natural-language"],
      proof: "14 query intents"
    },
    "portfolio-3d": {
      description: "An interactive WebGL portfolio with a Three.js environment, GSAP camera work, and a playable Stockfish-backed chess board.",
      topics: ["threejs", "webgl", "chess-engine"],
      proof: "deployed experience"
    },
    "ITSimplera_Institute_AI-ML_internship": {
      description: "Six applied-ML deliverables covering EDA, supervised learning, clustering, energy forecasting, NLP, and transformer fine-tuning.",
      topics: ["machine-learning", "transformers", "data-science"],
      proof: "6 shipped deliverables"
    }
  },
  experience: [
    {
      role: "AI/ML Intern",
      organization: "ITSimplera Solutions",
      location: "Remote",
      dates: "Jun 2026 – Aug 2026",
      summary: "Completed six applied-ML deliverables, each with a documented experiment and runnable application, progressing from exploratory analysis to transformer fine-tuning.",
      achievements: [
        "Fine-tuned DistilBERT to 98.33% accuracy and 0.9830 macro-F1 on 419 held-out articles, against three baselines on one split.",
        "Implemented C_NPMI, C_UMass, and topic-diversity metrics from their mathematical definitions when the expected library would not build.",
        "Measured a Random Forest at 1.213 kWh RMSE over roughly 35,040 industrial-energy records and quantified the cost of PCA compression.",
        "Shipped Streamlit dashboards and a FastAPI service with shared preprocessing between training and inference."
      ],
      stack: ["PyTorch", "Transformers", "scikit-learn", "FastAPI", "Streamlit"],
      link: "https://github.com/HasnatKhan010/ITSimplera_Institute_AI-ML_internship"
    },
    {
      role: "AI/ML Intern",
      organization: "COMSATS University Islamabad · Junaid Zaidi Library",
      location: "Islamabad, Pakistan",
      dates: "2026",
      summary: "Built two production tools for the university: an installable conversational catalogue assistant and a Rust data-cleaning engine.",
      achievements: [
        "Packaged a Koha OPAC assistant covering fourteen search intents with fuzzy fallback and keyboard-complete interaction.",
        "Served parameterised MariaDB queries through FastAPI with per-IP rate limiting.",
        "Built DataPrep in Rust and measured one-million-row filtering at 189 ms while keeping files local."
      ],
      stack: ["Rust", "FastAPI", "MariaDB", "Python", "JavaScript", "Koha"],
      link: "https://github.com/HasnatKhan010/koha-plugin-opac-ai-assistant"
    },
    {
      role: "Trainee · Cycle 1",
      organization: "ACT AI · National AI Training Initiative",
      location: "Pakistan",
      dates: "Jun 2026 – Jul 2026",
      summary: "Completed the first cycle of Pakistan's eight-week national AI programme delivered with the PM's Youth Programme, HEC, and NAVTTC.",
      achievements: [
        "Completed the awareness, competency, and applied AI tooling programme.",
        "Credential ACTAI-C1-2026-00194-EZMB is independently verifiable in the issuing registry."
      ],
      stack: ["Applied AI", "AI tooling", "Prompt engineering"],
      link: "https://actai.aiskillbridge.pk/v/YAVFR8KV2JRXEF2L"
    }
  ],
  education: [
    {
      qualification: "BS Computer Science",
      institution: "COMSATS University Islamabad",
      dates: "2024 – Present",
      detail: "Currently in the 6th semester · AI, databases, algorithms, systems, networks, and software engineering."
    },
    {
      qualification: "FSc Pre-Medical",
      institution: "Tameer-i-Wattan Public College",
      dates: "2022 – 2024",
      detail: "1024 / 1100 · 93.1%"
    },
    {
      qualification: "Matriculation",
      institution: "Al Quran Beacon School",
      dates: "2020 – 2022",
      detail: "968 / 1100 · 88.0%"
    }
  ],
  certifications: [
    {
      title: "IBM Machine Learning Professional Certificate",
      issuer: "IBM",
      year: "2026",
      detail: "Six courses spanning supervised learning, unsupervised learning, deep learning, reinforcement learning, and a capstone.",
      url: "https://coursera.org/share/20aa00ac9bfb497072cb168de6a0b4e7"
    },
    {
      title: "Mathematics for Machine Learning and Data Science",
      issuer: "DeepLearning.AI",
      year: "2026",
      detail: "Three-course specialization in linear algebra, calculus, probability, and statistics for ML.",
      url: "https://coursera.org/share/cad9f1738a338e286bd97213512ec307"
    },
    {
      title: "ACT AI · Awareness, Competency & Tools",
      issuer: "National AI Training Initiative, Pakistan",
      year: "2026",
      detail: "Eight-week programme · Credential ACTAI-C1-2026-00194-EZMB.",
      url: "https://actai.aiskillbridge.pk/v/YAVFR8KV2JRXEF2L"
    }
  ],
  skills: [
    {
      label: "Machine learning",
      note: "Used across Raabta, Prognostix, and six internship deliverables.",
      items: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "Hugging Face Transformers", "NumPy", "Pandas", "XGBoost", "cross-validation", "feature engineering"]
    },
    {
      label: "NLP & retrieval",
      note: "The working stack behind Raabta and the Koha assistant.",
      items: ["Dense retrieval", "BM25", "Reciprocal Rank Fusion", "cross-encoder reranking", "sentence embeddings", "transformer fine-tuning", "topic modelling", "spaCy"]
    },
    {
      label: "MLOps & deployment",
      note: "Used to carry models from training into reproducible services.",
      items: ["Docker", "Docker Compose", "FastAPI", "model serving", "training pipelines", "drift monitoring", "scheduled retraining", "GitHub Actions", "pytest"]
    },
    {
      label: "Data engineering",
      note: "Used in DataPrep, the Koha SQL layer, and scraping pipelines.",
      items: ["ETL pipelines", "data cleaning at scale", "web scraping", "parameterised SQL", "API automation", "MariaDB"]
    },
    {
      label: "Languages",
      note: "Ordered by practical use across the repositories.",
      items: ["Python", "C++", "C", "Rust", "JavaScript", "TypeScript", "SQL", "x86 Assembly"]
    },
    {
      label: "Systems & security",
      note: "Practised in a virtual file system, AegisChain, and low-level coursework.",
      items: ["Operating systems", "data structures & algorithms", "RSA", "AES-256", "SHA-256", "PKI", "networking"]
    }
  ]
};
