from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

app = Flask(__name__)
CORS(app)

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
DATA_PATH    = os.path.join(BASE_DIR, 'diabetes_data.csv')
MODEL_PATH   = os.path.join(BASE_DIR, 'diabetes_model.pkl')
ENCODER_PATH = os.path.join(BASE_DIR, 'label_encoders.pkl')

# Train & save model on first run if not saved
if not os.path.exists(MODEL_PATH):
    df = pd.read_csv(DATA_PATH)
    label_encoders = {}
    for col in df.columns:
        if df[col].dtype == object or str(df[col].dtype) == 'str':
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            label_encoders[col] = le
    X = df.drop('class', axis=1)
    y = df['class']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    joblib.dump(model,          MODEL_PATH)
    joblib.dump(label_encoders, ENCODER_PATH)
    print("Model trained and saved.")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        model          = joblib.load(MODEL_PATH)
        label_encoders = joblib.load(ENCODER_PATH)

        raw_data = request.get_json()

        column_mapping = {
            'age':                'Age',
            'gender':             'Gender',
            'polyuria':           'Polyuria',
            'polydipsia':         'Polydipsia',
            'sudden_weight_loss': 'sudden weight loss',
            'weakness':           'weakness',
            'polyphagia':         'Polyphagia',
            'genital_thrush':     'Genital thrush',
            'visual_blurring':    'visual blurring',
            'itching':            'Itching',
            'irritability':       'Irritability',
            'delayed_healing':    'delayed healing',
            'partial_paresis':    'partial paresis',
            'muscle_stiffness':   'muscle stiffness',
            'alopecia':           'Alopecia',
            'obesity':            'Obesity',
        }

        normalized = {k.strip().lower().replace(' ', '_'): v for k, v in raw_data.items()}
        mapped     = {column_mapping[k]: v for k, v in normalized.items() if k in column_mapping}

        input_df = pd.DataFrame([mapped])

        for col in input_df.columns:
            if col in label_encoders:
                input_df[col] = label_encoders[col].transform(input_df[col])

        prediction = model.predict(input_df)[0]
        result     = label_encoders['class'].inverse_transform([prediction])[0]

        print(f"Prediction: {result}")
        return jsonify({'prediction': result})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
