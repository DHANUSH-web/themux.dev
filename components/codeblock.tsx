export default function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return (
    <div className="relative">
      {lang && (
        <span className="absolute top-3 right-3 text-[10px] font-mono text-white/20 uppercase tracking-widest select-none">
          {lang}
        </span>
      )}
      <pre className="bg-white/3 border border-white/8 rounded-lg px-5 py-4 overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
        <code className="font-mono text-sm text-white/72 leading-relaxed whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  );
}
