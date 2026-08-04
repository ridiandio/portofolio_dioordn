import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lanyard from "./Lanyard";
import "./About.css";

/* ─── Count-up Hook ─── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const increment = num / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

/* ─── Floating Glass Stat Panel ─── */
const StatPanel = ({ label, value, suffix = "", delay = 0, icon }) => {
  const numericPart = value.replace(/[^0-9]/g, "");
  const valueSuffix = value.replace(/[0-9]/g, "") || suffix;
  const { count, ref } = useCountUp(numericPart, 1800);

  return (
    <motion.div
      ref={ref}
      className="about-stat glass-panel"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="about-stat__value">{count}{valueSuffix}</div>
      <div className="about-stat__label">{label}</div>
    </motion.div>
  );
};



/* ─── About Section ─── */
const About = ({ isLoaded = true }) => {
  const sectionRef = useRef(null);

  const stats = [
    { label: "Years Experience", value: "3+", icon: "⏱" },
    { label: "Projects Completed", value: "6+", icon: "◆" },
    { label: "Awards Won", value: "2+", icon: "★" },
    { label: "Certificates", value: "30+", icon: "✦" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Exhibition Layout */}
        <div className="about-exhibition">
          {/* Left — Interactive Lanyard */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/depan.jpeg" backImage="/belakang.jpeg" imageFit="cover" />
            
            {/* Profile Card */}
            <div className="about-profile-card">
              <div className="about-profile-info">
                <div className="about-profile-text">
                  <span className="about-profile-name">@dioordn</span>
                  <div className="about-profile-status">
                    <span className="about-profile-dot"></span>
                    Available
                  </div>
                </div>
              </div>
              <a href="#contact" className="about-profile-contact">Contact Me</a>
            </div>
          </motion.div>

          {/* Right — Typography & Description */}
          <motion.div
            className="about-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div className="about-eyebrow" variants={fadeUp}>
              <span className="section-eyebrow">About Me</span>
            </motion.div>

            <motion.h2 className="about-headline" variants={fadeUp}>
              I craft
              <span className="about-headline__gradient"> digital experiences </span>
              that feel alive
            </motion.h2>

            <motion.p className="about-description" variants={fadeUp}>
              Passionate System Analyst, Web Developer, and UI/UX Designer with a strong interest in analyzing business needs, developing scalable web applications, and designing user-centered digital experiences. Experienced in gathering and documenting system requirements, modeling business processes, designing intuitive user interfaces, and building responsive web solutions.
            </motion.p>

            <motion.p className="about-description about-description--secondary" variants={fadeUp}>
              Skilled in system analysis, business process modeling, web development, Figma, and data analysis, with the ability to bridge business objectives and technical implementation. Committed to continuous learning and leveraging emerging technologies to create innovative, efficient, and impactful digital products.
            </motion.p>
          </motion.div>
        </div>

        {/* Stats — Floating Glass Panels */}
        <div className="about-stats">
          {stats.map((stat, i) => (
            <StatPanel
              key={i}
              {...stat}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
