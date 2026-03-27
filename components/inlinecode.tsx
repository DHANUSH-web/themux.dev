export default function InlineCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[13px] bg-white/7 text-white/80 px-1.5 py-0.5 rounded border border-white/8">
      {children}
    </code>
  );
}
