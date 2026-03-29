import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useScrollEffects(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [scrollHintHidden, setScrollHintHidden] = useState(false);
  const isSnapping = useRef(false);

  // 1. Dynamic is-long-section detection (for mobile padding buffers)
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll(".snap-section");
    const checkHeights = () => {
      const availableHeight = container.clientHeight;
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          if (section.scrollHeight > availableHeight) {
            section.classList.add("is-long-section");
          } else {
            section.classList.remove("is-long-section");
          }
        }
      });
    };

    checkHeights();
    window.addEventListener("resize", checkHeights);
    return () => window.removeEventListener("resize", checkHeights);
  }, [containerRef]);

  // 2. Hide scroll hint when user scrolls past Hero
  useEffect(() => {
    const container = containerRef.current;
    const isMobile = () => window.innerWidth < 768;

    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      if (isMobile()) {
        const scrollTop = container?.scrollTop ?? 0;
        setScrollHintHidden(scrollTop > hero.offsetHeight * 0.3);
      } else {
        setScrollHintHidden(window.scrollY > hero.offsetHeight * 0.3);
      }
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  // 3. Desktop-only: snap Hero ↔ Experience on wheel
  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 768;

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;
      if (isSnapping.current) return;

      const hero = document.getElementById("hero");
      const experience = document.getElementById("experience");
      if (!hero || !experience) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      // Scrolling DOWN at the bottom edge of Hero → snap to Experience
      if (e.deltaY > 0 && heroBottom > 0 && heroBottom < window.innerHeight * 1.2) {
        e.preventDefault();
        isSnapping.current = true;
        experience.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { isSnapping.current = false; }, 800);
      }

      // Scrolling UP near the top of page → snap back to Hero
      if (e.deltaY < 0 && scrollY > 0 && scrollY < heroHeight * 0.5) {
        e.preventDefault();
        isSnapping.current = true;
        hero.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { isSnapping.current = false; }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return { scrollHintHidden };
}
