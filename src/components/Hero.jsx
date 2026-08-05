import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Layout, Database, Code } from "lucide-react";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiLaravel, SiPhp, SiMysql, SiBootstrap, SiGit, SiFigma } from "react-icons/si";
import "./Hero.css";
import DarkVeil from "./DarkVeil";
import LogoLoop from "./LogoLoop";

const Hero = ({ isLoaded = true }) => {
  const skillsMastered = [
    { name: "Laravel", icon: <SiLaravel color="#FF2D20" size={16} /> },
    { name: "React.js", icon: <SiReact color="#61DAFB" size={16} /> },
    { name: "Next.js", icon: <SiNextdotjs color="#ffffff" size={16} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss color="#38B2AC" size={16} /> },
    { name: "PHP", icon: <SiPhp color="#777BB4" size={16} /> },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={16} /> },
    { name: "UI/UX Design", icon: <Layout color="#fcd34d" size={16} /> },
    { name: "MySQL", icon: <SiMysql color="#4479A1" size={16} /> },
    { name: "Bootstrap", icon: <SiBootstrap color="#7952B3" size={16} /> },
    { name: "System Analysis", icon: <Database color="#c084fc" size={16} /> },
    { name: "Git", icon: <SiGit color="#F05032" size={16} /> },
    { name: "Figma", icon: <SiFigma color="#F24E1E" size={16} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="hero-video-wrapper">
      {/* Interactive Cosmic Plasma Background */}
      <div className="hero-bg-particles" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <DarkVeil
          hueShift={336}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={1.9}
          scanlineFrequency={0.5}
          warpAmount={2.5}
        />
      </div>

      {/* Content Layer */}
      <div className="hero-content-layer">
        {/* ===== BLUR SHAPE ===== */}
        <div className="hero-blur-shape" />

        {/* ===== HERO CONTENT ===== */}
        <motion.div
          className="hero-main-content"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.h1 className="hero-headline" variants={itemVariants}>
            Mohamad Dio Ridian
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            System Analyst & Web Developer<br />
            turning business needs into digital solutions
          </motion.p>

          <motion.div className="hero-cta-wrap" variants={itemVariants}>
            <a 
              href="/CV_Mohamad_Dio_Ridian.pdf" 
              download="CV_Mohamad_Dio_Ridian.pdf"
              className="btn-hero-secondary hero-cta-btn"
              style={{ textDecoration: 'none' }}
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* ===== LOGO MARQUEE ===== */}
        <motion.div
          className="hero-marquee-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-marquee-container">
            <div className="hero-marquee-text">
              Core Technologies<br />& Skills I Master
            </div>
            <div className="hero-marquee-track-wrap">
              <LogoLoop
                logos={skillsMastered.map(skill => ({
                  node: React.cloneElement(skill.icon, { size: 36, color: "#ffffff" }),
                  title: skill.name,
                }))}
                speed={window.innerWidth < 768 ? 50 : 100}
                direction="left"
                logoHeight={36}
                gap={48}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="Core Technologies"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
