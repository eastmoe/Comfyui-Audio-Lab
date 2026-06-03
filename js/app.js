// ==================== 国际化数据 ====================
const T = {
    zh: {
        nav_philosophy: '设计理念',
        nav_nodes: '节点生态',
        nav_workflow: '工作流',
        hero_badge: '为 ComfyUI 打造的完整音频生态',
        hero_subtitle: '9 个专业音频节点，覆盖信号处理、AI 翻唱、歌曲生成、语音转录、源分离、语音合成与 LLM 调用——在 ComfyUI 中构建端到端音频工作流',
        hero_cta1: '探索节点生态',
        hero_cta2: '一键安装',
        stat_nodes: '专业节点',
        stat_categories: '功能领域',
        stat_extra_deps: '额外依赖冲突',
        stat_workflow: '端到端工作流',
        phil_title: '设计理念',
        phil_subtitle: '每一个设计决策都为可靠性与可组合性服务',
        phil1_title: '功能拆分',
        phil1_desc: '每个节点只做自己该做的事情。遵循 ComfyUI 原生音频规范，节点之间通过标准音频类型自由连接，像搭积木一样组合出任意工作流。',
        phil2_title: '简化依赖',
        phil2_desc: '为不同版本 transformers/torch/numpy 设置兼容层，使用本地 patch 与标准库进行功能替代，复用 ComfyUI 已有依赖——不引入额外版本冲突。',
        phil3_title: '网络友好',
        phil3_desc: '支持从 HuggingFace / hf-mirror 在线下载模型，支持关闭 SSL 证书验证，支持自定义反向代理——在任何网络环境下都能顺畅使用。',
        nodes_title: '节点生态',
        nodes_subtitle: '9 个节点覆盖音频处理全链路，各自独立又无缝协作',
        wf_title: '联合工作流',
        wf_subtitle: '节点之间的化学反应——1+1 远大于 2',
        wf_tab0: 'AI 翻唱全流程',
        wf_tab1: '从零创作歌曲',
        wf_tab2: '语音克隆与合成',
        cta_title: '开始构建你的音频工作流',
        cta_desc: '所有节点开箱即用，在 ComfyUI 中安装即可开始',
        install_windows: 'Windows',
        install_linux: 'Linux',
        install_macos: 'Mac OS',
        install_copy: '复制',
        install_detected: '复制命令，在终端里执行',
        footer_desc: '为 ComfyUI 打造的专业音频处理节点集合，覆盖从信号处理到 AI 合成的完整链路。',
        footer_cat1: '核心节点',
        footer_cat2: 'AI 翻唱与 TTS',
        footer_cat3: '工具节点',
        toast_copied: '已复制安装命令',
        node_dsp_title: 'Audio DSP',
        node_dsp_desc: '专业音频信号处理节点集，覆盖均衡器、压缩器、混响、延迟、限制器等细节调控，让每一段音频都精确到位。',
        node_sovits_title: 'So-VITS-SVC',
        node_sovits_desc: '基于 So-VITS-SVC 的 AI 声音转换节点，支持高质量声音克隆与翻唱，将任意人声转换为目标声线。',
        node_ddsp_title: 'DDSP-SVC',
        node_ddsp_desc: '基于 DDSP-SVC 的 AI 翻唱节点，轻量高效的声线迁移方案，资源占用更低，推理速度更快。',
        node_song_title: 'Easy SongGeneration',
        node_song_desc: '一站式歌曲生成节点，从歌词到完整歌曲——生成旋律、编曲与人声，快速获得完整音乐作品。',
        node_mimoasr_title: 'MIMOASR',
        node_mimoasr_desc: '高精度语音转录节点，支持 ASS/SRT 字幕文件生成，为视频配音、会议记录等场景提供可靠转录。',
        node_msst_title: 'MSST',
        node_msst_desc: '音频源分离瑞士军刀——人声/伴奏/和声/混响/各种乐器分离，音频修复与高清化，歌声转 MIDI，一站式解决。',
        node_indextts_title: 'Light IndexTTS2',
        node_indextts_desc: 'IndexTTS2 的轻量级工程实现，高效文本转语音，在保持质量的同时大幅降低资源需求。',
        node_llm_title: 'Simple LLM',
        node_llm_desc: '仅依赖 OpenAI 库的单次 LLM API 节点，简洁高效——歌词生成、文本处理、翻译，一个节点搞定。',
        node_qwen3tts_title: 'Easy Qwen3-TTS',
        node_qwen3tts_desc: 'Qwen3-TTS 在 ComfyUI 中的工程优化实践，实现高质量流式语音合成与声音克隆。',
        cat_processing: '音频处理',
        cat_cover: 'AI 翻唱',
        cat_song: '歌曲生成',
        cat_speech: '语音与 TTS',
        cat_ai: 'AI 工具',
        wf0_title: 'AI 翻唱全流程',
        wf0_desc: '从一首原曲出发，分离人声与伴奏，用 AI 模型将人声转换为目标声线，再与伴奏混合并进行后期处理——完整的翻唱生产线。',
        wf0_s1: '输入原曲',
        wf0_s2: '分离人声/伴奏',
        wf0_s3: '声线转换',
        wf0_s4: '混合与后期',
        wf0_s5: '输出翻唱',
        wf1_title: '从零创作歌曲',
        wf1_desc: '用 LLM 生成歌词，通过歌曲生成模型创作完整歌曲，再用源分离拆分声部，最后进行精细混音处理——从灵感到成品。',
        wf1_s1: 'LLM 生成歌词',
        wf1_s2: '生成完整歌曲',
        wf1_s3: '分离声部',
        wf1_s4: '精细混音',
        wf1_s5: '输出成品',
        wf2_title: '语音克隆与合成',
        wf2_desc: '转录参考语音文本，通过 LLM 处理或改写，再用 TTS 模型合成目标语音，最后进行音质优化——灵活的语音生产管线。',
        wf2_s1: '转录参考语音',
        wf2_s2: '文本处理/改写',
        wf2_s3: '语音合成',
        wf2_s4: '音质优化',
        wf2_s5: '输出语音',
    },
    en: {
        nav_philosophy: 'Philosophy',
        nav_nodes: 'Nodes',
        nav_workflow: 'Workflows',
        hero_badge: 'A complete audio ecosystem for ComfyUI',
        hero_subtitle: '9 professional audio nodes covering signal processing, AI cover, song generation, speech transcription, source separation, speech synthesis & LLM — build end-to-end audio workflows in ComfyUI',
        hero_cta1: 'Explore Nodes',
        hero_cta2: 'One-Click Install',
        stat_nodes: 'Specialized Nodes',
        stat_categories: 'Domains',
        stat_extra_deps: 'Dependency Conflicts',
        stat_workflow: 'End-to-End Workflow',
        phil_title: 'Design Philosophy',
        phil_subtitle: 'Every design decision serves reliability and composability',
        phil1_title: 'Function Decomposition',
        phil1_desc: 'Each node does exactly one thing. Following ComfyUI native audio specs, nodes connect via standard audio types — combine them like building blocks into any workflow.',
        phil2_title: 'Simplified Dependencies',
        phil2_desc: 'Compatibility layers for different transformers/torch/numpy versions, local patches and stdlib replacements, reusing ComfyUI dependencies — no version conflicts introduced.',
        phil3_title: 'Network Friendly',
        phil3_desc: 'Online model downloads from HuggingFace / hf-mirror, optional SSL verification bypass, custom reverse proxy support — works smoothly in any network environment.',
        nodes_title: 'Node Ecosystem',
        nodes_subtitle: '9 nodes covering the full audio pipeline, independent yet seamlessly collaborative',
        wf_title: 'Combined Workflows',
        wf_subtitle: 'The chemistry between nodes — 1+1 is far greater than 2',
        wf_tab0: 'AI Cover Pipeline',
        wf_tab1: 'Song from Scratch',
        wf_tab2: 'Voice Clone & Synth',
        cta_title: 'Start Building Your Audio Workflow',
        cta_desc: 'All nodes work out of the box — install in ComfyUI and get started',
        install_windows: 'Windows',
        install_linux: 'Linux',
        install_macos: 'Mac OS',
        install_copy: 'Copy',
        install_detected: 'Copy command and run it in terminal',
        footer_desc: 'Professional audio processing node collection for ComfyUI, covering the full pipeline from signal processing to AI synthesis.',
        footer_cat1: 'Core Nodes',
        footer_cat2: 'AI Cover & TTS',
        footer_cat3: 'Utility Nodes',
        toast_copied: 'Install command copied',
        node_dsp_title: 'Audio DSP',
        node_dsp_desc: 'Professional audio signal processing nodes — EQ, compressor, reverb, delay, limiter and more. Fine-tune every detail of your audio.',
        node_sovits_title: 'So-VITS-SVC',
        node_sovits_desc: 'AI voice conversion based on So-VITS-SVC. High-quality voice cloning and covers — transform any vocal into a target voice.',
        node_ddsp_title: 'DDSP-SVC',
        node_ddsp_desc: 'AI cover node based on DDSP-SVC. Lightweight and efficient voice conversion with lower resource usage and faster inference.',
        node_song_title: 'Easy SongGeneration',
        node_song_desc: 'One-stop song generation — from lyrics to complete songs. Generate melody, arrangement, and vocals to quickly produce full musical works.',
        node_mimoasr_title: 'MIMOASR',
        node_mimoasr_desc: 'High-precision speech transcription with ASS/SRT subtitle generation. Reliable transcription for dubbing, meeting notes, and more.',
        node_msst_title: 'MSST',
        node_msst_desc: 'Audio source separation Swiss Army knife — vocal/accompaniment/harmony/reverb/instrument separation, audio repair & HD enhancement, singing-to-MIDI. All in one.',
        node_indextts_title: 'Light IndexTTS2',
        node_indextts_desc: 'Lightweight engineering implementation of IndexTTS2. Efficient text-to-speech that maintains quality while drastically reducing resource needs.',
        node_llm_title: 'Simple LLM',
        node_llm_desc: 'Single-call LLM API node with only OpenAI library dependency. Clean and efficient — lyrics generation, text processing, translation in one node.',
        node_qwen3tts_title: 'Easy Qwen3-TTS',
        node_qwen3tts_desc: 'Engineering optimization of Qwen3-TTS in ComfyUI. High-quality streaming speech synthesis and voice cloning.',
        cat_processing: 'Processing',
        cat_cover: 'AI Cover',
        cat_song: 'Song Gen',
        cat_speech: 'Speech & TTS',
        cat_ai: 'AI Tool',
        wf0_title: 'AI Cover Pipeline',
        wf0_desc: 'Start from an original song, separate vocals and accompaniment, convert vocals to target voice with AI, then mix and post-process — a complete cover production line.',
        wf0_s1: 'Input Song',
        wf0_s2: 'Separate Vocals',
        wf0_s3: 'Voice Conversion',
        wf0_s4: 'Mix & Post-Process',
        wf0_s5: 'Output Cover',
        wf1_title: 'Song from Scratch',
        wf1_desc: 'Generate lyrics with LLM, create a complete song, separate stems, and fine-tune the mix — from inspiration to finished product.',
        wf1_s1: 'LLM Lyrics',
        wf1_s2: 'Generate Song',
        wf1_s3: 'Separate Stems',
        wf1_s4: 'Fine-Tune Mix',
        wf1_s5: 'Output Track',
        wf2_title: 'Voice Clone & Synth',
        wf2_desc: 'Transcribe reference speech, process or rewrite text with LLM, synthesize target speech with TTS, then enhance audio quality — a flexible voice production pipeline.',
        wf2_s1: 'Transcribe Speech',
        wf2_s2: 'Process Text',
        wf2_s3: 'Speech Synthesis',
        wf2_s4: 'Enhance Quality',
        wf2_s5: 'Output Voice',
    }
};

