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
from flask import current_app
from flask import jsonify
from flask import current_app
from flask import Markup
from flask import render_template_string




load_dotenv()

db_uername = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_Cluster = os.getenv('DB_CLUSTER')
db_Name = os.getenv('DB_NAME')
db_users_collection = os.getenv('DB_USERS_COLLECTION') or "Users"
db_logs_collection = os.getenv('DB_LOGS_COLLECTION') or "Logs"
db_settings_collection = os.getenv('DB_SETTINGS_COLLECTION') or "Settings"
db_messages_collection = os.getenv('DB_MESSAGES_COLLECTION') or "Messages"

# Load environment variables
load_dotenv()

# Retrieve MongoDB configuration from environment variables
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_cluster = os.getenv('DB_CLUSTER')
# Note: consistent variable naming for `db_name`
db_name = os.getenv('DB_NAME')


# Verify essential environment variables are set
if not all([db_username, db_password, db_cluster, db_name]):
    raise ValueError(
        "Database configuration is missing. Please check that DB_USERNAME, DB_PASSWORD, DB_CLUSTER, and DB_NAME are correctly set in the environment variables.")

main = Blueprint('main', __name__)

MongoClient = MongoClient(
    f"mongodb+srv://{db_uername}:{db_password}@final.yzzh9ig.mongodb.net/?retryWrites=true&w=majority&appName={db_Cluster}")
db = MongoClient[db_Name]
users_collection = db[db_users_collection]
logs_collection = db["Logs"]
settings_collection = db["Settings"]
messages_collection = db["Messages"]


@main.context_processor
def inject_settings():
    # Fetch all settings
    settings = {setting['name']: setting['value']
                for setting in settings_collection.find()}

    # Set maintenance_mode to True if it's enabled and user is not an admin
    maintenance_active = settings.get(
        'maintenance_mode', False) and not session.get('is_admin', False)

    # Return settings and maintenance status to templates
    return dict(settings=settings, maintenance_active=maintenance_active)


MESSAGES_FILE = 'messages.json'  # Ensure this file is created in the main directory
# Context processor to inject settings into all templates

# Ensure this goes below your Blueprint declaration
main = Blueprint('main', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), '../uploads')
ALLOWED_EXTENSIONS = {'pdf'}
FILES_DIRECTORY = UPLOAD_FOLDER


@main.context_processor
def inject_settings():
    settings = {setting['name']: setting['value']
                for setting in settings_collection.find()}
    return dict(settings=settings)


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
@socketio.on('send_message')
def handle_send_message(data):
    message = data.get('message')
    username = session.get('username')
    if message:
        print(f"Received message: {message}")
        save_message(username, message)
        emit('receive_message', {"user": username,
             "message": message}, broadcast=True)


def load_last_five_messages():
    # Fetch last five messages from MongoDB
    messages = messages_collection.find().sort("timestamp", -1).limit(5)

    # Create a list of messages, using .get() to handle missing keys
    last_five_messages = [{
        # Default to "Unknown User" if username is missing
        "user": msg.get("username", "Unknown User"),
        "message": msg.get("message", ""),
        "timestamp": msg.get("timestamp", "")
    } for msg in messages]

    # Return in chronological order (oldest to newest)
    return last_five_messages[::-1]

# Save a new message


def save_message(username, message):
    print("saving message")
    # Generate a timestamp for when the message is saved
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Insert the message into MongoDB with its timestamp
    messages_collection.insert_one({
        "username": username,
        "message": message,
        "timestamp": timestamp
    })

@main.errorhandler(413)
def request_entity_too_large(error):
    flash("File is too large. Maximum allowed size is 500MB.", "error")
    return redirect(url_for('main.index'))

@main.route('/')
def index():
    return render_template('index.html')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@main.route('/upload', methods=['POST'])
