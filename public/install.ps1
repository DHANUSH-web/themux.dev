param(
  [string]$Version    = "latest",
  [string]$InstallDir = "",
  [string]$Repo       = "DHANUSH-web/mux",
  [switch]$System
)

$ErrorActionPreference = "Stop"

# ── Helpers ───────────────────────────────────────────────────────────────────
function Write-Banner {
  Write-Host ""
  Write-Host "    ███╗   ███╗██╗   ██╗██╗  ██╗" -ForegroundColor White
  Write-Host "    ████╗ ████║██║   ██║╚██╗██╔╝" -ForegroundColor White
  Write-Host "    ██╔████╔██║██║   ██║ ╚███╔╝ " -ForegroundColor White
  Write-Host "    ██║╚██╔╝██║██║   ██║ ██╔██╗ " -ForegroundColor White
  Write-Host "    ██║ ╚═╝ ██║╚██████╔╝██╔╝ ██╗" -ForegroundColor White
  Write-Host "    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝" -ForegroundColor White
  Write-Host ""
  Write-Host "  The C/C++ project manager — themux.dev" -ForegroundColor DarkGray
  Write-Host "  ─────────────────────────────────────" -ForegroundColor DarkGray
  Write-Host ""
}

function Write-Step([string]$msg) {
  Write-Host -NoNewline "  " -ForegroundColor DarkGray
  Write-Host -NoNewline "→  " -ForegroundColor Cyan
  Write-Host -NoNewline ($msg.PadRight(34)) -ForegroundColor White
}

function Write-Ok([string]$msg) {
  Write-Host $msg -ForegroundColor Green
}

function Write-Warn([string]$msg) {
  Write-Host "  ⚠   $msg" -ForegroundColor Yellow
}

function Write-Success([string]$msg) {
  Write-Host -NoNewline "  "
  Write-Host -NoNewline "✓  " -ForegroundColor Green
  Write-Host $msg -ForegroundColor White
}

function Write-Fail([string]$msg) {
  Write-Host ""
  Write-Host -NoNewline "  "
  Write-Host -NoNewline "✗  " -ForegroundColor Red
  Write-Host $msg -ForegroundColor White
  Write-Host ""
}

function Write-Usage {
  Write-Host ""
  Write-Host "  Usage:" -ForegroundColor White
  Write-Host "    install.ps1 [-Version <tag>] [-InstallDir <dir>] [-Repo <owner/repo>] [-System]" -ForegroundColor DarkGray
  Write-Host ""
  Write-Host "  Options:" -ForegroundColor White
  Write-Host "    -Version <tag>      Install a specific version  (e.g. v0.1.0)" -ForegroundColor DarkGray
  Write-Host "    -InstallDir <dir>   Override the install directory" -ForegroundColor DarkGray
  Write-Host "    -Repo <owner/repo>  Override the GitHub repo" -ForegroundColor DarkGray
  Write-Host "    -System             Install system-wide to Program Files" -ForegroundColor DarkGray
  Write-Host ""
  Write-Host "  Examples:" -ForegroundColor White
  Write-Host "    irm https://themux.dev/install.ps1 | iex" -ForegroundColor DarkGray
  Write-Host "    .\install.ps1 -Version v0.1.0" -ForegroundColor DarkGray
  Write-Host "    .\install.ps1 -System" -ForegroundColor DarkGray
  Write-Host ""
}

# ── Help ──────────────────────────────────────────────────────────────────────
if ($Version -in @("-h", "--help", "help")) {
  Write-Usage
  exit 0
}

# ── Start ─────────────────────────────────────────────────────────────────────
Write-Banner

# Detect architecture
Write-Step "Detecting platform"
$arch = switch ($env:PROCESSOR_ARCHITECTURE) {
  "AMD64" { "x86_64" }
  "ARM64" { "aarch64" }
  default {
    Write-Fail "Unsupported architecture: $env:PROCESSOR_ARCHITECTURE"
    exit 1
  }
}
$target = switch ($arch) {
  "x86_64"  { "x86_64-pc-windows-msvc" }
  "aarch64" { "aarch64-pc-windows-msvc" }
}
Write-Ok "windows/$arch"

# Resolve version
Write-Step "Resolving version"
if ($Version -eq "latest") {
  $latestApi = "https://api.github.com/repos/$Repo/releases/latest"
  try {
    $latest = Invoke-RestMethod -Uri $latestApi -UseBasicParsing
  } catch {
    Write-Fail "Could not reach GitHub API: $_"
    exit 1
  }
  if (-not $latest.tag_name) {
    Write-Fail "Failed to resolve latest release tag"
    exit 1
  }
  $tag = $latest.tag_name
} else {
  $tag = $Version
}
Write-Ok $tag

