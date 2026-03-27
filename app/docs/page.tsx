import {
  LightningBoltIcon,
  ArchiveIcon,
  CodeIcon,
  GlobeIcon,
  ArrowRightIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import SubHeading from "@/components/sub-heading";
import Flag from "@/components/flag";
import InlineCode from "@/components/inlinecode";
import CodeBlock from "@/components/codeblock";

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

      {/* ── Introduction ─────────────────────────────────────── */}
      <SectionHeading id="introduction">Introduction</SectionHeading>

      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Mux is a command-line tool written in Rust that brings a modern
        developer experience to C and C++ projects. It handles dependency
        management, project scaffolding, and build system integration — all from
        a single binary with no runtime dependencies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {[
          {
            Icon: LightningBoltIcon,
            title: "Blazing Fast",
            desc: "Parallel dependency resolution written in Rust.",
          },
          {
            Icon: ArchiveIcon,
            title: "Unified Packages",
            desc: "One command to add and remove C/C++ libraries.",
          },
          {
            Icon: CodeIcon,
            title: "CMake Integration",
            desc: "Mux manages your CMakeLists.txt automatically.",
          },
          {
            Icon: GlobeIcon,
            title: "Cross-Platform",
            desc: "Linux, macOS, and Windows — first-class.",
          },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 p-4 rounded-xl border border-white/7 bg-white/2"
          >
            <div className="w-7 h-7 rounded-md bg-white/7 flex items-center justify-center text-white/50 shrink-0 mt-0.5">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/85 mb-0.5">
                {title}
              </p>
              <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Installation ─────────────────────────────────────── */}
      <SectionHeading id="installation">Installation</SectionHeading>

      <p className="text-sm text-white/50 leading-relaxed mb-6">
        The recommended way to install Mux is via the install script. It detects
        your platform automatically, downloads the correct pre-built binary, and
        verifies its checksum.
      </p>

      <SubHeading id="install-linux-macos">Linux / macOS</SubHeading>
      <CodeBlock lang="sh">{`curl -fsSL https://themux.dev/install.sh | sh`}</CodeBlock>
      <p className="text-xs text-white/35 mt-2 mb-6">
        Installs to <InlineCode>~/.local/bin</InlineCode> by default. Pass{" "}
        <InlineCode>--system</InlineCode> to install to{" "}
        <InlineCode>/usr/local/bin</InlineCode> (requires sudo).
      </p>

      <SubHeading id="install-windows">Windows</SubHeading>
      <CodeBlock lang="powershell">{`irm https://themux.dev/install.ps1 | iex`}</CodeBlock>
      <p className="text-xs text-white/35 mt-2 mb-6">
        Installs to <InlineCode>%USERPROFILE%\\.mux\\bin</InlineCode> and adds
        it to your user <InlineCode>PATH</InlineCode> automatically. Pass{" "}
        <InlineCode>-System</InlineCode> to install to{" "}
        <InlineCode>%ProgramFiles%\\mux\\bin</InlineCode> (requires admin).
      </p>

      <SubHeading id="install-source">From Source</SubHeading>
      <CodeBlock lang="sh">{`cargo install mux`}</CodeBlock>
      <p className="text-xs text-white/35 mt-2 mb-6">
        Requires a recent stable Rust toolchain. Run{" "}
        <InlineCode>rustup update stable</InlineCode> if needed.
      </p>

      <SubHeading id="verify">Verify Installation</SubHeading>
      <CodeBlock lang="sh">{`mux --version
# mux v0.1.2`}</CodeBlock>

      {/* ── Quick Start ──────────────────────────────────────── */}
      <SectionHeading id="quick-start">Quick Start</SectionHeading>

      <p className="text-sm text-white/50 leading-relaxed mb-6">
        Create a new project, add a dependency, and build — all in three
        commands.
      </p>

      <div className="space-y-3">
        {[
          {
            step: "01",
            label: "Create a new project",
            code: "mux init my-app",
          },
          {
            step: "02",
            label: "Add a dependency",
            code: "mux add fmt",
          },
          {
            step: "03",
            label: "Build",
            code: "mux build",
          },
        ].map(({ step, label, code }) => (
          <div key={step} className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-white/18 w-6 shrink-0 select-none">
              {step}
            </span>
            <div className="flex-1">
              <p className="text-xs text-white/35 mb-1">{label}</p>
              <div className="bg-white/3 border border-white/8 rounded-lg px-4 py-2.5">
                <code className="font-mono text-sm text-white/72">
                  <span className="text-white/28 select-none">$ </span>
                  {code}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-white/50 leading-relaxed mt-6">
        This scaffolds a CMake preset-based project, resolves and links the{" "}
        <InlineCode>fmt</InlineCode> library, and compiles your project.
      </p>

      {/* ══════════════════════════════════════════════════════
           COMMANDS
      ══════════════════════════════════════════════════════ */}

      <div className="mt-16 mb-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/30">
          Reference
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white mt-2">
          Commands
        </h2>
      </div>

      {/* mux init */}
      <SectionHeading id="mux-init">mux init</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Scaffold a new C or C++ project. Creates a directory with the given
        name, a starter <InlineCode>src/main.c</InlineCode> or{" "}
        <InlineCode>src/main.cpp</InlineCode>, and a{" "}
        <InlineCode>CMakeLists.txt</InlineCode>.
      </p>
      <CodeBlock lang="sh">{`mux init <project-name> [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag
          flag="--lang c|cpp"
          description="Language to use for the project. Accepts 'c' or 'cpp' (default: c)"
        />
        <Flag
          flag="--cpp"
          description="Shorthand for --lang cpp. Creates a C++ project."
        />
      </div>

      <CodeBlock lang="sh">{`# C project (default)
mux init my-lib

# C++ project via --lang
mux init my-app --lang cpp

# C++ project shorthand
mux init my-app --cpp`}</CodeBlock>

      {/* mux add */}
      <SectionHeading id="mux-add">mux add</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Add a dependency to the project. Registers it in{" "}
        <InlineCode>mux.lock</InlineCode> and patches{" "}
        <InlineCode>CMakeLists.txt</InlineCode> to link it automatically. The{" "}
        <InlineCode>lib</InlineCode> argument accepts a local path, a git URL,
        or a GitHub shorthand.
      </p>
      <CodeBlock lang="sh">{`mux add <lib> [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag
          flag="--target <cmake-target>"
          description="CMake target to link the library to. Defaults to the project directory name."
        />
      </div>

      <CodeBlock lang="sh">{`# GitHub shorthand (owner/repo)
mux add fmtlib/fmt

# GitHub shorthand — repo name only
mux add fmt

# Full git URL
mux add https://github.com/gabime/spdlog

# Local path
mux add ./vendor/mylib

# Link to a specific CMake target
mux add fmtlib/fmt --target my_server`}</CodeBlock>

      {/* mux remove */}
      <SectionHeading id="mux-remove">mux remove</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Remove a library from the project. Updates{" "}
        <InlineCode>mux.lock</InlineCode> and removes the corresponding entries
        from <InlineCode>CMakeLists.txt</InlineCode>.
      </p>
      <CodeBlock lang="sh">{`mux remove <lib-name>`}</CodeBlock>
      <br />
      <CodeBlock lang="sh">{`mux remove fmt`}</CodeBlock>

      {/* mux build */}
      <SectionHeading id="mux-build">mux build</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Compile the project using CMake. Runs configure and build in one step.
      </p>
      <CodeBlock lang="sh">{`mux build [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag flag="--release" description="Build the release preset." />
        <Flag
          flag="--all"
          description="Build both debug and release presets."
        />
      </div>

      <CodeBlock lang="sh">{`# Debug build (default)
mux build

# Optimized release build
mux build --release

# Build all targets
mux build --all`}</CodeBlock>

      {/* mux run */}
      <SectionHeading id="mux-run">mux run</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Build and immediately run the project binary.
      </p>
      <CodeBlock lang="sh">{`mux run [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag
          flag="--release"
          description="Build with optimizations before running."
        />
      </div>

      <CodeBlock lang="sh">{`mux run
mux run --release`}</CodeBlock>

      {/* mux test */}
      <SectionHeading id="mux-test">mux test</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Build and run the project&apos;s test suite via CMake&apos;s CTest
        integration.
      </p>
      <CodeBlock lang="sh">{`mux test [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag
          flag="--release"
          description="Build and test using the release preset."
        />
        <Flag flag="--all" description="Test both debug and release presets." />
      </div>

      <CodeBlock lang="sh">{`mux test
mux test --release
mux test --all`}</CodeBlock>

      {/* mux clean */}
      <SectionHeading id="mux-clean">mux clean</SectionHeading>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Remove build artifacts from the output directory.
      </p>
      <CodeBlock lang="sh">{`mux clean [flags]`}</CodeBlock>

      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        <Flag
          flag="--release"
          description="Remove only the release preset output for the current platform."
        />
        <Flag
          flag="--all"
          description="Remove all build artifacts from the output directory."
        />
      </div>

      <CodeBlock lang="sh">{`mux clean
mux clean --release
mux clean --all`}</CodeBlock>

      {/* ══════════════════════════════════════════════════════
           CONFIGURATION
      ══════════════════════════════════════════════════════ */}

      <div className="mt-16 mb-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/30">
          Configuration
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white mt-2">
          Project Files
        </h2>
      </div>

      <SectionHeading id="mux-lock">mux.lock</SectionHeading>

      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Mux records every installed dependency in a{" "}
        <InlineCode>mux.lock</InlineCode> file at the project root. This file is
        managed automatically — do not edit it by hand.
      </p>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        The lockfile is a tab-separated text file with a version header. Each
        row records the library name, its source, the CMake target it was linked
        to, and the include path.
      </p>

      <CodeBlock lang="text">{`# mux lock v1
name\tsource\ttarget\tinclude
fmt\tregistry\tmy-app\tfmt/core.h
spdlog\tregistry\tmy-app\tspdlog/spdlog.h`}</CodeBlock>

      <p className="text-xs text-white/35 mt-2">
        Commit <InlineCode>mux.lock</InlineCode> to version control to ensure
        reproducible builds across machines.
      </p>

      {/* CMakeLists.txt */}
      <SectionHeading id="cmake-guide">CMakeLists.txt</SectionHeading>

      <p className="text-sm text-white/50 leading-relaxed mb-4">
        Mux generates and maintains a <InlineCode>CMakeLists.txt</InlineCode> at
        the project root. When you run <InlineCode>mux add</InlineCode> or{" "}
        <InlineCode>mux remove</InlineCode>, Mux patches the managed section
        automatically.
      </p>
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        You can freely edit the parts of <InlineCode>CMakeLists.txt</InlineCode>{" "}
        outside the managed block — Mux will not overwrite your customizations.
      </p>

      <CodeBlock lang="cmake">{`cmake_minimum_required(VERSION 3.20)
project(my-app CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(my-app src/main.cpp)

# Managed by mux — do not edit below this line
find_package(fmt REQUIRED)
find_package(spdlog REQUIRED)
target_link_libraries(my-app PRIVATE fmt::fmt spdlog::spdlog)`}</CodeBlock>

      {/* ══════════════════════════════════════════════════════
           EXAMPLES
      ══════════════════════════════════════════════════════ */}
      <SectionHeading id="examples">Examples</SectionHeading>

      <SubHeading id="example-c">A simple C project</SubHeading>
      <CodeBlock lang="sh">{`mux init hello
cd hello
mux build && mux run`}</CodeBlock>
      <br />
      <CodeBlock lang="c">{`// src/main.c
#include <stdio.h>

int main(void) {
    printf("Hello from mux!\\n");
    return 0;
}`}</CodeBlock>

      <SubHeading id="example-args">Adding a dependency</SubHeading>
      <CodeBlock lang="sh">{`mux init greeter
cd greeter
mux add antirez/linenoise
mux build && mux run`}</CodeBlock>
      <br />
      <CodeBlock lang="c">{`// src/main.c
#include <linenoise.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char *name = linenoise("Enter your name: ");
    if (name) {
        printf("Hello, %s!\\n", name);
        free(name);
    }
    return 0;
}`}</CodeBlock>

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
