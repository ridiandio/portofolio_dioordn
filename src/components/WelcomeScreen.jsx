import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000); // Shorter loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="welcome-container"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* Removed aurora animation to fix lag */}
          <div className="welcome-video-overlay" style={{ background: "rgba(3, 0, 10, 0.7)" }} />

          <div className="welcome-content">
            <AnimatePresence mode="wait">
              <motion.div
                key="content"
                className="welcome-text-wrapper"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                  <h1 className="welcome-title text-shimmer">WELCOME</h1>
                  <p className="welcome-desc">
                    A passionate web developer focused on crafting beautiful, interactive, and highly performant digital experiences. I bring ideas to life through modern technologies, elegant design, and seamless user interfaces.
                  </p>
                  
                  <motion.button
                    className="welcome-solid-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVisible(false)}
                  >
                    CLICK TO ENTER
                  </motion.button>
                </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
