@ECHO OFF

:Enc1
IF "%~1"=="" GOTO :STOP

echo 
ffmpeg -i "%~1" -i "%~2" -c copy "%~n1.mp4"
echo.

:STOP

ECHO Mux process finished.
pause>nul