@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

set "PORT=8000"
set "URL=http://localhost:%PORT%/index.html"

echo ============================================
echo  TM KI Consulting - Website lokal starten
echo ============================================
echo.
echo Ordner: %CD%
echo.
echo Starte lokalen Server unter:
echo %URL%
echo.
echo Wichtig: Dieses Fenster offen lassen.
echo Beenden mit STRG+C und danach J bestaetigen.
echo.

where py >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    py -3 -m http.server %PORT%
    goto :end
)

where python >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    python -m http.server %PORT%
    goto :end
)

where python3 >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    python3 -m http.server %PORT%
    goto :end
)

where node >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    node local-server.js %PORT%
    goto :end
)

echo Weder Python noch Node.js wurden gefunden.
echo Bitte installiere Python oder Node.js oder starte die Website ueber VS Code mit Live Server.
echo.
echo Alternative in VS Code:
echo 1. Ordner oeffnen
echo 2. index.html rechtsklicken
echo 3. Open with Live Server
echo.
pause

:end
endlocal
