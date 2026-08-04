import { useState } from 'react';

export const Hero: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = ['About', 'Services', 'Journal', 'Contact'];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        {/* Left: Brand Logo */}
        <a href="#" className="font-dancing text-white text-2xl md:text-3xl font-bold tracking-wide">
          Serene
        </a>

        {/* Center (Desktop): Nav Links */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300 font-inter"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right (Desktop): CTA Button */}
        <div className="hidden md:block">
          <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow font-inter cursor-pointer">
            Book a consultation
          </button>
        </div>

        {/* Right (Mobile): Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px] focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'translate-y-[8px] rotate-45' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-translate-y-[8px] -rotate-45' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 flex flex-col justify-between px-8 py-24 transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <nav className="flex flex-col gap-8 mt-8">
          {navLinks.map((link, idx) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-white text-2xl font-instrument transition-all duration-500 transform ${
                mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${150 + idx * 75}ms` : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div
          className={`transition-all duration-500 transform ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: mobileMenuOpen ? '450ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <button className="w-full bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow font-inter cursor-pointer">
            Book a consultation
          </button>
        </div>
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 -mt-[120px] z-20 pointer-events-none">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
          Gentle touch. Radiant presence.
        </h1>
        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl font-inter">
          Expert beauty and holistic wellness, delivered with warmth and intention.
        </p>
        <div className="pointer-events-auto mt-6 md:mt-9">
          <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow font-inter cursor-pointer">
            Begin your renewal
          </button>
        </div>
      </div>

      {/* Sound Indicator (Desktop only) */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-8 left-8 z-30 pointer-events-auto">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          {/* Small horizontal bar */}
          <span className="w-4 h-[2px] bg-white/70 block rounded-full" />
        </div>
        <div className="flex flex-col text-white/60 text-xs font-inter leading-tight">
          <span>Experience</span>
          <span>with sound</span>
        </div>
      </div>
    </section>
  );
};
