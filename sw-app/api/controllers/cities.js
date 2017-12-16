'use strict';


const http = require('http');

module.exports = {
    getCities: getCities
};


function getCities(req, res) {
    console.log('I am here..');
    res.json([]);
    // http.get('http://localhost:3000/api/cities', (resp) => {
    //     let data = '';

    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         res.json(data);
    //     });

    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
}
