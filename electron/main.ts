import electron, {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItemConstructorOptions,
  shell,
  Tray,
  nativeImage,
} from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
// import createTray from './tray'
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// 判断是否为 macOS
const is_mac = process.platform === 'darwin'

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    alwaysOnTop: true,
    // 是否有标题栏和x按钮,true是有x,,false没有x但是窗口没法拖动
    frame: false,
    // 是否显示
    show: true,
    width: 300,
    height: 300,
    minHeight: 250,
    minWidth: 250,
    maxHeight: 500,
    maxWidth: 500,
    // 隐藏任务栏
    skipTaskbar: false,
    // 窗口渲染开始的坐标
    x: 1900,
    y: 100,
    // 背景透明
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.setAlwaysOnTop(true, 'screen-saver')
  // 设置窗口在所有工作区都可见
  win.setVisibleOnAllWorkspaces(true)

  // 控制缩放比例
  win.setAspectRatio(1 / 1)
  win.webContents.openDevTools()

  // 拦截a链接,用默认浏览器打开
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 如果是 macOS，则隐藏 dock 图标
if (is_mac) {
  console.log('ismac')
  app.dock.hide() // - 1 -

  console.log(app.dock.isVisible())
}

const createTray = () => {
  const icon = nativeImage.createFromPath(
    process.platform == 'darwin'
      ? '/Users/yuanchang/electron/houdunren/camera-electron/electron/images/trayTemplate@2x.png'
      : '/Users/yuanchang/electron/houdunren/camera-electron/electron/imagess/windowTray.png'
  )
  const tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([{ label: '退出', role: 'quit' }])
  tray.setToolTip('Rubyc的摄像头')
  tray.setContextMenu(contextMenu)
  // tray.setTitle('苑畅')
}

app.whenReady().then(() => {
  createWindow()
  createTray()
})

ipcMain.on('windowMoving', (e, { mouseX, mouseY }) => {
  // console.log('moving')
  const { x, y } = electron.screen.getCursorScreenPoint()
  win.setPosition(x - mouseX, y - mouseY)
})

ipcMain.on('windowMoved', () => {
  // console.log('moved end')
  // Do somehting when dragging stop
})

// 右键退出
ipcMain.on('quit', () => {
  const template = [
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ] as MenuItemConstructorOptions

  const menu = Menu.buildFromTemplate(template)
  menu.popup()
})

// 系统图标
