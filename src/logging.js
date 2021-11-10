const ioHook = require('iohook');

ioHook.on("keyup", event => {
   console.log(event);
});

ioHook.start();