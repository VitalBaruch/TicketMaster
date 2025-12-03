export function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <div className="max-w-6xl mx-auto py-4 px-4 flex items-center justify-between">
        <div className="font-bold text-xl">Vital Starter</div>
        <nav className="flex gap-4 text-sm text-slate-300">
          <a href="/" className="hover:text-white">
            בית
          </a>
          <a href="/about" className="hover:text-white">
            אודות
          </a>
        </nav>
      </div>
    </header>
  );
}
