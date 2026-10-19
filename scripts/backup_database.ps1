<#
.SYNOPSIS
    Automated Database Backup and Isolated Test-Restore Verification Script.
.DESCRIPTION
    Runs Django's backup_database command which creates a cryptographic backup
    (SHA-256 fingerprint), restores it to an isolated scratch database, executes
    integrity checks, validates row counts, and prunes older archives.
.EXAMPLE
    .\scripts\backup_database.ps1
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$backendDir = Join-Path $projectRoot "backend"
$backupsDir = Join-Path $backendDir "backups"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [BRIXEL LABS] AUTOMATED DATABASE BACKUP & TEST RESTORE   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Backend directory: $backendDir"
Write-Host "Backups directory: $backupsDir"

# Ensure Python is available
$pythonCmd = "python"
if (-not (Get-Command $pythonCmd -ErrorAction SilentlyContinue)) {
    if (Get-Command "py" -ErrorAction SilentlyContinue) {
        $pythonCmd = "py"
    } else {
        Write-Host "ERROR: Python is not installed or not in PATH." -ForegroundColor Red
        exit 1
    }
}

# Run backup management command with test-restore
Write-Host "`n>> Executing: $pythonCmd manage.py backup_database..." -ForegroundColor Yellow

Push-Location $backendDir
try {
    & $pythonCmd manage.py backup_database --retention 14
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n[FAILED] Database backup command exited with error code $LASTEXITCODE." -ForegroundColor Red
        exit $LASTEXITCODE
    }
} finally {
    Pop-Location
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host " [SUCCESS] DATABASE BACKUP & TEST-RESTORE CONFIRMED OK!   " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

if (Test-Path $backupsDir) {
    Write-Host "`nRecent Backups in $($backupsDir):" -ForegroundColor Cyan
    Get-ChildItem -Path $backupsDir -Filter "db_backup_*.sqlite3" | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | ForEach-Object {
        $shaFile = "$($_.FullName).sha256"
        $sha = if (Test-Path $shaFile) { (Get-Content $shaFile).Split(' ')[0] } else { "N/A" }
        Write-Host ("  {0}  ({1:N1} KB)  SHA256: {2}" -f $_.Name, ($_.Length / 1KB), $sha) -ForegroundColor Gray
    }
}
