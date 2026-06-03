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

function Repair-PyniniPackageVersion {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PythonExe
    )

    $repairScriptLines = @(
        "import csv"
        "import importlib.metadata as metadata"
        "import io"
        "import re"
        "import shutil"
        "import sys"
        "import sysconfig"
        "from pathlib import Path"
        ""
        "TARGET_VERSION = '2.1.6'"
        "WHEEL_VERSION = '2.1.6.post1'"
        "TARGET_DIST_INFO = 'pynini-2.1.6.dist-info'"
        ""
        "def read_metadata_version(metadata_file):"
        "    data = metadata_file.read_bytes()"
        "    name_match = re.search(br'(?m)^Name: ([^\r\n]+)', data)"
        "    version_match = re.search(br'(?m)^Version: ([^\r\n]+)', data)"
        "    package_name = name_match.group(1).decode('ascii', 'replace').lower() if name_match else ''"
        "    package_version = version_match.group(1).decode('ascii', 'replace') if version_match else ''"
        "    return data, package_name, package_version"
        ""
        "def collect_site_roots():"
        "    roots = []"
        "    for key in ('purelib', 'platlib'):"
        "        value = sysconfig.get_paths().get(key)"
        "        if value:"
        "            roots.append(Path(value))"
        "    try:"
        "        dist = metadata.distribution('pynini')"
        "        root = Path(dist.locate_file(''))"
        "        roots.append(root)"
        "        dist_path = Path(getattr(dist, '_path', '') or '')"
        "        if dist_path:"
        "            roots.append(dist_path.parent)"
        "    except metadata.PackageNotFoundError:"
        "        pass"
        "    existing = []"
        "    for root in roots:"
        "        try:"
        "            resolved = root.resolve()"
        "        except OSError:"
        "            resolved = root"
        "        if resolved.exists() and resolved not in existing:"
        "            existing.append(resolved)"
        "    return existing"
        ""
        "def find_pynini_dist_infos():"
        "    found = []"
        "    for root in collect_site_roots():"
        "        for dist_info in root.glob('*.dist-info'):"
        "            if not dist_info.name.lower().startswith('pynini-'):"
        "                continue"
        "            metadata_file = dist_info / 'METADATA'"
        "            if not metadata_file.exists():"
        "                continue"
        "            data, package_name, package_version = read_metadata_version(metadata_file)"
        "            if package_name == 'pynini' or dist_info.name.lower().startswith('pynini-'):"
        "                found.append((dist_info, metadata_file, data, package_version))"
        "    unique = []"
        "    seen = set()"
        "    for item in found:"
        "        key = str(item[0]).lower()"
        "        if key not in seen:"
        "            seen.add(key)"
        "            unique.append(item)"
        "    return unique"
        ""
        "def rewrite_record(dist_info, old_name=None):"
        "    record_file = dist_info / 'RECORD'"
        "    if not record_file.exists():"
        "        return"
        "    rows = list(csv.reader(io.StringIO(record_file.read_text(encoding='utf-8'))))"
        "    output = io.StringIO()"
        "    writer = csv.writer(output, lineterminator='\n')"
        "    for row in rows:"
        "        if row:"
        "            path = row[0].replace('\\\\', '/')"
        "            if old_name and path.startswith(old_name + '/'):"
        "                row[0] = TARGET_DIST_INFO + path[len(old_name):]"
        "                path = row[0].replace('\\\\', '/')"
        "            if path in (TARGET_DIST_INFO + '/METADATA', TARGET_DIST_INFO + '/RECORD'):"
        "                row = [row[0], '', '']"
        "        writer.writerow(row)"
        "    record_file.write_text(output.getvalue(), encoding='utf-8')"
        ""
        "try:"
        "    metadata.distribution('pynini')"
        "except metadata.PackageNotFoundError:"
        "    print('pynini is not installed')"
        "    sys.exit(1)"
        ""
        "dist_infos = find_pynini_dist_infos()"
        "if not dist_infos:"
        "    print('pynini METADATA file was not found')"
        "    sys.exit(1)"
        ""
        "patched = []"
        "for dist_info, metadata_file, data, package_version in dist_infos:"
        "    old_name = dist_info.name"
        "    if package_version == WHEEL_VERSION:"
        "        metadata_file.write_bytes(re.sub(br'(?m)^Version: 2\.1\.6\.post1$', b'Version: 2.1.6', data, count=1))"
        "    elif package_version != TARGET_VERSION:"
        "        print('unexpected pynini metadata version in {}: {}'.format(dist_info, package_version))"
        "        sys.exit(1)"
        ""
        "    target_dist_info = dist_info.parent / TARGET_DIST_INFO"
        "    if dist_info.name != TARGET_DIST_INFO:"
        "        if target_dist_info.exists():"
        "            shutil.rmtree(target_dist_info)"
        "        shutil.move(str(dist_info), str(target_dist_info))"
        "        dist_info = target_dist_info"
        ""
        "    rewrite_record(dist_info, old_name=old_name)"
        "    patched.append(str(dist_info))"
        ""
        "print('patched pynini dist-info: {}'.format('; '.join(patched)))"
    )

    Write-Host "正在将 pynini 包元数据版本修正为 2.1.6，以满足 WeTextProcessing 依赖声明..."
    $repairOutput = & $PythonExe -c ($repairScriptLines -join "`n") 2>&1
    $repairExitCode = $LASTEXITCODE
    foreach ($line in $repairOutput) {
        Write-Host $line
    }

    if ($repairExitCode -ne 0) {
        Write-Host "pynini 版本元数据修正失败，后续依赖解析可能仍会认为版本不匹配。" -ForegroundColor Red
        return $false
    } else {
        $visiblePyniniVersion = & $PythonExe -c "import importlib.metadata as m; print(m.version('pynini'))" 2>$null
        if ($LASTEXITCODE -ne 0 -or "$visiblePyniniVersion".Trim() -ne "2.1.6") {
            Write-Host "pynini 版本元数据修正后仍显示为 $visiblePyniniVersion，后续依赖解析可能仍会认为版本不匹配。" -ForegroundColor Red
            return $false
        } else {
            Write-Host "pynini 版本元数据修正完成，当前可见版本: $visiblePyniniVersion" -ForegroundColor Green
            return $true
        }
    }
}

