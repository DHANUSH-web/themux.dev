import InlineCode from "@/components/inlinecode";

export default function Flag({ flag, description }: { flag: string; description: string }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-white/5 last:border-0">
      <div className="shrink-0">
        <InlineCode>{flag}</InlineCode>
      </div>
      <span className="text-sm text-white/45 leading-relaxed">
        {description}
      </span>
    </div>
  );
}
