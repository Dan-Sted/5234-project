@echo off
REM Windows fallback for Husky pre-commit. Calls the cross-platform Node script.
node "%~dp0\..\scripts\precommit.js"
