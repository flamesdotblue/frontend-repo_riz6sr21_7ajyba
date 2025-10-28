import { useMemo, useState } from "react";
import Header from "./components/Header";
import TopicPicker from "./components/TopicPicker";
import Generator from "./components/Generator";
import Recommendations from "./components/Recommendations";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("Everyday Heroes");
  const [search, setSearch] = useState("");
  const [generated, setGenerated] = useState([]);
  const [likes, setLikes] = useState([]);

  function handleGenerated(ep) {
    setGenerated((prev) => [
      { ...ep, id: `g-${Date.now()}` },
      ...prev,
    ]);
  }

  function handleLike(ep) {
    setLikes((prev) => {
      const exists = prev.find((e) => e.id === ep.id);
      if (exists) return prev;
      return [ep, ...prev];
    });
  }

  const likedCount = likes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-violet-50 to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Header />

      <main className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <section className="rounded-2xl p-6 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Human Interest Podcasts — curated and AI-generated
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Pick a topic you care about. Generate a micro-episode in your favorite tone. Explore a personalized feed of human stories.
            </p>
            {likedCount > 0 && (
              <p className="mt-3 text-sm text-fuchsia-700 dark:text-fuchsia-300">
                You liked {likedCount} episode{likedCount > 1 ? "s" : ""} — saved for later listening.
              </p>
            )}
          </section>
        </div>

        <TopicPicker
          selected={selectedTopic}
          onChange={setSelectedTopic}
          onSearch={setSearch}
        />

        <Generator defaultTopic={selectedTopic} onGenerated={handleGenerated} />

        <Recommendations
          topic={selectedTopic}
          generated={generated}
          onLike={handleLike}
        />
      </main>

      <footer className="border-t border-black/5 dark:border-white/10 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Human Interest FM</span>
          <span>Built for story lovers</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
