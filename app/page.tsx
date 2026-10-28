import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import ContactLinks from "@/components/ContactLinks";
import Navbar from "@/components/Navbar";
import ProjectsList from "@/components/ProjectsList";
import TechStack from "@/components/TechStack";
import { education, projects } from "@/data/portfolio";

const copyrightYear = 2026;
const hasResume = true;

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
            <p className="hero-role animate-in delay-3">IT Student <i>&amp;</i> Aspiring Full-Stack Developer</p>
            <p className="hero-description animate-in delay-3">
              I&apos;m a fourth-year BS Information Technology student at Sorsogon State University – Bulan Campus.
              I enjoy building practical web and mobile projects while continuously learning modern development practices
              and software engineering fundamentals.
            </p>
            <div className="hero-actions animate-in delay-4">
              <a className="button button-primary" href="#projects">
                Explore My Projects <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              {hasResume && (
                <a className="button button-ghost" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  View CV <ArrowUpRight size={16} aria-hidden="true" />
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
                I&apos;m an aspiring developer passionate about full-stack development, with practical project experience using
                React, React Native, and Laravel REST APIs. I enjoy connecting intuitive user interfaces with clean backend
                services and working through real-world problems.
              </p>
              <p>
                I value continuous learning, clear communication, and constructive code reviews. I&apos;m currently seeking a
                Software Development Internship where I can learn from experienced engineers and contribute meaningfully
                to team projects.
              </p>
              <a className="text-link" href="#contact">Let&apos;s connect <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-muted" aria-labelledby="skills-title">
          <div className="container">
            <div className="section-label"><span>02</span> Technologies</div>
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
              <p>A collection of academic, capstone, and personal projects I&apos;ve built to explore web and mobile development, solve practical problems, and practice clean coding.</p>
            </div>
            <span className="section-note">Selected projects <span>↗</span></span>
          </div>
          <ProjectsList projects={projects} />
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
            <ContactLinks />
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
