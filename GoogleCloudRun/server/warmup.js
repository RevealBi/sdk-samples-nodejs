const reveal = require('revealbi-node-sdk');

(async () => {
    await reveal.warmup();
    process.exit(0);
})();