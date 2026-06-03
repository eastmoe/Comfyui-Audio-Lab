const projects = {
  "audio-dsp": {
    name: "ComfyUI-Audio-DSP",
    type: "Signal detail layer",
    summary:
      "负责音频与信号细节处理，把增益、动态、路由、分析、空间与工具类处理拆成可复用节点。",
    role: "Polish / Measure / Route",
    pairs: "MSST, TTS, SVC",
    link: "https://github.com/eastmoe/ComfyUI-Audio-DSP",
    tags: ["DSP", "Native AUDIO", "Signal"],
  },
  sovits: {
    name: "ComfyUI-so-vits-svc",
    type: "AI cover layer",
    summary:
      "围绕 so-vits-svc 的 AI 翻唱节点，把歌声转换放进 ComfyUI 的可视化音频链路。",
    role: "Singing Voice Conversion",
    pairs: "SongGeneration, MSST",
    link: "https://github.com/eastmoe/ComfyUI-so-vits-svc",
    tags: ["SVC", "Cover", "Voice"],
  },
  ddsp: {
    name: "ComfyUI-DDSP-SVC",
    type: "AI cover layer",
    summary:
      "面向 DDSP-SVC 的 AI 翻唱工程，适合在轻量歌声转换与音色处理链路中承担核心转换步骤。",
    role: "DDSP Voice Conversion",
    pairs: "MSST, Audio-DSP",
    link: "https://github.com/eastmoe/ComfyUI-DDSP-SVC",
    tags: ["DDSP", "SVC", "Timbre"],
  },
  song: {
    name: "ComfyUI-Easy-SongGeneration",
    type: "Creation layer",
    summary:
      "负责歌曲生成，把从提示词、歌词或编排意图到完整音乐素材的生成过程接入节点工作流。",
    role: "Song Generation",
    pairs: "Simple-LLM, MSST",
    link: "https://github.com/eastmoe/ComfyUI-Easy-SongGeneration",
    tags: ["Music", "Generation", "Idea"],
  },
  mimoasr: {
    name: "ComfyUI-MIMOASR",
    type: "Text alignment layer",
    summary:
      "负责语音转录与 ASS / SRT 字幕生成，让音频内容可以继续进入剪辑、发布和多语言处理环节。",
    role: "ASR / Subtitle",
    pairs: "TTS, Song, MSST",
    link: "https://github.com/eastmoe/ComfyUI-MIMOASR",
    tags: ["ASR", "ASS", "SRT"],
  },
  msst: {
    name: "ComfyUI-MSST",
    type: "Stem and repair layer",
    summary:
      "承担人声、伴奏、和声、混响与乐器分离，并覆盖音频修复、高清化和歌声转 MIDI 的生产入口。",
    role: "Separate / Restore / MIDI",
    pairs: "SVC, Audio-DSP",
    link: "https://github.com/eastmoe/ComfyUI-MSST",
    tags: ["Separation", "Repair", "MIDI"],
  },
  indextts2: {
    name: "ComfyUI-Light-IndexTTS2",
    type: "Speech synthesis layer",
    summary:
      "IndexTTS2 的轻量级 ComfyUI 工程实现，用更少包装承接参考音频、推理参数和本地模型路径。",
    role: "Lightweight TTS",
    pairs: "Simple-LLM, Audio-DSP",
    link: "https://github.com/eastmoe/ComfyUI-Light-IndexTTS2",
    tags: ["IndexTTS2", "TTS", "Local-first"],
  },
  llm: {
    name: "ComfyUI-Simple-LLM",
    type: "Orchestration layer",
    summary:
      "只依赖 openai 库的单次 LLM API 节点，适合作为歌词、提示词、脚本、字幕润色与流程调度的轻量入口。",
    role: "Single-call LLM",
    pairs: "Song, TTS, ASR",
    link: "https://github.com/eastmoe/ComfyUI-Simple-LLM",
    tags: ["OpenAI", "LLM", "Prompt"],
  },
  qwen3: {
    name: "ComfyUI-Easy-Qwen3-TTS",
    type: "Speech synthesis layer",
    summary:
      "Qwen3-TTS 在 ComfyUI 中的工程优化实践，聚焦稳定推理、兼容性与更顺手的语音生成节点体验。",
    role: "Qwen3 TTS Practice",
    pairs: "Simple-LLM, MIMOASR",
    link: "https://github.com/eastmoe/ComfyUI-Easy-Qwen3-TTS",
    tags: ["Qwen3", "TTS", "Compat"],
  },
};

const combos = [
  ["llm", "song", "msst", "sovits", "audio-dsp", "mimoasr"],
  ["llm", "indextts2", "qwen3", "audio-dsp", "mimoasr"],
  ["msst", "audio-dsp", "ddsp", "sovits", "mimoasr"],
];

const focusType = document.querySelector("#focusType");
const focusName = document.querySelector("#focusName");
const focusSummary = document.querySelector("#focusSummary");
const focusRole = document.querySelector("#focusRole");
const focusPairs = document.querySelector("#focusPairs");
const focusLink = document.querySelector("#focusLink");
const nodeButtons = [...document.querySelectorAll(".node-button")];
const comboButtons = [...document.querySelectorAll(".combo")];
const projectGrid = document.querySelector("#projectGrid");

function setProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  focusType.textContent = project.type;
  focusName.textContent = project.name;
  focusSummary.textContent = project.summary;
  focusRole.textContent = project.role;
  focusPairs.textContent = project.pairs;
  focusLink.href = project.link;

  nodeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.project === projectId);
  });
}

function setCombo(comboIndex) {
  const activeProjects = combos[comboIndex] || combos[0];
  comboButtons.forEach((combo) => {
    combo.classList.toggle("is-active", Number(combo.dataset.combo) === comboIndex);
  });
  nodeButtons.forEach((button) => {
    button.classList.toggle("is-in-flow", activeProjects.includes(button.dataset.project));
  });
  setProject(activeProjects[0]);
}

nodeButtons.forEach((button) => {
  button.addEventListener("click", () => setProject(button.dataset.project));
});

comboButtons.forEach((combo) => {
  combo.addEventListener("click", () => setCombo(Number(combo.dataset.combo)));
});

projectGrid.innerHTML = Object.values(projects)
  .map(
    (project) => `
      <article class="project-card">
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <div class="tag-row">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <a class="card-link" href="${project.link}" target="_blank" rel="noreferrer">Open Repository</a>
      </article>
    `,
  )
  .join("");

const canvas = document.querySelector("#ambientCanvas");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let time = 0;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function drawAmbient() {
  time += 0.006;
  ctx.clearRect(0, 0, width, height);

  const lines = [
    { color: "48, 183, 212", offset: 0, amplitude: 18 },
    { color: "52, 200, 138", offset: 1.8, amplitude: 14 },
    { color: "255, 125, 110", offset: 3.2, amplitude: 12 },
  ];

  lines.forEach((line, index) => {
    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 12) {
      const y =
        height * (0.22 + index * 0.19) +
        Math.sin(x * 0.009 + time + line.offset) * line.amplitude +
        Math.cos(x * 0.004 - time * 0.8) * 8;
      if (x === -20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${line.color}, 0.26)`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  });

  requestAnimationFrame(drawAmbient);
}

resizeCanvas();
drawAmbient();
setCombo(0);

window.addEventListener("resize", resizeCanvas);
