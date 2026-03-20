@echo off
chcp 65001 >nul
echo ========================================
echo    zyye博客系统 - Git部署脚本
echo ========================================
echo.

echo [1] 检查Git是否安装...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到Git！请先安装Git。
    echo.
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [√] Git已安装
echo.

echo [2] 初始化Git仓库...
if exist .git (
    echo [警告] .git目录已存在，正在删除...
    rd /s /q .git 2>nul
)

git init
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Git初始化失败！
    pause
    exit /b 1
)

echo [√] Git仓库初始化完成
echo.

echo [3] 配置Git用户信息...
git config user.name xiaobaizys
git config user.email zys6606@163.com
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Git配置失败！
    pause
    exit /b 1
)

echo [√] Git用户配置完成
echo.

echo [4] 添加文件到Git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Git添加失败！
    pause
    exit /b 1
)

echo [√] 文件添加完成
echo.

echo [5] 创建首次提交...
git commit -m "Initial commit: zyye博客系统"
if %ERRORLEVEL% NEQ 0 (
    echo [错误] Git提交失败！
    pause
    exit /b 1
)

echo [√] 首次提交完成
echo.

echo [6] 重命名主分支为main...
git branch -M main
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 分支重命名失败！
    pause
    exit /b 1
)

echo [√] 主分支重命名完成
echo.

echo [7] 添加远程仓库...
git remote add origin https://github.com/xiaobaizys/zyyeBlogs.git
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 添加远程仓库失败！
    pause
    exit /b 1
)

echo [√] 远程仓库添加完成
echo.

echo [8] 推送代码到GitHub...
echo.
echo [提示] 如果需要认证，请使用以下命令设置Token：
echo   git remote set-url origin https://YOUR_TOKEN@github.com/xiaobaizys/zyyeBlogs.git
echo   git push -u origin main
echo.
echo 正在推送...
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 推送失败！
    echo.
    echo 可能的原因：
    echo   1. 需要GitHub Personal Access Token
    echo   2. 网络连接问题
    echo   3. 仓库不存在
    echo.
    echo 解决方法：
    echo   - 访问 https://github.com/settings/tokens 生成Token
    echo   - 或使用GitHub Desktop工具
    echo   - 查看部署指南：DEPLOYMENT.md
    pause
    exit /b 1
)

echo.
echo [√] 推送成功！
echo.
echo ========================================
echo 部署完成！
echo.
echo 下一步：
echo   1. 访问 https://github.com/xiaobaizys/zyyeBlogs
echo   2. 在GitHub设置中启用GitHub Pages
echo   3. 等待几分钟后访问：https://xiaobaizys.github.io/zyyeBlogs/
echo.
echo ========================================
echo.
pause