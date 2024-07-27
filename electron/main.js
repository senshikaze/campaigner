const { app, BrowserWindow } = require("electron");
const fs = require("fs");
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
			pathname: path.join(__dirname, "app/index.html"),
			protocol: "file:",
			slashes: true
		}));
	} else {
		console.log("debug");
		win.loadURL(url.format({
			pathname: "localhost:4200",
			protocol: "http:",
			slashes: true
		}));
	}

	win.webContents.openDevTools();
};

process.on('uncaughtException', function(err) {
	fs.writeFileSync('crash.log', `${err}\n${err.stack}`);
});

app.whenReady().then(() => {
	createWindow();
});
