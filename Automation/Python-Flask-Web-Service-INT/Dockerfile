# Start with a base Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app
COPY . .

# Expose port 5005 for Flask
EXPOSE 5005

# Set the default command to run the Flask app
CMD ["python", "main.py"]
