import InstallCmd from "@/components/installcmd"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold text-center">Welcome to the Mux</h1>
        <span className="text-sm font-medium text-center text-zinc-500">A fast, lightweight and open-source C/C++ project manager</span>
      </div>
      <InstallCmd className="mt-4" />
    </main>
  );
}
