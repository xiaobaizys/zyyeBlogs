@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    zyye博客系统 - Git部署脚本
echo ========================================
echo.

echo [1] Checking Git...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git not found! Please install Git first.
    echo.
    echo Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

echo [2] Initializing Git repository...
if exist .git (
    echo [WARNING] .git directory exists, deleting...
    rd /s /q .git 2>nul
)

git init
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git init failed!
    pause
    exit /b 1
)

echo [OK] Git repository initialized
echo.

echo [3] Configuring Git user...
git config user.name xiaobaizys
git config user.email zys6606@163.com
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git config failed!
    pause
    exit /b 1
)

echo [OK] Git user configured
echo.

echo [4] Adding files to Git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git add failed!
    pause
    exit /b 1
)

echo [OK] Files added
echo.

echo [5] Creating initial commit...
git commit -m "Initial commit: zyye博客系统"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git commit failed!
    pause
    exit /b 1
)

echo [OK] Initial commit created
echo.

echo [6] Renaming main branch...
git branch -M main
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Branch rename failed!
    pause
    exit /b 1
)

echo [OK] Main branch renamed
echo.

echo [7] Adding remote repository...
git remote add origin https://github.com/xiaobaizys/zyyeBlogs.git
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Remote add failed!
    pause
    exit /b 1
)

echo [OK] Remote repository added
echo.

echo [8] Pushing to GitHub...
echo.
echo [TIP] If authentication fails, use GitHub Personal Access Token:
echo   Visit: https://github.com/settings/tokens
echo   Generate new Token (select repo permissions)
echo   Then run:
echo     git remote set-url origin https://TOKEN@github.com/xiaobaizys/zyyeBlogs.git
echo     git push -u origin main
echo.
echo Pushing...
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Possible reasons:
    echo   1. Need GitHub Personal Access Token
    echo   2. Network connection issues
    echo   3. Repository does not exist
    echo.
    echo Solutions:
    echo   - Visit https://github.com/settings/tokens to generate Token
    echo   - Use GitHub Desktop tool
    echo   - Check deployment guide: DEPLOYMENT.md
    pause
    exit /b 1
)

echo.
echo [OK] Push successful!
echo.
echo ========================================
echo Deployment Complete!
echo.
echo Next steps:
echo   1. Visit: https://github.com/xiaobaizys/zyyeBlogs
echo   2. Enable GitHub Pages in repository settings
echo   3. Wait a few minutes and visit: https://xiaobaizys.github.io/zyyeBlogs/
echo.
echo ========================================
echo.
pause