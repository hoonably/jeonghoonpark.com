"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { label: "Exp", href: "/#experience" },
  { label: "Edu", href: "/#education" },
  { label: "Pubs", href: "/#publications" },
  { label: "Proj", href: "/#projects" },
  { label: "Teach", href: "/#teaching" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* ── Scroll shadow ── */
  useEffect(() => {
    const container = document.getElementById("scroll-container") ?? window;
    const target = container === window ? window : container;
    const onScroll = () => {
      const scrollTop =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      setScrolled(scrollTop > 8);
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver (only on home page) ── */
  useEffect(() => {
    // 동적 라우팅 환경에서 Safari/모바일의 :has() 버그를 피하기 위해 명시적 클래스 부여
    if (pathname === "/") {
      document.documentElement.classList.add("home-page-active");
      document.body.classList.add("home-page-active");
    } else {
      document.documentElement.classList.remove("home-page-active");
      document.body.classList.remove("home-page-active");
      setActiveSection("");
      return;
    }

    const sectionIds = ["hero", "experience", "education", "publications", "projects", "teaching"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Detect when section crosses the top of the viewport (with a small offset for the navbar)
          rootMargin: "-80px 0px -80% 0px",
          threshold: 0
        }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  /* ── Dark mode (persisted, manually toggled only) ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Ignore system preferences (prefers-color-scheme). Default to light.
    const dark = stored === "dark";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  /* ── Smooth scroll helper ── */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // On mobile, CSS gives #scroll-container overflow:scroll — it's the real scroll container.
    // On desktop, #scroll-container is just a plain div; the real scroller is window.
    const isMobile = window.innerWidth < 768;
    const scrollContainer = isMobile ? document.getElementById("scroll-container") : null;

    if (scrollContainer) {
      // Mobile path: scroll inside the snap container
      scrollContainer.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    } else {
      // Desktop path: scroll the window
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /*
   * handleNavClick — handles ALL anchor nav items (href like "/#about")
   *
   * Always call e.preventDefault() for "#" links to stop browser/Next.js
   * default hash-navigation. Then either smooth-scroll (if on "/") or use
   * window.location to navigate to the target incl. hash (from other pages).
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return; // let /blog links pass through

    e.preventDefault();
    const id = href.slice(2); // "/#about" → "about"

    if (pathname === "/") {
      scrollToSection(id);
    } else {
      // Navigate from another page (e.g. /blog) back to home with hash
      window.location.href = href;
    }
  };

  const isActive = (href: string) => {
    if (href === "/blog") return pathname === "/blog";
    const id = href.startsWith("/#") ? href.slice(2) : null;
    if (!id) return false;
    return pathname === "/" && activeSection === id;
  };

  /* ── Sliding Pill Effect ── */
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current || pathname !== "/") return;

      const activeEl = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    // Slight delay to handle custom font loads shifting geometry
    const timer = setTimeout(updatePill, 150);
    return () => {
      window.removeEventListener("resize", updatePill);
      clearTimeout(timer);
    };
  }, [activeSection, pathname]);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className={`navbar-inner${pathname !== "/" ? " blog-nav" : ""}`}>

        {/* Unified Left Container with relative positioning for Pill */}
        <div
          ref={navRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            position: "relative",
            zIndex: 1
          }}
        >
          {/* Animated Liquid Glass Pill Background */}
          {pathname === "/" && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "4px", // Give a little vertical breathing room
                bottom: "4px",
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
                background: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(8px) saturate(150%)",
                WebkitBackdropFilter: "blur(8px) saturate(150%)",
                borderRadius: "8px",
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy elastic effect
                zIndex: -1,
                pointerEvents: "none",
                boxShadow: isDark
                  ? "inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "inset 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            />
          )}

          {/* Brand — navigates to hero (Home) or blog home (Blog) */}
          <a
            href={pathname.startsWith("/blog") ? "/blog" : "/#hero"}
            data-section="hero"
            className={`nav-link navbar-brand${pathname === "/" && activeSection === "hero" ? " active" : ""}`}
            style={{
              marginRight: pathname === "/" ? "0.5rem" : "0",
              padding: "0.35rem 0.6rem",
              background: "transparent",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "var(--color-text)"
            }}
            onClick={(e) => {
              if (pathname === "/") {
                handleNavClick(e, "/#hero");
              }
            }}
          >
            {pathname.startsWith("/blog") ? `${profile.shortName}'s Blog` : profile.shortName}
          </a>

          {/* Nav links — only on homepage */}
          {pathname === "/" && (
            <nav className="navbar-links" aria-label="Main navigation" style={{ marginLeft: 0 }}>
              {NAV_ITEMS.map(({ label, href }) => {
                const id = href.slice(2);
                return (
                  <a
                    key={label}
                    href={href}
                    data-section={id}
                    className={`nav-link${isActive(href) ? " active" : ""}`}
                    style={{ background: "transparent" }}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          )}
        </div>

        {/* Controls */}
        <div className="navbar-controls">
          {pathname !== "/" ? (
            <Link href="/" className="nav-portfolio-btn">
              Portfolio ↗
            </Link>
          ) : (
            <Link href="/blog" className="nav-portfolio-btn">
              Blog ↗
            </Link>
          )}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
