# 🎬 IMDb Movie Review Sentiment Analysis

A full-stack **Movie Review Sentiment Analysis** web application that uses a **Convolutional Neural Network (CNN)** built with **TensorFlow/Keras** to classify IMDb movie reviews as **Positive** or **Negative**. The project features a modern React frontend, a Flask backend API, and a trained deep learning model for real-time sentiment prediction.

---

## 📖 Overview

This application allows users to enter a movie review and instantly receive a sentiment prediction along with the model's confidence score. The backend preprocesses the input, performs inference using a trained CNN model, and returns the prediction to the frontend via a REST API.

---

## ✨ Features

- 🎭 Predicts sentiment of IMDb movie reviews
- 🤖 Deep Learning model built using TensorFlow/Keras
- ⚡ Real-time predictions
- 📊 Confidence score and probability distribution
- 🌐 REST API powered by Flask
- 💻 Modern React + Vite frontend
- 📱 Responsive user interface
- 🔗 Frontend and backend completely separated

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Flask
- Flask-CORS
- TensorFlow / Keras
- NumPy
- Pickle

### Machine Learning
- TensorFlow
- Keras
- Convolutional Neural Network (CNN)
- IMDb Movie Review Dataset

---

## 🧠 Model Architecture

The sentiment classifier is built using a **1D Convolutional Neural Network (CNN)** for text classification.

Typical architecture:

- Embedding Layer
- Convolutional Layer (Conv1D)
- MaxPooling Layer
- Dropout Layer
- Dense Layer
- Output Layer (Softmax/Sigmoid)

The model learns semantic patterns from movie reviews and predicts whether the sentiment is positive or negative.

---

## 📂 Project Structure

```text
movie-sentiment-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app.py
│   ├── imdb_sentiment.keras
│   ├── tokenizer.pkl
│   ├── requirements.txt
│   └── ...
│
├── notebooks/
│   └── model_training.ipynb
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-sentiment-analysis.git

cd movie-sentiment-analysis
```

---

## Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the Flask server.

```bash
python app.py
```

The backend will start on:

```
http://localhost:5000
```

---

## Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## API Endpoint

### Predict Sentiment

**POST**

```
/predict
```

### Request

```json
{
    "review": "This movie was absolutely amazing!"
}
```

### Response

```json
{
    "sentiment": "Positive",
    "confidence": 0.97,
    "probabilities": {
        "positive": 0.97,
        "negative": 0.03
    }
}
```

---

## Dataset

This project uses the **IMDb Large Movie Review Dataset**, containing 50,000 labeled movie reviews equally divided into positive and negative classes.

---

## Model Training

The model was trained using TensorFlow/Keras with:

- Text preprocessing
- Tokenization
- Sequence padding
- CNN architecture
- Adam optimizer
- Binary Crossentropy loss
- Early stopping
- Model checkpointing

---

## Performance

| Metric | Score |
|---------|-------|
| Accuracy | ~90–95%* |
| Loss | Depends on training |
| Dataset | IMDb |

> *Actual performance depends on the final trained model.

---

## Future Improvements

- Multi-class sentiment classification
- Attention-based architectures
- Transformer models (BERT)
- Explainable AI (LIME/SHAP)
- User authentication
- Review history
- Model comparison dashboard
- Docker deployment
- Cloud deployment (Render + Vercel)

---

## Screenshots

Add screenshots of:

- Home Page
- Review Input
- Prediction Result
- Confidence Visualization

---

## Deployment

Frontend can be deployed using:

- Vercel
- Netlify

Backend can be deployed using:

- Render
- Railway

---

## Author

**Vedant Mishra**

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- TensorFlow
- Keras
- Flask
- React
- Tailwind CSS
- IMDb Dataset