// ==================== 节点数据 ====================
const nodes = [
    { id: 'dsp', key: 'node_dsp', icon: 'fa-wave-square', cat: 'processing', catKey: 'cat_processing', repo: 'ComfyUI-Audio-DSP', color: '#E8863A' },
    { id: 'msst', key: 'node_msst', icon: 'fa-layer-group', cat: 'processing', catKey: 'cat_processing', repo: 'ComfyUI-MSST', color: '#E8863A' },
    { id: 'sovits', key: 'node_sovits', icon: 'fa-microphone-lines', cat: 'cover', catKey: 'cat_cover', repo: 'ComfyUI-so-vits-svc', color: '#E85D75' },
    { id: 'ddsp', key: 'node_ddsp', icon: 'fa-microphone', cat: 'cover', catKey: 'cat_cover', repo: 'ComfyUI-DDSP-SVC', color: '#E85D75' },
    { id: 'song', key: 'node_song', icon: 'fa-music', cat: 'song', catKey: 'cat_song', repo: 'ComfyUI-Easy-SongGeneration', color: '#3AAE8B' },
    { id: 'mimoasr', key: 'node_mimoasr', icon: 'fa-closed-captioning', cat: 'speech', catKey: 'cat_speech', repo: 'ComfyUI-MIMOASR', color: '#5B8DEF' },
    { id: 'indextts', key: 'node_indextts', icon: 'fa-volume-high', cat: 'speech', catKey: 'cat_speech', repo: 'ComfyUI-Light-IndexTTS2', color: '#5B8DEF' },
    { id: 'qwen3tts', key: 'node_qwen3tts', icon: 'fa-comment-dots', cat: 'speech', catKey: 'cat_speech', repo: 'ComfyUI-Easy-Qwen3-TTS', color: '#5B8DEF' },
    { id: 'llm', key: 'node_llm', icon: 'fa-brain', cat: 'ai', catKey: 'cat_ai', repo: 'ComfyUI-Simple-LLM', color: '#8B8A8E' },
];

