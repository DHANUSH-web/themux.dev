import Link from "next/link";
import { RocketIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import DocsNav from "@/components/docs-nav";

export const metadata: Metadata = {
  title: "Documentation — Mux",
  description:
    "Learn how to install, configure, and use Mux to manage your C/C++ projects.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-white/6 bg-[#080808]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 h-13.25 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <RocketIcon className="w-4 h-4" />
              <span className="font-mono font-bold text-sm tracking-tight">
                mux
              </span>
            </Link>
            <span className="text-white/15">/</span>
            <span className="text-sm text-white/45 font-mono">docs</span>
          </div>
          <Link
            href="https://github.com/DHANUSH-web/mux"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            <GitHubLogoIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </header>

      <div className="flex pt-13.25">
        {/* Sidebar */}
        <aside className="fixed left-0 top-13.25 bottom-0 min-w-56 w-70 overflow-y-auto border-r border-white/6 px-6 py-6 hidden lg:block">
          <DocsNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-56 min-w-0 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
