import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon1.png'

let mainWindow: BrowserWindow | null = null // Variável para armazenar a instância da janela principal

function createWindow(): void {
  if (mainWindow) {
    // Se a janela já estiver aberta, focar nela
    mainWindow.focus()
    return
  }

  // Criar a nova janela
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? { icon }
      : {
          icon: join(__dirname, '../../resources/icon1.png'),
        }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Limpar a referência quando a janela for fechada
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

if (process.platform === 'darwin') {
  app.dock.setIcon(icon)
}

app.whenReady().then(() => {
  app.setName('Seu Nome de Aplicação')
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow() // Cria a janela quando o aplicativo está pronto

  app.on('activate', () => {
    if (mainWindow === null) createWindow() // Cria uma nova janela se nenhuma estiver aberta
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
