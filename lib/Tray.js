module.exports = setupTray;

var {Menu, Tray, MenuItem, nativeImage} = require('electron'),
    Lib = require('./'),
    opener = require('opener'),
    URL = require('url'),
    tray = null,
    contextMenu;

function setupTray() {
    tray = new Tray(Lib.fs.getFullPath('./icons/Checkmark.png'));
    contextMenu = Menu.buildFromTemplate([
        {checked: true, label: 'Settings', icon: getIcon('wrench'), submenu: [
            {
                checked: Lib.State.get(Lib.State.keys.NOTIFICATION_SOUND_ON), 
                type: 'checkbox', label: "Notifications have sound",
                click: updateSetting.bind(null, Lib.State.keys.NOTIFICATION_SOUND_ON)
            }
        ]},
        {type: 'separator'},
        {label: 'About', icon: getIcon('about'), click: () => opener("https://github.com/vadash/SpotifyKeep/blob/master/readme.md")},
        {label: 'Report an Issue', icon: getIcon('error'),  click: () => opener("https://github.com/vadash/SpotifyKeep/issues")},
        {type: 'separator'},
        {label: 'Quit', icon: getIcon('skull'), role: 'quit'}
    ]);

    tray.setContextMenu(contextMenu);
}

function updateSetting(setting, menuItem) {
    Lib.State.set(setting, menuItem.checked);
}

function getIcon(iconFileName) {
    var natImg = nativeImage.createFromPath(Lib.fs.getFullPath(`/icons/${iconFileName}.png`))
        .resize({width: 25});
    
    if (natImg.isEmpty()) {
        console.debug("Could not load icon " + iconFileName);
    }

    return natImg;
}
