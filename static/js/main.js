/* ════════════════════════════════════════
   DiaPredict  –  main.js
   ════════════════════════════════════════ */

// ── PAGE NAVIGATION ──────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const navMap = { home: 'nav-home', bmi: 'nav-bmi', faq: 'nav-faq' };
  if (navMap[name]) document.getElementById(navMap[name]).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── PREDICTION ───────────────────────────
const FIELDS = [
  'age','gender','polyuria','polydipsia','sudden_weight_loss','weakness',
  'polyphagia','genital_thrush','visual_blurring','itching','irritability',
  'delayed_healing','partial_paresis','muscle_stiffness','alopecia','obesity'
];

const HIGH_TIPS = [
  "🩸 Monitor your blood glucose levels regularly and keep a log to share with your doctor.",
  "🥗 Follow a low-glycemic diet: reduce white rice, sugar, and processed foods. Opt for vegetables, whole grains, and lean proteins.",
  "🚶 Aim for at least 30 minutes of moderate physical activity (walking, cycling) 5 days a week.",
  "💧 Stay well-hydrated. Drink 8–10 glasses of water daily to help regulate blood sugar.",
  "⚖️ Work towards achieving and maintaining a healthy body weight to reduce insulin resistance.",
  "🚭 Avoid smoking and limit alcohol consumption as they increase diabetes complications.",
  "😴 Ensure 7–8 hours of quality sleep each night. Poor sleep disrupts insulin sensitivity.",
  "🏥 Consult a doctor immediately for proper testing (HbA1c, fasting glucose) and diagnosis."
];

const LOW_TIPS = [
  "✅ Great news! Keep up your healthy habits — they're your best defence against diabetes.",
  "🥦 Continue eating a balanced diet rich in fibre, vegetables, and whole grains.",
  "🏃 Maintain your active lifestyle. Regular exercise keeps blood sugar levels stable.",
  "🧘 Manage stress effectively through yoga, meditation, or hobbies you enjoy.",
  "🔬 Schedule routine health check-ups every year to monitor your blood sugar levels.",
  "💤 Keep your sleep schedule consistent — good sleep is key to metabolic health.",
  "🤝 Encourage friends and family to also check their diabetes risk!"
];

async function runPrediction() {
  const data = {};
  for (const f of FIELDS) {
    const el = document.getElementById(f);
    if (!el || !el.value) {
      alert('Please fill in all fields before predicting.');
      return;
    }
    data[f] = el.value;
  }

  const btn = document.querySelector('.btn-predict');
  btn.textContent = 'Predicting…';
  btn.disabled = true;

  try {
    const res  = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    if (json.error) throw new Error(json.error);
    showResult(json.prediction);
  } catch (err) {
    console.error(err);
    alert('Prediction failed: ' + err.message);
  } finally {
    btn.textContent = 'Predict';
    btn.disabled = false;
  }
}

