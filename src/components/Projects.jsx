import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Subsense",
      description:
        "Subscription management & financial tracking app designed for TechSprint Innovation Cup 2026. Features intuitive interfaces with subscription analytics, smart reminders, and spending dashboards.",
      category: "UI/UX Design",
      tech: ["Figma", "Visual Paradigm", "Design Thinking"],
      color: "var(--primary)",
      large: true,
      link: "https://github.com/ridiandio/Projects-LinkedIn/blob/1d1d7b85279a8cc532cd4dd1c00551dd90db2796/Subsense.pdf",
    },
    {
      title: "Edura",
      description:
        "Mobile-based e-learning platform providing affordable and accessible learning. Features structured roadmaps, premium courses, digital certificates, and gamification elements like badges.",
      category: "UI/UX Design",
      tech: ["Figma", "User Research", "Prototyping"],
      color: "var(--primary)",
      link: "https://github.com/ridiandio/Projects-LinkedIn/blob/1d1d7b85279a8cc532cd4dd1c00551dd90db2796/EduraTeam.pdf",
    },
    {
      title: "Finoria",
      description:
        "Smart and secure mobile banking application focusing on financial inclusion. Features biometric authentication, smart budgeting tools, and financial education modules.",
      category: "UI/UX Design",
      tech: ["Figma", "Human-Centered Design", "Prototyping"],
      color: "var(--primary)",
      link: "https://github.com/ridiandio/Projects-LinkedIn/blob/1d1d7b85279a8cc532cd4dd1c00551dd90db2796/Finoria.pdf",
    },
    {
      title: "QateringGo",
      description:
        "Web-based catering marketplace connecting customers, corporate clients, and vendors. Designed seamless workflows for online ordering, digital payments, and real-time order tracking.",
      category: "System Analysis",
      tech: ["Visual Paradigm", "UML", "Prototyping"],
      color: "var(--primary)",
      large: true,
      link: "https://github.com/ridiandio/Projects-LinkedIn/blob/1d1d7b85279a8cc532cd4dd1c00551dd90db2796/Qatering.pdf",
    },
  ];

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>
      <div className="proj-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">Selected Work</div>
          <h2 className="section-title">
            Projects that <span className="section-title-gradient">define craft</span>
          </h2>
          <p className="section-description">
            Each project is a unique challenge — designed, engineered, and polished to deliver exceptional digital experiences.
          </p>
        </motion.div>

        {/* Project Showcase Grid */}
        <div className="proj-list">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className={`proj-card glass-panel ${proj.large ? "large" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Header */}
              <div className="proj-card__header">
                <div className="proj-card__meta">
                  <span className="proj-card__number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="proj-card__category">{proj.category}</span>
                </div>

                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-card__link"
                  >
                    <FaGithub size={16} />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <div className="proj-card__link proj-card__link--disabled">
                    <FaGithub size={16} />
                    <span>Private</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="proj-card__title">{proj.title}</h3>
              <p className="proj-card__desc">{proj.description}</p>

              {/* Tech stack */}
              <div className="proj-card__tech">
                {proj.tech.map((t, i) => (
                  <span key={i} className="proj-card__tech-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
