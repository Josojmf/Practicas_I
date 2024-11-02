# Step 1: Use an official Python runtime as a base image
FROM python:3.10-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the application files to the container
COPY . /app

# Step 4: Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Set environment variables (ensure this matches your .env file)
ENV FLASK_APP=main.py
ENV FLASK_ENV=production

# Step 6: Expose the port the app runs on
EXPOSE 5000

# Step 7: Define the command to run the app
CMD ["flask", "run", "--host=0.0.0.0"]
