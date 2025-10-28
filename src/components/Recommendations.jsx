import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Heart, Share2 } from "lucide-react";

const MOCK_CATALOG = [
  {
    id: "e1",
    title: "The Bus Driver's Piano",
    topic: "Everyday Heroes",
    description:
      "A public bus driver turns late-night routes into a moving piano bar, stitching a neighborhood together one song at a time.",
    length: 9,
  },
  {
    id: "e2",
    title: "When the Bakery Lights Stayed On",
    topic: "Community & Belonging",
    description:
      "During a winter blackout, a small bakery becomes a beacon of warmth where strangers become neighbors.",
    length: 7,
  },
  {
    id: "e3",
    title: "Letters to My Future Self",
    topic: "Life Transitions",
    description:
      "A class assignment asks teenagers to write to their future selves—ten years later, the letters arrive.",
    length: 12,
  },
  {
    id: "e4",
    title: "The Bridge Between Accents",
    topic: "Culture & Identity",
    description:
      "An interpreter navigates the spaces between languages and discovers the words they were searching for.",
    length: 11,
  },
];

function useSpeech() {
  const [speakingId, setSpeakingId] = useState(null);
  const utterRef = useRef(null);

  const speak = (id, text) => {
    if (!("speechSynthesis" in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.03;
    utter.pitch = 1.02;
    utterRef.current = utter;
    setSpeakingId(id);
    window.speechSynthesis.speak(utter);
    utter.onend = () => setSpeakingId(null);
  };

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return { speakingId, speak };
}

function EpisodeCard({ ep, onLike }) {
  const { speakingId, speak } = useSpeech();
  const isPlaying = speakingId === ep.id;

  return (
    <div className="group rounded-xl p-4 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 hover:shadow-sm transition">
      <div className="flex items-start gap-4">
        <button
          onClick={() => speak(ep.id, ep.description)}
          className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white flex items-center justify-center shadow"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold leading-tight">{ep.title}</h4>
            <span className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
              {ep.length} min
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {ep.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-600/10 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-600/20">
              {ep.topic}
            </span>
            <button
              onClick={() => onLike(ep)}
              className="ml-auto inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-white/60 dark:hover:bg-neutral-800/60"
            >
              <Heart className="w-4 h-4" /> Like
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(`${ep.title} — ${ep.description}`)}
              className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-white/60 dark:hover:bg-neutral-800/60"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Recommendations({ topic, generated = [], onLike }) {
  const base = useMemo(() => {
    if (!topic) return MOCK_CATALOG;
    return [
      ...MOCK_CATALOG.filter((e) => e.topic === topic),
      ...MOCK_CATALOG.filter((e) => e.topic !== topic).slice(0, 2),
    ];
  }, [topic]);

  const feed = useMemo(() => {
    return [...(generated || []), ...base];
  }, [generated, base]);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8 mb-16">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xl tracking-tight">Recommended for you</h2>
        <p className="text-sm text-neutral-500">
          {topic ? `Focusing on ${topic.toLowerCase()}` : "A mix of human-interest stories"}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {feed.map((ep) => (
          <EpisodeCard key={ep.id} ep={ep} onLike={onLike} />
        ))}
      </div>
    </section>
  );
}
