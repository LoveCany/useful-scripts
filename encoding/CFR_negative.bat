@ECHO OFF
CD/D "%~dp0"

:Enc1
IF "%~1"=="" GOTO :STOP

echo.
set /p a=Target Directory: 
echo.

echo 
ffmpeg -i "%~1" -c:v libx264 -preset 0 -crf 0 "%a%\%~n1_CFR.mp4"
echo.

SHIFT /1
GOTO :Enc1

:STOP

ECHO CFR process finished.
pause>nul