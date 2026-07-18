import { motion } from "framer-motion";

function ProbabilityBar({ label, value, colorClass }) {
  const pct = Math.round(value * 100);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="font-medium text-slate-700">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;

  const isPositive = result.sentiment === "Positive";
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-6 rounded-xl border border-orange-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {result.sentiment}
        </span>
        <span className="text-sm text-slate-500">
          Confidence: <span className="font-semibold text-slate-800">{confidencePct}%</span>
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <ProbabilityBar
          label="Positive"
          value={result.probabilities.positive}
          colorClass="bg-green-500"
        />
        <ProbabilityBar
          label="Negative"
          value={result.probabilities.negative}
          colorClass="bg-red-500"
        />
      </div>

      <p className="mt-5 text-sm text-slate-500">
        The model predicts this review is{" "}
        <span className="font-medium text-slate-700">{result.sentiment}</span> with{" "}
        {confidencePct}% confidence.
      </p>
    </motion.div>
  );
}
