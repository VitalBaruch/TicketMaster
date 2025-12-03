const items = [
  { label: "דף הבית", href: "/" },
  { label: "אודות התבנית", href: "/about" },
  { label: "טופס לדוגמה", href: "#form" },
  { label: "טבלה לדוגמה", href: "#table" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:block w-56 border-l border-slate-800 bg-slate-950/70">
      <div className="h-full py-6 px-4 space-y-4 text-sm">
        <div className="text-xs text-slate-500 uppercase tracking-widest">
          ניווט מהיר
        </div>
        <nav className="space-y-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