// ==================== 工作流数据 ====================
const workflows = [
    {
        titleKey: 'wf0_title', descKey: 'wf0_desc',
        steps: [
            { key: 'wf0_s1', icon: 'fa-file-audio', node: null },
            { key: 'wf0_s2', icon: 'fa-layer-group', node: 'MSST' },
            { key: 'wf0_s3', icon: 'fa-microphone-lines', node: 'So-VITS / DDSP' },
            { key: 'wf0_s4', icon: 'fa-wave-square', node: 'Audio DSP' },
            { key: 'wf0_s5', icon: 'fa-check-circle', node: null },
        ]
    },
    {
        titleKey: 'wf1_title', descKey: 'wf1_desc',
        steps: [
            { key: 'wf1_s1', icon: 'fa-brain', node: 'Simple LLM' },
            { key: 'wf1_s2', icon: 'fa-music', node: 'SongGeneration' },
            { key: 'wf1_s3', icon: 'fa-layer-group', node: 'MSST' },
            { key: 'wf1_s4', icon: 'fa-wave-square', node: 'Audio DSP' },
            { key: 'wf1_s5', icon: 'fa-check-circle', node: null },
        ]
    },
    {
        titleKey: 'wf2_title', descKey: 'wf2_desc',
        steps: [
            { key: 'wf2_s1', icon: 'fa-closed-captioning', node: 'MIMOASR' },
            { key: 'wf2_s2', icon: 'fa-brain', node: 'Simple LLM' },
            { key: 'wf2_s3', icon: 'fa-volume-high', node: 'IndexTTS2 / Qwen3' },
            { key: 'wf2_s4', icon: 'fa-wave-square', node: 'Audio DSP' },
            { key: 'wf2_s5', icon: 'fa-check-circle', node: null },
        ]
    }
];

