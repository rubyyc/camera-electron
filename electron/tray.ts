import { Menu, Tray } from 'electron'

import path from 'node:path'

const createTray = () => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? './images/trayTemplate@2x.png'
        : './images/windowTray.png'
    )
  )

  const contextMenu = Menu.buildFromTemplate([{ label: '退出', role: 'quit' }])
  tray.setToolTip('Rubyc的摄像头')
  tray.setContextMenu(contextMenu)
}

export default createTray
