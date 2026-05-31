# 🩺 DiaPredict – Early Stage Diabetes Predictor

A web-based diabetes risk prediction application built with Flask and Machine Learning.

## Features
- **Diabetes Prediction** – 16-feature symptom-based risk assessment using Random Forest
- **Healthcare Advisory** – Personalized health tips based on prediction result
- **BMI Calculator** – Check your Body Mass Index
- **Referral System** – Find nearby diabetes hospitals in Hyderabad (10 areas)
- **Glossary** – Understand all medical terms used in the prediction form
- **FAQ** – Common questions about diabetes answered

## Project Structure
```
DiaPredict/
├── app.py                  # Flask backend
├── train_model.py          # Train & save the ML model
├── diabetes_data.csv       # Dataset (520 samples, 17 features)
├── diabetes_model.pkl      # Saved model (auto-generated)
├── label_encoders.pkl      # Saved encoders (auto-generated)
├── requirements.txt
├── templates/
│   └── index.html          # Main frontend (single-page app)
└── static/
    ├── images/
    │   └── logo.png
    └── videos/
        ├── bad_result.mp4  # High risk result video
        └── nice_result.mp4 # Low risk result video
```

## Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/DiaPredict.git
cd DiaPredict
```

### 2. Create a virtual environment
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. (Optional) Pre-train the model
```bash
python train_model.py
```
> The model also auto-trains on first run of `app.py` if `.pkl` files are missing.

### 5. Run the app
```bash
python app.py
```

Open your browser at: **http://127.0.0.1:5000**

## Dataset
UCI Early Stage Diabetes Risk Prediction Dataset  
- 520 samples, 16 symptom features + 1 target class
- Features: Age, Gender, Polyuria, Polydipsia, Sudden Weight Loss, Weakness, Polyphagia, Genital Thrush, Visual Blurring, Itching, Irritability, Delayed Healing, Partial Paresis, Muscle Stiffness, Alopecia, Obesity
- Target: Positive / Negative

## Model
- Algorithm: Random Forest Classifier (100 trees)
- Accuracy: ~92%
- Library: scikit-learn

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| ML | scikit-learn, pandas, numpy |
| Frontend | HTML, CSS, JavaScript |
| Serialization | joblib |

---
*Developed as a 3rd Year Mini Project — DiaPredict*