// ==================== 状态 ====================
let currentLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let currentWf = 0;
let currentInstallOS = detectUserOS();

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 应用保存的偏好
    const savedLang = localStorage.getItem('lang');
    const savedTheme = localStorage.getItem('theme');
    if (savedLang) currentLang = savedLang;
    if (savedTheme) currentTheme = savedTheme;

    applyTheme(currentTheme);
    applyLang(currentLang);
    renderNodes();
    renderWorkflow(0);
    initCanvas();
    initScrollReveal();
    initNavScroll();
    initCursorGlow();
    bindEvents();
});

// ==================== 主题 ====================
function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    updateLangButtons();
}

function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// ==================== 语言 ====================
function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (T[lang] && T[lang][key]) {
            el.textContent = T[lang][key];
        }
    });
    // 重新渲染节点和工作流（因为部分内容不在 i18n 系统中）
    renderNodes();
    renderWorkflow(currentWf);
    renderInstallCommands();
    localStorage.setItem('lang', lang);
    updateLangButtons();
}

function updateLangButtons() {
    const label = currentLang === 'zh' ? 'EN' : '中文';
    document.getElementById('langToggle').textContent = label;
    document.getElementById('langToggleMobile').textContent = label;
}

function toggleLang() {
    applyLang(currentLang === 'zh' ? 'en' : 'zh');
}

