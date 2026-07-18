import { Loader2 } from "lucide-react";

const SAMPLE_REVIEWS = [
  "This movie was absolutely amazing, the story kept me hooked from start to finish.",
  "Terrible movie. Waste of time and money, I want those two hours back.",
  "Outstanding acting and brilliant direction made this one of the best films I've seen.",
  "Very boring story with a predictable plot and flat characters.",
];

const MAX_CHARS = 2000;

export default function ReviewForm({ review, setReview, onAnalyze, isLoading, error }) {
  const handleSample = () => {
    const random = SAMPLE_REVIEWS[Math.floor(Math.random() * SAMPLE_REVIEWS.length)];
    setReview(random);
  };

  return (
    <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="relative">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Enter a movie review..."
          rows={7}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        <span className="absolute bottom-3 right-3 text-xs text-slate-400">
          {review.length}/{MAX_CHARS}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onAnalyze()}
          disabled={isLoading || review.trim().length === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        <button
          onClick={handleSample}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Sample Review
        </button>

        <button
          onClick={() => setReview("")}
          disabled={review.length === 0}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
