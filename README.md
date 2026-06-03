# Comfyui Audio Lab

一个零依赖静态宣传 Web 项目，用于展示 eastmoe 的 ComfyUI 音频节点生态：DSP、SVC、歌曲生成、ASR 字幕、MSST 分离修复、TTS 与 LLM 编排。

## Local Preview

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 插件列表

| 名称 | 作用 | URL |
| --- | --- | --- |
| Audio DSP | 专业音频信号处理节点集，覆盖均衡器、压缩器、混响、延迟、限制器等细节调控。 | https://github.com/eastmoe/ComfyUI-Audio-DSP |
| MSST | 音频源分离、人声/伴奏/和声/混响/乐器分离、音频修复与高清化、歌声转 MIDI。 | https://github.com/eastmoe/ComfyUI-MSST |
| So-VITS-SVC | 基于 So-VITS-SVC 的 AI 声音转换节点，支持声音克隆与 AI 翻唱。 | https://github.com/eastmoe/ComfyUI-so-vits-svc |
| DDSP-SVC | 基于 DDSP-SVC 的轻量高效 AI 翻唱节点，用于声线迁移与快速推理。 | https://github.com/eastmoe/ComfyUI-DDSP-SVC |
| Easy SongGeneration | 一站式歌曲生成节点，从歌词到完整歌曲，生成旋律、编曲与人声。 | https://github.com/eastmoe/ComfyUI-Easy-SongGeneration |
| MIMOASR | 高精度语音转录节点，支持 ASS/SRT 字幕文件生成。 | https://github.com/eastmoe/ComfyUI-MIMOASR |
| Light IndexTTS2 | IndexTTS2 的轻量级工程实现，用于高效文本转语音。 | https://github.com/eastmoe/ComfyUI-Light-IndexTTS2 |
| Easy Qwen3-TTS | Qwen3-TTS 的 ComfyUI 工程优化实践，用于高质量流式语音合成与声音克隆。 | https://github.com/eastmoe/ComfyUI-Easy-Qwen3-TTS |
| Simple LLM | 仅依赖 OpenAI 库的单次 LLM API 节点，用于歌词生成、文本处理与翻译。 | https://github.com/eastmoe/ComfyUI-Simple-LLM |

## Deploy To Vercel

这个项目不需要构建步骤。导入仓库到 Vercel 后保持默认静态部署即可：

- Framework Preset: Other
- Build Command: 留空
- Output Directory: `.`

## Files

- `index.html`：页面结构与 SEO 元数据
- `css/styles.css`：响应式视觉系统
- `js/tailwind.config.js`：Tailwind 运行时配置
- `js/app.js`：节点切换、组合工作流与背景波形交互
- `assets/logo.svg`：站点 Logo 的 SVG 资源
- `assets/logo.webp`：站点 Logo 的 WebP 资源
