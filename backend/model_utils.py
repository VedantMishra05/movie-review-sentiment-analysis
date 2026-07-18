"""
model_utils.py

Preprocessing + inference helpers for the IMDb 2D-CNN sentiment model.

IMPORTANT: this file intentionally mirrors, line-for-line in logic, the
preprocessing used in the training notebook:
  - vocabulary size:      10,000 most frequent words
  - sequence length:      500 tokens
  - word -> id offset:    +3 (Keras reserves 0,1,2,3 for <PAD>,<START>,<UNK>,<UNUSED>)
  - unknown word id:      2
  - padding:              'post', value=0
  - truncating:           'post'

If you change any of these values here, you MUST change them identically in
the training notebook (and vice versa), or predictions will be meaningless
because the model would receive inputs encoded differently than it was
trained on.
"""

import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.sequence import pad_sequences

VOCAB_SIZE = 10000
MAXLEN = 500
INDEX_FROM = 3
UNK_ID = 2

_word_index = None


def get_word_index():
    """
    Load (and cache in memory) the IMDb word -> raw_index dictionary.

    The first call downloads a small json file via Keras' dataset utils
    (cached afterwards under ~/.keras/datasets). We keep this as a module
    level singleton so we only pay that cost once per server process.
    """
    global _word_index
    if _word_index is None:
        _word_index = imdb.get_word_index()
    return _word_index


def clean_text(text: str) -> str:
    """Lightweight cleanup matching the notebook's custom-review encoding."""
    text = text.lower()
    for ch in [".", ",", "!", "?", '"', "'", ";", ":", "(", ")"]:
        text = text.replace(ch, "")
    return text


def encode_review(text: str) -> list:
    """
    Convert a raw English review into the IMDb integer-encoding scheme,
    identical to `encode_review()` used in the training notebook.
    """
    word_index = get_word_index()
    tokens = clean_text(text).split()

    encoded = []
    for token in tokens:
        idx = word_index.get(token)
        if idx is None or (idx + INDEX_FROM) >= VOCAB_SIZE:
            encoded.append(UNK_ID)
        else:
            encoded.append(idx + INDEX_FROM)
    return encoded


def preprocess_texts(texts) -> np.ndarray:
    """
    Encode + pad a list of raw review strings so they can be fed directly
    into the trained model. Returns an array of shape (len(texts), MAXLEN).
    """
    encoded = [encode_review(t) for t in texts]
    padded = pad_sequences(
        encoded,
        maxlen=MAXLEN,
        padding="post",
        truncating="post",
        value=0,
    )
    return padded


def load_sentiment_model(model_path: str):
    """
    Load a trained Keras model from a .keras or .h5 file.
    Raises a clear error if the file is missing so the Flask app can
    fail fast with a helpful message instead of a cryptic stack trace.
    """
    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model file not found at '{model_path}'. Set the MODEL_PATH "
            f"environment variable to point at your trained .keras/.h5 file, "
            f"or place it at that default path."
        )
    return tf.keras.models.load_model(model_path)


def predict_sentiment(model, text: str) -> dict:
    """
    Run inference on a single review and return a JSON-serializable dict:
      {
        "sentiment": "Positive" | "Negative",
        "confidence": float (0-1, the softmax probability of the winning class),
        "probabilities": {"positive": float, "negative": float}
      }
    """
    padded = preprocess_texts([text])
    probs = model.predict(padded, verbose=0)[0]  # shape (2,): [neg_prob, pos_prob]

    pred_class = int(np.argmax(probs))
    sentiment = "Positive" if pred_class == 1 else "Negative"
    confidence = float(probs[pred_class])

    return {
        "sentiment": sentiment,
        "confidence": confidence,
        "probabilities": {
            "positive": float(probs[1]),
            "negative": float(probs[0]),
        },
    }
