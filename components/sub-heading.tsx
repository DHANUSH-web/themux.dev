export default function SubHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="text-base font-semibold text-white/90 mt-8 mb-3 scroll-mt-20"
    >
      {children}
    </h3>
  );
}
