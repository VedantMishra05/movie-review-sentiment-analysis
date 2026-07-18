import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-orange-100 bg-white">
      <div className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900">Sentiment Analyzer</span>
          <span className="text-xs text-slate-400">2D CNN · IMDb</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="text-slate-400 transition-colors hover:text-orange-600"
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  );
}
