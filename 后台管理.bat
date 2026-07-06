@echo off
chcp 65001 >nul
title 合肥拆除 - 后台管理
cd /d "%~dp0"

echo ==========================================
echo   合肥拆除 · FAQ 后台管理
echo ==========================================
echo.
echo 后台地址: http://localhost:3000/admin.html
echo 默认密码: admin123
echo.
echo 正在打开浏览器...
start "" "http://localhost:3000/admin.html"
