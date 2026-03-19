#!/usr/bin/env sh
set -eu

REPO="DHANUSH-web/mux"
BINARY_NAME="mux"

# ── ANSI colors (disabled when not a tty) ────────────────────────────────────
if [ -t 1 ]; then
  BOLD='\033[1m'
  DIM='\033[2m'
  GREEN='\033[0;32m'
  BGREEN='\033[1;32m'
  YELLOW='\033[1;33m'
  CYAN='\033[0;36m'
  RED='\033[0;31m'
  RESET='\033[0m'
else
  BOLD='' DIM='' GREEN='' BGREEN='' YELLOW='' CYAN='' RED='' RESET=''
fi

# ── Logging helpers ───────────────────────────────────────────────────────────
banner() {
  printf "\n"
  printf "  ${BOLD}  ███╗   ███╗██╗   ██╗██╗  ██╗${RESET}\n"
  printf "  ${BOLD}  ████╗ ████║██║   ██║╚██╗██╔╝${RESET}\n"
  printf "  ${BOLD}  ██╔████╔██║██║   ██║ ╚███╔╝ ${RESET}\n"
  printf "  ${BOLD}  ██║╚██╔╝██║██║   ██║ ██╔██╗ ${RESET}\n"
  printf "  ${BOLD}  ██║ ╚═╝ ██║╚██████╔╝██╔╝ ██╗${RESET}\n"
  printf "  ${BOLD}  ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝${RESET}\n"
  printf "\n"
  printf "  ${DIM}The C/C++ project manager — themux.dev${RESET}\n"
  printf "  ${DIM}─────────────────────────────────────${RESET}\n\n"
}

step()    { printf "  ${CYAN}→${RESET}  %-34s" "$1"; }
ok()      { printf "${BGREEN}%s${RESET}\n" "$1"; }
info()    { printf "  ${DIM}   %s${RESET}\n" "$1"; }
success() { printf "  ${BGREEN}✓${RESET}  ${BOLD}%s${RESET}\n" "$1"; }
warn()    { printf "  ${YELLOW}⚠${RESET}   %s\n" "$1"; }
die()     { printf "\n  ${RED}✗${RESET}  ${BOLD}%s${RESET}\n\n" "$1" >&2; exit 1; }

# ── Usage ─────────────────────────────────────────────────────────────────────
print_usage() {
  cat <<USAGE

  ${BOLD}Usage:${RESET} install.sh [options]

  ${BOLD}Options:${RESET}
    --version <tag>      Install a specific version  (e.g. v0.1.0)
    --install-dir <dir>  Override the install directory
    --repo <owner/repo>  Override the GitHub repo
    --system             Install system-wide to /usr/local/bin
    -h, --help           Show this help message

  ${BOLD}Examples:${RESET}
    curl -fsSL https://themux.dev/install.sh | sh
    curl -fsSL https://themux.dev/install.sh | sh -s -- --version v0.1.0
    curl -fsSL https://themux.dev/install.sh | sh -s -- --system

USAGE
}

# ── Argument parsing ──────────────────────────────────────────────────────────
VERSION="latest"
INSTALL_DIR=""
SYSTEM_INSTALL=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --version)
      [ "$#" -ge 2 ] || die "Missing value for --version"
      VERSION="$2"; shift 2 ;;
    --install-dir)
      [ "$#" -ge 2 ] || die "Missing value for --install-dir"
      INSTALL_DIR="$2"; shift 2 ;;
    --repo)
      [ "$#" -ge 2 ] || die "Missing value for --repo"
      REPO="$2"; shift 2 ;;
    --system)
      SYSTEM_INSTALL=1; shift ;;
    -h|--help)
      print_usage; exit 0 ;;
    *)
      printf "  ${RED}✗${RESET}  Unknown argument: %s\n\n" "$1" >&2
      print_usage >&2; exit 1 ;;
  esac
done

# ── Check dependencies ────────────────────────────────────────────────────────
if command -v curl >/dev/null 2>&1; then
  DOWNLOAD_TOOL="curl"
elif command -v wget >/dev/null 2>&1; then
  DOWNLOAD_TOOL="wget"
else
  die "curl or wget is required to install mux"
fi

download_to() {
  if [ "$DOWNLOAD_TOOL" = "curl" ]; then
    curl -fsSL "$1" -o "$2"
  else
    wget -q "$1" -O "$2"
  fi
}

download_text() {
  if [ "$DOWNLOAD_TOOL" = "curl" ]; then
    curl -fsSL "$1"
  else
    wget -qO- "$1"
  fi
}

# ── Start ─────────────────────────────────────────────────────────────────────
banner

# Detect platform
step "Detecting platform"
uname_s="$(uname -s)"
uname_m="$(uname -m)"

case "$uname_s" in
  Linux)  platform="linux" ;;
  Darwin) platform="macos" ;;
  *)      die "Unsupported OS: $uname_s" ;;
