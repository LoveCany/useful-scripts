@ECHO OFF
CD/D "%~dp0"

:Enc1
IF "%~1"=="" GOTO :STOP

echo.
set /p a=Target Directory: 
echo.

echo 
ffmpeg -i "%~1" -vf zscale=p=bt709,format=yuv420p -c:v libx264 -preset 0 -crf 0 "%a%\%~n1_COLORSPACE_REMAPPED.mp4"
echo.

SHIFT /1
GOTO :Enc1

:STOP

ECHO Colorspace remap process finished.
pause>nul
