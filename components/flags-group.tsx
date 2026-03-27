export default function FlagsGroup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
        Flags
      </div>
      <div className="border border-white/7 rounded-lg px-4 py-1 mb-4">
        {children}
      </div>
    </>
  );
}
