#!/bin/bash

# ComfyUI 自定义节点批量安装脚本 (Linux)
# 用法: bash install_nodes.sh

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 检查 git 是否存在
if ! command -v git &> /dev/null; then
    echo -e "${RED}错误: 未找到 git 命令，请先安装 Git。${NC}"
    exit 1
fi

# 1. 获取 ComfyUI 根目录
while true; do
    read -rp "请输入 ComfyUI 根目录（包含 output/models/custom_nodes 的文件夹路径）: " comfy_root
    if [ -d "$comfy_root" ]; then
        break
    else
        echo -e "${RED}路径不存在或不是文件夹，请重新输入。${NC}"
    fi
done

# 确保 custom_nodes 目录存在
custom_nodes_dir="$comfy_root/custom_nodes"
if [ ! -d "$custom_nodes_dir" ]; then
    echo -e "${YELLOW}custom_nodes 目录不存在，自动创建...${NC}"
    mkdir -p "$custom_nodes_dir"
fi

# 2. 自动检测 Python 可执行文件
# 搜索范围：comfy_root 下的一级子目录，以及 comfy_root 的父目录下的一级子目录
candidates=()

# 在 comfy_root 下一级子目录中查找 python/python3
while IFS= read -r -d '' file; do
    if [ -x "$file" ] && [[ "$(basename "$file")" == python || "$(basename "$file")" == python3 ]]; then
        candidates+=("$file")
    fi
done < <(find "$comfy_root" -maxdepth 3 -type f \( -name python -o -name python3 \) -print0 2>/dev/null)

# 在父目录下一级子目录中查找
parent_dir="$(dirname "$comfy_root")"
while IFS= read -r -d '' file; do
    if [ -x "$file" ] && [[ "$(basename "$file")" == python || "$(basename "$file")" == python3 ]]; then
        candidates+=("$file")
    fi
done < <(find "$parent_dir" -maxdepth 3 -mindepth 1 -type f \( -name python -o -name python3 \) -print0 2>/dev/null)

# 去重
mapfile -t candidates < <(printf "%s\n" "${candidates[@]}" | sort -u)

# 选择 Python
if [ ${#candidates[@]} -eq 0 ]; then
    echo -e "${YELLOW}未在指定范围内找到 Python 可执行文件，请手动输入完整路径：${NC}"
    read -rp "Python 路径: " python_exe
    while [ ! -x "$python_exe" ]; do
        echo -e "${RED}文件不可执行或不存在，请重新输入：${NC}"
        read -rp "Python 路径: " python_exe
    done
elif [ ${#candidates[@]} -eq 1 ]; then
    python_exe="${candidates[0]}"
    echo -e "${GREEN}自动选择 Python 环境: $python_exe${NC}"
else
    echo -e "${YELLOW}发现多个 Python 可执行文件，请选择：${NC}"
    for i in "${!candidates[@]}"; do
        echo "[$i] ${candidates[$i]}"
    done
    while true; do
        read -rp "请输入序号: " choice
        if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -lt ${#candidates[@]} ]; then
            python_exe="${candidates[$choice]}"
            break
        else
            echo -e "${RED}序号无效，请重新输入${NC}"
        fi
    done
fi

echo -e "${CYAN}使用的 Python 路径: $python_exe${NC}"

# 3. 仓库列表
repos=(
    "https://github.com/eastmoe/ComfyUI-Audio-DSP"
    "https://github.com/eastmoe/ComfyUI-MSST"
    "https://github.com/eastmoe/ComfyUI-so-vits-svc"
    "https://github.com/eastmoe/ComfyUI-DDSP-SVC"
    "https://github.com/eastmoe/ComfyUI-Easy-SongGeneration"
    "https://github.com/eastmoe/ComfyUI-MIMOASR"
    "https://github.com/eastmoe/ComfyUI-Light-IndexTTS2"
    "https://github.com/eastmoe/ComfyUI-Easy-Qwen3-TTS"
    "https://github.com/eastmoe/ComfyUI-Simple-LLM"
)

# 4. 逐个克隆并安装依赖
for repo_url in "${repos[@]}"; do
    repo_name=$(basename "$repo_url")
    target_path="$custom_nodes_dir/$repo_name"
    echo -e "\n${CYAN}========================================${NC}"
    echo -e "${CYAN}处理节点: $repo_name${NC}"

    if [ -d "$target_path" ]; then
        echo -e "${YELLOW}目录已存在，跳过克隆: $target_path${NC}"
    else
        echo "正在克隆 $repo_url ..."
        if git clone "$repo_url" "$target_path"; then
            echo -e "${GREEN}克隆完成。${NC}"
        else
            echo -e "${RED}克隆失败，跳过此节点。${NC}"
            continue
        fi
    fi

    req_file="$target_path/requirements.txt"
    if [ -f "$req_file" ]; then
        echo -e "${GREEN}检测到 requirements.txt，正在安装依赖（使用中科大镜像）...${NC}"
        "$python_exe" -m pip install -r "$req_file" --index-url https://mirrors.ustc.edu.cn/pypi/simple || {
            echo -e "${RED}依赖安装可能出错，请检查上述输出。${NC}"
        }
    else
        echo -e "${YELLOW}未找到 requirements.txt，无需安装依赖。${NC}"
    fi
done

echo -e "\n${CYAN}========================================${NC}"
echo -e "${GREEN}所有节点处理完毕！${NC}"
