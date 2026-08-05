import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

import BackgroundLayers from "./components/BackgroundLayers";
import WelcomeScreen from "./components/WelcomeScreen";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      lerp: isMobile ? 0.1 : 0.04,
      wheelMultiplier: isMobile ? 1 : 1.2,
      smoothWheel: true,
      normalizeWheel: true,
      infinite: false,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Helps with GSAP ScrollTrigger + Lenis sync
    
    window.lenis = lenis; // Expose globally to fix scroll conflicts

    if (isLoading) {
      lenis.stop();
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }

    // Disable browser zoom via keyboard (Ctrl + / Ctrl -) and mouse wheel (Ctrl + Wheel)
    const handleKeydown = (e) => {
      if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '_' || e.key === '0')) {
        e.preventDefault();
      }
    };
    
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeydown, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isLoading]);

  return (
    <div className="app-container" style={{ height: isLoading ? '100vh' : 'auto', overflow: isLoading ? 'hidden' : 'visible' }}>
      {/* Immersive background atmosphere */}
      <BackgroundLayers />

      {isLoading && <WelcomeScreen onComplete={() => setIsLoading(false)} />}

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero isLoaded={!isLoading} />
        <About isLoaded={!isLoading} />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact isLoaded={!isLoading} />
      </main>
    </div>
  );
}

export default App;
