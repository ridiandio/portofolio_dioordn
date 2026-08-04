import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Contact.css";

const Contact = ({ isLoaded = true }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE",
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const socials = [
    { icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mdiordn/" },
    { icon: <FaInstagram size={20} />, label: "Instagram", href: "https://www.instagram.com/dioordn" },
    { icon: <FaGithub size={20} />, label: "GitHub", href: "https://github.com/ridiandio" },
    { icon: <Mail size={20} />, label: "Email", href: "mailto:mdioridian@gmail.com" },
  ];

  return (
    <section id="contact" className="contact-section">
      {/* Aurora accent removed */}

      <div className="contact-container">
        {/* Cinematic CTA */}
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-eyebrow">Let's Connect</div>

          <h2 className="contact-headline">
            Let's create something
            <br />
            <span className="contact-headline__gradient">extraordinary</span>
          </h2>

          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision. Whether it's a
            complex system or a pixel-perfect interface — let's build it together.
          </p>

          {/* Social Links */}
          <div className="contact-socials">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social glass-panel"
                title={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <span className="contact-social__icon">{s.icon}</span>
                <span className="contact-social__label">{s.label}</span>
                <ArrowUpRight size={14} className="contact-social__arrow" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="contact-form-wrap glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="contact-form__title">Send a Message</h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label className="contact-label">Name</label>
              <input
                className="contact-input"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label className="contact-label">Email</label>
              <input
                className="contact-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label className="contact-label">Message</label>
              <textarea
                className="contact-textarea"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? (
                "Sending..."
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {formStatus === "success" && (
              <div className="contact-status success">
                <CheckCircle2 size={18} />
                Message sent successfully!
              </div>
            )}
            {formStatus === "error" && (
              <div className="contact-status error">
                <AlertCircle size={18} />
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="contact-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="contact-footer__line" />
          <p className="contact-footer__text">
            © {new Date().getFullYear()} <span>Mohamad Dio Ridian</span>. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
