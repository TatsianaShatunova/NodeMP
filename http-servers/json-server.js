'use strict';

require('http')
.createServer()
.on('request', (req, res) => {
    const {url, method} = req;
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const product = {
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
        { color: 'blue' },
        { size: 'XL' }
        ]
       }

    res.write(JSON.stringify(product));
    res.end()
})
.listen(3000);