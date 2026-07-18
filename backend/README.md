# Sentiment Analysis Backend (Flask)

Serves the trained IMDb 2D-CNN model behind a single `POST /predict` endpoint.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Add your trained model

Place your saved model file anywhere and point `MODEL_PATH` at it:

```bash
mkdir -p model
cp /path/to/your/sentiment_cnn.keras model/sentiment_cnn.keras
export MODEL_PATH=./model/sentiment_cnn.keras     # or a .h5 file
```

If `MODEL_PATH` is not set, the app defaults to `./model/sentiment_cnn.keras`.

## Run

```bash
python app.py
```

The API is now available at `http://localhost:5000`.

## Endpoints

### `GET /health`
Returns whether the model loaded successfully.

### `POST /predict`
Request body:
```json
{ "review": "This movie was absolutely amazing." }
```

Response:
```json
{
  "sentiment": "Positive",
  "confidence": 0.9263,
  "probabilities": { "positive": 0.9263, "negative": 0.0737 }
}
```

## Preprocessing consistency

`model_utils.py` re-implements the **exact** encoding used during training:
vocabulary size 10,000, offset-by-3 IMDb word index, `<UNK>` fallback for
unknown/rare words, and `pad_sequences(maxlen=500, padding='post',
truncating='post')`. If you retrain with different values, update the
constants at the top of `model_utils.py` to match.
