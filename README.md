# Comfyui Audio Lab

一个零依赖静态宣传 Web 项目，用于展示 eastmoe 的 ComfyUI 音频节点生态：DSP、SVC、歌曲生成、ASR 字幕、MSST 分离修复、TTS 与 LLM 编排。

## Local Preview

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## Deploy To Vercel

这个项目不需要构建步骤。导入仓库到 Vercel 后保持默认静态部署即可：

- Framework Preset: Other
- Build Command: 留空
- Output Directory: `.`

## Files

- `index.html`：页面结构与 SEO 元数据
- `styles.css`：苹果风格的响应式视觉系统
- `app.js`：节点切换、组合工作流与背景波形交互
- `public/audio-lab-hero.webp`：生成式首屏视觉资产