function Install-IndexTTS2PyniniWheel {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PythonExe
    )

    $pyniniWheelUrls = @{
        "3.10" = "https://github.com/billwuhao/pynini-windows-wheels/releases/download/v2.1.6.post1/pynini-2.1.6.post1-cp310-cp310-win_amd64.whl"
        "3.11" = "https://github.com/billwuhao/pynini-windows-wheels/releases/download/v2.1.6.post1/pynini-2.1.6.post1-cp311-cp311-win_amd64.whl"
        "3.12" = "https://github.com/billwuhao/pynini-windows-wheels/releases/download/v2.1.6.post1/pynini-2.1.6.post1-cp312-cp312-win_amd64.whl"
        "3.13" = "https://github.com/billwuhao/pynini-windows-wheels/releases/download/v2.1.6.post1/pynini-2.1.6.post1-cp313-cp313-win_amd64.whl"
    }

    Write-Host "准备为 Light-IndexTTS2 预安装 Windows pynini wheel..." -ForegroundColor Cyan

    $pythonInfo = & $PythonExe -c "import platform, sys; print(f'{sys.version_info.major}.{sys.version_info.minor}|{platform.system()}|{platform.machine()}|{sys.maxsize > 2**32}')"
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($pythonInfo)) {
        Write-Host "无法检测 Python 版本信息，跳过 pynini 预安装。" -ForegroundColor Yellow
        return $true
    }

    $parts = $pythonInfo.Trim().Split('|')
    if ($parts.Count -lt 4) {
        Write-Host "Python 版本信息格式异常，跳过 pynini 预安装: $pythonInfo" -ForegroundColor Yellow
        return $true
    }

    $pythonVersion = $parts[0]
    $platformSystem = $parts[1]
    $platformMachine = $parts[2].ToLowerInvariant()
    $is64Bit = ($parts[3] -eq "True")

    if ($platformSystem -ne "Windows" -or -not $is64Bit -or $platformMachine -notin @("amd64", "x86_64")) {
        Write-Host "当前环境不是 64 位 Windows，跳过 pynini Windows wheel 预安装。" -ForegroundColor Yellow
        return $true
    }

    if (-not $pyniniWheelUrls.ContainsKey($pythonVersion)) {
        Write-Host "当前 Python $pythonVersion 没有预设的 pynini wheel，跳过预安装。" -ForegroundColor Yellow
        return $false
    }

    & $PythonExe -c "import pynini" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "已检测到 pynini，可跳过预安装。" -ForegroundColor Green
        return (Repair-PyniniPackageVersion -PythonExe $PythonExe)
    }

    $wheelUrl = $pyniniWheelUrls[$pythonVersion]
    Write-Host "正在安装匹配的 pynini wheel: $wheelUrl"
    $pipOutput = & $PythonExe -m pip install $wheelUrl 2>&1
    $pipExitCode = $LASTEXITCODE
    foreach ($line in $pipOutput) {
        Write-Host $line
    }

    if ($pipExitCode -ne 0) {
        Write-Host "pynini wheel 安装失败，后续 WeTextProcessing 依赖安装可能仍会失败。" -ForegroundColor Red
        return $false
    } else {
        Write-Host "pynini wheel 预安装成功。" -ForegroundColor Green
        return (Repair-PyniniPackageVersion -PythonExe $PythonExe)
    }
}

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
        if ($repoName -eq "ComfyUI-Light-IndexTTS2") {
            $pyniniReady = Install-IndexTTS2PyniniWheel -PythonExe $pythonExe
            if (-not $pyniniReady) {
                Write-Host "pynini 预安装或版本修正未完成，跳过 Light-IndexTTS2 依赖安装以避免编译 pynini 源码。" -ForegroundColor Red
                continue
            }
        }

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
