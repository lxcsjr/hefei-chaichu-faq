@echo off
chcp 65001 >nul
title 合肥拆除 - FAQ卡片服务
cd /d "%~dp0"

echo ==========================================
echo   合肥拆除 · FAQ 卡片服务
echo ==========================================
echo.
echo 正在启动服务器...
echo.

start "" "http://localhost:3000"

node server.js

pause
