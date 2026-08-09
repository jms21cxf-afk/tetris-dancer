@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "node_modules\" (
  echo 의존성 설치 중...
  call npm install
)

echo 테트리스 춤추는 인형 실행 중...
start "" "http://localhost:5175"
call npm run dev
