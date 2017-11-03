'use strict';

const fs = require('fs');
const replace = require("replace");

require('http')
.createServer()
.on('request', (req, res) => {
    const {url, method} = req;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var content = fs.readFileSync('index.html');
    var formatet = content.toString('utf-8').replace(/{message}/, 'real message');
    res.write(formatet);

    fs.createReadStream('index.html', 'utf-8').pipe(res);
    res.end()
})
.listen(3000);