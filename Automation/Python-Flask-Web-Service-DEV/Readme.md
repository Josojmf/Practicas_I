
# Web Service for Automation Testing 
### By José María Fernández (and ChatGPT)

This web service is designed to support various automation testing scenarios, providing functionalities such as user authentication, file uploads, weather data retrieval, live chat, and more. It also includes special administrative options for managing users and settings.

---

## Table of Contents

1. [Installation](#installation)
2. [How to Run](#how-to-run)
3. [Functionalities](#functionalities)
   - [User Features](#user-features)
   - [Admin Options](#admin-options)

---

## Installation

To set up the environment, you need to install the required packages.

```bash
pip install -r requirements.txt
```
## Configuration

Create a .env file on the root of the Python webservice project

DB_USERNAME=username
DB_PASSWORD=fassword
DB_CLUSTER=yourcluster
DB_NAME=yourdbname
DB_USERS_COLLECTION=Users
DB_LOGS_COLLECTION=Logs
DB_SETTINGS_COLLECTION=Settings
DB_MESSAGES_COLLECTION=Messages

## How to Run

After installing the dependencies, start the web service by running:

```bash
python main.py
```

The application should now be accessible on `http://127.0.0.1:5000`.

### Cool functonality

#### Run on "free" pseudo hosting

1. Install cloudflared 
<a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/">Cloudflared</a>

2. Run the app normally
bash
```
python main.py
```
3. Run the tunnel
```
cloudflared tunnel --url http://127.0.0.1:5000

```

4. Get the remote live link!


---

## Functionalities

### User Features

1. **Login**  
   Authenticate users with secure credentials.

2. **File Upload**  
   Users can upload files (restricted to PDF files).

3. **File Visualization**  
   Browse and view uploaded files.

4. **Weather Check**  
   Retrieve current weather data for any specified city.

5. **Live Chat**  
   Real-time chat using WebSockets with message broadcasting and a history of the last 5 messages.

### Admin Options

Admins have access to additional features to manage the platform:

1. **Manage Users**  
   Admins can view, add, update, or delete users to manage platform access and permissions.

2. **View System Logs**  
   Review logs to track system events, helping with maintenance and auditing.

3. **Site Settings**  
   Configure site-wide settings, including options to enable/disable certain functionalities, and adjust system parameters.

--- 
## Build

### Docker Hub Recommended
1. 

### Docker
1. 
```
 docker build -t python-flask-web-service .

 ```
 2. 
 ```
docker save -o python-flask-web-service.tar python-flask-web-service:latest
 ```
 3. 
 ```
docker run -p 5000:5000 --env-file .env python-flask-web-service
 ```
 OR. 
```
docker-compose up --build
docker-compose -f docker-compose.yml up --build
```

 #### Then Image should be available to run from docker desktop if system is halted

Each functionality and admin option is designed to support automation testing . 

## Just run Application

1. 
```
pip install requirements.txt
```

2. 
```
python main.py       
```

Happy Testing! 🚀
