document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const diabetesForm = document.getElementById('diabetes-form');
    const heartDiseaseForm = document.getElementById('heart-disease-form');
    const parkinsonsForm = document.getElementById('parkinsons-form');
    const lungForm = document.getElementById('lung-form');
    const liverForm = document.getElementById('liver-form');
    const kidneyForm = document.getElementById('kidney-form');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all forms first
            diabetesForm.style.display = 'none';
            heartDiseaseForm.style.display = 'none';
            parkinsonsForm.style.display = 'none';
            lungForm.style.display = 'none';
            liverForm.style.display = 'none';
            kidneyForm.style.display = 'none';
            
            // Show appropriate form
            const modelType = this.dataset.model;
            switch(modelType) {
                case 'diabetes':
                    diabetesForm.style.display = 'block';
                    break;
                case 'heart':
                    heartDiseaseForm.style.display = 'block';
                    break;
                case 'parkinsons':
                    parkinsonsForm.style.display = 'block';
                    break;
                case 'lung':
                    lungForm.style.display = 'block';
                    break;
                case 'liver':
                    liverForm.style.display = 'block';
                    break;
                case 'kidney':
                    kidneyForm.style.display = 'block';
                    break;
            }
        });
    });

    // Handle heart disease form submission
    const checkHeartButton = document.getElementById('check-result');
    const heartResultContainer = document.getElementById('result');

    checkHeartButton.addEventListener('click', function() {
        const formData = {
            age: parseFloat(document.getElementById('age').value),
            trestbps: parseFloat(document.getElementById('trestbps').value),
            chol: parseFloat(document.getElementById('chol').value),
            thalach: parseFloat(document.getElementById('thalach').value),
            oldpeak: parseFloat(document.getElementById('oldpeak').value)
        };

        // Simple condition check for heart disease
        // High risk conditions: 
        // - age > 50
        // - resting blood pressure > 140
        // - cholesterol > 240
        // - maximum heart rate < 150
        // - ST depression > 2
        let isHighRisk = (
            formData.age > 50 &&
            formData.trestbps > 140 &&
            formData.chol > 240 &&
            formData.thalach < 150 &&
            formData.oldpeak > 2
        );

        heartResultContainer.innerHTML = `
            <h3 style="color: #ff4c4c;">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${isHighRisk ? '#ff4c4c' : '#28a745'}">
                ${isHighRisk ? 
                    'Warning: High risk of heart disease detected. Please consult a healthcare professional.' :
                    'Low risk of heart disease detected. However, maintain a healthy lifestyle.'}
            </p>
        `;
    });

    // Handle diabetes form submission
    const checkDiabetesButton = document.getElementById('check-diabetes');
    const diabetesResultContainer = document.getElementById('diabetes-result');

    checkDiabetesButton.addEventListener('click', function() {
        const formData = {
            glucose: parseFloat(document.getElementById('glucose').value),
            bloodpressure: parseFloat(document.getElementById('bloodpressure').value),
            insulin: parseFloat(document.getElementById('insulin').value),
            bmi: parseFloat(document.getElementById('bmi').value)
        };

        // Simple condition check for diabetes
        // High risk conditions:
        // - glucose > 140
        // - blood pressure > 90
        // - insulin > 140
        // - BMI > 30
        let isHighRisk = (
            formData.glucose > 140 &&
            formData.bloodpressure > 90 &&
            formData.insulin > 140 &&
            formData.bmi > 30
        );

        diabetesResultContainer.innerHTML = `
            <h3 style="color: #ff4c4c;">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${isHighRisk ? '#ff4c4c' : '#28a745'}">
                ${isHighRisk ? 
                    'Warning: High risk of diabetes detected. Please consult a healthcare professional.' :
                    'Low risk of diabetes detected. However, maintain a healthy lifestyle.'}
            </p>
        `;
    });

    // Handle Parkinsons form submission
    const checkParkinsonsButton = document.getElementById('check-parkinsons');
    const parkinsonsResultContainer = document.getElementById('parkinsons-result');

    checkParkinsonsButton.addEventListener('click', function() {
        const formData = {
            mdvp_jitter: parseFloat(document.getElementById('mdvp-jitter').value),
            mdvp_shimmer: parseFloat(document.getElementById('mdvp-shimmer').value),
            nhr: parseFloat(document.getElementById('nhr').value),
            hnr: parseFloat(document.getElementById('hnr').value)
        };

        // Simple condition check for Parkinson's
        // High risk conditions:
        // - MDVP:Jitter(%) > 1.0
        // - MDVP:Shimmer > 0.1
        // - NHR > 0.3
        // - HNR < 20
        let isHighRisk = (
            formData.mdvp_jitter > 1.0 &&
            formData.mdvp_shimmer > 0.1 &&
            formData.nhr > 0.3 &&
            formData.hnr < 20
        );

        parkinsonsResultContainer.innerHTML = `
            <h3 style="color: #ff4c4c;">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${isHighRisk ? '#ff4c4c' : '#28a745'}">
                ${isHighRisk ? 
                    'Warning: High risk of Parkinson\'s disease detected. Please consult a healthcare professional.' :
                    'Low risk of Parkinson\'s disease detected. However, consult a doctor for any concerns.'}
            </p>
        `;
    });

    // Handle Lung Cancer form submission
    const checkLungButton = document.getElementById('check-lung');
    const lungResultContainer = document.getElementById('lung-result');

    checkLungButton.addEventListener('click', function() {
        const formData = {
            age: parseFloat(document.getElementById('age-lung').value),
            smokingHistory: parseFloat(document.getElementById('smoking-history').value),
            coughSeverity: parseInt(document.getElementById('cough-severity').value),
            shortnessBreath: parseInt(document.getElementById('shortness-breath').value),
            chestPain: parseInt(document.getElementById('chest-pain').value),
            familyHistory: parseInt(document.getElementById('family-history').value)
        };

        // Risk assessment based on multiple factors
        let riskScore = 0;
        
        // Age factor (higher risk for age > 50)
        if (formData.age > 50) riskScore += 2;
        if (formData.age > 65) riskScore += 1;

        // Smoking history factor
        if (formData.smokingHistory > 10) riskScore += 2;
        if (formData.smokingHistory > 20) riskScore += 2;

        // Symptom severity factors
        if (formData.coughSeverity >= 2) riskScore += 2;
        if (formData.shortnessBreath >= 2) riskScore += 2;
        if (formData.chestPain >= 2) riskScore += 2;

        // Family history factor
        if (formData.familyHistory === 1) riskScore += 3;

        // Determine risk level
        let isHighRisk = riskScore >= 8;
        let riskLevel = riskScore >= 12 ? "Very High" : 
                        riskScore >= 8 ? "High" : 
                        riskScore >= 5 ? "Moderate" : "Low";

        let riskColor = riskScore >= 12 ? '#ff0000' : 
                        riskScore >= 8 ? '#ff4c4c' : 
                        riskScore >= 5 ? '#ffa500' : '#28a745';

        lungResultContainer.innerHTML = `
            <h3 style="color: ${riskColor};">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${riskColor}">
                Risk Level: ${riskLevel}
                <br><br>
                ${isHighRisk ? 
                    'Warning: High risk of lung cancer detected. Please consult a healthcare professional immediately.' :
                    'Lower risk detected, but maintain regular check-ups and a healthy lifestyle.'}
            </p>
        `;
    });

    // Handle Liver Disease form submission
    const checkLiverButton = document.getElementById('check-liver');
    const liverResultContainer = document.getElementById('liver-result');

    checkLiverButton.addEventListener('click', function() {
        const formData = {
            age: parseFloat(document.getElementById('age-liver').value),
            alcohol: parseFloat(document.getElementById('alcohol').value),
            bilirubin: parseFloat(document.getElementById('bilirubin').value),
            albumin: parseFloat(document.getElementById('albumin').value),
            alp: parseFloat(document.getElementById('alp').value),
            ast: parseFloat(document.getElementById('ast').value)
        };

        // Risk assessment based on multiple factors
        let riskScore = 0;
        
        // Age factor
        if (formData.age > 40) riskScore += 1;
        if (formData.age > 60) riskScore += 1;

        // Alcohol consumption factor (drinks per week)
        if (formData.alcohol > 7) riskScore += 2;
        if (formData.alcohol > 14) riskScore += 2;

        // Bilirubin factor (normal range: 0.3-1.2 mg/dL)
        if (formData.bilirubin > 1.2) riskScore += 2;
        if (formData.bilirubin > 2.0) riskScore += 2;

        // Albumin factor (normal range: 3.5-5.0 g/dL)
        if (formData.albumin < 3.5) riskScore += 2;
        if (formData.albumin < 2.8) riskScore += 2;

        // ALP factor (normal range: 20-140 U/L)
        if (formData.alp > 140) riskScore += 2;
        if (formData.alp > 280) riskScore += 2;

        // AST factor (normal range: 5-40 U/L)
        if (formData.ast > 40) riskScore += 2;
        if (formData.ast > 80) riskScore += 2;

        // Determine risk level
        let riskLevel = riskScore >= 12 ? "Very High" : 
                        riskScore >= 8 ? "High" : 
                        riskScore >= 5 ? "Moderate" : "Low";

        let riskColor = riskScore >= 12 ? '#ff0000' : 
                        riskScore >= 8 ? '#ff4c4c' : 
                        riskScore >= 5 ? '#ffa500' : '#28a745';

        let isHighRisk = riskScore >= 8;

        liverResultContainer.innerHTML = `
            <h3 style="color: ${riskColor};">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${riskColor}">
                Risk Level: ${riskLevel}
                <br><br>
                ${isHighRisk ? 
                    'Warning: High risk of liver disease detected. Please consult a healthcare professional immediately.' :
                    'Lower risk of liver disease detected. However, maintain a healthy lifestyle and avoid excessive alcohol consumption.'}
            </p>
        `;
    });

    // Handle Kidney Disease form submission
    const checkKidneyButton = document.getElementById('check-kidney');
    const kidneyResultContainer = document.getElementById('kidney-result');

    checkKidneyButton.addEventListener('click', function() {
        const formData = {
            age: parseFloat(document.getElementById('age-kidney').value),
            bun: parseFloat(document.getElementById('bun').value),
            creatinine: parseFloat(document.getElementById('creatinine').value),
            hemoglobin: parseFloat(document.getElementById('hemoglobin').value),
            bloodPressure: parseFloat(document.getElementById('blood-pressure').value),
            proteinuria: parseInt(document.getElementById('proteinuria').value)
        };

        // Risk assessment based on multiple factors
        let riskScore = 0;
        
        // Age factor
        if (formData.age > 50) riskScore += 1;
        if (formData.age > 70) riskScore += 1;

        // BUN factor (normal range: 7-20 mg/dL)
        if (formData.bun > 20) riskScore += 2;
        if (formData.bun > 40) riskScore += 2;

        // Creatinine factor (normal range: 0.7-1.3 mg/dL)
        if (formData.creatinine > 1.3) riskScore += 2;
        if (formData.creatinine > 2.0) riskScore += 2;

        // Hemoglobin factor (normal range: 13.5-17.5 g/dL)
        if (formData.hemoglobin < 13.5) riskScore += 1;
        if (formData.hemoglobin < 11) riskScore += 2;

        // Blood Pressure factor
        if (formData.bloodPressure > 130) riskScore += 1;
        if (formData.bloodPressure > 140) riskScore += 2;

        // Proteinuria factor
        if (formData.proteinuria >= 2) riskScore += 2;
        if (formData.proteinuria >= 4) riskScore += 3;

        // Determine risk level
        let riskLevel = riskScore >= 12 ? "Very High" : 
                        riskScore >= 8 ? "High" : 
                        riskScore >= 5 ? "Moderate" : "Low";

        let riskColor = riskScore >= 12 ? '#ff0000' : 
                        riskScore >= 8 ? '#ff4c4c' : 
                        riskScore >= 5 ? '#ffa500' : '#28a745';

        let isHighRisk = riskScore >= 8;

        kidneyResultContainer.innerHTML = `
            <h3 style="color: ${riskColor};">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${riskColor}">
                Risk Level: ${riskLevel}
                <br><br>
                ${isHighRisk ? 
                    'Warning: High risk of kidney disease detected. Please consult a healthcare professional immediately.' :
                    'Lower risk of kidney disease detected. However, maintain a healthy lifestyle and regular check-ups.'}
                <br><br>
                <span style="font-size: 14px; color: #666;">
                    Key Factors:<br>
                    ${formData.bloodPressure > 140 ? '- High blood pressure<br>' : ''}
                    ${formData.creatinine > 1.3 ? '- Elevated creatinine<br>' : ''}
                    ${formData.bun > 20 ? '- Elevated BUN<br>' : ''}
                    ${formData.hemoglobin < 13.5 ? '- Low hemoglobin<br>' : ''}
                    ${formData.proteinuria >= 2 ? '- Significant proteinuria<br>' : ''}
                </span>
            </p>
        `;
    });

    // Handle Thyroid Disease form submission
    const checkThyroidButton = document.getElementById('check-thyroid');
    const thyroidResultContainer = document.getElementById('thyroid-result');

    checkThyroidButton.addEventListener('click', function() {
        const formData = {
            tsh: parseFloat(document.getElementById('tsh').value),
            t3: parseFloat(document.getElementById('t3').value),
            t4: parseFloat(document.getElementById('t4').value),
            thyroidSize: parseInt(document.getElementById('thyroid-size').value),
            tumor: parseInt(document.getElementById('tumor').value)
        };

        let isHighRisk = (
            (formData.tsh < 0.4 || formData.tsh > 4.0) &&
            (formData.t3 < 80 || formData.t3 > 200) &&
            (formData.t4 < 5.0 || formData.t4 > 12.0) &&
            formData.thyroidSize === 1 &&
            formData.tumor === 1
        );

        thyroidResultContainer.innerHTML = `
            <h3 style="color: #ff4c4c;">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${isHighRisk ? '#ff4c4c' : '#28a745'}">
                ${isHighRisk ? 
                    'Warning: High risk of thyroid disease detected. Please consult a healthcare professional.' :
                    'Low risk of thyroid disease detected. However, maintain a healthy lifestyle.'}
            </p>
        `;
    });

    // Handle Alzheimer's Disease form submission
    const checkAlzheimerButton = document.getElementById('check-alzheimer');
    const alzheimerResultContainer = document.getElementById('alzheimer-result');

    checkAlzheimerButton.addEventListener('click', function() {
        const formData = {
            age: parseFloat(document.getElementById('age-alz').value),
            mmse: parseFloat(document.getElementById('mmse').value),
            cdr: parseFloat(document.getElementById('cdr').value),
            etiv: parseFloat(document.getElementById('etiv').value),
            nwbv: parseFloat(document.getElementById('nwbv').value),
            asf: parseFloat(document.getElementById('asf').value)
        };

        let isHighRisk = (
            formData.age > 65 &&
            formData.mmse < 24 &&
            formData.cdr > 0.5 &&
            formData.etiv < 1400 &&
            formData.nwbv < 0.7 &&
            formData.asf > 1.2
        );

        alzheimerResultContainer.innerHTML = `
            <h3 style="color: #ff4c4c;">Prediction Result</h3>
            <p style="font-size: 18px; margin-top: 10px; color: ${isHighRisk ? '#ff4c4c' : '#28a745'}">
                ${isHighRisk ? 
                    'Warning: High risk of Alzheimer\'s disease detected. Please consult a healthcare professional.' :
                    'Low risk of Alzheimer\'s disease detected. However, maintain regular check-ups.'}
            </p>
        `;
    });
});