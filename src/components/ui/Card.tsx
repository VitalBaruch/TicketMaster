export function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div className="text-sm text-slate-300">{children}</div>
    </div>
  );
}
