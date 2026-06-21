import React, { useState, useEffect } from 'react';
import * as Icons from './components/Icons';
import { AgentChatbot } from './components/AgentChatbot';
import { ExplainablePlayground } from './components/ExplainablePlayground';
import { ProjectModal } from './components/ProjectModal';
import {
  personalInfo,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  certificationsData,
  leadershipData
} from './data';
import type { Project } from './data';

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState('home');

  // Typewriter effect states
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Skill category filter states
  const [activeSkillTab, setActiveSkillTab] = useState<'all' | 'languages' | 'ml' | 'frameworks' | 'tools'>('all');

  // Project category filter states
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'ML' | 'CV' | 'Agentic AI'>('All');

  // Modal active project state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Typewriter parameters
  const titles = personalInfo.titles;
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const delayBetweenTitles = 2000;

  useEffect(() => {
    let timer: any;
    const fullText = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenTitles);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  // Handle active navigation highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'xai', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request to Vercel Serverless Function or static mail sender
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Reset submission notification after 5s
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  // Filter skills based on tab
  const getFilteredSkills = () => {
    switch (activeSkillTab) {
      case 'languages':
        return skillsData.languages;
      case 'ml':
        return skillsData.mlDataScience;
      case 'frameworks':
        return skillsData.frameworks;
      case 'tools':
        return skillsData.tools;
      default:
        return [
          ...skillsData.languages,
          ...skillsData.mlDataScience,
          ...skillsData.frameworks,
          ...skillsData.tools
        ];
    }
  };

  // Filter projects based on pill
  const filteredProjects = projectsData.filter(proj => {
    if (activeProjectFilter === 'All') return true;
    return proj.category === activeProjectFilter;
  });

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="navbar-header">
        <div className="container navbar-content">
          <a href="#home" className="navbar-logo">
            <Icons.Brain size={24} />
            <span>AZIZ.AI</span>
          </a>
          <nav className="navbar-nav">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
            <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
            <a href="#xai" className={`nav-link ${activeSection === 'xai' ? 'active' : ''}`}>XAI Playground</a>
            <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
            <a href="#timeline" className={`nav-link ${activeSection === 'timeline' ? 'active' : ''}`}>Timeline</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
          <a href="#contact" className="nav-cta-btn">
            Hire Me
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section-wrapper">
        <div className="container hero-grid">
          <div className="hero-content-left animate-zoom-in">
            <div className="hero-tagline">
              <Icons.Sparkles size={14} /> Open for ML & DS Roles
            </div>
            <h1 className="hero-name">{personalInfo.name}</h1>
            <div className="hero-title-typewriter">
              <span>{currentText}</span>
              <span className="typewriter-cursor"></span>
            </div>
            <p className="hero-desc">{personalInfo.summary}</p>
            
            <div className="hero-actions-row">
              <a href="#projects" className="btn-primary">
                <Icons.Code size={18} /> View Projects
              </a>
              <a href="#contact" className="btn-secondary">
                <Icons.Mail size={18} /> Contact Me
              </a>
            </div>

            <div className="hero-socials-row">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-circle-link" title="GitHub">
                <Icons.GitHub size={20} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-circle-link" title="LinkedIn">
                <Icons.LinkedIn size={20} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="social-circle-link" title="Email">
                <Icons.Mail size={20} />
              </a>
              <a href={`tel:${personalInfo.phone}`} className="social-circle-link" title="Call Phone">
                <Icons.Phone size={20} />
              </a>
            </div>
          </div>

          <div className="hero-content-right">
            <AgentChatbot />
          </div>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section className="stats-banner-wrapper">
        <div className="container stats-grid">
          <div className="stat-counter-card">
            <span className="stat-num">8.7/10</span>
            <span className="stat-label-text">Academic Merit</span>
            <span className="stat-desc-text">B.E. Computer Science, Osmania University</span>
          </div>
          <div className="stat-counter-card">
            <span className="stat-num">Top 5%</span>
            <span className="stat-label-text">National Rank</span>
            <span className="stat-desc-text">NPTEL Intro to ML Topper, IIT Madras</span>
          </div>
          <div className="stat-counter-card">
            <span className="stat-num">3rd Prize</span>
            <span className="stat-label-text">National Hackathon</span>
            <span className="stat-desc-text">Agritech Pest & Yield Predictor (AgriVerse)</span>
          </div>
          <div className="stat-counter-card">
            <span className="stat-num">7 Certs</span>
            <span className="stat-label-text">Expert Certifications</span>
            <span className="stat-desc-text">NPTEL IIT/IISc program completions</span>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section id="skills" className="section-wrapper">
        <div className="container">
          <div className="section-header-block">
            <span className="section-badge">Capabilities</span>
            <h2 className="section-title">Technical Skill Matrix</h2>
            <p className="section-description">
              A comprehensive directory of my technical competencies across languages, machine learning paradigms, data frameworks, and agentic tools.
            </p>
          </div>

          <div className="skills-tabs-container">
            <button
              onClick={() => setActiveSkillTab('all')}
              className={`skills-tab-btn ${activeSkillTab === 'all' ? 'active' : ''}`}
            >
              All Skills
            </button>
            <button
              onClick={() => setActiveSkillTab('languages')}
              className={`skills-tab-btn ${activeSkillTab === 'languages' ? 'active' : ''}`}
            >
              Languages
            </button>
            <button
              onClick={() => setActiveSkillTab('ml')}
              className={`skills-tab-btn ${activeSkillTab === 'ml' ? 'active' : ''}`}
            >
              Data Science & ML
            </button>
            <button
              onClick={() => setActiveSkillTab('frameworks')}
              className={`skills-tab-btn ${activeSkillTab === 'frameworks' ? 'active' : ''}`}
            >
              Frameworks & Libraries
            </button>
            <button
              onClick={() => setActiveSkillTab('tools')}
              className={`skills-tab-btn ${activeSkillTab === 'tools' ? 'active' : ''}`}
            >
              Tools & Platforms
            </button>
          </div>

          <div className="skills-display-grid">
            {getFilteredSkills().map((skill, index) => (
              <div key={index} className="skill-rating-card">
                <div className="skill-name-label">
                  <span>{skill.name}</span>
                  <span className="skill-pct-badge">{skill.level}%</span>
                </div>
                <div className="skill-progress-bar-track">
                  <div
                    className="skill-progress-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainable AI Playground Section */}
      <section id="xai" className="section-wrapper" style={{ backgroundColor: 'rgba(13, 18, 28, 0.2)' }}>
        <div className="container">
          <div className="section-header-block">
            <span className="section-badge">XAI Playground</span>
            <h2 className="section-title">Explainable AI Sandbox</h2>
            <p className="section-description">
              Data predictions shouldn't be a black box. Interact with this live prediction model and observe how local feature changes perturb LIME explainability impacts in real-time.
            </p>
          </div>
          <ExplainablePlayground />
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section id="projects" className="section-wrapper">
        <div className="container">
          <div className="section-header-block">
            <span className="section-badge">Selected Work</span>
            <h2 className="section-title">Systems & Pipelines Built</h2>
            <p className="section-description">
              A curated showcase of end-to-end engineering projects, featuring convolutional architectures, tabular benchmarks, and autonomous LLM agents.
            </p>
          </div>

          <div className="projects-filter-pills">
            {(['All', 'ML', 'CV', 'Agentic AI'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveProjectFilter(filter)}
                className={`filter-pill ${activeProjectFilter === filter ? 'active' : ''}`}
              >
                {filter === 'All' ? 'All Engineering' : filter}
              </button>
            ))}
          </div>

          <div className="projects-cards-grid">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="project-display-card"
                onClick={() => setSelectedProject(project)}
                style={{ '--primary-color': project.highlightColor } as React.CSSProperties}
              >
                <div className="project-card-header">
                  <span className="project-category-badge" style={{ borderColor: project.highlightColor, color: project.highlightColor, backgroundColor: `${project.highlightColor}11` }}>
                    {project.category}
                  </span>
                  <span className="project-period-label">{project.period}</span>
                </div>
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  
                  {/* Highlights Bullet Preview */}
                  <div className="project-card-achievements-preview">
                    {project.achievements.slice(0, 2).map((ach, aidx) => (
                      <div key={aidx} className="project-preview-item">
                        <span className="preview-dot" style={{ backgroundColor: project.highlightColor }}></span>
                        <span>{ach.length > 85 ? ach.substring(0, 85) + '...' : ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="project-card-footer">
                  <div className="project-tech-tags-preview">
                    {project.techStack.slice(0, 3).map((tech, tidx) => (
                      <span key={tidx} className="tech-tag-pill">{tech}</span>
                    ))}
                    {project.techStack.length > 3 && <span className="tech-tag-pill">+{project.techStack.length - 3}</span>}
                  </div>
                  <span className="project-explore-link">
                    Explore <Icons.ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Timeline Section */}
      <section id="timeline" className="section-wrapper" style={{ backgroundColor: 'rgba(13, 18, 28, 0.2)' }}>
        <div className="container">
          <div className="section-header-block">
            <span className="section-badge">Background</span>
            <h2 className="section-title">Timeline & Academic Merits</h2>
            <p className="section-description">
              A chronological map detailing my professional experiences in data pipelines and my formal academic path.
            </p>
          </div>

          <div className="timeline-grid">
            {/* Experience Column */}
            <div className="timeline-column">
              <h3 className="timeline-column-title">
                <Icons.Briefcase size={20} className="text-primary" /> Work History
              </h3>
              
              <div className="timeline-list">
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="timeline-entry-node">
                    <div className="timeline-header-block">
                      <div>
                        <h4 className="entry-role-title">{exp.role}</h4>
                        <span className="entry-org-sub">{exp.company} — {exp.location}</span>
                      </div>
                      <span className="entry-period-badge">{exp.period}</span>
                    </div>
                    
                    <ul className="timeline-bullet-list">
                      {exp.achievements.map((ach, aidx) => (
                        <li key={aidx} className="timeline-bullet-item">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="timeline-column">
              <h3 className="timeline-column-title">
                <Icons.BookOpen size={20} className="text-secondary" /> Education
              </h3>

              <div className="timeline-list">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="timeline-entry-node secondary">
                    <div className="timeline-header-block">
                      <div>
                        <h4 className="entry-role-title">{edu.degree}</h4>
                        <span className="entry-org-sub">{edu.school}</span>
                      </div>
                      <span className="entry-period-badge">{edu.period}</span>
                    </div>
                    <p className="entry-details-desc">{edu.details}</p>
                    <span className="entry-score-highlight">{edu.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications & Leadership Subgrid */}
          <div className="certifications-section-wrapper">
            <div className="timeline-column-title" style={{ marginBottom: '2rem' }}>
              <Icons.Award size={20} className="text-primary" /> Certifications & Leadership
            </div>
            
            <div className="certifications-carousel">
              {/* Leader Item */}
              <div className="cert-card-interactive">
                <span className="cert-badge-ribbon">Captain</span>
                <div className="cert-title-block">
                  <h4>{leadershipData.role}</h4>
                  <span className="cert-issuer-text">
                    <Icons.User size={12} /> {leadershipData.organization}
                  </span>
                </div>
                <p className="cert-issuer-text" style={{ marginTop: '0.5rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  {leadershipData.description}
                </p>
              </div>

              {/* NPTEL Certifications */}
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="cert-card-interactive">
                  {cert.badge && <span className="cert-badge-ribbon">{cert.badge}</span>}
                  <div className="cert-title-block">
                    <h4>{cert.name}</h4>
                    <span className="cert-issuer-text">
                      <Icons.Award size={12} /> {cert.issuer}
                    </span>
                  </div>
                  {cert.score && (
                    <span className="cert-score-label">
                      <Icons.Check size={12} /> {cert.score}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-wrapper">
        <div className="container">
          <div className="section-header-block">
            <span className="section-badge">Get In Touch</span>
            <h2 className="section-title">Initiate A Connection</h2>
            <p className="section-description">
              Interested in hiring or discussing model deployments? Drop a message directly to my inbox or reach out via phone/socials.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left Info Panel */}
            <div className="contact-info-panel">
              <h3 className="timeline-column-title" style={{ fontSize: '1.25rem' }}>
                Contact Coordinates
              </h3>
              
              <div className="contact-details-list">
                <div className="contact-method-item">
                  <div className="contact-icon-bg">
                    <Icons.Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label-sub">Email Address</span>
                    <a href={`mailto:${personalInfo.email}`} className="contact-value-text d-block">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-bg">
                    <Icons.Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label-sub">Phone Number</span>
                    <a href={`tel:${personalInfo.phone}`} className="contact-value-text d-block">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-bg">
                    <Icons.MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label-sub">Location</span>
                    <span className="contact-value-text d-block">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hero-socials-row" style={{ marginTop: '0.5rem' }}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-circle-link" title="GitHub">
                  <Icons.GitHub size={20} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-circle-link" title="LinkedIn">
                  <Icons.LinkedIn size={20} />
                </a>
              </div>
            </div>

            {/* Right Contact Form */}
            <form onSubmit={handleContactSubmit} className="contact-message-form">
              {isSubmitted && (
                <div className="form-success-state">
                  <Icons.Check size={18} /> Message transmitted successfully! I will revert back shortly.
                </div>
              )}

              <div className="form-label-group">
                <label htmlFor="name-input">Full Name</label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. John Doe"
                  className="form-input-element"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-label-group">
                <label htmlFor="email-input">Email Address</label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. recruiter@company.com"
                  className="form-input-element"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-label-group">
                <label htmlFor="subject-input">Subject</label>
                <input
                  id="subject-input"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g. Hiring Opportunity / Project Discussion"
                  className="form-input-element"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-label-group">
                <label htmlFor="message-input">Message Body</label>
                <textarea
                  id="message-input"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Type your message details here..."
                  className="form-input-element"
                  disabled={isSubmitting}
                />
              </div>

              <button type="submit" className="submit-btn-glow" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Icons.Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer-wrapper">
        <div className="container footer-content">
          <a href="#home" className="navbar-logo" style={{ fontSize: '1.25rem' }}>
            <Icons.Brain size={20} />
            <span>AZIZ.AI</span>
          </a>
          <p className="footer-logo-subtext">
            &copy; {new Date().getFullYear()} Mohammed Abdul Aziz. All rights reserved. Deployed on Vercel.
          </p>
          <div className="footer-social-row">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
