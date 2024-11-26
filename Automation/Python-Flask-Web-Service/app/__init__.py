# app/__init__.py
from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()  # initialize socketio here

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config['UPLOAD_FOLDER'] = 'uploads'
    app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024  # 500MB max file size
    app.secret_key = 'supersecretkey'

    # Register blueprint after defining app
    from .routes import main
    app.register_blueprint(main, url_prefix="/")

    # Initialize socketio after registering blueprint
    socketio.init_app(app)
    return app
