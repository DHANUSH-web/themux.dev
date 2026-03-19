"use client";

import { useState } from "react";
import { ClipboardIcon } from "@radix-ui/react-icons";

const Uri = {
  windows: "irm https://themux.dev/install.ps1 | iex",
  unix: "curl -fsSL https://themux.dev/install.sh | sh",
};

enum Platform {
  Windows = "windows",
  Unix = "linux",
  Unknown = "unknown",
}

const getClientPlatform = (): Platform => {
  const arch = navigator.userAgent;
  return arch.includes("Win") ? Platform.Windows : Platform.Unix;
};

export default function InstallCmd({ className }: { className?: string }) {
  const [platform, setPlatform] = useState<Platform>(getClientPlatform);
  const uri = platform === Platform.Windows ? Uri.windows : Uri.unix;

  const handleCopyUriToClipboard = () => {
    navigator.clipboard.writeText(uri);
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <code className="flex items-center justify-center text-sm font-mono w-fit max-w-2xl px-3 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-l-lg ">
          {uri}
        </code>
        <button
          className="flex items-center justify-center cursor-pointer bg-zinc-300 dark:bg-zinc-600 h-9 w-9 rounded-r-lg"
          title="Copy to clipboard"
          onClick={handleCopyUriToClipboard}
        >
          <ClipboardIcon />
        </button>
      </div>
      <div className="flex items-center justify-center space-x-1 mt-2">
        <span onClick={() => setPlatform(Platform.Windows)} className={`text-xs font-medium ${platform === Platform.Windows ? "bg-zinc-200 dark:bg-zinc-800" : "bg-none"} px-2 py-1 rounded-full cursor-pointer select-none`}>Windows</span>
        <span onClick={() => setPlatform(Platform.Unix)} className={`text-xs font-medium ${platform !== Platform.Windows ? "bg-zinc-200 dark:bg-zinc-800" : "bg-none"} px-2 py-1 rounded-full cursor-pointer select-none`}>Linux/macOS</span>
      </div>
    </div>
  );
}
