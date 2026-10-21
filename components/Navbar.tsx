"use client";

import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="logo" href="#top" aria-label="LCB home" tabIndex={0}>
          LCB<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} tabIndex={0}>
              {link.label}
            </a>
          ))}
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
          {links.map((link) => (
            <a key={link.href} href={link.href} tabIndex={0} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
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
