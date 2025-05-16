//console.log("Processo Principal")
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron')

// Janela Principal
const createWindow = () => {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/desktop.png',
        //resizable: false,
        //autoHideMenuBar: true,
        //titleBarStyle: 'hidden'
    })

    // Menu Personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/public/img/desktop.png',
        autoHideMenuBar: true,
        resizable: false,
    })

    about.loadFile('./src/views/sobre.html')
}

// Janela Secundária
const childWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if(father){
        const child = new BrowserWindow({
            width: 640,
            height: 480,
            icon: './src/public/img/desktop.png',
            autoHideMenuBar: true,
            resizable: false,
            parent: father,
            modal: true
        })
        child.loadFile('./src/views/child.html')
    }
}

app.whenReady().then(() => {
    createWindow()
    //aboutWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Template do Menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Janela Secundária',
                click: () => childWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o Zoom Padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Docs',
                click: () => shell.openExternal('https://www.electronjs.org/pt/docs/latest/')
            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]