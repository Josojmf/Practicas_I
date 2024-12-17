
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

# Python Flask Web Service - INT

## Overview

This project is a Python Flask web service integrated with MongoDB, designed for automation testing and streamlined development. It uses Docker for containerization.

---

## Build and Deploy with Docker

### **Build the Docker Image**
1. Build the Docker image locally and tag it appropriately:
   ```bash
   docker build -t josojmf/practicas-i-int:17-12-2024 .
   ```

2. Verify the built image:
   ```bash
   docker images
   ```

### **Push to Docker Hub**
1. Log in to your Docker Hub account:
   ```bash
   docker login
   ```

2. Push the image to Docker Hub:
   ```bash
   docker push josojmf/practicas-i-int:17-12-2024
   ```

---

### **Run on Another Computer**

To download and run the image from **Docker Hub**, follow these steps:

1. Pull the image:
   ```bash
   docker pull josojmf/practicas-i-int:17-12-2024
   ```

2. Create a `docker-compose.yml` file with the following content:

   ```yaml
   version: "3.8"

   services:
     web:
       image: josojmf/practicas-i-int:17-12-2024
       container_name: practicas-1-int
       ports:
         - "5000:5000"
       environment:
         DB_USERNAME: joso
         DB_PASSWORD: test123
         DB_CLUSTER: mongo
         DB_NAME: Practicas_I_Automation_Project
         DB_USERS_COLLECTION: Users
       depends_on:
         - mongo

     mongo:
       image: mongo:6.0
       container_name: Mongo_DB_INT_ENV
       ports:
         - "27017:27017"
       environment:
         MONGO_INITDB_ROOT_USERNAME: joso
         MONGO_INITDB_ROOT_PASSWORD: test123
       volumes:
         - mongo_data:/data/db

   volumes:
     mongo_data:
   ```

3. Run the container:
   ```bash
   docker-compose up -d
   ```

4. Verify the running containers:
   ```bash
   docker ps
   ```

---

### **Just Run the Application Without Docker**

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   python main.py
   ```

---

**Happy Testing! 🚀**
