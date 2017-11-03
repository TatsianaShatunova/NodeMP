'use strict';

require('http')
.createServer()
.on('request', (req, res) => {
    const {url, method} = req;
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('<h3>Hello World</h3>')
})
.listen(3000);