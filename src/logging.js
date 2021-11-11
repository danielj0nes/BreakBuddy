const ioHook = require("iohook");

class Logger {
    constructor() {
        ioHook.on("keydown", (event) => {
            console.log(`Key pressed: ${String.fromCharCode(event.rawcode)}`);
        });
        ioHook.on("mousemove", (event) => {
            // console.log("Mouse moved");
        });
        ioHook.start();
    }
}

module.exports = Logger;
