from app import create_app, socketio

app = create_app()

if __name__ == '__main__':
    import os
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    socketio.run(app, host="0.0.0.0", port=5005, debug=True)
    print("Running on http://localhost:5005")
