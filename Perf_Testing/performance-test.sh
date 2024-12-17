#!/bin/bash

# Run the performance test with Artillery
artillery run load-test.yml --output results.json

# Generate the HTML report
artillery report --output report.html results.json

# Start the HTTP server on port 8000 in the background
python3 -m http.server 8000 &

# Open the report in the default browser
xdg-open http://localhost:8000/report.html 2>/dev/null || open http://localhost:8000/report.html
