@echo off
cd ..
echo Starting backend test report generation...
node __tests__\generateTestReport.js

if %ERRORLEVEL% EQU 0 (
  echo Test report generated successfully!
  
  if exist ".\reports\latest\test-results.html" (
    echo You can view the HTML report at: .\reports\latest\test-results.html
    start "" ".\reports\latest\test-results.html"
  )
) else (
  echo Test report generation failed. Check the error report in .\reports\test-error.json
) 