import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib, os

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
DATA_PATH    = os.path.join(BASE_DIR, 'diabetes_data.csv')
MODEL_PATH   = os.path.join(BASE_DIR, 'diabetes_model.pkl')
ENCODER_PATH = os.path.join(BASE_DIR, 'label_encoders.pkl')

df = pd.read_csv(DATA_PATH)

label_encoders = {}
for col in df.columns:
    # encode every non-numeric column
    if df[col].dtype == object or str(df[col].dtype) == 'str':
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

X = df.drop('class', axis=1)
y = df['class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

acc = accuracy_score(y_test, model.predict(X_test))
print(f"✅ Model Accuracy: {acc*100:.2f}%")
print("📋 Columns used:", list(X.columns))

joblib.dump(model,          MODEL_PATH)
joblib.dump(label_encoders, ENCODER_PATH)
print("💾 Model and encoders saved!")
