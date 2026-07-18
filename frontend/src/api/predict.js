// Base URL of the Flask backend. Override at build time with:
//   VITE_API_URL=https://your-api.example.com
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * Send a review to the backend for sentiment prediction.
 * @param {string} review
 * @returns {Promise<{sentiment: string, confidence: number, probabilities: {positive: number, negative: number}}>}
 */
export async function analyzeSentiment(review) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}