esac

case "$uname_m" in
  x86_64|amd64)   arch="x86_64" ;;
  aarch64|arm64)  arch="aarch64" ;;
  *)              die "Unsupported architecture: $uname_m" ;;
esac

ok "${platform}/${arch}"

# Resolve version
step "Resolving version"
if [ "$VERSION" = "latest" ]; then
  api_url="https://api.github.com/repos/${REPO}/releases/latest"
  tag="$(download_text "$api_url" | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
  [ -n "$tag" ] || die "Could not resolve latest release from GitHub"
else
  tag="$VERSION"
fi
ok "$tag"

# Resolve target triple
case "${platform}/${arch}" in
  linux/x86_64)   target="x86_64-unknown-linux-gnu" ;;
  macos/x86_64)   target="x86_64-apple-darwin" ;;
  linux/aarch64)  target="aarch64-unknown-linux-gnu" ;;
  macos/aarch64)  target="aarch64-apple-darwin" ;;
  *)              die "No release available for ${platform}/${arch}" ;;
esac

# Resolve install dir
if [ "$SYSTEM_INSTALL" -eq 1 ] && [ -z "$INSTALL_DIR" ]; then
  INSTALL_DIR="/usr/local/bin"
elif [ -z "$INSTALL_DIR" ]; then
  INSTALL_DIR="$HOME/.local/bin"
fi

# Build URLs
asset="${BINARY_NAME}-${target}"
archive_asset="${asset}.tar.gz"
base_url="https://github.com/${REPO}/releases/download/${tag}"
asset_url="${base_url}/${asset}"
archive_url="${base_url}/${archive_asset}"
checksums_url="${base_url}/SHA256SUMS"

# Temp dir
tmp_dir="$(mktemp -d 2>/dev/null || mktemp -d -t mux-install)"
trap 'rm -rf "$tmp_dir"' EXIT INT TERM

asset_path="${tmp_dir}/${asset}"
archive_path="${tmp_dir}/${archive_asset}"
install_source=""
source_name=""
checksum_path=""

# Download
step "Downloading mux ${tag}"
if download_to "$asset_url" "$asset_path" 2>/dev/null; then
  install_source="$asset_path"
  source_name="$asset"
  checksum_path="$asset_path"
  chmod +x "$install_source" || true
  ok "done"
else
  ok "trying archive..."
  step "Downloading archive"
  download_to "$archive_url" "$archive_path" || die "Failed to download ${archive_asset}"
  extract_dir="${tmp_dir}/extract"
  mkdir -p "$extract_dir"
  tar -xzf "$archive_path" -C "$extract_dir"
  install_source="${extract_dir}/${asset}"
  source_name="$archive_asset"
  checksum_path="$archive_path"
  [ -f "$install_source" ] || die "Could not find ${asset} in archive"
  ok "done"
fi

# Checksum
step "Verifying checksum"
if command -v sha256sum >/dev/null 2>&1 || command -v shasum >/dev/null 2>&1; then
  checksums_path="${tmp_dir}/SHA256SUMS"
  if download_to "$checksums_url" "$checksums_path" 2>/dev/null; then
    expected="$(grep "  ${source_name}$" "$checksums_path" | awk '{print $1}' | head -n1 || true)"
    if [ -n "$expected" ]; then
      if command -v sha256sum >/dev/null 2>&1; then
        actual="$(sha256sum "$checksum_path" | awk '{print $1}')"
      else
        actual="$(shasum -a 256 "$checksum_path" | awk '{print $1}')"
      fi
      [ "$actual" = "$expected" ] || die "Checksum mismatch — download may be corrupted"
      ok "verified"
    else
      ok "skipped"
    fi
  else
    ok "skipped"
  fi
else
  ok "skipped (no sha256sum)"
fi

# Install
step "Installing to ${INSTALL_DIR}"
mkdir -p "$INSTALL_DIR"
target_path="${INSTALL_DIR}/${BINARY_NAME}"
cp "$install_source" "$target_path"
chmod +x "$target_path" || true
ok "done"

# ── Done ──────────────────────────────────────────────────────────────────────
printf "\n"
success "mux ${tag} installed successfully!"
printf "\n"

case ":$PATH:" in
  *":${INSTALL_DIR}:"*) ;;
  *)
    warn "${INSTALL_DIR} is not in your PATH. Add this to your shell profile:"
    printf "     ${DIM}export PATH=\"${INSTALL_DIR}:\$PATH\"${RESET}\n\n"
    ;;
esac

printf "  ${DIM}Get started:${RESET}\n"
printf "     ${BOLD}mux --help${RESET}\n"
printf "     ${BOLD}mux init my-project${RESET} or ${BOLD}mux init my-project --cpp${RESET}\n"
printf "\n"
printf "  ${DIM}Docs & releases → ${RESET}${CYAN}https://themux.dev${RESET}\n\n"