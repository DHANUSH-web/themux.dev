import { GitHubLogoIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import DocsContent from "@/content/docs.mdx";

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 pb-24">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/30 mb-3">
          Getting Started
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
          Documentation
        </h1>
        <p className="text-white/45 leading-relaxed">
          Everything you need to install, configure, and use Mux — a fast,
          unified CLI for managing C and C++ projects.
        </p>
      </div>

      {/* MDX content */}
      <DocsContent />

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-white/6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          ← Back to home
        </Link>
        <Link
          href="https://github.com/DHANUSH-web/mux"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          <GitHubLogoIcon className="w-3.5 h-3.5" />
          View on GitHub
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
