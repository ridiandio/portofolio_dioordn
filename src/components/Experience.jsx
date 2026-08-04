import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import "./Experience.css";

const Experience = () => {
  const sectionRef = useRef(null);

  const experiences = [
    {
      shortName: "Warkop Mikita",
      title: "Full Stack Web Developer",
      company: "Warkop Mikita",
      period: "Nov 2024 - Dec 2025",
      isActive: false,
      description: "Developed and maintained a full-stack web application to support daily business operations. Designed responsive interfaces using Laravel, optimized database structures, and improved application reliability through efficient testing.",
      type: "Professional",
      icon: "work",
      skills: ["Laravel", "Full-Stack Dev", "REST API", "Database Design"],
      technologies: ["PHP", "Laravel", "MySQL"],
      image: "/Warkop Mikita.jpeg",
    },
    {
      shortName: "Vocational High School 1 Barunawati Jakarta",
      title: "Full Stack Web Developer Intern",
      company: "Vocational High School 1 Barunawati Jakarta",
      period: "Internship",
      isActive: false,
      description: "Collaborated to design and develop a web-based Learning Management System (LMS). Designed system architecture with UML diagrams, built frontend and backend components, and prepared comprehensive technical documentation.",
      type: "Internship",
      icon: "work",
      skills: ["System Analysis", "UI/UX Design", "Web Development", "UML"],
      technologies: ["Visual Paradigm", "Figma", "HTML/CSS/JS", "PHP"],
      image: "/Vocatonal High School 1 Barunawati.jpeg",
    },
    {
      shortName: "Islamic Elementary School Al-Muddatsiriyah",
      title: "Full Stack Database Developer Intern",
      company: "Islamic Elementary School Al-Muddatsiriyah",
      period: "Internship",
      isActive: false,
      description: "Contributed to the design and development of a database system to improve school data management. Utilized Visual Paradigm for ERD, and contributed to a Laravel-based web application integrating the database.",
      type: "Internship",
      icon: "work",
      skills: ["Database Design", "System Analysis", "Web Development"],
      technologies: ["Visual Paradigm", "Figma", "Laravel", "MySQL"],
      image: "/Islamic Elementary Al-Muddatsiriyah.jpeg",
    },
    {
      shortName: "INABA",
      title: "Graphic Design Intern",
      company: "Universitas Indonesia Membangun (INABA)",
      period: "Internship",
      isActive: false,
      description: "Designed posters, digital content, and visual assets to support academic and promotional activities. Utilized Adobe Photoshop, CorelDRAW, and Wondershare Filmora to produce engaging visual and video content.",
      type: "Internship",
      icon: "work",
      skills: ["Graphic Design", "Video Editing", "Visual Communication"],
      technologies: ["Photoshop", "CorelDRAW", "Filmora"],
      image: "/INABA.jpeg",
    },
    {
      shortName: "IMMA Telkom University Jakarta",
      title: "Member — IMMA Telkom University Jakarta",
      company: "IMMA Telkom University Jakarta",
      period: "2024 - 2025",
      isActive: false,
      description: "Participated in organizational, educational, and community engagement activities promoting leadership, personal development, and social responsibility. Contributed to organizing events that fostered community engagement, teamwork, and ethical leadership.",
      type: "Community",
      icon: "org",
      skills: ["Leadership", "Event Planning", "Teamwork", "Communication"],
      technologies: [],
    },
    {
      shortName: "GDSC",
      title: "Member — Google Developer Student Clubs",
      company: "GDSC on Campus — Telkom University Jakarta Chapter",
      period: "2023 - 2024",
      isActive: false,
      description: "Engaged in a dynamic community fostering innovation through workshops, hackathons, and collaborative projects. Gained exposure to software development, UI/UX design, and emerging technologies while building impactful solutions.",
      type: "Community",
      icon: "org",
      skills: ["Software Development", "UI/UX Design", "Hackathons", "Problem Solving"],
      technologies: [],
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "edu": return <GraduationCap size={18} />;
      case "org": return <Users size={18} />;
      default: return <Briefcase size={18} />;
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = experiences[activeIndex];

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="exp-sticky-container">
        <div className="exp-container">
          {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">Career & Community</div>
          <h2 className="section-title">
            Where I've <span className="section-title-gradient">made impact</span>
          </h2>
          <p className="section-description">
            Select an experience to explore my professional journey, internships, and community involvement.
          </p>
        </motion.div>

        {/* Interactive Layout */}
        <div className="exp-interactive-layout">
          
          {/* Left Side: Premium Selector */}
          <div className="exp-selector">
            {/* Floating highlight background */}
            <motion.div
              className="exp-selector__glow"
              animate={{ y: activeIndex * 68 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />

            {experiences.map((exp, index) => (
              <button
                key={index}
                className={`exp-selector__item ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="exp-selector__text">
                  <span className="exp-selector__name">{exp.shortName}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side: Experience Details */}
          <div className="exp-details-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="exp-card glass-panel"
              >
                <div className="exp-card__header">
                  <div className="exp-card__meta">
                    <div className={`exp-card__icon ${activeExp.isActive ? "active" : ""}`}>
                      {getIcon(activeExp.icon)}
                    </div>
                    <div>
                      <div className="exp-card__type">{activeExp.type}</div>
                      <div className={`exp-card__period ${activeExp.isActive ? "active" : ""}`}>
                        {activeExp.isActive && <span className="exp-card__pulse" />}
                        {activeExp.period}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="exp-card__title">{activeExp.title}</h3>
                <div className="exp-card__company">{activeExp.company}</div>
                <p className="exp-card__desc">{activeExp.description}</p>

                {activeExp.image && (
                  <div className="exp-card__documentation" style={{ margin: '24px 0' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '12px', letterSpacing: '0.05em' }}>DOCUMENTATION</div>
                    <img 
                      src={activeExp.image} 
                      alt={`Documentation for ${activeExp.company}`} 
                      style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
                    />
                  </div>
                )}

                <div className="exp-card__footer">
                  <div className="exp-card__skills">
                    {activeExp.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                  {activeExp.technologies.length > 0 && (
                    <div className="exp-card__tech">
                      {activeExp.technologies.map((tech, i) => (
                        <span key={i} className="exp-tech-dot">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Experience;
