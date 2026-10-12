# 默读·案卷（modu-casefiles）

《默读》同人改编的**文字推理游戏**合集。启动后进入「案卷柜」，从柜中抽出案卷开始阅读、搜证、推理与对质。纯 HTML/CSS/JS 单文件实现，完全离线运行，进度自动保存在本地（localStorage）。

## 收录内容

| 案卷 | 状态 |
| --- | --- |
| 正卷·卷一《于连》— 何忠义案 | ✅ 可玩（`app/modu-vol1-dantes.html`） |
| 外传「博物馆之夜」 | ✅ 可玩（`app/modu-museum-night.html`） |
| 卷二 – 卷五 | 🚧 待制作 |

## 目录结构

```
.
├── app/                     # 游戏本体（Electron 加载的就是这里）
│   ├── index.html           # 案卷柜启动页
│   ├── modu-vol1-dantes.html    # 正卷·卷一《于连》何忠义案
│   └── modu-museum-night.html   # 外传「博物馆之夜」
├── build/                   # 应用图标（icon.ico / icon.png）
├── standalone/              # 两个案卷的独立单页版（不带「返回案卷柜」按钮）
├── docs/modu-vol1-outline.md    # 卷一剧情 / 线索设计大纲
├── main.js                  # Electron 主进程（单实例、禁外网、固定 userData）
└── package.json             # Electron + electron-builder 配置
```

## 在浏览器里玩

不需要安装任何东西：

1. 克隆或下载本仓库；
2. 用 Chrome / Edge / Firefox 直接打开 `app/index.html`，在案卷柜里选择案卷即可。

也可以单独打开 `app/` 或 `standalone/` 下的某个案卷 HTML 直接开玩。

## 打包为 Windows exe

需要 Node.js（建议 20+）。本仓库使用 Electron 44.7.0 + electron-builder 26.15.3，目标为 Windows x64 **portable** 单文件 exe（配置见 `package.json` 的 `build` 字段）。

```bash
npm install
npx electron-builder --win      # 产物：dist/modu-casefiles.exe
```

- 在 Linux / macOS 上交叉打包 Windows 版本需要安装 Wine。
- 本地调试：`npm start`（加 `-- --dev` 可开启开发者工具）。
- 现成的 exe 见 Releases 页面。首次运行若出现 Windows SmartScreen「已保护你的电脑」，点「更多信息」→「仍要运行」。

## 声明

- 本项目是基于 Priest 小说《默读》的**非商业同人作品**，仅供个人学习与交流，请勿用于任何商业用途。
- 游戏中的案件、文本与谜题为二次创作，**未复制原著正文**；人物与世界观版权归原作者及相关权利方所有。
- 如有侵权请联系删除。
