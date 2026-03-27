import InstallCmd from "@/components/installcmd";
import {
  GitHubLogoIcon,
  StarFilledIcon,
  LightningBoltIcon,
  ArrowRightIcon,
  GlobeIcon,
  CodeIcon,
  ArchiveIcon,
  OpenInNewWindowIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

async function getGitHubData(): Promise<{ stars: number; version: string }> {
  try {
    const [repoRes, releaseRes] = await Promise.all([
      fetch("https://api.github.com/repos/DHANUSH-web/mux", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch("https://api.github.com/repos/DHANUSH-web/mux/releases/latest", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
    ]);

    if (!repoRes.ok || !releaseRes.ok) return { stars: 0, version: "v0.1.0" };

    const repo = await repoRes.json();
    const release = await releaseRes.json();

    return {
      stars: repo.stargazers_count as number,
      version: (release.tag_name as string) ?? "v0.1.0",
    };
  } catch {
    return { stars: 0, version: "v0.1.0" };
  }
}

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const features = [
  {
    Icon: LightningBoltIcon,
    title: "Blazing Fast",
    description:
      "Written in Rust for maximum performance. Initialize and build projects in milliseconds.",
  },
  {
    Icon: ArchiveIcon,
    title: "Dependency Management",
    description:
      "Manage C/C++ libraries effortlessly with a simple, unified command-line interface.",
  },
  {
    Icon: CodeIcon,
    title: "Build System Integration",
    description:
      "Seamless support for CMake, and Make C/C++ build systems.",
  },
  {
    Icon: GlobeIcon,
    title: "Cross-Platform",
    description:
      "First-class support for Linux, macOS, and Windows out of the box.",
  },
];

export default async function Home() {
  const { stars, version } = await getGitHubData();

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* Top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-175 h-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/6 max-w-5xl mx-auto w-full mt-2">
        <div className="flex items-center gap-2.5">
          <RocketIcon className="w-4 h-4 text-white/70" />
          <span className="font-mono font-bold text-base tracking-tight">mux</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/7 text-white/40 border border-white/8">
            {version}
          </span>
        </div>

        <nav className="flex items-center gap-5">
          {stars > 0 && (
            <a
              href="https://github.com/DHANUSH-web/mux/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              <StarFilledIcon className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{formatStars(stars)}</span>
            </a>
          )}
          <a
            href="https://github.com/DHANUSH-web/mux"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <GitHubLogoIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16 max-w-5xl mx-auto w-full">
        {/* Release badge */}
        <a
          href="https://github.com/DHANUSH-web/mux/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-[11px] text-white/50 hover:text-white/80 hover:border-white/18 transition-all mb-10 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span>{version} is now available</span>
          <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Headline */}
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-center leading-[1.05] tracking-tight mb-5 gradient-text max-w-3xl">
          Welcome to Mux
        </h1>

        <p className="text-base font-medium text-white/40 text-center max-w-lg mb-10 leading-relaxed">
          Manage dependencies, scaffolding, and build systems for C and C++
          projects — from a single fast CLI built in Rust.
        </p>

        {/* Install command */}
        <div className="w-full max-w-md mb-8">
          <InstallCmd />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="https://github.com/DHANUSH-web/mux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            <GitHubLogoIcon className="w-4 h-4" />
            View on GitHub
          </a>
          <a
            href="https://github.com/DHANUSH-web/mux#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/12 text-white/60 text-sm font-medium hover:text-white hover:border-white/25 transition-all"
          >
            Read the docs
            <OpenInNewWindowIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 px-6 pb-28 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="p-5 rounded-xl border border-white/7 bg-white/2 hover:bg-white/4.5 hover:border-white/13 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/7 flex items-center justify-center mb-4 text-white/50 group-hover:text-white/80 group-hover:bg-white/10 transition-all">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white/90 mb-1.5">{title}</h3>
              <p className="text-xs text-white/38 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/6 px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>Built with Rust for the C/C++ community.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DHANUSH-web/mux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white/60 transition-colors"
            >
              <GitHubLogoIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="https://github.com/DHANUSH-web/mux/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              MIT License
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
