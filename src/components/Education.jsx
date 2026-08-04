import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import "./Experience.css"; // Reuse the same styling for perfectly matching UI

const Education = () => {
  const sectionRef = useRef(null);

  const educations = [
    {
      shortName: "Telkom University Jakarta",
      title: "Information Systems",
      company: "Telkom University Jakarta",
      period: "2023 – 2027",
      isActive: true,
      description: "Studying Information Systems with a focus on business process analysis, system development, database management, and information technology. Developing skills in analyzing business requirements, designing effective digital solutions, and integrating technology to improve organizational processes and efficiency.",
      type: "University",
      skills: ["Business Analysis", "System Development", "Database Management"],
      technologies: ["South Jakarta, Indonesia"],
    },
    {
      shortName: "Vocational High School 1 Barunawati Jakarta",
      title: "Multimedia",
      company: "Vocational High School 1 Barunawati Jakarta",
      period: "2020 – 2023",
      isActive: false,
      description: "Studied Multimedia with a focus on graphic design, visual communication, video production, and digital media. Developed practical skills in creating visual content, editing multimedia projects, and applying creative design principles across digital platforms.",
      type: "Vocational High School",
      skills: ["Graphic Design", "Video Production", "Digital Media"],
      technologies: ["West Jakarta, Indonesia"],
    },
    {
      shortName: "Junior High School 1 Barunawati Jakarta",
      title: "Junior High School",
      company: "Junior High School 1 Barunawati Jakarta",
      period: "2017 – 2020",
      isActive: false,
      description: "Completed junior high school education with a focus on developing academic knowledge, communication skills, and personal growth through classroom learning and school activities.",
      type: "Junior High School",
      skills: ["Academic Knowledge", "Communication", "Personal Growth"],
      technologies: ["West Jakarta, Indonesia"],
    },
    {
      shortName: "Public Elementary School Slipi 11",
      title: "Elementary School",
      company: "Public Elementary School Slipi 11",
      period: "2011 – 2017",
      isActive: false,
      description: "Completed elementary education, building a strong foundation in basic academic knowledge, communication, problem-solving, and social skills.",
      type: "Elementary School",
      skills: ["Basic Academics", "Communication", "Problem Solving"],
      technologies: ["West Jakarta, Indonesia"],
    }
  ];

  const getIcon = () => {
    return <GraduationCap size={18} />;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = educations[activeIndex];

  return (
    <section id="education" className="exp-section" ref={sectionRef}>
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
          <div className="section-eyebrow">Academic Background</div>
          <h2 className="section-title">
            My <span className="section-title-gradient">Education</span>
          </h2>
          <p className="section-description">
            Explore my academic journey and the foundational knowledge I've built over the years.
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

            {educations.map((exp, index) => (
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
                      {getIcon()}
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

                <div className="exp-card__footer">
                  <div className="exp-card__skills">
                    {activeExp.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                  {activeExp.technologies.length > 0 && (
                    <div className="exp-card__tech">
                      {activeExp.technologies.map((tech, i) => (
                        <span key={i} className="exp-tech-dot">
                          <MapPin size={12} style={{ marginRight: '4px' }} />
                          {tech}
                        </span>
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

export default Education;
