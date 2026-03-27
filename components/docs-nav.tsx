"use client";

import { useState, useEffect } from "react";

const sections = [
  {
    title: "Getting Started",
    links: [
      { href: "#introduction", label: "Introduction" },
      { href: "#installation", label: "Installation" },
      { href: "#quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Commands",
    links: [
      { href: "#mux-init", label: "mux init" },
      { href: "#mux-add", label: "mux add" },
      { href: "#mux-remove", label: "mux remove" },
      { href: "#mux-build", label: "mux build" },
      { href: "#mux-run", label: "mux run" },
      { href: "#mux-test", label: "mux test" },
      { href: "#mux-clean", label: "mux clean" },
    ],
  },
  {
    title: "Project Files",
    links: [
      { href: "#mux-lock", label: "mux.lock" },
      { href: "#cmake-guide", label: "CMakeLists.txt" },
    ],
  },
  {
    title: "Guides",
    links: [{ href: "#examples", label: "Examples" }],
  },
];

const allIds = sections.flatMap((s) => s.links.map((l) => l.href.slice(1)));

export default function DocsNav() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });
        // Always highlight the topmost visible heading
        const first = allIds.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="space-y-5">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/22 mb-1.5 px-2">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block text-[13px] px-2 py-1.5 rounded-md transition-all font-mono ${
                      isActive
                        ? "text-white/90 bg-white/6"
                        : "text-white/42 hover:text-white/80 hover:bg-white/4"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
