@ECHO OFF

:Enc1
IF "%~1"=="" GOTO :STOP

echo 
ffmpeg -i "%~1" -i "%~2" -c:v copy -c:a copy "%~n1_mux.mp4"
echo.

SHIFT /1
GOTO :Enc1

:STOP

ECHO Mux process finished.
pause>nul