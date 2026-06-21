import React, { useState, useRef, useEffect } from 'react';
import * as Icons from './Icons';
import { personalInfo, projectsData, experienceData } from '../data';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  thoughts?: string[];
  links?: { label: string; url: string }[];
}

export const AgentChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! I am Mohammed's Portfolio Agent, built with ideas from his autonomous testing engine (Inspectra-ReQon-AI). How can I assist your recruiting search today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thoughtSteps, setThoughtSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { label: "Tell me about AgriVerse", query: "Tell me about AgriVerse" },
    { label: "How does Inspectra-ReQon-AI work?", query: "How does Inspectra-ReQon-AI work?" },
    { label: "What are your core ML skills?", query: "What are your core ML skills?" },
    { label: "Show contact details", query: "Show contact details" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, thoughtSteps]);

  // Handle running thought steps one by one
  useEffect(() => {
    if (isThinking && thoughtSteps.length > 0 && currentStepIndex < thoughtSteps.length) {
      const delay = currentStepIndex === -1 ? 200 : 600;
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isThinking, thoughtSteps, currentStepIndex]);

  const getAgentResponse = (query: string): { text: string; thoughts: string[]; links?: { label: string; url: string }[] } => {
    const q = query.toLowerCase();
    
    // Default response elements
    let text = "";
    let thoughts: string[] = [];
    let links: { label: string; url: string }[] = [];

    if (q.includes('agriverse') || q.includes('agriculture') || q.includes('crop') || q.includes('pest')) {
      thoughts = [
        "Analyzing Query: AgriVerse",
        "Traversing knowledge graph Node: Projects/AgriVerse",
        "Fetching repository details for AgriVerse",
        "Applying SHAP-explainability visualization generator"
      ];
      const p = projectsData.find(proj => proj.title === 'AgriVerse');
      text = `🤖 **AgriVerse** is an Agricultural Intelligence Platform that won **3rd Prize in a National Hackathon** (Nov 2025 - Feb 2026). 
      
      • **What it does**: Combines custom TensorFlow CNNs for pest detection with XGBoost models for crop yield estimation based on drone imagery.
      • **XAI Integration**: Integrates SHAP-based explainability to translate complex predictions into actionable crop/soil recommendations for farmers.
      • **Tech Stack**: ${p?.techStack.join(', ')}.`;
      
      if (p?.codeUrl) links.push({ label: "GitHub Repo", url: p.codeUrl });
      if (p?.demoUrl) links.push({ label: "Live Demo", url: p.demoUrl });

    } else if (q.includes('inspectra') || q.includes('reqon') || q.includes('qa') || q.includes('agentic')) {
      thoughts = [
        "Analyzing Query: Inspectra-ReQon-AI",
        "Reading LangGraph & Playwright orchestration logs",
        "Querying Neo4j Defect Knowledge Graph database",
        "Evaluating hygiene scoring rules"
      ];
      const p = projectsData.find(proj => proj.title === 'Inspectra-ReQon-AI');
      text = `🤖 **Inspectra-ReQon-AI** is an autonomous agentic QA testing system. 
      
      • **How it works**: Uses LangGraph and Playwright to navigate web applications independently, bypass OAuth2/SSO, and identify functional/UI defects.
      • **AI Intelligence**: Classifies visual and functional issues using multimodal LLMs (GPT-4o & Claude 3.5 Sonnet).
      • **Knowledge Graph**: Maps defect relationships across pages and components inside a Neo4j Knowledge Graph. Calculates a real-time health/hygiene score for the app.`;
      
      if (p?.codeUrl) links.push({ label: "GitHub Repo", url: p.codeUrl });

    } else if (q.includes('obesity') || q.includes('lime') || q.includes('risk')) {
      thoughts = [
        "Analyzing Query: Obesity Risk Prediction",
        "Loading tabular models: XGBoost, LightGBM, CatBoost",
        "Running SMOTE oversampling node for class imbalance",
        "Executing LIME local explainability mapping"
      ];
      const p = projectsData.find(proj => proj.title === 'Obesity Risk Prediction Pipeline');
      text = `🤖 The **Obesity Risk Prediction Pipeline** is an end-to-end multi-class risk classification project (2026).
      
      • **Implementation**: Benchmarked XGBoost, LightGBM, and CatBoost models. Resolved class imbalance and multicollinearity using SMOTE and feature engineering.
      • **XAI Integration**: Applied LIME to explain individual risk factor predictions. Deployed via an interactive Flask web interface.`;
      
      if (p?.codeUrl) links.push({ label: "GitHub Repo", url: p.codeUrl });

    } else if (q.includes('skill') || q.includes('language') || q.includes('framework') || q.includes('python') || q.includes('sql') || q.includes('tool')) {
      thoughts = [
        "Analyzing Query: Skills & Proficiencies",
        "Fetching data analyst and ML engineer capability matrices",
        "Aggregating scores from NPTEL IIT certifications"
      ];
      text = `🤖 **Mohammed's Technical Skillsets**:
      
      • **Languages**: Python, SQL, R.
      • **Data Science & ML**: Predictive Modeling, Explainable AI (XAI - SHAP/LIME), Computer Vision, NLP, Statistical Inference.
      • **Frameworks**: Pandas, NumPy, Scikit-Learn, XGBoost, LightGBM, CatBoost, TensorFlow, LangChain, LangGraph.
      • **Tools**: Git, Jupyter Notebook, Linux, Neo4j Graph DB, Playwright.`;

    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('hire') || q.includes('location')) {
      thoughts = [
        "Analyzing Query: Contact / Hiring",
        "Retrieving personal coordinates and social identifiers"
      ];
      text = `🤖 **Contact Channels for Mohammed**:
      
      • 📍 **Location**: Hyderabad, India (Open to Remote / Relocation).
      • 📧 **Email**: ${personalInfo.email}
      • 📞 **Phone**: ${personalInfo.phone}
      • 💼 **LinkedIn**: [LinkedIn profile](${personalInfo.linkedin})
      • 💻 **GitHub**: [github.com/MohammedAbdul-Aziz](${personalInfo.github})`;
      
      links.push({ label: "Email Directly", url: `mailto:${personalInfo.email}` });
      links.push({ label: "LinkedIn Profile", url: personalInfo.linkedin });

    } else if (q.includes('experience') || q.includes('intern') || q.includes('oasis') || q.includes('work')) {
      thoughts = [
        "Analyzing Query: Work Experience",
        "Retrieving Oasis Infobyte intern records",
        "Reading Letter of Recommendation summary"
      ];
      const exp = experienceData[0];
      text = `🤖 **Professional Experience**:
      
      • **${exp.role}** at **${exp.company}** (Sep 2025 – Oct 2025)
      • Built and optimized supervised machine learning models using Scikit-learn and Pandas.
      • Engineered data-cleaning pipelines that boosted stability.
      • Earned a **Letter of Recommendation** for technical excellence and timely project delivery.`;

    } else if (q.includes('education') || q.includes('nptel') || q.includes('college') || q.includes('university') || q.includes('cgpa')) {
      thoughts = [
        "Analyzing Query: Education and Certifications",
        "Querying Osmania University B.E. transcript",
        "Validating IIT Madras/Roorkee NPTEL scores"
      ];
      text = `🤖 **Education & Certifications**:
      
      • 🎓 **B.E. Computer Science Engineering**: Osmania University (ISL College) - 2026. **CGPA: 8.7/10**.
      • 🏆 **NPTEL IIT Madras (Intro to ML)**: National Topper (Top 5% Score).
      • 📊 **NPTEL IIT Roorkee (Data Analytics)**: Score of 82%.
      • 🏫 **Intermediate (MPC)**: Srinivasa Junior College - 2022. **CGPA: 8.88/10**.`;

    } else {
      thoughts = [
        "Analyzing Query: General Inquiry",
        "Scanning keyword database: Match failed",
        "Routing to default response agent"
      ];
      text = `🤖 I processed your query, but could not find a exact keyword match. Here is a quick summary of Mohammed Abdul Aziz:
      
      He is a **Data Analyst / ML Engineer** based in Hyderabad. He graduated in 2026 with a **CGPA of 8.7** from Osmania University. He is an NPTEL National Topper (Top 5%) in ML and has built advanced systems in **Predictive Modeling**, **Explainable AI (LIME/SHAP)**, **Computer Vision**, and **Agentic QA systems**.
      
      Feel free to ask specifically about "AgriVerse", "Inspectra-ReQon-AI", "Obesity Risk Pipeline", "his skills", "contact details", or "experience"!`;
    }

    return { text, thoughts, links };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isThinking) return;

    // Add user message
    const userMsgId = `msg-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: textToSend }]);
    setInput('');
    
    // Start agent thought process simulation
    const responseDetails = getAgentResponse(textToSend);
    setIsThinking(true);
    setThoughtSteps(responseDetails.thoughts);
    setCurrentStepIndex(-1);

    // After thought steps finish, add agent response
    const totalThoughtDuration = responseDetails.thoughts.length * 600 + 400;
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: responseDetails.text,
        links: responseDetails.links
      }]);
      setIsThinking(false);
      setThoughtSteps([]);
      setCurrentStepIndex(-1);
    }, totalThoughtDuration);
  };

  return (
    <div className="agent-chatbot-card">
      <div className="agent-chatbot-header">
        <div className="agent-status-indicator">
          <span className="pulse-dot"></span>
          <div>
            <h3>Inspectra-ReQon-Assistant v1.2</h3>
            <p>Knowledge Graph Active (Neo4j Schema: Resume/Portfolio)</p>
          </div>
        </div>
        <Icons.Terminal className="text-primary animate-pulse" size={20} />
      </div>

      <div className="agent-chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-wrapper ${msg.sender}`}>
            <div className="chat-message-avatar">
              {msg.sender === 'agent' ? (
                <div className="agent-avatar"><Icons.Sparkles size={14} /></div>
              ) : (
                <div className="user-avatar"><Icons.User size={14} /></div>
              )}
            </div>
            <div className="chat-message-content">
              <span className="sender-label">
                {msg.sender === 'agent' ? 'InspectraAgent' : 'Recruiter'}
              </span>
              <div className="chat-message-bubble">
                {/* Parse basic markdown bolding/lists */}
                {msg.text.split('\n').map((line, idx) => {
                  let formattedLine = line;
                  // Handle bullet points
                  const isBullet = formattedLine.trim().startsWith('•');
                  if (isBullet) {
                    formattedLine = formattedLine.trim().substring(1).trim();
                  }
                  
                  // Handle markdown bolding
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  const parts = [];
                  let lastIndex = 0;
                  let match;
                  
                  while ((match = boldRegex.exec(formattedLine)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push(formattedLine.substring(lastIndex, match.index));
                    }
                    parts.push(<strong key={match.index}>{match[1]}</strong>);
                    lastIndex = boldRegex.lastIndex;
                  }
                  if (lastIndex < formattedLine.length) {
                    parts.push(formattedLine.substring(lastIndex));
                  }

                  // Handle Link parsing basic: [text](url)
                  // Simple check for links, if we have markdown links, render them properly
                  
                  if (isBullet) {
                    return (
                      <div key={idx} className="bullet-point">
                        <span className="bullet-symbol">•</span>
                        <span>{parts.length > 0 ? parts : formattedLine}</span>
                      </div>
                    );
                  }
                  return <p key={idx}>{parts.length > 0 ? parts : formattedLine}</p>;
                })}
                
                {msg.links && msg.links.length > 0 && (
                  <div className="message-links">
                    {msg.links.map((link, lidx) => (
                      <a key={lidx} href={link.url} target="_blank" rel="noopener noreferrer" className="message-link-btn">
                        {link.label} <Icons.ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-message-wrapper agent">
            <div className="chat-message-avatar">
              <div className="agent-avatar loading-avatar">
                <div className="spinner"></div>
              </div>
            </div>
            <div className="chat-message-content">
              <span className="sender-label">InspectraAgent (Thinking...)</span>
              <div className="agent-thought-log">
                <div className="thought-header">
                  <Icons.Terminal size={12} /> Agent Node Execution Stack:
                </div>
                {thoughtSteps.slice(0, currentStepIndex + 1).map((step, sidx) => (
                  <div key={sidx} className={`thought-step ${sidx === currentStepIndex ? 'active' : ''}`}>
                    <span className="step-arrow">→</span> {step}...
                  </div>
                ))}
                {currentStepIndex < thoughtSteps.length - 1 && (
                  <div className="thought-step-loader">
                    <span className="pulse-text">Executing next node in LangGraph pipeline...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-replies-container">
        {quickReplies.map((qr, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qr.query)}
            disabled={isThinking}
            className="quick-reply-btn"
          >
            {qr.label}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="agent-chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isThinking ? "Agent is processing stack..." : "Ask my portfolio agent a question..."}
          disabled={isThinking}
          className="agent-input-field"
        />
        <button type="submit" disabled={isThinking || !input.trim()} className="agent-send-btn">
          <Icons.Send size={16} />
        </button>
      </form>
    </div>
  );
};
