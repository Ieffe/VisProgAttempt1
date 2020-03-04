const electron = require("electron");

const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

app.on("ready", ()=>{ 
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Ini Aplikasi"
    });

    todayWindow. loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
}); 

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Lists"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/create.html`);
    listWindow.on("closed", () => (listWindow = null));
};

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/list.html`);
    createWindow.on("closed", () => (createWindow = null));
};

const menuTemplate=[
    {
        label: "File",
        submenu: [{
            label: "Random Submenu",
            click(){
                createWindowCreator();
            }
        },
        {
            label: "List",
            click(){
                listWindowCreator();
            }    
        },
        {
            label: "Quit",
            accelerato:process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
            click(){
                app.quit();
            }   
        }
            
        ]
    },
    {
        label: "View",
        submenu:[{role: "reload"}, {role:"toggledevtools"}]

    }

]