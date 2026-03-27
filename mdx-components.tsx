import type { MDXComponents } from "mdx/types";
import React from "react";
import SectionHeading from "@/components/section-heading";
import SubHeading from "@/components/sub-heading";
import Flag from "@/components/flag";
import FlagsGroup from "@/components/flags-group";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ id, children }) => (
      <SectionHeading id={(id as string) ?? ""}>{children}</SectionHeading>
    ),
    h3: ({ id, children }) => (
      <SubHeading id={(id as string) ?? ""}>{children}</SubHeading>
    ),
    p: ({ children }) => (
      <p className="text-sm text-white/50 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 text-sm text-white/50 mb-4 ml-2">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-white/80">{children}</strong>
    ),
    a: ({ href, children }) => (
      <Link
        href={href}
        className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
      >
        {children}
      </Link>
    ),
    code: ({ children, className }) => {
      if (className) {
        // Inside a fenced code block — pre handles the container
        return (
          <code className="font-mono text-sm text-white/72 leading-relaxed whitespace-pre">
            {children}
          </code>
        );
      }
      // Inline code
      return (
        <code className="font-mono text-[13px] bg-white/7 text-white/80 px-1.5 py-0.5 rounded border border-white/8">
          {children}
        </code>
      );
    },
    pre: ({ children }) => {
      const codeEl = children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;
      const lang = codeEl?.props?.className?.replace("language-", "") ?? "";
      return (
        <div className="relative my-4">
          {lang && (
            <span className="absolute top-3 right-3 text-[10px] font-mono text-white/20 uppercase tracking-widest select-none">
              {lang}
            </span>
          )}
          <pre className="bg-white/3 border border-white/8 rounded-lg px-5 py-4 overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
            {children}
          </pre>
        </div>
      );
    },
    // Custom components available globally in all MDX files
    Flag: Flag as MDXComponents[string],
    Flags: FlagsGroup as MDXComponents[string],
  };
}
