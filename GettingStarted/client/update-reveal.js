const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

function downloadFile(name) {
    var fullName = `infragistics.${name}.js`;
    const file = fs.createWriteStream(`public/assets/reveal/${fullName}`);
    https.get(`https://raw.githubusercontent.com/RevealBi/sdk-samples-react/main/studio/public/Reveal/${fullName}`, function(response) {
       response.pipe(file);
    
       // after download completed close filestream
       file.on("finish", () => {
           file.close();
       });
    });
}

const langs = [
    'en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'ms', 'nl', 'pt', 'ru', 'zh-Hans', 'zh-Hant'
]

fs.mkdir('public/assets/reveal', {recursive: true}, (err) => {
    if (err) {
        console.log("Create dir failed");
    } else {           
        downloadFile("reveal");
        langs.forEach(lang => {
            downloadFile(`langpack.${lang}`);
        });
    }
})
