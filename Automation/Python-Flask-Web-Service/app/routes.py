from datetime import datetime
import os
import json
import requests
from flask import Blueprint, render_template, request, redirect, url_for, flash, send_from_directory, session
from werkzeug.utils import secure_filename
from app import socketio
from flask_socketio import emit
# Ensure these functions are defined in utils.py
from .utils import allowed_file, process_file
# MongoDB connection setup (adjust URI as needed)
# get db user and db password from .env
from pymongo import MongoClient
from dotenv import load_dotenv
from functools import wraps
from bson.objectid import ObjectId



load_dotenv()

db_uername = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
MongoClient = MongoClient(
    f"mongodb+srv://{db_uername}:{db_password}@final.yzzh9ig.mongodb.net/?retryWrites=true&w=majority&appName=Final")
db = MongoClient["Practicas_I_Automation_Project"]
users_collection = db["Users"]
logs_collection = db["Logs"]
settings_collection=db["Settings"]
messages_collection = db["Messages"]



main = Blueprint('main', __name__)
MESSAGES_FILE = 'messages.json'  # Ensure this file is created in the main directory

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../uploads')
ALLOWED_EXTENSIONS = {'pdf'}
FILES_DIRECTORY = UPLOAD_FOLDER

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            flash("You need to be logged in to access this page.", "error")
            return redirect(url_for('main.login'))
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check if the user is logged in and has admin privileges
        if not session.get('logged_in') or not session.get('is_admin'):
            flash("You do not have permission to access this page.", "error")
            return redirect(url_for('main.index'))
        return f(*args, **kwargs)
    return decorated_function

@socketio.on('send_message')
def handle_send_message(data):
    message = data.get('message')
    if message:
        print(f"Received message: {message}")
        save_message(message)
        emit('receive_message', {"message": message}, broadcast=True)


def load_last_five_messages():
    # Query the last five messages, sorted by timestamp in descending order
    messages = messages_collection.find().sort("timestamp", -1).limit(5)
    
    # Convert the messages to a list of dictionaries
    last_five_messages = [{"message": msg["message"], "timestamp": msg["timestamp"]} for msg in messages]
    
    # Return messages in chronological order (oldest to newest)
    return last_five_messages[::-1]  # Reverse to get oldest first

# Save a new message


def save_message(message):
    print("saving message")
    # Generate a timestamp for when the message is saved
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Insert the message into MongoDB with its timestamp
    messages_collection.insert_one({
        "message": message,
        "timestamp": timestamp
    })
    
    print(f"Message saved: {message} at {timestamp}")
@main.route('/')
def index():
    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/upload', methods=['POST'])
@login_required
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(url_for('main.index'))

    file = request.files['file']

    # If user does not select a file
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('main.index'))

    # Validate the file type and save if allowed
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        flash('File uploaded successfully')
        return redirect(url_for('main.list_files'))
    else:
        flash('Only PDF files are allowed')
        return redirect(url_for('main.index'))

@main.route('/files')
@login_required
def list_files():
    # Get a list of all files in the directory
    try:
        files = os.listdir(FILES_DIRECTORY)
    except FileNotFoundError:
        files = []
    
    return render_template('list_files.html', files=files)

@main.route('/files/<filename>')
@login_required
def download_file(filename):
    # Serve the requested file from the files directory
    return send_from_directory(FILES_DIRECTORY, filename)


@main.route('/weather')
@login_required
def weather():
    return render_template('weather.html')


@main.route('/weather/result', methods=['POST'])
@login_required
def weather_result():
    city = request.form.get('city')
    if not city:
        flash("Please enter a city name.")
        return redirect(url_for('main.weather'))

    opencage_api_key = "YOUR_OPENCAGE_API_KEY"  # Replace with your actual key
    geocode_url = "https://api.opencagedata.com/geocode/v1/json"

    try:
        geocode_response = requests.get(
            geocode_url, params={'q': city, 'key': "a860e9fa8d38407d980de974ea2d8315"})
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
@login_required
def chat():
    last_messages = load_last_five_messages()
    return render_template('chat.html', last_messages=last_messages)




@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        password = request.form.get('password')

        # Check if the user exists in the database
        user = users_collection.find_one({'username': username, 'password': password})
        
        if user:
            flash('Login successful', 'info')  # Flash with 'info' category
            user_is_admin = user.get('isAdmin', False)  # Defaults to False if 'isAdmin' is not present
            session['logged_in'] = True
            session['username'] = username
            session['is_admin'] = user_is_admin
            print(session['is_admin'])
            
            # Redirect based on admin status
            if user_is_admin:
                return redirect(url_for('main.admin_dashboard'))
            else:
                return redirect(url_for('main.index'))
        else:
            flash('Invalid username or password', 'error')
            return redirect(url_for('main.login'))
    
    # Render the login page for GET requests
    return render_template('login.html')

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        password = request.form.get('password')
        is_admin = request.form.get('is_admin') == 'on'  # True if checkbox is checked
        
        # Check if the user already exists
        existing_user = users_collection.find_one({'username': username})
        if existing_user:
            flash('User already exists', 'error')
            return redirect(url_for('main.register'))
        else:
            # Insert the new user into the database
            users_collection.insert_one({
                'username': username,
                'password': password,
                'isAdmin': is_admin
            })
            flash('Account created successfully', 'info')
            return redirect(url_for('main.login'))
    
    # Render the registration page for GET requests
    return render_template('register.html')

        


@main.route('/logout')
@login_required
def logout():
    # Clear the session to log the user out
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('main.login'))


@main.route('/admin')
@admin_required
def admin_dashboard():
    # Example data (replace with real database queries)
    total_users = users_collection.count_documents({})
    return render_template('admin_dashboard.html', total_users=total_users)
@main.route('/manage_users')
@admin_required
def manage_users():
    # Retrieve all users from the database
    users = users_collection.find()  # Fetch all users from the users collection
    return render_template('manage_users.html', users=users)



@main.route('/delete_user/<user_id>', methods=['POST'])
@admin_required
def delete_user(user_id):
    # Delete the user with the given user_id
    users_collection.delete_one({'_id': ObjectId(user_id)})
    flash('User deleted successfully', 'info')
    return redirect(url_for('main.manage_users'))

@main.route('/view_logs')
@admin_required
def view_logs():
    # Retrieve logs from the database
    logs = logs_collection.find().sort("timestamp", -1)  # Fetch logs and sort by timestamp (newest first)
    return render_template('view_logs.html', logs=logs)
@main.route('/settings', methods=['GET', 'POST'])
@admin_required
def settings():
    if request.method == 'POST':
        # Example setting update
        setting_name = request.form.get('setting_name')
        setting_value = request.form.get('setting_value')
        
        # Save settings to the database (assuming a settings collection)
        settings_collection.update_one(
            {'name': setting_name},
            {'$set': {'value': setting_value}},
            upsert=True
        )
        flash("Setting updated successfully", "info")
        
    # Retrieve current settings
    settings = settings_collection.find()
    return render_template('settings.html', settings=settings)
