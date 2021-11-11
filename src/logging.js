const ioHook = require('iohook');

class Logger {
    constructor() {
        ioHook.on('keydown', (event) => {
            console.log(event);
        });
        ioHook.start();
    }
}

module.exports = Logger;