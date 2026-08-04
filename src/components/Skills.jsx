import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Layout, Palette, Wrench, Award } from "lucide-react";
import { SiLaravel, SiPhp, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiFigma, SiGit, SiMysql, SiBootstrap, SiHtml5, SiCss } from "react-icons/si";
import { FaChartBar, FaProjectDiagram, FaFileWord } from "react-icons/fa";
import CircularGallery from "./CircularGallery";
import "./Skills.css";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeCategory, setActiveCategory] = useState(null);
  const gridRef = useRef(null);

  const certifications = [
    {
      title: "2nd Place — UI/UX National, IEEE Competition 2025",
      issuer: "IEEE Student Branch Universitas Brawijaya",
      year: "Sep 2025",
      image: "/IEEE Brawijaya.jpeg",
      text: "IEEE UI/UX — 2nd Place",
    },
    {
      title: "3rd Place — National Essay Competition D-Techtion 2025",
      issuer: "HIMA MBTI Telkom University",
      year: "Sep 2025",
      image: "/National Essay.png",
      text: "D-Techtion — 3rd Place",
    },
    {
      title: "Field Work Practice Certificate",
      issuer: "Vocational High School 1 Barunawati Jakarta",
      year: "2023",
      image: "/Field Work Practice Certificate.jpeg",
      text: "Internship Certificate",
    },
  ];

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <Code size={24} />,
      color: "#7C3AED",
      skills: [
        { name: "HTML", icon: <SiHtml5 color="#ffffff" size={22} /> },
        { name: "CSS", icon: <SiCss color="#ffffff" size={22} /> },
        { name: "JavaScript", icon: <SiJavascript color="#ffffff" size={22} /> },
        { name: "React.js", icon: <SiReact color="#ffffff" size={22} /> },
        { name: "Next.js", icon: <SiNextdotjs color="#ffffff" size={22} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss color="#ffffff" size={22} /> },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      icon: <Database size={24} />,
      color: "#7C3AED",
      skills: [
        { name: "Laravel", icon: <SiLaravel color="#ffffff" size={22} /> },
        { name: "PHP", icon: <SiPhp color="#ffffff" size={22} /> },
        { name: "MySQL", icon: <SiMysql color="#ffffff" size={22} /> },
        { name: "Bootstrap", icon: <SiBootstrap color="#ffffff" size={22} /> },
        { name: "Git", icon: <SiGit color="#ffffff" size={22} /> },
      ],
    },
    {
      id: "design",
      title: "Design & Analysis",
      icon: <Layout size={24} />,
      color: "#7C3AED",
      skills: [
        { name: "Figma", icon: <SiFigma color="#ffffff" size={22} /> },
        { name: "Visual Paradigm", icon: <FaProjectDiagram color="#ffffff" size={20} /> },
        { name: "Power BI", icon: <FaChartBar color="#ffffff" size={20} /> },
        { name: "Microsoft Word", icon: <FaFileWord color="#ffffff" size={20} /> },
      ],
    },
  ];

  /* Mouse tracking for spotlight */
  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;
    const islands = gridRef.current.querySelectorAll(".skill-island");
    islands.forEach((island) => {
      const rect = island.getBoundingClientRect();
      island.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
      island.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
    });
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">Technology Ecosystem</div>
          <h2 className="section-title">
            Skills & <span className="section-title-gradient">Expertise</span>
          </h2>
          <p className="section-description">
            An interactive map of the technologies, tools, and methodologies that power my work.
          </p>
        </motion.div>

        {/* Toggle Tab Switcher */}
        <div className="skills-tab-switcher">
          <button
            className={`skills-tab-btn ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            <Wrench size={18} />
            <span>Skills & Tools</span>
            {activeTab === "skills" && <motion.div className="skills-tab-pill" layoutId="skillsTabPill" />}
          </button>
          <button
            className={`skills-tab-btn ${activeTab === "certifications" ? "active" : ""}`}
            onClick={() => setActiveTab("certifications")}
          >
            <Award size={18} />
            <span>Awards & Certifications</span>
            {activeTab === "certifications" && <motion.div className="skills-tab-pill" layoutId="skillsTabPill" />}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "skills" ? (
            <motion.div
              key="skills-tab-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Floating Glass Islands */}
              <div className="skill-islands" ref={gridRef} onMouseMove={handleMouseMove}>
                {skillCategories.map((category, catIdx) => (
                  <motion.div
                    key={category.id}
                    className={`skill-island glass-panel ${activeCategory === category.id ? "active" : ""}`}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: catIdx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                    style={{ "--island-color": category.color }}
                  >
                    {/* Spotlight glow removed */}

                    {/* Header */}
                    <div className="skill-island__header">
                      <div className="skill-island__icon" style={{ color: category.color }}>
                        {category.icon}
                      </div>
                      <h3 className="skill-island__title">{category.title}</h3>
                      <div className="skill-island__count">{category.skills.length} skills</div>
                    </div>

                    {/* Expanded skills */}
                    <AnimatePresence>
                      {activeCategory === category.id && (
                        <motion.div
                          className="skill-island__skills"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="skill-island__grid">
                            {category.skills.map((skill, idx) => (
                              <motion.div
                                key={idx}
                                className="skill-node"
                                initial={{ opacity: 0, scale: 0, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                              >
                                <div className="skill-node__icon">{skill.icon}</div>
                                <span className="skill-node__name">{skill.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Default: mini icons preview */}
                    {activeCategory !== category.id && (
                      <div className="skill-island__preview">
                        {category.skills.slice(0, 4).map((skill, idx) => (
                          <div key={idx} className="skill-island__mini-icon">
                            {skill.icon}
                          </div>
                        ))}
                        {category.skills.length > 4 && (
                          <span className="skill-island__more">+{category.skills.length - 4}</span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cert-tab-content"
              className="skills-awards"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: "16px" }}
            >
              <div className="cert-grid">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    className="cert-card glass-panel"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="cert-card__image-wrapper">
                      <img src={cert.image} alt={cert.title} className="cert-card__image" />
                    </div>
                    <h3 className="cert-card__title">{cert.title}</h3>
                    <div className="cert-card__issuer">{cert.issuer}</div>
                    <div className="cert-card__year">{cert.year}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
