'use strict';
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// 固定应用名与 userData 路径，保证 localStorage 跨启动持久（portable 版每次解压到临时目录，但 userData 在 %APPDATA% 下固定）
app.setName('modu-casefiles');
app.setPath('userData', path.join(app.getPath('appData'), 'modu-casefiles'));

const isDev = process.argv.includes('--dev');
const APP_DIR = path.join(__dirname, 'app');

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 800, minHeight: 600,
    title: '默读·案卷',
    backgroundColor: '#0c1018',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    show: false,
    webPreferences: {
      devTools: isDev,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });
  win.setMenuBarVisibility(false);
  // 保持固定窗口标题，不被页面 <title> 覆盖
  win.on('page-title-updated', e => e.preventDefault());
  win.once('ready-to-show', () => win.show());

  const isLocal = url => url.startsWith('file:');
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:|^mailto:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!isLocal(url)) { e.preventDefault(); if (/^https?:|^mailto:/i.test(url)) shell.openExternal(url); }
  });
  if (!isDev) {
    win.webContents.on('before-input-event', (e, input) => {
      const k = (input.key || '').toLowerCase();
      if (k === 'f12' || ((input.control || input.meta) && input.shift && (k === 'i' || k === 'j' || k === 'c'))) e.preventDefault();
    });
  }
  win.loadFile(path.join(APP_DIR, 'index.html'));
  win.on('closed', () => { win = null; });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
// 完全离线：拦截一切非本地网络请求
app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  const { session } = require('electron');
  session.defaultSession.webRequest.onBeforeRequest((details, cb) => {
    const u = details.url;
    cb({ cancel: !(u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('devtools:') || u.startsWith('chrome-extension:')) });
  });
  createWindow();
});
app.on('window-all-closed', () => app.quit());
