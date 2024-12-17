@echo off
REM Run the performance test with Artillery
artillery run load-test.yml --output results.json

REM Generate the HTML report
artillery report --output report.html results.json

REM Start the HTTP server on port 8000 (using Python)
start cmd /k python -m http.server 8000

REM Open the report in the default browser
start http://localhost:8000/report.html
