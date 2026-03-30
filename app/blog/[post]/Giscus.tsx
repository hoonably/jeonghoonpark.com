"use client";

import { useEffect, useRef, useState } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    const initial = root.getAttribute('data-theme') || 'light';
    setTheme(initial);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          setTheme(root.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // Cleanup previous script if exists
    const container = ref.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "hoonably/jeonghoonpark.com");
    script.setAttribute("data-repo-id", "R_kgDOR0AiMg");
    script.setAttribute("data-category", "Giscus");
    script.setAttribute("data-category-id", "DIC_kwDOR0AiMs4C5lh1");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "0");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    // Use dark_dimmed for darker effect
    script.setAttribute("data-theme", theme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [theme]);

  return <div id="giscus-container" ref={ref} className="mt-10" />;
}