function showResult(prediction) {
  const box       = document.getElementById('resultBox');
  const titleEl   = document.getElementById('resultTitle');
  const videoEl   = document.getElementById('resultVideo');
  const tipsEl    = document.getElementById('tipsSection');
  const refNote   = document.getElementById('referralNote');

  box.className = 'result-box';
  box.style.display = 'block';

  if (prediction === 'Positive') {
    box.classList.add('high-risk');
    titleEl.innerHTML = '⚠️ You may have or be at higher risk of Diabetes.';
    videoEl.src = '/static/videos/bad_result.mp4';
    tipsEl.innerHTML =
      '<h4>💊 Health Guidelines for High-Risk Individuals:</h4><ul>' +
      HIGH_TIPS.map(t => `<li>${t}</li>`).join('') + '</ul>';
    refNote.style.display = 'block';
  } else {
    box.classList.add('low-risk');
    titleEl.innerHTML = '✅ Great! You appear to be at Low Risk of Diabetes.';
    videoEl.src = '/static/videos/nice_result.mp4';
    tipsEl.innerHTML =
      '<h4>🌟 Keep It Up! Wellness Tips for You:</h4><ul>' +
      LOW_TIPS.map(t => `<li>${t}</li>`).join('') + '</ul>';
    refNote.style.display = 'none';
  }

  videoEl.load();
  videoEl.play();
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── BMI CALCULATOR ───────────────────────
function calcBMI() {
  const h = parseFloat(document.getElementById('bmiHeight').value);
  const w = parseFloat(document.getElementById('bmiWeight').value);
  if (!h || !w || h < 50 || w < 10) {
    alert('Please enter valid height and weight.');
    return;
  }

  const bmi = w / Math.pow(h / 100, 2);
  const val = bmi.toFixed(1);

  document.getElementById('bmiResult').style.display = 'block';
  document.getElementById('bmiValue').textContent = val;

  let cat, color, tip, pct;
  if (bmi < 18.5) {
    cat = 'Underweight'; color = '#64b5f6'; pct = 10;
    tip = 'Your BMI is below the healthy range. Consider increasing caloric intake with nutrient-dense foods and consult a nutritionist.';
  } else if (bmi < 25) {
    cat = 'Normal Weight'; color = '#66bb6a'; pct = 35;
    tip = 'Excellent! Your BMI is in the healthy range. Maintain your balanced diet and regular physical activity.';
  } else if (bmi < 30) {
    cat = 'Overweight'; color = '#ffa726'; pct = 62;
    tip = 'Your BMI is slightly elevated. Consider increasing physical activity and moderating high-calorie food intake to reduce diabetes risk.';
  } else {
    cat = 'Obese'; color = '#ef5350'; pct = 88;
    tip = 'Your BMI indicates obesity, which significantly increases diabetes risk. Please consult a healthcare provider for a personalised weight management plan.';
  }

  const catEl    = document.getElementById('bmiCategory');
  const valEl    = document.getElementById('bmiValue');
  catEl.textContent    = cat;
  catEl.style.color    = color;
  valEl.style.color    = color;
  document.getElementById('bmiTip').textContent    = tip;
  document.getElementById('bmiMarker').style.left  = pct + '%';
}

// ── FAQ ──────────────────────────────────
const FAQS = [
  { q: "What is diabetes?",
    a: "Diabetes is a chronic metabolic disease where the body either doesn't produce enough insulin or can't effectively use the insulin it produces, resulting in elevated blood glucose levels. There are three main types: Type 1, Type 2, and Gestational diabetes." },
  { q: "What are the early symptoms of diabetes?",
    a: "Early symptoms include frequent urination (polyuria), excessive thirst (polydipsia), unexplained weight loss, extreme hunger (polyphagia), fatigue and weakness, blurred vision, slow-healing wounds, and frequent infections." },
  { q: "How accurate is DiaPredict's prediction?",
    a: "DiaPredict uses a Random Forest classifier trained on the UCI Early Stage Diabetes Risk Prediction Dataset. It provides a risk assessment based on symptom patterns. It is NOT a medical diagnosis — always consult a qualified doctor for confirmation." },
  { q: "What is the difference between Type 1 and Type 2 diabetes?",
    a: "Type 1 diabetes is an autoimmune condition where the immune system destroys insulin-producing cells — it usually appears in childhood. Type 2 diabetes is more common, develops gradually, and is often linked to lifestyle factors like obesity, poor diet, and physical inactivity." },
  { q: "Can diabetes be prevented?",
    a: "Type 2 diabetes can often be prevented or delayed through lifestyle changes: maintaining a healthy weight, regular exercise (150 min/week), eating a balanced low-sugar diet, avoiding smoking, and monitoring blood sugar regularly." },
  { q: "What is a normal blood sugar level?",
    a: "Fasting blood sugar: 70–99 mg/dL (Normal), 100–125 mg/dL (Pre-diabetes), 126+ mg/dL (Diabetes). HbA1c below 5.7% is normal; 5.7–6.4% is pre-diabetes; 6.5% or above indicates diabetes." },
  { q: "What does BMI have to do with diabetes?",
    a: "BMI is a key risk factor. A BMI above 25 increases insulin resistance, and BMI above 30 significantly raises the risk of Type 2 diabetes. Use our BMI Calculator to check yours." },
  { q: "Should I see a doctor if my prediction shows High Risk?",
    a: "Yes, absolutely. DiaPredict's prediction is a screening tool, not a definitive diagnosis. If your result shows High Risk, please visit an endocrinologist or general practitioner for HbA1c testing, fasting blood glucose tests, and professional evaluation." },
  { q: "Is my data stored anywhere?",
    a: "No. DiaPredict processes your inputs on the server only for prediction and does not store any personal data in a database. Your privacy is protected." },
  { q: "How can I find nearby diabetes specialists?",
    a: "Use our Referral System to select your nearest area in Hyderabad and see a curated list of diabetes-specialised hospitals and clinics near you." }
];

function buildFAQ() {
  const container = document.getElementById('faqList');
  FAQS.forEach((item, i) => {
    container.innerHTML += `
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFAQ(${i})">${item.q}<span>+</span></div>
        <div class="faq-a" id="faq-a-${i}">${item.a}</div>
      </div>`;
  });
}

function toggleFAQ(i) {
  document.querySelectorAll('.faq-q')[i].classList.toggle('open');
  document.getElementById('faq-a-' + i).classList.toggle('open');
}

// ── REFERRAL ─────────────────────────────
const HOSPITALS = {
  "Jubilee Hills": [
    { name: "Apollo Sugar Clinic – Best Diabetes Clinic", addr: "Jubilee Hills, Hyderabad", tag: "Diabetes Specialist" },
    { name: "Apollo Hospitals Jubilee Hills",             addr: "Film Nagar, Jubilee Hills, Hyderabad, Telangana 500033", tag: "Multi-Specialty" }
  ],
  "Banjara Hills": [
    { name: "CARE Hospitals Banjara Hills",  addr: "Road No. 1, Prem Nagar, Banjara Hills, Hyderabad, Telangana 500034", tag: "Multi-Specialty" },
    { name: "Star Hospitals – Block A & C",  addr: "8-2-596/5, Road No. 10, Gaffar Khan Colony, Banjara Hills, Hyderabad, Telangana 500034", tag: "Multi-Specialty" }
  ],
  "Gachibowli": [
    { name: "Boston Diabetes Care",       addr: "1st Floor, above Ratnadeep Supermarket, Lumbini Avenue, Gachibowli, Hyderabad, Telangana 500032", tag: "Diabetes Care" },
    { name: "Park Endocrinology Clinic",  addr: "Lumbini Avenue, Gachibowli, Hyderabad, Telangana 500032", tag: "Endocrinology" }
  ],
  "Madhapur": [
    { name: "Sugar.fit – Diabetes Centres for Excellence", addr: "Plot No. 118/24, Rohini Layout Rd, Silicon Valley, Madhapur, Hyderabad, Telangana 500081", tag: "Diabetes Specialist" },
    { name: "Medicover Hospitals Madhapur",                addr: "Madhapur, Hyderabad, Telangana 500081", tag: "Multi-Specialty" }
  ],
  "HITEC City": [
    { name: "Medicover Hospitals – Hitech City", addr: "Behind Cyber Towers, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500082", tag: "Multi-Specialty" },
    { name: "KIMS Hospitals Kondapur",           addr: "Kondapur, Hyderabad, Telangana 500084", tag: "Multi-Specialty" }
  ],
  "Kukatpally": [
    { name: "Advanced Endocrine & Diabetes Hospital", addr: "MIG-73/0, Rd Number 1, KPHB Phase 1, Kukatpally, Hyderabad, Telangana 500072", tag: "Endocrinology" },
    { name: "Immense Diabetes & Thyroid Hospital",    addr: "Plot No-11, KPHB 5th Phase Rd, Kukatpally, Hyderabad, Telangana 500085", tag: "Diabetes Specialist" }
  ],
  "Secunderabad": [
    { name: "Apollo Sugar Clinic – Secunderabad", addr: "Apollo Hospitals Secunderabad, St. John's Road, Secunderabad, Telangana 500003", tag: "Diabetes Specialist" },
    { name: "KIMS Hospitals Secunderabad",        addr: "1-8-31/1, Minister Road, Secunderabad, Telangana 500003", tag: "Multi-Specialty" }
  ],
  "Begumpet": [
    { name: "Oxycare Multi Speciality Hospitals",  addr: "Durga Towers, Rasoolpura, Begumpet, Hyderabad, Telangana 500003", tag: "Multi-Specialty" },
    { name: "KIMS Sunshine Hospitals Begumpet",    addr: "Begumpet, Hyderabad, Telangana 500016", tag: "Multi-Specialty" }
  ],
  "Ameerpet": [
    { name: "Medi Star Hospitals",   addr: "HMDA Maitrivanam, Ameerpet, Hyderabad, Telangana 500038", tag: "Multi-Specialty" },
    { name: "Aster Prime Hospital",  addr: "Plot No. 4, Mythrivanam, Ameerpet, Hyderabad, Telangana 500016", tag: "Multi-Specialty" }
  ],
  "Dilsukhnagar": [
    { name: "Rao's Diabetic Care Centre",  addr: "Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060", tag: "Diabetes Specialist" },
    { name: "Sai Sanjeevini Hospitals",    addr: "Dilsukhnagar Main Road, Hyderabad, Telangana 500060", tag: "Multi-Specialty" }
  ]
};

function buildReferral() {
  const grid = document.getElementById('areaGrid');
  Object.keys(HOSPITALS).forEach(area => {
    const btn = document.createElement('div');
    btn.className = 'area-btn';
    btn.textContent = area;
    btn.onclick = () => selectArea(area, btn);
    grid.appendChild(btn);
  });
}

function selectArea(area, btn) {
  document.querySelectorAll('.area-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  document.getElementById('selectedAreaTitle').textContent = 'Hospitals near ' + area;
  document.getElementById('hospitalsGrid').innerHTML =
    HOSPITALS[area].map(h => `
      <div class="hospital-card">
        <h4>🏥 ${h.name}</h4>
        <p>📍 ${h.addr}</p>
        <span class="hosp-tag">${h.tag}</span>
      </div>`).join('');

  const display = document.getElementById('hospitalsDisplay');
  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── SCROLL TO TOP ────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
});

// ── INIT ─────────────────────────────────
buildFAQ();
buildReferral();
