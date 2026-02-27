import { useEffect, useRef } from "react";
import gsap from "gsap";

const roles = [
  "MERN Stack Developer",
  "Frontend Developer",
  "CSE Student",
  "DSA Enthusiast",
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 });

      // Name reveal
      tl.fromTo(
        nameRef.current?.querySelectorAll(".char") || [],
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
        }
      );

      // Role text
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      // Role cycling
      let roleIndex = 0;
      const roleEl = roleRef.current?.querySelector(".role-text");
      if (roleEl) {
        const cycleRole = () => {
          gsap.to(roleEl, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              roleIndex = (roleIndex + 1) % roles.length;
              roleEl.textContent = roles[roleIndex];
              gsap.fromTo(
                roleEl,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
              );
            },
          });
        };
        setInterval(cycleRole, 2500);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameChars = "Your Name".split("");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center section-padding relative overflow-hidden"
    >
      {/* Fixed background portrait */}
      <div className="absolute inset-0 z-0 flex justify-center md:justify-end items-start pointer-events-none">
        <img
          src="/images/portrait.png"
          alt="Portrait"
          className="h-[85%] md:h-[90%] w-auto object-contain object-top md:object-right-top mt-4 md:mt-8 md:mr-8 select-none"
        />
        {/* Left fade - desktop only */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent hidden md:block" />
        {/* Bottom fade - stronger on mobile for smooth blend */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] md:h-[35%] bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      <div className="max-w-[95vw] relative z-10 mt-52 md:mt-36 lg:mt-0">
        <p className="body-sm text-muted-foreground mb-6 tracking-[0.3em]">
          Computer Science Engineering Student
        </p>
        <h1 ref={nameRef} className="heading-xl text-foreground text-reveal-mask">
          {nameChars.map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div ref={roleRef} className="mt-8 opacity-0">
          <span className="body-lg text-muted-foreground">
            I'm a{" "}
            <span className="role-text text-accent font-normal">
              {roles[0]}
            </span>
          </span>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="w-full h-full bg-foreground animate-[scrollLine_1.5s_ease-in-out_infinite] origin-top" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
