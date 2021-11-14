const ioHook = require("iohook");

class Logger {
    constructor() {
        let afkTimer;
        ioHook.on("keydown", (event) => {
            clearTimeout(afkTimer);
            afkTimer = setTimeout(() => {console.log("No event for 3m, user is AFK")}, 180000);
            // To do: add functionality to reset break timer
            
        });
        ioHook.on("mousemove", (event) => {
            clearTimeout(afkTimer);
            afkTimer = setTimeout(() => {console.log("No event for 3m, user is AFK")}, 180000);
        });

        ioHook.start();
    }
   
}
module.exports = Logger
