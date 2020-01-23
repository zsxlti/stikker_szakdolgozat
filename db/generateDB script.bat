@echo off
for /f "delims=" %%a in ('wmic OS Get localdatetime  ^| find "."') do set dt=%%a
set YYYY=%dt:~0,4%
set MM=%dt:~4,2%
set DD=%dt:~6,2%

set stamp=%YYYY%.%MM%.%DD%

echo Marging script files: STRATED
copy /b scripts\*.sql stikker-scheme-%stamp%.sql

echo Marging files: SUCCESS

echo off
pause
exit