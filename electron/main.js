const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");


const createWindow = () => {
	const DEBUG = process.argv.includes("--debug");
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});
	if (!DEBUG){
		win.loadURL(url.format({
			pathname: path.join(__dirname, "../web/dist/campaigner-web/index.html"),
			protocol: "file:",
			slashes: true
		}));
	} else {
		win.loadURL(url.format({
			pathname: "localhost:4200",
			protocol: "http:",
			slashes: true
		}));
	}

	win.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();
});
