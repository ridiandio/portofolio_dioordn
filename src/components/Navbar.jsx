import React, { useState, useEffect } from "react";
import "./Hero.css"; // Reuse the styles defined in Hero.css for the power-navbar

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
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
      <nav className={`power-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-logo-placeholder" style={{ width: '40px' }} />
        {/* Center nav (desktop) */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="nav-item-btn"
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="nav-right">
          <button
            className="btn-hero-secondary nav-signup-btn"
            onClick={() => handleNav("contact")}
            style={{ display: "none" }}
            id="nav-contact-desktop"
          >
            Contact
          </button>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Navbar divider */}
      <div className="nav-divider" />

      {/* Mobile overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile panel */}
      <div className={`mobile-menu-panel ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              className={`mobile-menu-link ${mobileOpen ? "visible" : ""}`}
              style={{ transitionDelay: mobileOpen ? `${100 + idx * 60}ms` : "0ms" }}
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
