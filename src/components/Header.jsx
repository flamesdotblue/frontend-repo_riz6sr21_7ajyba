import { Mic2, Sparkles, Headphones } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-900/70 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-blue-500 text-white">
            <Mic2 className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-lg tracking-tight">Human Interest FM</p>
            <p className="text-xs text-neutral-500">Stories that stay with you</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <Headphones className="w-4 h-4" />
          <span className="hidden sm:inline">Tune in to curated and AI-generated episodes</span>
          <Sparkles className="w-4 h-4 text-fuchsia-500" />
        </div>
      </div>
    </header>
  );
}
