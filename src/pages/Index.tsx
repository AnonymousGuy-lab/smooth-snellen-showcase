import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import { StaggeredMenu } from "@/components/StaggeredMenu/StaggeredMenu";
import type { StaggeredMenuItem } from "@/components/StaggeredMenu/StaggeredMenu";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const menuItems: StaggeredMenuItem[] = [
  { label: "About", ariaLabel: "Go to About section", link: "#about" },
  { label: "Skills", ariaLabel: "Go to Skills section", link: "#skills" },
  { label: "Projects", ariaLabel: "Go to Projects section", link: "#projects" },
  { label: "Education", ariaLabel: "Go to Education section", link: "#education" },
  { label: "Contact", ariaLabel: "Go to Contact section", link: "#contact" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
  { label: "Twitter", link: "https://twitter.com" },
];

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      {!loading && (
        <>
          <StaggeredMenu
            items={menuItems}
            socialItems={socialItems}
            isFixed
            position="right"
            colors={["#1a1714", "#2a2520"]}
            accentColor="hsl(30 15% 70%)"
            menuButtonColor="#e8e0d4"
            openMenuButtonColor="#121212"
            onItemClick={(item, e) => {
              e.preventDefault();
              const target = document.querySelector(item.link);
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
