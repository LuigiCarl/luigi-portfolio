"use client";

import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const hasResume = true;

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sectionIds = ["about", "skills", "projects", "education", "contact"];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="logo" href="#top" aria-label="LCB home" tabIndex={0}>
          LCB<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                tabIndex={0}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        {hasResume && (
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer" tabIndex={0}>
            View Resume <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {isOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                tabIndex={0}
                className={isActive ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
          {hasResume && (
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" tabIndex={0} onClick={() => setIsOpen(false)}>
              View Resume <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
