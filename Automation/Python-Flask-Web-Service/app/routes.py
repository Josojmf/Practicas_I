import os
import json
import requests
from flask import Blueprint, render_template, request, redirect, url_for, flash, send_from_directory
from werkzeug.utils import secure_filename
from app import socketio
from flask_socketio import emit
from .utils import allowed_file, process_file  # Ensure these functions are defined in utils.py

main = Blueprint('main', __name__)
UPLOAD_FOLDER = 'uploads'
MESSAGES_FILE = 'messages.json'  # Ensure this file is created in the main directory

# Load last five messages
def load_last_five_messages():
    if os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, 'r') as file:
            messages = json.load(file)
            return messages[-5:]
    return []

# Save a new message
def save_message(message):
    messages = load_last_five_messages()
    messages.append({"message": message})
    with open(MESSAGES_FILE, 'w') as file:
        json.dump(messages, file)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(url_for('main.index'))
    
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('main.index'))
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        flash('File uploaded successfully')
        return redirect(url_for('main.list_files'))
    else:
        flash('File type not allowed')
        return redirect(url_for('main.index'))

@main.route('/files')
def list_files():
    files = os.listdir(UPLOAD_FOLDER)
    return render_template('list_files.html', files=files)

@main.route('/files/<filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@main.route('/view/<filename>')
def view_file(filename):
    content = process_file(os.path.join(UPLOAD_FOLDER, filename))
    return render_template('view_file.html', content=content, filename=filename)

@main.route('/weather')
def weather():
    return render_template('weather.html')

@main.route('/weather/result', methods=['POST'])
def weather_result():
    city = request.form.get('city')
    if not city:
        flash("Please enter a city name.")
        return redirect(url_for('main.weather'))

    opencage_api_key = "YOUR_OPENCAGE_API_KEY"  # Replace with your actual key
    geocode_url = "https://api.opencagedata.com/geocode/v1/json"

    
    try:
        geocode_response = requests.get(geocode_url, params={'q': city, 'key': "a860e9fa8d38407d980de974ea2d8315"})
        geocode_data = geocode_response.json()
        print(geocode_data)
        
        if geocode_response.status_code != 200 or not geocode_data['results']:
            flash(f"City '{city}' not found.")
            return redirect(url_for('main.weather'))
        
        coordinates = geocode_data['results'][0]['geometry']
        latitude = coordinates['lat']
        longitude = coordinates['lng']
        
    except requests.exceptions.RequestException:
        flash("Error retrieving location data.")
        return redirect(url_for('main.weather'))

    # Query Open-Meteo API for weather
    weather_url = "https://api.open-meteo.com/v1/forecast"
    try:
        weather_response = requests.get(weather_url, params={
            'latitude': latitude,
            'longitude': longitude,
            'current_weather': True
        })
        weather_data = weather_response.json()

        if weather_response.status_code == 200 and 'current_weather' in weather_data:
            weather_info = {
                'city': city.capitalize(),
                'temperature': weather_data['current_weather']['temperature'],
                'description': "Clear" if weather_data['current_weather']['weathercode'] == 0 else "Cloudy",
                'wind_speed': weather_data['current_weather']['windspeed'],
                'humidity': weather_data['current_weather'].get('humidity', 'N/A') 
            }
            return render_template('weather_result.html', weather=weather_info)
        else:
            flash("Could not retrieve weather data.")
            return redirect(url_for('main.weather'))

    except requests.exceptions.RequestException:
        flash("Error retrieving weather data.")
        return redirect(url_for('main.weather'))

@main.route('/chat')
def chat():
    last_messages = load_last_five_messages()
    return render_template('chat.html', last_messages=last_messages)

@socketio.on('send_message')
def handle_send_message(data):
    message = data.get('message')
    if message:
        save_message(message)
        emit('receive_message', {"message": message}, broadcast=True)
