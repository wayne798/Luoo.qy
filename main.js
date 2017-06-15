const electron = require('electron');
const path = require('path');
const url = require('url');
const platform = require('os').platform();
const db = require('./static/js/db');
const user = require('./static/js/user');
const config = require('./static/js/config');
const {app, BrowserWindow } = electron;


let mainWindow = null;


// App events
app.on('ready', () => {
    mainWindow = openWindow(null, null, false);
});

app.on('window-all-closed', () => {
    platform !== 'darwin' && app.quit()
});

app.on('activate', () => {
    if (!mainWindow)
        mainWindow = openWindow(null, null, false);
    mainWindow.show();
});


// Export modules for rendering process
exports = Object.assign(exports, {
    db: db,
    user: user,
    config: config
});


// Define a function to create window
function openWindow(filePath, options, isMax) {
    !filePath && (filePath = path.join(__dirname, './static/html/index.html'));
    !options && (options = {});
    options = Object.assign(
        {
            width: 1110,
            height: 720,
            minWidth: 700,
            minHeight: 550,
            center: true,
            show: false
        },
        options
    );

    win = new BrowserWindow(options);
    isMax && win.maximize();

    win.loadURL(url.format({
        pathname: filePath,
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    win.on('ready-to-show', () => {
        win.show()
    });

    // const devToolsPath = {
    //     darwin: `/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.3_0`,
    //     win32: `C:\\Users\\HuQingyang\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\3.1.2_0`
    // }[platform];
    // BrowserWindow.addDevToolsExtension(devToolsPath);

    return win;
}