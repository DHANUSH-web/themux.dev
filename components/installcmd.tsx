"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const Uri = {
  windows: "irm https://themux.dev/install.ps1 | iex",
  unix: "curl -fsSL https://themux.dev/install.sh | sh",
};

enum Platform {
  Windows = "windows",
  Unix = "unix",
}

const getClientPlatform = (): Platform => {
  return navigator.userAgent.includes("Win") ? Platform.Windows : Platform.Unix;
};

export default function InstallCmd({ className }: { className?: string }) {
  const [platform, setPlatform] = useState<Platform>(getClientPlatform);
  const [copied, setCopied] = useState(false);
  const uri = platform === Platform.Windows ? Uri.windows : Uri.unix;

  const handleCopy = () => {
    navigator.clipboard.writeText(uri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={className}>
      <div className="flex items-stretch rounded-xl border border-white/10 bg-white/4 overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-white/30 font-mono text-sm select-none">$</span>
          <code className="font-mono text-sm text-white/80 whitespace-nowrap">{uri}</code>
        </div>
        <button
          onClick={handleCopy}
          title="Copy to clipboard"
          className="flex items-center justify-center w-12 shrink-0 border-l border-white/8 text-white/40 hover:text-white hover:bg-white/6 transition-all cursor-pointer"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-emerald-400" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-1 mt-3">
        <button
          onClick={() => setPlatform(Platform.Windows)}
          className={`text-xs px-3 py-1 border border-transparent rounded-full transition-all cursor-pointer ${
            platform === Platform.Windows
              ? "bg-white/10 text-white border-white/15"
              : "text-white/35 hover:text-white/60"
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => setPlatform(Platform.Unix)}
          className={`text-xs px-3 py-1 border border-transparent rounded-full transition-all cursor-pointer ${
            platform === Platform.Unix
              ? "bg-white/10 text-white border-white/15"
              : "text-white/35 hover:text-white/60"
          }`}
        >
          Linux / macOS
        </button>
      </div>
    </div>
  );
}
