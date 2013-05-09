@echo off
echo Building XPI...
cd extension
..\zip -r "..\latest.xpi" "*"
echo Done!
pause