# Resolve install dir
if ([string]::IsNullOrWhiteSpace($InstallDir)) {
  $InstallDir = if ($System) {
    Join-Path $env:ProgramFiles "mux\bin"
  } else {
    Join-Path $HOME ".mux\bin"
  }
}

# Build URLs
$binaryAsset  = "mux-$target.exe"
$archiveAsset = "mux-$target.zip"
$baseUrl      = "https://github.com/$Repo/releases/download/$tag"
$binaryUrl    = "$baseUrl/$binaryAsset"
$archiveUrl   = "$baseUrl/$archiveAsset"
$checksumsUrl = "$baseUrl/SHA256SUMS"

$tempRoot   = Join-Path ([System.IO.Path]::GetTempPath()) ("mux-install-" + [Guid]::NewGuid().ToString("N"))
$null       = New-Item -ItemType Directory -Path $tempRoot -Force
$binaryPath = Join-Path $tempRoot $binaryAsset
$archivePath= Join-Path $tempRoot $archiveAsset
$extractDir = Join-Path $tempRoot "extract"

try {
  # Download
  Write-Step "Downloading mux $tag"
  $sourceName    = $null
  $installSource = $null
  $checksumPath  = $null

  try {
    Invoke-WebRequest -Uri $binaryUrl -OutFile $binaryPath -UseBasicParsing
    $sourceName    = $binaryAsset
    $installSource = $binaryPath
    $checksumPath  = $binaryPath
    Write-Ok "done"
  } catch {
    Write-Ok "trying archive..."
    Write-Step "Downloading archive"
    try {
      Invoke-WebRequest -Uri $archiveUrl -OutFile $archivePath -UseBasicParsing
    } catch {
      Write-Fail "Failed to download release — check your internet connection"
      exit 1
    }
    Expand-Archive -Path $archivePath -DestinationPath $extractDir -Force
    $candidate = Join-Path $extractDir $binaryAsset
    if (-not (Test-Path $candidate)) {
      Write-Fail "Could not find $binaryAsset inside the archive"
      exit 1
    }
    $sourceName    = $archiveAsset
    $installSource = $candidate
    $checksumPath  = $archivePath
    Write-Ok "done"
  }

  # Checksum
  Write-Step "Verifying checksum"
  $checksumsPath = Join-Path $tempRoot "SHA256SUMS"
  try {
    Invoke-WebRequest -Uri $checksumsUrl -OutFile $checksumsPath -UseBasicParsing
    $line = Get-Content $checksumsPath |
      Where-Object { $_ -match ("\s" + [Regex]::Escape($sourceName) + "$") } |
      Select-Object -First 1

    if ($line) {
      $expected = ($line -split "\s+")[0].ToLowerInvariant()
      $actual   = (Get-FileHash -Path $checksumPath -Algorithm SHA256).Hash.ToLowerInvariant()
      if ($expected -ne $actual) {
        Write-Fail "Checksum mismatch — download may be corrupted"
        exit 1
      }
      Write-Ok "verified"
    } else {
      Write-Ok "skipped"
    }
  } catch {
    if ($_.Exception.Message -like "*Checksum mismatch*") { throw }
    Write-Ok "skipped"
  }

  # Install
  Write-Step "Installing to $InstallDir"
  $null = New-Item -ItemType Directory -Path $InstallDir -Force
  $targetPath = Join-Path $InstallDir "mux.exe"
  Copy-Item -Path $installSource -Destination $targetPath -Force
  Write-Ok "done"

  # PATH
  $pathScope = if ($System) { "Machine" } else { "User" }
  $current = [Environment]::GetEnvironmentVariable("Path", $pathScope)
  if ($null -eq $current) { $current = "" }
  $inPath = ($current -split ';') | Where-Object { $_.TrimEnd('\') -eq $InstallDir.TrimEnd('\') }
  if (-not $inPath) {
    $newPath = if ([string]::IsNullOrWhiteSpace($current)) { $InstallDir } else { $current.TrimEnd(';') + ";$InstallDir" }
    [Environment]::SetEnvironmentVariable("Path", $newPath, $pathScope)
  }

  # ── Done ──────────────────────────────────────────────────────────────────
  Write-Host ""
  Write-Success "mux $tag installed successfully!"
  Write-Host ""

  if (-not $inPath) {
    Write-Warn "Restart your terminal for PATH changes to take effect"
    Write-Host ""
  }

  Write-Host "  Get started:" -ForegroundColor DarkGray
  Write-Host "     mux --help" -ForegroundColor White
  Write-Host "     mux init my-project or mux init my-project --cpp" -ForegroundColor White
  Write-Host ""
  Write-Host "  Docs & releases → " -ForegroundColor DarkGray -NoNewline
  Write-Host "https://themux.dev" -ForegroundColor Cyan
  Write-Host ""

} finally {
  if (Test-Path $tempRoot) {
    Remove-Item -Path $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
  }
}