# 🩺 DiaPredict — Early Stage Diabetes Risk Prediction
## 📌 About the Project:
*DiaPredict* is a comprehensive web-based predictive system that uses Machine Learning to assess the risk of early-stage diabetes based on user-reported symptoms. It accepts simple symptom-based inputs — such as age, gender, and 14 diabetes-related symptoms — and processes them through a *Random Forest classifier* trained on a validated healthcare dataset.
> This tool is for *awareness and early screening only* — not a substitute for professional medical diagnosis.

---

## ⚠️ Problem:
- Diabetes is one of the most prevalent chronic diseases worldwide, contributing significantly to healthcare burdens — yet its gradual onset often leads to delayed diagnosis.
- Traditional diagnosis requires lab tests, hospital visits, and specialist consultations — time-consuming, costly, and inaccessible for rural or underprivileged populations.
- Patients cannot obtain quick preliminary risk insights without visiting a healthcare facility.
- No easily accessible online tool provides both risk assessment and personalized follow-up guidance in one place.

## 💡 Solution:
- DiaPredict uses a Random Forest classifier trained on the UCI Early Stage Diabetes Risk Prediction Dataset to classify user inputs as Positive or Negative risk.
- Users enter age, gender, and 14 symptom indicators through a clean web form — no lab tests or hospital visits required.
- High-risk users receive personalized healthcare advisory tips tailored to their reported symptoms to support preventive action.
- A referral module connects users with nearby diabetes-specialized hospitals across 10 localities in Hyderabad, bridging the gap between digital screening and real-world care.
- Integrated into a Flask web application with a BMI calculator and glossary for a complete, user-friendly experience.

## 📈 Results:
- Model Accuracy: ~92%
- Classification: Positive vs Negative

## 🖥️ Screenshots:
<img width="1920" height="822" alt="  (1)" src="https://github.com/user-attachments/assets/ec9575af-c14f-42af-9e8e-d8b22441ad79" />
<img width="1920" height="836" alt="  (2)" src="https://github.com/user-attachments/assets/e087424f-4403-42a0-8e85-f610e3d13591" />
<img width="1920" height="824" alt="  (3)" src="https://github.com/user-attachments/assets/c044549c-73c1-45f3-bd7e-3f87880b7d89" />
<img width="1920" height="830" alt="  (4)" src="https://github.com/user-attachments/assets/97155d51-7c43-4026-afd9-482a0a21fea4" />
<img width="1920" height="820" alt="  (5)" src="https://github.com/user-attachments/assets/6e1164ec-81d1-453f-9248-c5524c88f168" />
<img width="1920" height="820" alt="  (6)" src="https://github.com/user-attachments/assets/4c5e4f5b-ddb3-4c07-b6b1-2bc4b6cfb400" />
<img width="1920" height="820" alt="(9)" src="https://github.com/user-attachments/assets/0d0c7f5e-075c-4541-b45b-d4cc7ac92af6" />
<img width="1920" height="820" alt="  (7)" src="https://github.com/user-attachments/assets/3284302c-4f2d-48a3-9576-54ff367cb084" />
<img width="1920" height="820" alt="  (8)" src="https://github.com/user-attachments/assets/ff2ff044-551f-44ba-85ec-01868039dbea" />

---

## 💻 The system:
- Accepts symptom-based inputs entered by the user via a web form
- Runs them through a trained Random Forest classifier
- Classifies the result as **Positive (High Risk)** or **Negative (Low Risk)**
- Displays an **animated result** with personalized health guidance
- Provides a **Referral System** to find nearby diabetes-specialized hospitals

---

## 🧠 How The System Works:
1. User enters age, gender, and 14 symptom indicators (Yes/No)
2. Inputs are normalized and label-encoded to match training format
3. Encoded data is passed to the trained Random Forest classifier
4. Model runs across 100 decision trees and takes majority vote
5. Output → Positive (High Risk) | Negative (Low Risk)
6. High-risk users receive personalized healthcare advisory tips
7. Result displayed with animated feedback and referral hospital suggestions

---

## ✨ Features:

|       Feature       |         Description                                          |
|---------------------|--------------------------------------------------------------|
| Diabetes Prediction | 16-feature symptom-based risk assessment using Random Forest |
| Healthcare Advisory | Personalized health tips based on your prediction result     |
| Referral System     | Find nearby diabetes hospitals across 10 areas in Hyderabad  |
| BMI Calculator      | Check your Body Mass Index with visual category indicator    |
| Glossary            | Clear definitions of all medical terms used in the form      |
| FAQ                 | Common questions about diabetes answered                     |

---

## 🗂️ Project Structure:

```
DiaPredict/
├── app.py                  # Flask backend & prediction API
├── train_model.py          # Train & save the ML model manually
├── diabetes_data.csv       # Dataset (520 samples, 17 features)
├── diabetes_model.pkl      # Saved Random Forest model
├── label_encoders.pkl      # Saved label encoders
├── requirements.txt        # Python dependencies
├── README.md
├── .gitignore
├── templates/
│   └── index.html          # Full frontend (single-page app)
└── static/
    ├── images/
    │   └── logo.png
    └── videos/
        ├── bad_result.mp4  # Shown on High Risk result
        └── nice_result.mp4 # Shown on Low Risk result
```
---

## 🤖 Machine Learning Model:

|  Property |             Details                      |
|-----------|------------------------------------------|
| Algorithm | Random Forest Classifier                 |
| Dataset   | UCI Early Stage Diabetes Risk Prediction |
| Samples   | 520                                      |
| Features  | 16 (Age, Gender + 14 symptoms)           |
| Target    | Positive / Negative                      |
| Accuracy  | ~92%                                     |
| Library   | scikit-learn                             |

---

## 🛠️ Tech Stack:

|      Layer       |           Technology                |
|------------------|-------------------------------------|
| Backend          | Python, Flask, Flask-CORS           |
| Machine Learning | scikit-learn, pandas, numpy, joblib |
| Frontend         | HTML5, CSS3, JavaScript             |
| Fonts            | Google Fonts (Nunito, Poppins)      |

---

## 👩‍💻 Developed By:

*K. Sailaja*
3rd Year B.Tech Mini Project 
Department of Computer Science & Engineering
Rishi MS Institute of Engineering and Technology for Women (2022 - 2026)
