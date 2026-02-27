import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce web app with user authentication, product management, cart functionality, and payment integration.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "#",
    github: "#",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging app with WebSocket integration, user rooms, and message history.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "This very portfolio — an Awwwards-inspired design with GSAP animations, smooth scroll, and a custom cursor.",
    tech: ["React", "GSAP", "Tailwind CSS", "Lenis"],
    live: "#",
    github: "#",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 md:py-48 section-padding">
      <span className="body-sm text-muted-foreground tracking-[0.3em] mb-16 block">
        Selected Projects
      </span>
      <div className="space-y-0">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="project-card group border-t border-border py-12 md:py-16"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <span className="text-muted-foreground font-body text-sm mb-2 block">
                  0{index + 1}
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground group-hover:text-accent transition-colors duration-500">
                  {project.title}
                </h3>
              </div>
              <div className="flex-1 max-w-lg">
                <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-body tracking-wider uppercase text-muted-foreground"
                    >
                      {t}
                      {project.tech.indexOf(t) < project.tech.length - 1 && (
                        <span className="mx-2 text-border">·</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.live}
                    data-cursor-hover
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 text-sm font-body tracking-wide"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                  <a
                    href={project.github}
                    data-cursor-hover
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 text-sm font-body tracking-wide"
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;
