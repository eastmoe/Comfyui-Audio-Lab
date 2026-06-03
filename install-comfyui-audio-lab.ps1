# ComfyUI 自定义节点批量安装脚本
# 使用方式：在 PowerShell 中运行此脚本，按提示操作即可

# Windows PowerShell 5.1 会按 BOM 判断 .ps1 编码；本文件保留 UTF-8 BOM 以避免中文乱码。
try {
    chcp.com 65001 | Out-Null
    $utf8Encoding = New-Object System.Text.UTF8Encoding -ArgumentList $false
    [Console]::InputEncoding = $utf8Encoding
    [Console]::OutputEncoding = $utf8Encoding
    $OutputEncoding = $utf8Encoding
} catch {
    # 编码设置失败时继续执行，不影响安装主流程。
}

# 1. 检查 git 是否可用
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到 git 命令，请先安装 Git 并将其添加到 PATH 环境变量。" -ForegroundColor Red
    exit 1
}

# 2. 获取 ComfyUI 根目录
do {
    $comfyRoot = Read-Host "请输入 ComfyUI 根目录（包含 output/models/custom_nodes 的文件夹路径）"
    if (-not (Test-Path $comfyRoot -PathType Container)) {
        Write-Host "路径不存在或不是文件夹，请重新输入。" -ForegroundColor Red
    }
} while (-not (Test-Path $comfyRoot -PathType Container))

# 确保 custom_nodes 目录存在
$customNodesDir = Join-Path $comfyRoot "custom_nodes"
if (-not (Test-Path $customNodesDir)) {
    Write-Host "custom_nodes 目录不存在，自动创建..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $customNodesDir -Force | Out-Null
}

# 3. 自动检测 python.exe（本级目录及上一级目录的直接子目录）
$pythonCandidates = @()

# 本级目录下的 python.exe（例如 ComfyUI\venv\Scripts\python.exe）
$comfyDirs = Get-ChildItem -Path $comfyRoot -Directory -ErrorAction SilentlyContinue
foreach ($dir in $comfyDirs) {
    $found = Get-ChildItem -Path $dir.FullName -Filter python.exe -Recurse -ErrorAction SilentlyContinue
    foreach ($f in $found) {
        $pythonCandidates += $f.FullName
    }
}

# 上一级目录下的 python.exe（例如 ComfyUI 所在父目录下的其他虚拟环境）
$parentDir = (Get-Item $comfyRoot).Parent.FullName
$parentDirs = Get-ChildItem -Path $parentDir -Directory -ErrorAction SilentlyContinue
foreach ($dir in $parentDirs) {
    $found = Get-ChildItem -Path $dir.FullName -Filter python.exe -Recurse -ErrorAction SilentlyContinue
    foreach ($f in $found) {
        $pythonCandidates += $f.FullName
    }
}

# 去重
$pythonCandidates = $pythonCandidates | Select-Object -Unique

# 4. 选择 python.exe
if ($pythonCandidates.Count -eq 0) {
    Write-Host "未在指定范围内找到 python.exe，请手动输入完整路径：" -ForegroundColor Yellow
    $pythonExe = Read-Host
    while (-not (Test-Path $pythonExe)) {
        Write-Host "文件不存在，重新输入：" -ForegroundColor Red
        $pythonExe = Read-Host
    }
} elseif ($pythonCandidates.Count -eq 1) {
    $pythonExe = $pythonCandidates[0]
    Write-Host "自动选择 Python 环境: $pythonExe" -ForegroundColor Green
} else {
    Write-Host "发现多个 python.exe，请选择：" -ForegroundColor Yellow
    for ($i = 0; $i -lt $pythonCandidates.Count; $i++) {
        Write-Host "[$i] $($pythonCandidates[$i])"
    }
    $choice = Read-Host "请输入序号"
    while ($choice -notmatch '^\d+$' -or [int]$choice -ge $pythonCandidates.Count) {
        $choice = Read-Host "序号无效，请重新输入"
    }
    $pythonExe = $pythonCandidates[[int]$choice]
}

Write-Host "使用的 Python 路径: $pythonExe" -ForegroundColor Cyan

# 5. 要安装的仓库列表
$repos = @(
    "https://github.com/eastmoe/ComfyUI-Audio-DSP",
    "https://github.com/eastmoe/ComfyUI-MSST",
    "https://github.com/eastmoe/ComfyUI-so-vits-svc",
    "https://github.com/eastmoe/ComfyUI-DDSP-SVC",
    "https://github.com/eastmoe/ComfyUI-Easy-SongGeneration",
    "https://github.com/eastmoe/ComfyUI-MIMOASR",
    "https://github.com/eastmoe/ComfyUI-Light-IndexTTS2",
    "https://github.com/eastmoe/ComfyUI-Easy-Qwen3-TTS",
    "https://github.com/eastmoe/ComfyUI-Simple-LLM"
)

# 6. 逐个克隆并安装依赖
foreach ($repoUrl in $repos) {
    $repoName = $repoUrl.Split('/')[-1]
    $targetPath = Join-Path $customNodesDir $repoName
    Write-Host "`n========================================" -ForegroundColor DarkCyan
    Write-Host "处理节点: $repoName" -ForegroundColor Cyan

    # 克隆仓库
    if (Test-Path $targetPath) {
        Write-Host "目录已存在，跳过克隆: $targetPath" -ForegroundColor Yellow
    } else {
        Write-Host "正在克隆 $repoUrl ..."
        git clone $repoUrl $targetPath
        if ($LASTEXITCODE -ne 0) {
            Write-Host "克隆失败，跳过此节点。" -ForegroundColor Red
            continue
        }
        Write-Host "克隆完成。" -ForegroundColor Green
    }

    # 安装依赖
    $reqFile = Join-Path $targetPath "requirements.txt"
    if (Test-Path $reqFile) {
        Write-Host "检测到 requirements.txt，正在安装依赖（使用中科大镜像）..."
        & $pythonExe -m pip install -r $reqFile --index-url https://mirrors.ustc.edu.cn/pypi/simple
        if ($LASTEXITCODE -ne 0) {
            Write-Host "依赖安装可能出错，请检查上述输出。" -ForegroundColor Red
        } else {
            Write-Host "依赖安装成功。" -ForegroundColor Green
        }
    } else {
        Write-Host "未找到 requirements.txt，无需安装依赖。" -ForegroundColor Yellow
    }
}

Write-Host "`n========================================" -ForegroundColor DarkCyan
Write-Host "所有节点处理完毕！" -ForegroundColor Green