// ==================== 渲染节点卡片 ====================
function renderNodes() {
    const grid = document.getElementById('nodesGrid');
    const catClass = { processing: 'cat-processing', cover: 'cat-cover', song: 'cat-song', speech: 'cat-speech', ai: 'cat-ai' };
    grid.innerHTML = nodes.map((n, i) => `
        <a href="https://github.com/eastmoe/${n.repo}" target="_blank" 
           class="node-card ${catClass[n.cat]} reveal reveal-delay-${Math.min(i % 3 + 1, 5)} relative block p-6 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/8 border-black/8 hover:dark:border-white/15 hover:border-black/15 hover:dark:shadow-[0_8px_40px_rgba(232,134,58,0.06)] hover:shadow-[0_8px_40px_rgba(232,134,58,0.08)]"
           style="--cat: ${n.color};">
            <div class="flex items-start justify-between mb-4">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style="background: color-mix(in srgb, ${n.color} 12%, transparent); color: ${n.color};">
                    <i class="fa-solid ${n.icon}"></i>
                </div>
                <span class="cat-badge" style="--cat: ${n.color};">${T[currentLang][n.catKey]}</span>
            </div>
            <h3 class="font-heading font-700 text-base mb-2">${T[currentLang][n.key + '_title']}</h3>
            <p class="text-sm dark:text-white/50 text-black/50 leading-relaxed">${T[currentLang][n.key + '_desc']}</p>
            <div class="mt-4 flex items-center gap-1.5 text-xs font-medium" style="color: ${n.color};">
                <i class="fa-brands fa-github"></i> ${n.repo}
            </div>
        </a>
    `).join('');
    // 重新观察新元素
    initScrollReveal();
}

