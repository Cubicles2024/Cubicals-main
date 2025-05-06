#!/bin/bash

# Navigate to the root directory
cd ..

# Generate test report
echo "Starting backend test report generation..."
node __tests__/generateTestReport.js

# Check if report was generated successfully
if [ $? -eq 0 ]; then
  echo "Test report generated successfully!"
  
  # Open the report if on a desktop environment
  if [ -f "./reports/latest/test-results.html" ]; then
    echo "You can view the HTML report at: ./reports/latest/test-results.html"
    
    # Try to open the report in the default browser
    if command -v xdg-open > /dev/null; then
      xdg-open "./reports/latest/test-results.html"
    elif command -v open > /dev/null; then
      open "./reports/latest/test-results.html"
    elif command -v start > /dev/null; then
      start "./reports/latest/test-results.html"
    fi
  fi
else
  echo "Test report generation failed. Check the error report in ./reports/test-error.json"
fi 