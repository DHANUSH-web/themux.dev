import Link from "next/link";

export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-lg font-semibold text-white mt-14 mb-4 pt-6 border-t border-white/6 flex items-center gap-2 group scroll-mt-20"
    >
      <Link
        href={`#${id}`}
        className="text-white/20 group-hover:text-white/40 transition-colors text-base"
      >
        #
      </Link>
      {children}
    </h2>
  );
}
