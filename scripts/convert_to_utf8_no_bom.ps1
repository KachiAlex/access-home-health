param(
    [Parameter(Mandatory=$true)]
    [string]$Path
)

if (-not (Test-Path $Path)) {
    Write-Output "FILE_NOT_FOUND: $Path"
    exit 1
}

[byte[]]$b = [System.IO.File]::ReadAllBytes($Path)
$hex = ($b[0..([Math]::Min(3,$b.Length-1))] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
Write-Output "BOM-HEX: $hex"

if ($b.Length -ge 3 -and $b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF) {
    $text = [System.Text.Encoding]::UTF8.GetString($b)
    Write-Output 'Detected: UTF-8 with BOM'
}
elseif ($b.Length -ge 2 -and $b[0] -eq 0xFF -and $b[1] -eq 0xFE) {
    $text = [System.Text.Encoding]::Unicode.GetString($b)
    Write-Output 'Detected: UTF-16 LE'
}
elseif ($b.Length -ge 2 -and $b[0] -eq 0xFE -and $b[1] -eq 0xFF) {
    $text = [System.Text.Encoding]::BigEndianUnicode.GetString($b)
    Write-Output 'Detected: UTF-16 BE'
}
else {
    $text = [System.Text.Encoding]::UTF8.GetString($b)
    Write-Output 'Detected: no BOM / assume UTF-8'
}

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($Path, $text, $enc)
Write-Output "Converted and saved: $Path as UTF-8 (no BOM)"
