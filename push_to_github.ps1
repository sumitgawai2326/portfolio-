# PowerShell script to push to GitHub
Set-Location -Path $PSScriptRoot
Write-Host "Deploying portfolio to https://github.com/sumitgawai2326/portfolio-.git..." -ForegroundColor Cyan

git init
git config user.name "Sumit Rajendra Gawai"
git config user.email "sumitgawai269@gmail.com"
git add .
git commit -m "feat: complete placement portfolio website for Sumit Rajendra Gawai (Class of 2029)"
git branch -M main
try { git remote remove origin } catch {}
git remote add origin https://github.com/sumitgawai2326/portfolio-.git
git push -u origin main --force

Write-Host "`nSuccessfully pushed! Enable Pages at: https://github.com/sumitgawai2326/portfolio-/settings/pages" -ForegroundColor Green
Write-Host "Live URL: https://sumitgawai2326.github.io/portfolio-/" -ForegroundColor Yellow
