const reveal = require('reveal-sdk-node');

(async () => {
    await reveal.warmup();
    process.exit(0);
})();