@login_required
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400

    # Validate the file size
    MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)  # Reset file pointer after checking size

    if file_size > MAX_FILE_SIZE:
        return jsonify({'status': 'error', 'message': 'File is too large. Maximum allowed size is 100MB.'}), 400

    # Validate the file type and save if allowed
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({'status': 'success', 'message': 'File uploaded successfully.'}), 200

    return jsonify({'status': 'error', 'message': 'Only PDF files are allowed.'}), 400


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
        flash("Please enter a city name.", "error")
        return redirect(url_for('main.weather'))

    opencage_api_key = "YOUR_OPENCAGE_API_KEY"  # Replace with your actual key
    geocode_url = "https://api.opencagedata.com/geocode/v1/json"

    try:
        geocode_response = requests.get(
            geocode_url, params={'q': city, 'key': "a860e9fa8d38407d980de974ea2d8315"}
        )
        geocode_data = geocode_response.json()

        if geocode_response.status_code != 200 or not geocode_data['results']:
            flash(f"City '{city}' not found.", "error")
            return redirect(url_for('main.weather'))

        coordinates = geocode_data['results'][0]['geometry']
        latitude = coordinates['lat']
        longitude = coordinates['lng']

    except requests.exceptions.RequestException:
        flash("Error retrieving location data.", "error")
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
            flash("Could not retrieve weather data.", "error")
            return redirect(url_for('main.weather'))

    except requests.exceptions.RequestException:
        flash("Error retrieving weather data.", "error")
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
        user = users_collection.find_one(
            {'username': username, 'password': password})

        if user:
            flash('Login successful', 'info')  # Flash with 'info' category
            # Defaults to False if 'isAdmin' is not present
            user_is_admin = user.get('isAdmin', False)
            session['logged_in'] = True
            session['username'] = username
            session['is_admin'] = user_is_admin
            # set a cookie to store the username
            response = redirect(url_for('main.index'))
            response.set_cookie('username', username)
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
        # True if checkbox is checked
        is_admin = request.form.get('is_admin') == 'on'

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
    # Fetch logs and sort by timestamp (newest first)
    logs = logs_collection.find().sort("timestamp", -1)
    return render_template('view_logs.html', logs=logs)


@main.route('/settings', methods=['GET', 'POST'])
@admin_required
def settings():
    if request.method == 'POST':
        # Define checkbox settings that should default to False if unchecked
        checkbox_settings = ['enable_registration', 'maintenance_mode']

        # Process each form field submitted
        for field_name in request.form:
            if field_name.startswith('setting_'):
                setting_name = field_name.replace('setting_', '')
                setting_value = request.form.get(field_name)

                # For checkboxes, explicitly set to False if not present in form data
                if setting_name in checkbox_settings:
                    setting_value = True if setting_value else False
                else:
                    setting_value = setting_value.strip()

                # Update setting in the database
                settings_collection.update_one(
                    {'name': setting_name},
                    {'$set': {'value': setting_value}},
                    upsert=True
                )

        # Handle unchecked checkboxes, set them to False if missing from request.form
        for checkbox in checkbox_settings:
            if f"setting_{checkbox}" not in request.form:
                settings_collection.update_one(
                    {'name': checkbox},
                    {'$set': {'value': False}},
                    upsert=True
                )

        flash("Settings updated successfully", "info")
        return redirect(url_for('main.settings'))

    # Load settings from the database and convert to dictionary format
    settings = {setting['name']: setting['value']
                for setting in settings_collection.find()}
    return render_template('settings.html', settings=settings)

@main.route('/ssti', methods=['GET', 'POST'])
def ssti():
    if request.method == 'POST':
        # Get user input from the form
        user_input = request.form.get('input')
        
        # Directly render user input as a Jinja2 template (intentionally vulnerable)
        rendered_result = render_template_string(user_input)
        
        # Return the rendered result to the ssti.html template
        return render_template('ssti.html', result=rendered_result)
    
    # Render the initial SSTI test page
    return render_template('ssti.html', result=None)