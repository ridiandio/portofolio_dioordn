import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    "Home",
    "About",
    "Experience",
    "Education",
    "Projects",
    "Skills",
    "Organization",
    "Contact",
  ];

  const handleNavClick = (targetId) => {
    setMobileOpen(false);
    const el = document.querySelector(targetId);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -80 });
      } else {
        const top = window.scrollY + el.getBoundingClientRect().top - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className={`serene-navbar ${isScrolled ? "scrolled" : ""}`}>
        {/* Brand */}
        <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}>
          <div className="nav-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white" />
              <path d="M6 18V6L18 18V6" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links-desktop">
          {navLinks.map((link) => (
            <button
              key={link}
              className="nav-link"
              onClick={() => handleNavClick(`#${link.toLowerCase()}`)}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="nav-cta-desktop">
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileOpen ? "open-top" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "open-mid" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "open-bot" : ""}`} />
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`mobile-panel-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Panel */}
      <div className={`mobile-panel ${mobileOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          {navLinks.map((link, idx) => (
            <button
              key={link}
              className={`mobile-nav-link ${mobileOpen ? "visible" : ""}`}
              style={{
                transitionDelay: mobileOpen ? `${150 + idx * 75}ms` : "0ms",
              }}
              onClick={() => handleNavClick(`#${link.toLowerCase()}`)}
            >
              {link}
            </button>
          ))}
        </nav>

        <div
          className={`mobile-nav-btn-wrap ${mobileOpen ? "visible" : ""}`}
          style={{ transitionDelay: mobileOpen ? "500ms" : "0ms" }}
        >
        </div>
      </div>
    </>
  );
};

export default Navbar;
