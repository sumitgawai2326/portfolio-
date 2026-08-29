@echo off
title Deploying Portfolio to GitHub...
echo ========================================================
echo   Sumit Rajendra Gawai - GitHub Portfolio Deployment
echo   Target Repo: https://github.com/sumitgawai2326/portfolio-.git
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/5] Initializing Git repository...
git init

echo [2/5] Setting up Git configuration...
git config user.name "Sumit Rajendra Gawai"
git config user.email "sumitgawai269@gmail.com"

echo [3/5] Adding all files to Git staging...
git add .

echo [4/5] Committing portfolio files...
git commit -m "feat: complete placement portfolio website for Sumit Rajendra Gawai (Class of 2029)"

echo [5/5] Connecting to GitHub and pushing to main branch...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/sumitgawai2326/portfolio-.git
git push -u origin main --force

echo.
echo ========================================================
echo   SUCCESS! Pushed to https://github.com/sumitgawai2326/portfolio-.git
echo.
echo   Now enable GitHub Pages:
echo   1. Go to https://github.com/sumitgawai2326/portfolio-/settings/pages
echo   2. Select branch 'main' and '/ (root)'
echo   3. Click Save
echo.
echo   Your live link will be:
echo   https://sumitgawai2326.github.io/portfolio-/
echo ========================================================
pause
