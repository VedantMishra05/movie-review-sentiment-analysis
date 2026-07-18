"""
app.py

Flask REST API serving the trained IMDb 2D-CNN sentiment model.

Run:
    export MODEL_PATH=./model/sentiment_cnn.keras   # or .h5
    python app.py

Endpoints:
    GET  /health            -> {"status": "ok", "model_loaded": true}
    POST /predict            body: {"review": "This movie was amazing."}
                              ->    {"sentiment": "Positive",
                                      "confidence": 0.9263,
                                      "probabilities": {"positive": 0.9263, "negative": 0.0737}}
"""

import os
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS

from model_utils import load_sentiment_model, predict_sentiment, MAXLEN, VOCAB_SIZE

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sentiment-api")

MODEL_PATH = os.environ.get("MODEL_PATH", "./model/sentiment_cnn.keras")
MAX_REVIEW_CHARS = 5000  # basic guard against absurdly large payloads

app = Flask(__name__)

# Allow the Vite dev server (default port 5173) and any frontend origin to
# call this API. Lock this down to your real frontend origin in production.
CORS(app, resources={r"/*": {"origins": "*"}})

# ---------------------------------------------------------------------------
# Load the model once at startup, not per-request, since loading a Keras
# model is relatively expensive and the model itself is stateless/read-only
# during inference.
# ---------------------------------------------------------------------------
model = None
model_load_error = None
try:
    logger.info("Loading model from %s ...", MODEL_PATH)
    model = load_sentiment_model(MODEL_PATH)
    logger.info("Model loaded successfully.")
except Exception as exc:  # noqa: BLE001 - we want to surface this at /health too
    model_load_error = str(exc)
    logger.error("Failed to load model: %s", model_load_error)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok" if model is not None else "error",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH,
        "vocab_size": VOCAB_SIZE,
        "maxlen": MAXLEN,
        "error": model_load_error,
    }), (200 if model is not None else 503)


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({
            "error": "Model is not loaded on the server.",
            "detail": model_load_error,
        }), 503

    data = request.get_json(silent=True) or {}
    review = data.get("review", "")

    if not isinstance(review, str) or not review.strip():
        return jsonify({"error": "Field 'review' is required and must be a non-empty string."}), 400

    if len(review) > MAX_REVIEW_CHARS:
        return jsonify({"error": f"Review too long. Max {MAX_REVIEW_CHARS} characters."}), 400

    try:
        result = predict_sentiment(model, review)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Prediction failed")
        return jsonify({"error": "Prediction failed.", "detail": str(exc)}), 500

    return jsonify(result), 200


if __name__ == "__main__":
    # debug=False for anything resembling production use; the reloader can
    # otherwise load the (possibly large) Keras model twice.
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
