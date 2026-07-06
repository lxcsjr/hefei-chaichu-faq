@echo off
chcp 65001 >nul
echo ==========================================
echo   放行 3000 端口（手机访问需要）
echo ==========================================
echo.
netsh advfirewall firewall add rule name="FAQ卡片服务-3000端口" dir=in action=allow protocol=tcp localport=3000
echo.
echo 放行完成！现在手机可以访问了。
echo.
pause
