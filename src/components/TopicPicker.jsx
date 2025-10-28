import { useState } from "react";
import { Sparkles, Search } from "lucide-react";

const TOPICS = [
  "Everyday Heroes",
  "Life Transitions",
  "Overcoming Odds",
  "Community & Belonging",
  "Love & Relationships",
  "Work & Purpose",
  "Culture & Identity",
  "Wellbeing & Resilience",
];

export default function TopicPicker({ selected, onChange, onSearch }) {
  const [query, setQuery] = useState("");

  const filtered = TOPICS.filter((t) =>
    t.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xl tracking-tight">Explore Topics</h2>
        <div className="inline-flex items-center gap-2 text-sm text-fuchsia-600">
          <Sparkles className="w-4 h-4" />
          Curated for human-interest storytelling
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr,2fr] gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search topics"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filtered.map((t) => {
            const active = selected === t;
            return (
              <button
                key={t}
                onClick={() => onChange(t)}
                className={
                  "px-3 py-2 rounded-full text-sm border transition " +
                  (active
                    ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow"
                    : "bg-white/70 dark:bg-neutral-900/60 border-black/10 dark:border-white/10 hover:border-fuchsia-300")
                }
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
