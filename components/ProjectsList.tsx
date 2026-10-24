"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/portfolio";

type FilterCategory = "All" | "Full-Stack" | "Web" | "Mobile";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const categories: FilterCategory[] = ["All", "Full-Stack", "Web", "Mobile"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Mobile") return projects.filter((p) => p.type === "Mobile");
    if (activeFilter === "Web") return projects.filter((p) => p.type === "Web");
    if (activeFilter === "Full-Stack") {
      return projects.filter((p) => p.status.toLowerCase().includes("full-stack"));
    }
    return projects;
  }, [projects, activeFilter]);

  const countFor = (category: FilterCategory) => {
    if (category === "All") return projects.length;
    if (category === "Mobile") return projects.filter((p) => p.type === "Mobile").length;
    if (category === "Web") return projects.filter((p) => p.type === "Web").length;
    if (category === "Full-Stack") {
      return projects.filter((p) => p.status.toLowerCase().includes("full-stack")).length;
    }
    return 0;
  };

  return (
    <div className="projects-container">
      <div className="project-filter-bar" role="tablist" aria-label="Filter projects by category">
        {categories.map((category) => {
          const count = countFor(category);
          const isActive = activeFilter === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-pill ${isActive ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              <span>{category}</span>
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={`${project.name}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
}
