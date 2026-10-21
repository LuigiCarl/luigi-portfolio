import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import TechStack from "@/components/TechStack";
import { contactLinks, education, projects } from "@/data/portfolio";

const copyrightYear = 2026;
const hasResume = true;

function SocialBadge({ brand }: { brand: "github" | "linkedin" }) {
  return (
    <span className={`contact-badge contact-badge-${brand}`} aria-hidden="true">
      {brand === "github" ? (
        <svg viewBox="0 0 16 16" focusable="false">
          <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.71.4.08.55-.17.55-.39 0-.19-.01-.83-.01-1.51-2.01.38-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.21-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.5 7.5 0 0 1 8 3.91c.68 0 1.36.09 2 .27 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.25.54.74.54 1.5 0 1.08-.01 1.95-.01 2.22 0 .22.15.47.55.39A8.13 8.13 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M5.34 3.5A2.34 2.34 0 1 1 .66 3.5a2.34 2.34 0 0 1 4.68 0ZM.99 7.1h4.7V22H.99V7.1Zm7.74 0h4.5v2.04h.06c.63-1.19 2.16-2.44 4.45-2.44 4.76 0 5.64 3.13 5.64 7.2V22h-4.69v-7.17c0-1.71-.03-3.91-2.38-3.91-2.39 0-2.75 1.86-2.75 3.79V22H8.73V7.1Z" />
        </svg>
      )}
    </span>
  );
}

function GmailBadge() {
  return (
    <span className="contact-badge contact-badge-gmail" aria-hidden="true">
      <svg viewBox="0 0 24 18" focusable="false">
        <path className="gmail-red" d="M1 16V2.1A2.1 2.1 0 0 1 4.5.46L12 6.1 19.5.46A2.1 2.1 0 0 1 23 2.1V16h-4V5.95l-7 5.25-7-5.25V16H1Z" />
        <path className="gmail-blue" d="M1 2.1A2.1 2.1 0 0 1 4.5.46L12 6.1 19.5.46A2.1 2.1 0 0 1 23 2.1v1.7l-4 2.15V5.95l-7 5.25-7-5.25v.01L1 3.8V2.1Z" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="availability animate-in">
              <span className="availability-dot" /> Seeking Software Development Internship Opportunities
            </div>
            <p className="hero-greeting animate-in delay-1">Hello, I&apos;m</p>
            <h1 id="hero-title" className="animate-in delay-2">
              Luigi Carl <span>Brezuela.</span>
            </h1>
            <p className="hero-role animate-in delay-3">IT Student <i>&amp;</i> Full-Stack Developer in Training</p>
            <p className="hero-description animate-in delay-3">
              I&apos;m a BS Information Technology student at Sorsogon State University – Bulan Campus, graduating in
              2027. I build practical web and mobile applications while strengthening my full-stack development,
              debugging, and software engineering fundamentals.
            </p>
            <div className="hero-actions animate-in delay-4">
              <a className="button button-primary" href="#projects">
                Explore My Projects <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              {hasResume && (
                <a className="button button-ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  View Resume <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <div className="hero-mark animate-in delay-2" aria-hidden="true">
            <span>LCB</span>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-plus plus-one">+</div>
            <div className="hero-plus plus-two">+</div>
          </div>
          <div className="scroll-cue"><span /> Scroll to explore</div>
        </section>

        <section id="about" className="section container" aria-labelledby="about-title">
          <div className="section-label"><span>01</span> About me</div>
          <div className="about-grid">
            <h2 id="about-title">Beyond the <em>Code.</em></h2>
            <div className="about-copy">
              <p className="lead">
                I&apos;m an Information Technology student at Sorsogon State University – Bulan Campus, based in
                Bulan, Sorsogon, Philippines.
              </p>
              <p>
                I&apos;m a full-stack developer in training with project experience using React, React Native, Laravel,
                and REST APIs. I&apos;m comfortable planning application flows and connecting frontend, backend,
                authentication, and database-driven features.
              </p>
              <p>
                I use AI-assisted tools to speed up implementation while reviewing and testing the resulting work.
                I&apos;m currently seeking a software development internship where I can strengthen my fundamentals,
                learn from experienced engineers, and contribute to real products.
              </p>
              <a className="text-link" href="#contact">Let&apos;s connect <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-muted" aria-labelledby="skills-title">
          <div className="container">
            <div className="section-label"><span>02</span> Expertise</div>
            <div className="section-heading">
              <div>
                <h2 id="skills-title">My Tech <em>Stack.</em></h2>
                <p>The tools I&apos;m learning, using, and growing with.</p>
              </div>
              <span className="section-note">Always learning <span>↗</span></span>
            </div>
            <TechStack />
            <p className="placeholder-note">This stack reflects technologies used across academic, personal, and capstone work.</p>
          </div>
        </section>

        <section id="projects" className="section container" aria-labelledby="projects-title">
          <div className="section-label"><span>03</span> Portfolio</div>
          <div className="section-heading">
            <div>
              <h2 id="projects-title">Selected <em>Works.</em></h2>
              <p>A collection of web and mobile applications showcasing frontend development, backend integration, interactive interfaces, and practical problem-solving.</p>
            </div>
            <span className="section-note">Selected projects <span>↗</span></span>
          </div>
          <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={`${project.name}-${index}`} project={project} />)}</div>
        </section>

        <section id="education" className="section section-muted" aria-labelledby="education-title">
          <div className="container">
            <div className="section-label"><span>04</span> Background</div>
            <div className="journey-grid">
              <div>
                <h2 id="education-title">My <em>Journey.</em></h2>
                <p className="journey-intro">Building a strong foundation, one project and lesson at a time.</p>
              </div>
              <div className="timeline">
                {education.map((item) => (
                  <article className="timeline-item" key={item.school}>
                    <div className="timeline-marker" />
                    <p className="eyebrow">{item.period}</p>
                    <h3>{item.school}</h3>
                    <p className="timeline-degree">{item.degree}</p>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container" aria-labelledby="contact-title">
          <div className="contact-card">
            <div className="contact-heading">
              <div className="section-label"><span>05</span> Get in touch</div>
              <h2 id="contact-title">Let&apos;s <em>Connect.</em></h2>
              <p>Seeking Software Development Internship Opportunities in Sorsogon, Philippines.</p>
            </div>
            <div className="contact-links">
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <a href={link.href} key={link.label} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                    {link.icon === "linkedin" ? (
                      <SocialBadge brand="linkedin" />
                    ) : link.icon === "github" ? (
                      <SocialBadge brand="github" />
                    ) : (
                      <GmailBadge />
                    )}
                    <span><small>{link.label}</small>{link.value}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <a className="logo" href="#top">LCB<span>.</span></a>
          <p>© {copyrightYear} Luigi Carl Brezuela. Built with intention.</p>
          <a className="footer-social" href="https://github.com/LuigiCarl" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>
          <a className="back-top" href="#top">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </footer>
    </div>
  );
}
