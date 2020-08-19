@ECHO OFF
CD/D "%~dp0"

:Enc1
IF "%~1"=="" GOTO :STOP

echo
ffmpeg -i "%~1" -vn -acodec copy "%a%\%~n1_audio.aac"
echo.

SHIFT /1
GOTO :Enc1

:STOP

pause>nul
