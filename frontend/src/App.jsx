import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import ResultCard from "./components/ResultCard.jsx";
import Footer from "./components/Footer.jsx";

import { analyzeSentiment } from "./api/predict.js";

export default function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!review.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeSentiment(review);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong while analyzing the review.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <Navbar />

      <main className="mx-auto w-full max-w-[900px] flex-1 px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Movie Review Sentiment Analysis
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Paste a movie review below to predict whether it's positive or negative.
          </p>
        </div>

        <ReviewForm
          review={review}
          setReview={setReview}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          error={error}
        />

        <ResultCard result={result} />
      </main>

      <Footer />
    </div>
  );
}