// ==================== 渲染工作流 ====================
function renderWorkflow(idx) {
    currentWf = idx;
    const wf = workflows[idx];
    const container = document.getElementById('wfContent');
    
    container.innerHTML = `
        <div class="text-center mb-10">
            <h3 class="font-heading font-700 text-xl mb-3">${T[currentLang][wf.titleKey]}</h3>
            <p class="dark:text-white/50 text-black/50 max-w-2xl mx-auto text-sm leading-relaxed">${T[currentLang][wf.descKey]}</p>
        </div>
        <div class="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-6 px-2">
            ${wf.steps.map((s, i) => `
                <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div class="wf-step text-center p-4 sm:p-5 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/8 border-black/8 min-w-[90px] sm:min-w-[120px]">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-base sm:text-lg" style="background: var(--accent-subtle); color: var(--accent);">
                            <i class="fa-solid ${s.icon}"></i>
                        </div>
                        <div class="text-xs sm:text-sm font-heading font-600 mb-1">${T[currentLang][s.key]}</div>
                        ${s.node ? `<div class="text-[10px] sm:text-xs dark:text-white/40 text-black/40">${s.node}</div>` : ''}
                    </div>
                    ${i < wf.steps.length - 1 ? `<div class="wf-arrow text-lg dark:text-white/20 text-black/20 shrink-0"><i class="fa-solid fa-arrow-right"></i></div>` : ''}
                </div>
            `).join('')}
        </div>
    `;

    // 更新标签状态
    document.querySelectorAll('.wf-tab').forEach(tab => {
        tab.classList.toggle('active', parseInt(tab.dataset.wf) === idx);
    });
}

// ==================== 画布动画 ====================
function initCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let w, h, mouseX = 0.5, mouseY = 0.5, time = 0;
    let animId;

    function resize() {
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 鼠标追踪
    canvas.parentElement.addEventListener('mousemove', e => {
        const rect = canvas.parentElement.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
    });

    const waves = [
        { freq: 2.5, amp: 0.08, speed: 0.6, opacity: 0.25, width: 2 },
        { freq: 3.2, amp: 0.06, speed: 0.8, opacity: 0.18, width: 1.5 },
        { freq: 1.8, amp: 0.1, speed: 0.4, opacity: 0.3, width: 2.5 },
        { freq: 4.0, amp: 0.04, speed: 1.0, opacity: 0.12, width: 1 },
        { freq: 2.0, amp: 0.07, speed: 0.5, opacity: 0.2, width: 2 },
    ];

    function getColor(opacity) {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            return `rgba(232, 134, 58, ${opacity})`;
        } else {
            return `rgba(200, 100, 30, ${opacity * 0.5})`;
        }
    }

    function draw() {
        time += 0.008;
        ctx.clearRect(0, 0, w, h);

        waves.forEach(wave => {
            ctx.beginPath();
            const mouseFreqMod = 1 + (mouseX - 0.5) * 0.3;
            const mouseAmpMod = 1 + (mouseY - 0.5) * 0.4;

            for (let x = 0; x <= w; x += 2) {
                const nx = x / w;
                const y = h * 0.5 +
                    Math.sin(nx * Math.PI * 2 * wave.freq * mouseFreqMod + time * wave.speed) * h * wave.amp * mouseAmpMod +
                    Math.sin(nx * Math.PI * 2 * wave.freq * 0.5 + time * wave.speed * 1.3) * h * wave.amp * 0.3 +
                    Math.sin(nx * Math.PI * 2 * wave.freq * 1.7 + time * wave.speed * 0.7) * h * wave.amp * 0.15;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.strokeStyle = getColor(wave.opacity);
            ctx.lineWidth = wave.width;
            ctx.stroke();
        });

        // 添加浮动的发光点
        const dotCount = 12;
        for (let i = 0; i < dotCount; i++) {
            const nx = (Math.sin(time * 0.3 + i * 2.1) * 0.5 + 0.5);
            const ny = 0.5 + Math.sin(time * 0.5 + i * 1.7) * 0.15 + Math.sin(time * 0.3 + i * 0.9) * 0.1;
            const dx = nx * w;
            const dy = ny * h;
            const r = Math.max(1, 2 + Math.sin(time + i) * 1.5);
            const alpha = 0.15 + Math.sin(time * 0.8 + i) * 0.1;

            ctx.beginPath();
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
            ctx.fillStyle = getColor(alpha);
            ctx.fill();
        }

        animId = requestAnimationFrame(draw);
    }

    draw();
}

