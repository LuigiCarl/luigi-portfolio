import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  Code2,
  Mail,
  Server,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { contactLinks, education, projects, skills } from "@/data/portfolio";

const skillIcons = { brackets: Braces, server: Server, wrench: Wrench };
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
            <div className="skills-grid">
              {skills.map((skill) => {
                const Icon = skillIcons[skill.icon as keyof typeof skillIcons];
                return (
                  <article className="skill-card" key={skill.title}>
                    <div className="skill-icon"><Icon size={20} strokeWidth={1.6} /></div>
                    <h3>{skill.title}</h3>
                    <ul className="skill-badge-list">
                      {skill.items.map(([item, icon]) => (
                        <li className="skill-badge" key={item}>
                          {icon ? (
                            <Image
                              src={`https://cdn.simpleicons.org/${icon}/c4b5fd`}
                              alt=""
                              width={13}
                              height={13}
                              unoptimized
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="skill-badge-mark" aria-hidden="true">
                              {item === "AWS EC2 (Amazon Elastic Compute Cloud)" ? "AWS" : item.slice(0, 2)}
                            </span>
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
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
              <p>Seeking Software Development Internship Opportunities in Bulan, Sorsogon, Philippines.</p>
            </div>
            <div className="contact-links">
              {contactLinks.map((link, index) => {
                const Icon = index === 0 ? Mail : index === 1 ? Code2 : BriefcaseBusiness;
                const isExternal = link.href.startsWith("http");
                return <a href={link.href} key={link.label} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}><Icon size={17} /> <span><small>{link.label}</small>{link.value}</span><ArrowUpRight size={16} /></a>;
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
