export interface Project {
  title: string;
  subtitle: string;
  category: 'ML' | 'CV' | 'Agentic AI';
  period: string;
  achievements: string[];
  codeUrl: string;
  demoUrl?: string;
  techStack: string[];
  highlightColor: string;
  pipelineSteps?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  techStack: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  score: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  score?: string;
  badge?: string;
}

export const personalInfo = {
  name: "Mohammed Abdul Aziz",
  titles: ["Data Scientist", "Machine Learning Engineer", "Data Analyst"],
  location: "Hyderabad, India",
  phone: "+91 6305889859",
  email: "mohammedabduljunaid007@gmail.com",
  github: "https://github.com/MohammedAbdul-Aziz",
  linkedin: "https://www.linkedin.com/in/mohammed-abdul-aziz-ds-ml",
  summary: "Computer Science Engineering graduate with hands-on experience building end-to-end machine learning pipelines, predictive models, computer vision systems, and agentic AI applications. NPTEL-certified (IIT Madras, IIT Roorkee) with a Top 5% national score in Introduction to Machine Learning. Proficient in Python, SQL, and modern data science and machine learning frameworks, with practical experience applying Explainable AI (XAI) to make model outputs interpretable for real-world decisions."
};

export const skillsData = {
  languages: [
    { name: "Python", level: 95 },
    { name: "SQL", level: 90 },
    { name: "R", level: 75 }
  ],
  mlDataScience: [
    { name: "Predictive Modeling", level: 95 },
    { name: "Statistical Inference", level: 88 },
    { name: "Supervised & Unsupervised Learning", level: 92 },
    { name: "Explainable AI (XAI)", level: 90 },
    { name: "Computer Vision", level: 85 },
    { name: "NLP", level: 80 }
  ],
  frameworks: [
    { name: "Pandas & NumPy", level: 95 },
    { name: "Scikit-Learn", level: 95 },
    { name: "XGBoost / LightGBM / CatBoost", level: 92 },
    { name: "TensorFlow", level: 85 },
    { name: "LangChain & LangGraph", level: 88 }
  ],
  tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Jupyter Notebook", level: 95 },
    { name: "Linux", level: 85 },
    { name: "Neo4j", level: 80 },
    { name: "Playwright", level: 85 }
  ]
};

export const projectsData: Project[] = [
  {
    title: "AgriVerse",
    subtitle: "Agricultural Intelligence Platform",
    category: "CV",
    period: "Nov 2025 – Feb 2026",
    achievements: [
      "Won 3rd Prize in a prestigious National Hackathon for building a real-time agricultural intelligence drone imagery pipeline.",
      "Combined custom TensorFlow CNNs for pest detection with XGBoost models for crop yield estimation.",
      "Integrated SHAP-based explainability to translate complex model predictions into actionable soil and crop recommendations."
    ],
    codeUrl: "https://github.com/MohammedAbdul-Aziz/AgriVerse",
    demoUrl: "https://agri-verse-silk.vercel.app",
    techStack: ["TensorFlow", "CNN", "XGBoost", "SHAP", "Python", "Computer Vision"],
    highlightColor: "#10b981", // Emerald green
    pipelineSteps: ["Drone Imagery Input", "Custom CNN Pest Detector", "XGBoost Yield Estimator", "SHAP Explainability", "Soil & Crop Insights Output"]
  },
  {
    title: "Obesity Risk Prediction Pipeline",
    subtitle: "End-to-End Classification with LIME",
    category: "ML",
    period: "2026",
    achievements: [
      "Built an end-to-end multi-class risk classification pipeline benchmarking XGBoost, LightGBM, and CatBoost models.",
      "Resolved class imbalance and multicollinearity through EDA, feature scaling, and SMOTE oversampling.",
      "Applied LIME (Local Interpretable Model-Agnostic Explanations) to map individual feature contributions to interpretable risk factors.",
      "Deployed the entire system via an interactive Flask web interface for real-time risk estimation."
    ],
    codeUrl: "https://github.com/MohammedAbdul-Aziz/Machine-Learning-Based-Obesity-Risk-Detection-with-LIME-Interpretability",
    techStack: ["XGBoost", "LightGBM", "CatBoost", "SMOTE", "LIME", "Flask", "Python"],
    highlightColor: "#3b82f6", // Neon blue
    pipelineSteps: ["User Physical Metrics", "SMOTE Balanced Classifier", "Risk Level Output", "LIME Feature Contributions", "Explainable Insights Dashboard"]
  },
  {
    title: "Inspectra-ReQon-AI",
    subtitle: "Autonomous Agentic QA Engine",
    category: "Agentic AI",
    period: "2026",
    achievements: [
      "Built an autonomous agentic QA testing system utilizing LangGraph and Playwright for independent web application navigation.",
      "Handles complex OAuth2/SSO authentication flow and classifies UI and functional defects using multimodal AI models (GPT-4o, Claude 3.5 Sonnet).",
      "Designed a Defect Knowledge Graph in Neo4j to map relationships between issues across different pages and components.",
      "Developed a real-time hygiene-scoring engine to evaluate page health based on defect severity levels."
    ],
    codeUrl: "https://github.com/MohammedAbdul-Aziz/Inspectra-ReQon-AI",
    techStack: ["LangGraph", "Playwright", "Neo4j", "GPT-4o / Claude 3.5", "OAuth2/SSO", "Node/Python"],
    highlightColor: "#a855f7", // Violet
    pipelineSteps: ["Playwright Crawler", "LangGraph Agent Controller", "Multimodal Defect Classification", "Neo4j Defect Graph Mapping", "Hygiene Score Calculation"]
  }
];

export const experienceData: Experience[] = [
  {
    role: "Data Science Intern",
    company: "Oasis Infobyte",
    period: "Sep 2025 – Oct 2025",
    location: "Remote",
    achievements: [
      "Built and tuned supervised machine learning models for multi-class classification and regression tasks using Pandas and Scikit-learn, applying feature engineering and hyperparameter optimization.",
      "Designed automated data-cleaning and preprocessing pipelines that improved model stability and were delivered ahead of schedule.",
      "Earned a formal Letter of Recommendation for technical excellence and consistent delivery of project milestones."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Feature Engineering", "Data Pipelines"]
  }
];

export const educationData: Education[] = [
  {
    degree: "B.E., Computer Science Engineering",
    school: "Osmania University (ISL College)",
    period: "2022 – 2026",
    score: "CGPA: 8.7 / 10",
    details: "Relevant coursework: Machine Learning, Deep Learning, Systems Architecture, Data Structures, Algorithms"
  },
  {
    degree: "Intermediate (MPC)",
    school: "Srinivasa Junior College",
    period: "2020 – 2022",
    score: "CGPA: 8.88 / 10",
    details: "Mathematics, Physics, Chemistry stream"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "Introduction to Machine Learning",
    issuer: "NPTEL, IIT Madras",
    score: "Top 5% National Topper Award",
    badge: "Top 5%"
  },
  {
    name: "Data Analytics with Python",
    issuer: "NPTEL, IIT Roorkee",
    score: "Score: 82%"
  },
  {
    name: "5 additional NPTEL certifications",
    issuer: "NPTEL, IIT / IISc Programs",
    score: "Completed across diverse advanced computer science subjects"
  }
];

export const leadershipData = {
  role: "Core Engineer & Team Captain",
  organization: "Above Illuminate",
  description: "Led a highly motivated hackathon team across multiple national competitions, securing prizes and driving project execution, architecture design, and technical pitches."
};
