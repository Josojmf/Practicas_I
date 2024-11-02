Here’s an enhanced and organized README file for your project, including the additional admin options. I've structured it with clear headings and sections for better readability.

---

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

## How to Run

After installing the dependencies, start the web service by running:

```bash
python main.py
```

The application should now be accessible on `http://127.0.0.1:5000`.

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

Each functionality and admin option is designed to support seamless automation testing and platform management. 

Happy Testing! 🚀