// ==================== 滚动揭示动画 ====================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// ==================== 导航滚动效果 ====================
function initNavScroll() {
    const nav = document.getElementById('nav');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== 光标追踪光效 ====================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    let ticking = false;
    document.addEventListener('mousemove', e => {
        if (!ticking) {
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
                glow.classList.add('active');
                ticking = false;
            });
            ticking = true;
        }
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('active'));
    // 仅在宽屏启用
    if (window.innerWidth < 1024) glow.style.display = 'none';
    window.addEventListener('resize', () => {
        glow.style.display = window.innerWidth < 1024 ? 'none' : '';
    });
}

// ==================== 事件绑定 ====================
function bindEvents() {
    // 主题切换
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

    // 语言切换
    document.getElementById('langToggle').addEventListener('click', toggleLang);
    document.getElementById('langToggleMobile').addEventListener('click', toggleLang);

    // 移动端菜单
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.toggle('open');
    });

    // 点击导航链接关闭移动端菜单
    document.querySelectorAll('#mobileMenu a').forEach(a => {
        a.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('open');
        });
    });

    // 工作流标签
    document.querySelectorAll('.wf-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            renderWorkflow(parseInt(tab.dataset.wf));
        });
    });

    // 一键安装系统切换
    document.querySelectorAll('[data-install-os]').forEach(btn => {
        btn.addEventListener('click', () => {
            setInstallOS(btn.dataset.installOs);
        });
    });

    // 一键安装命令复制
    document.getElementById('copyInstallCommand').addEventListener('click', () => {
        copyInstallCommand();
    });
}

// ==================== 一键安装命令 ====================
function detectUserOS() {
    const platform = [
        navigator.userAgentData && navigator.userAgentData.platform,
        navigator.platform,
        navigator.userAgent
    ].filter(Boolean).join(' ').toLowerCase();

    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'macos';
    return 'linux';
}

function getInstallScriptUrl(fileName) {
    return new URL(fileName, window.location.href).href;
}

function escapeDoubleQuotes(value) {
    return value.replace(/"/g, '\\"');
}

function getInstallCommand(os) {
    const shellScriptUrl = escapeDoubleQuotes(getInstallScriptUrl('install-comfyui-audio-lab.sh'));
    const powershellScriptUrl = escapeDoubleQuotes(getInstallScriptUrl('install-comfyui-audio-lab.ps1'));

    if (os === 'windows') {
        return `$p=Join-Path $env:TEMP "install-comfyui-audio-lab.ps1"; Invoke-WebRequest "${powershellScriptUrl}" -OutFile $p; powershell -ExecutionPolicy Bypass -File $p`;
    }

    return `tmp="$(mktemp)" && curl -fsSL "${shellScriptUrl}" -o "$tmp" && bash "$tmp"; rm -f "$tmp"`;
}

function setInstallOS(os) {
    currentInstallOS = os;
    renderInstallCommands();
}

function renderInstallCommands() {
    const osMeta = {
        windows: { titleKey: 'install_windows', icon: 'fa-windows' },
        linux: { titleKey: 'install_linux', icon: 'fa-linux' },
        macos: { titleKey: 'install_macos', icon: 'fa-apple' },
    };
    const meta = osMeta[currentInstallOS] || osMeta.linux;
    const title = document.getElementById('installOsTitle');
    const icon = document.getElementById('installOsIcon');
    const command = document.getElementById('installCommand');

    if (title) title.textContent = T[currentLang][meta.titleKey];
    if (icon) icon.className = `fa-brands ${meta.icon}`;
    if (command) command.textContent = getInstallCommand(currentInstallOS);

    document.querySelectorAll('[data-install-os]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.installOs === currentInstallOS);
    });
}

function copyInstallCommand() {
    const cmd = getInstallCommand(currentInstallOS);
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
        copyTextFallback(cmd);
        return;
    }

    navigator.clipboard.writeText(cmd).then(() => {
        showToast(T[currentLang].toast_copied);
    }).catch(() => {
        copyTextFallback(cmd);
    });
}

function copyTextFallback(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(T[currentLang].toast_copied);
}

// ==================== Toast ====================
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
