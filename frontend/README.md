# Sentiment Analysis Frontend (React + Tailwind)

A minimal, single-page interface for the IMDb sentiment model: paste a review, get a
Positive/Negative prediction with a confidence score.

## Setup

```bash
cd frontend
npm install
cp .env.example .env    # point VITE_API_URL at your Flask backend if not localhost:5000
npm run dev
```

Open `http://localhost:5173`. Make sure the Flask backend (see `../backend`) is running
on `http://localhost:5000` (or whatever `VITE_API_URL` points to).

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  api/predict.js           fetch wrapper for POST /predict
  components/
    Navbar.jsx              app name + GitHub link
    ReviewForm.jsx          textarea, char counter, sample/clear/analyze buttons
    ResultCard.jsx          sentiment badge, confidence, probability bars
    Footer.jsx               one-line footer
  App.jsx                   page composition + state (review text, result, loading, error)
  index.css                 Tailwind layers only
tailwind.config.js           Inter font, otherwise default Tailwind theme
```

No custom design tokens, gradients, or decorative sections — just the interface needed
to submit a review and read the result.
