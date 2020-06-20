const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const url = require('url');

// TODO: these should be pesisted and pulled on start up
const winWidth = 1000;
const winHeight = 720;

// TODO: share this between css and js ...

global.chat = {
  show: true,
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#121212',
    show: false
  });

  // important to get right entry depending on react dev or prod build
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl)

  // webview
  const view = new BrowserView();
  win.setBrowserView(view);
  const bounds = win.getContentBounds();
  view.setBounds({
    x: 0,
    y: 47,
    width: bounds.width,
    height: bounds.height - 47
  });
  view.webContents.loadURL('https://www.netflix.com/');

  // Open the DevTools.
  win.webContents.openDevTools()

  // win events
  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('resize', () => {
    const bounds = win.getContentBounds();
    view.setBounds({
      x: 0,
      y: 47,
      width: bounds.width - (global.chat.show ? 340 : 0),
      height: bounds.height - 47
    });
  });
}

// For Widevine Content Decryption Module
app.commandLine.appendSwitch('widevine-cdm-path', '../libwidevinecdm.dylib')
// The version of plugin can be got from `chrome://components` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.1610.0')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.