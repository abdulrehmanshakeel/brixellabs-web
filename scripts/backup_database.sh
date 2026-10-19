#!/usr/bin/env bash
# Automated Database Backup and Isolated Test-Restore Verification Script for Linux/macOS
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="${SCRIPT_DIR}/../backend"
BACKUPS_DIR="${BACKEND_DIR}/backups"

echo "=========================================================="
echo " [BRIXEL LABS] AUTOMATED DATABASE BACKUP & TEST RESTORE   "
echo "=========================================================="

cd "${BACKEND_DIR}"
python3 manage.py backup_database --retention 14

echo "=========================================================="
echo " [SUCCESS] DATABASE BACKUP & TEST-RESTORE CONFIRMED OK!   "
echo "=========================================================="
