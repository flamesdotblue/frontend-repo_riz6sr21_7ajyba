import { useMemo, useRef, useState } from "react";
import { Sparkles, Play, Pause, Wand2 } from "lucide-react";

function speak(text, utterRef) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1.03;
  utter.pitch = 1.02;
  utter.volume = 1;
  utterRef.current = utter;
  window.speechSynthesis.speak(utter);
}

export default function Generator({ defaultTopic, onGenerated }) {
  const [topic, setTopic] = useState(defaultTopic || "Everyday Heroes");
  const [tone, setTone] = useState("Warm");
  const [length, setLength] = useState(5);
  const [preview, setPreview] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utterRef = useRef(null);

  const tones = ["Warm", "Reflective", "Uplifting", "Investigative"];

  const generatedSnippet = useMemo(() => {
    const openers = {
      Warm: "Let me tell you a small story that quietly changed a life.",
      Reflective: "Sometimes the smallest choices echo the loudest.",
      Uplifting: "Against the odds, hope found a way to speak up.",
      Investigative: "Beneath the surface of a familiar street lies a hidden thread.",
    };

    return `${openers[tone]} In ${topic.toLowerCase()}, we meet someone ordinary doing something extraordinary. Over the next ${length} minutes, follow their footsteps, hear the doubts, and feel the shift when courage takes the mic.`;
  }, [topic, tone, length]);

  function handleGenerate(e) {
    e.preventDefault();
    const id = Math.random().toString(36).slice(2);
    const episode = {
      id,
      title: `${topic}: ${tone} short (${length} min)`,
      topic,
      tone,
      length,
      description: generatedSnippet,
      createdAt: new Date().toISOString(),
    };
    setPreview(generatedSnippet);
    onGenerated?.(episode);
  }

  function handlePlay() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speak(preview || generatedSnippet, utterRef);
    const onEnd = () => setIsSpeaking(false);
    utterRef.current && (utterRef.current.onend = onEnd);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <div className="rounded-2xl p-5 md:p-6 border border-black/5 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-900/70 dark:to-neutral-900/50 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="w-5 h-5 text-fuchsia-600" />
          <h3 className="font-semibold tracking-tight">Generate a micro-episode</h3>
        </div>
        <form onSubmit={handleGenerate} className="grid md:grid-cols-4 gap-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Topic</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              placeholder="e.g. Everyday Heroes"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Tone</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Length (min)</span>
            <input
              type="number"
              min={2}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-fuchsia-600 text-white font-medium shadow hover:bg-fuchsia-700 transition"
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          </div>
        </form>
        <div className="mt-4 flex items-start justify-between gap-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {(preview || generatedSnippet) && (
              <span className="block leading-relaxed">{preview || generatedSnippet}</span>
            )}
          </p>
          <button
            onClick={handlePlay}
            className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-white/60 dark:hover:bg-neutral-800/60 transition"
            aria-label="Play preview"
          >
            {isSpeaking ? (
              <>
                <Pause className="w-4 h-4" /> Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Play
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
