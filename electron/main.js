const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const url = require("url");

const createWindow = () => {
	const DEBUG = process.argv.includes("--debug");
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		},
	});
	win.loadURL(url.format({
		pathname: app.isPackaged ? path.join(__dirname, "app", "index.html") : `http://localhost:4200`,
		protocol: "file:",
		slashes: true
	}));

	if (DEBUG) {
		win.webContents.openDevTools();
	}
};

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if(BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

process.on('uncaughtException', function(err) {
	fs.writeFileSync('crash.log', `${err}\n${err.stack}`);
});
