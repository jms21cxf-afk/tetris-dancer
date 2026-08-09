#Requires -Version 5.1
$projectDir = "C:\Users\jms\Desktop\vibe-coding\tetris-dancer"
$batPath = Join-Path $projectDir "start.bat"
$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "Tetris Dancer.lnk"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $batPath
$shortcut.WorkingDirectory = $projectDir
$shortcut.WindowStyle = 1
$shortcut.Description = "테트리스 레벨7 춤추는 인형 + BGM"
$shortcut.Save()

Write-Output "바로가기 생성: $shortcutPath"
