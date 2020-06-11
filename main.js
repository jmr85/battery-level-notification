// Modules to control application life and create native browser window
const {Menu, app, BrowserWindow} = require('electron')
const path = require('path')

if(process.env.NODE_ENV !== 'production'){
  require('electron-reload')(__dirname, {//refresca code de los browser windows (html)
    electron: path.join(__dirname, '/node_modules', '.bin', 'electron')//refresca code principal de node
  })
}//este plugin queda desactivado cuando pasa a produccion

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const templateMenu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'About',
          accelerator: 'Ctrl+N',
          click() {
            console.log("click submenu About");
            createNewAboutWindow();
          }
        },
        {
          label: 'Exit',
          accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    }
  ];
  // Menu
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  // Set The Menu to the Main Window
  Menu.setApplicationMenu(mainMenu);
  //Menu.setApplicationMenu(null)
  // Menu Template
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    app.quit();
  });
}// end windows main

function createNewAboutWindow() {
  const newAboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'About',
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  newAboutWindow.setMenu(null);
  newAboutWindow.loadFile('about.html');
  
  newAboutWindow.loadURL('about.html');
  newAboutWindow.on('closed', () => {
    newProductWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
