from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
import logging

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load models and scalers
try:
    model_depression = joblib.load('mlModels/models/dep_model.pkl')
    model_schizo = joblib.load('mlModels/models/sizo_model.pkl')
    model_bipolar = joblib.load('mlModels/models/bipolar_model.pkl')
    scaler_schizo = joblib.load('mlModels/scaler/sizo_scaler.pkl')
    scaler_depression = joblib.load('mlModels/scaler/scaler_depression.pkl')
    scaler_bipolar = joblib.load('mlModels/scaler/Bipolar_scaler.pkl')
    logging.info('Models and scalers loaded successfully.')
except Exception as e:
    logging.error(f'Error loading models or scalers: {e}')

# Predict function
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not file.filename.endswith('.txt'):
        return jsonify({'error': 'Unsupported file type. Only .txt files are accepted.'}), 400

    try:
        content = file.read().decode('utf-8')
        lines = content.strip().split('\n')
        data = pd.DataFrame([line.split() for line in lines])
        data = data.apply(pd.to_numeric, errors='coerce')
        data_values = data.values

        model_name = request.form.get('model_name').lower()
        
        if model_name == 'depression':
            if data_values.size != 2000:  # Check total size instead of just shape
                return jsonify({'error': 'Input data must have exactly 2000 features for depression.'}), 400
            data_to_predict = data_values.reshape(1, -1)
            normalized_data = scaler_depression.transform(data_to_predict)  # Apply scaling if required
            prediction = model_depression.predict(normalized_data)
            prediction_label = 'Normal' if prediction[0] == 0 else 'Depression'

        elif model_name == 'schizophrenia':
            if data_values.shape[1] != 12:
                return jsonify({'error': 'Input data must have 12 columns for schizophrenia.'}), 400
            first_row_data = data_values[0, :].reshape(1, -1)
            normalized_data = scaler_schizo.transform(first_row_data)
            prediction = model_schizo.predict(normalized_data)
            prediction_label = 'Normal' if prediction[0] == 0 else 'Schizophrenia'

        elif model_name == 'bipolar':
            if data_values.shape[1] != 12:
                return jsonify({'error': 'Input data must have 12 columns for bipolar.'}), 400
            first_row_data = data_values[0, :].reshape(1, -1)
            normalized_data = scaler_bipolar.transform(first_row_data)
            prediction = model_bipolar.predict(normalized_data)
            prediction_label = 'Normal' if prediction[0] == 0 else 'Bipolar'
        else:
            return jsonify({'error': 'Invalid model name'}), 400

        # Get recommendations based on prediction
        recommendations = get_recommendations(prediction_label.lower())

        return jsonify({'prediction': prediction_label, 'recommendations': recommendations})

    except Exception as e:
        logging.error(f'Error processing the file or making a prediction: {e}')
        return jsonify({'error': str(e)}), 500

def get_recommendations(prediction):
    recommendations = {
        'normal': [ 
            "Continue with regular check-ups.",
            "Maintain a balanced lifestyle.",
        ],
        'bipolar': {
            "Do's": [
                'Maintain a Sleep Routine- Aim for 7-9 hours of sleep per night, as irregular sleep can trigger manic or depressive episodes. A consistent sleep schedule is crucial.',
                'Monitor Mood Changes- Keep track of your mood, energy levels, and any symptoms. This helps in recognizing early signs of mood episodes so you can seek help before things escalate.',
                'Build a Strong Support System- Surround yourself with supportive friends, family, or peer groups who understand your condition and can offer help when needed.'
            ],
            "Don'ts": [
                'Avoid Alcohol and Drugs- Alcohol and recreational drugs can interfere with medications, destabilize mood, and worsen symptoms.',
                'Avoid Overstimulating Activities- Stay away from highly stimulating environments (e.g., large crowds, excessive screen time) that can trigger manic episodes.',
                'Avoid Self-Criticism- Be kind to yourself and avoid excessive self-criticism, as negative self-talk can worsen depressive episodes and hinder recovery.'
            ]
        },
        'schizophrenia': {
            "Do's": [
                'Stay Engaged in Meaningful Activities- Engage in hobbies, work, or social activities that provide structure and purpose. Staying active helps to combat negative symptoms like apathy and withdrawal.',
                'Avoid Stress- Stress can exacerbate schizophrenia symptoms. Practice stress-reducing techniques like mindfulness, meditation, or relaxation exercises.',
                'Stick to a Healthy Diet- A balanced diet with proper nutrition can support brain function and general health, helping to improve focus and energy levels.'
            ],
            "Don'ts": [
                'Do Not Stop Medications Without Doctor Approval- Even if you feel better, never stop taking your medications without consulting your psychiatrist. Stopping medication abruptly can cause relapse and severe symptoms.',
                'Do Not Ignore Early Signs of Relapse- If you notice signs of worsening symptoms, such as increased paranoia, hallucinations, or confusion, seek medical help immediately to prevent a full-blown episode.',
                'Do Not Engage in High-Risk Behaviors- Avoid impulsive or risky behaviors, as they can lead to dangerous situations, particularly during episodes of psychosis.'
            ]
        },
        'depression': {
            "Do's": [
                'Exercise Regularly- Engage in regular physical activity, such as walking, jogging, or yoga. Exercise releases endorphins, which are natural mood enhancers, and helps reduce stress.',
                'Practice Mindfulness and Relaxation Techniques- Incorporate mindfulness, meditation, or deep breathing exercises into your daily routine to manage stress and promote emotional balance.',
                'Stay Positive and Practice Gratitude- Regularly focus on positive aspects of life, and practice gratitude by reflecting on what you are thankful for. This helps shift your mindset and promotes emotional resilience.'
            ],
            "Don'ts": [
                'Do Not Neglect Your Physical Health- Skipping exercise, ignoring nutrition, or avoiding regular medical check-ups can negatively impact your mood and increase vulnerability to depression.',
                'Do Not Stay In Toxic Environments- Remove yourself from negative or toxic environments, whether in relationships or work. Chronic exposure to negative settings can contribute to emotional exhaustion and increase the risk of depression.',
                'Don not Overexert Yourself- Avoid overworking or pushing yourself too hard, both mentally and physically. Overexertion can lead to burnout, which is a precursor to depression.'
            ]
        },
        'anxiety': {
            "Do's": [
                'Practice Relaxation Techniques- Engage in activities like deep breathing, mindfulness, progressive muscle relaxation, or meditation. These techniques can help calm the mind and body, reducing anxiety levels.',
                'Limit Caffeine and Sugar Intake- Caffeine and sugar can stimulate the nervous system and increase feelings of anxiety. Try to limit your consumption of these substances, especially during times of high stress.',
                'Avoid Excessive Screen Time- Too much exposure to social media or news, especially during stressful times, can worsen anxiety. Limit screen time and focus on activities that promote relaxation.'
            ],
            "Don'ts": [
                'Do Not Avoid Anxiety-Inducing Situations- Avoiding situations that cause anxiety can make the problem worse over time. Gradual exposure to these situations in a safe, controlled manner can help reduce the intensity of anxiety.',
                'Avoid Catastrophic Thinking- Try not to dwell on the worst-case scenario or imagine negative outcomes that may never happen. Challenge these thoughts and try to replace them with more realistic and positive ones.',
                'Don not Dwell on Past Mistakes- Constantly rethinking past mistakes or worrying about things you cannot control can fuel anxiety. Practice letting go of things you cannot change and focus on the present.'
            ]
        },
    }
    return recommendations.get(prediction, {"Do's": [], "Don'ts": []})

if __name__ == '__main__':
    app.run(debug=True)
