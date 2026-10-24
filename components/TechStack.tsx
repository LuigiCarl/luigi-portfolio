"use client";

import { Icon } from "@iconify/react";
import { Braces, CloudCog, Database, Server, Workflow } from "lucide-react";
import type { CSSProperties } from "react";
import { skills } from "@/data/portfolio";

const categoryIcons = {
  brackets: Braces,
  server: Server,
  database: Database,
  cloud: CloudCog,
};

export default function TechStack() {
  return (
    <div className="skills-grid">
      {skills.map((category) => {
        const CategoryIcon = categoryIcons[category.icon];

        return (
          <article className="skill-card" key={category.title}>
            <div className="skill-card-heading">
              <div className="skill-icon" aria-hidden="true">
                <CategoryIcon size={20} strokeWidth={1.6} />
              </div>
              <h3>{category.title}</h3>
            </div>

            <ul className="skill-badge-list" aria-label={`${category.title} technologies`}>
              {category.items.map((technology) => (
                <li
                  className="skill-badge"
                  key={technology.name}
                  style={{ "--skill-color": technology.color } as CSSProperties}
                >
                  <span className="skill-logo" aria-hidden="true">
                    {technology.icon ? (
                      <Icon
                        icon={technology.icon}
                        width="32"
                        height="32"
                        fallback={<span className="skill-logo-fallback">{technology.fallback}</span>}
                      />
                    ) : (
                      <Workflow size={30} strokeWidth={1.65} />
                    )}
                  </span>
                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
