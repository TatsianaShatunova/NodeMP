'use strict';
const parseArgs = require('minimist');
const fs = require('fs');
const through = require('through2');
const replaceExt = require('replace-ext');
const request = require('request');
const https = require('https');

var args = parseArgs(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file', 'action', 'path'],
    alias: { help: ['h'], file: ['f'], action: ['a'], path: ['p'] },
    unknown: (arg) => {
        if (arg !== 'help' && arg !== 'h' && arg !== 'file' && arg !== 'f' && arg !== 'action' && arg != 'a' && arg != 'path' && arf != 'p') {
            console.error('Unknown argument', arg);
            return false;
        }
    }
});

if (module.parent == null) {
    
    if (process.argv.length < 2) {
        console.log('Wrong input!');
        printHelp();
    } else if (process.argv[2] && process.argv[2].startsWith('-h')) {
        printHelp();
    } else {
        streamsActions(args.file, args.action, args.path);
    }
}

function streamsActions(filePath, action, bundleFilesPath) {

    console.log(`\r\n Action = ${action}`);
    console.log(`\r\n File = ${filePath}`);

    switch (action) {
        case 'io':
            inputOutput(filePath);
            break;
        case 'transformToApper':
            transformToApper();
            break;
        case 'transformToJson':
            transformToJson(filePath);
            break;
        case '':
            writeJson(filePath);
            break;
        case 'bundle-css':
            cssBundler(bundleFilesPath);
            break;
        default:
            throw Error("Unknown parameter!");
    }
}

function printHelp() {
    console.log(
        `-h, --help  Shows application usage message
         -a, --action: Action  Action to be called
         -f, --file: File   File to be used`
    );
}

function inputOutput(filePath) {
    console.log('\r\n Creating pipe');
    const reader = fs.createReadStream(filePath);

    reader.pipe(process.stdout);
}

function transformToApper() {

    console.log('\r\n File transformation to upper');

    var write = function (buffer, encoding, next) {
        var data = buffer.toString();
        this.push(data.toUpperCase());
        next();
    }
    var end = function (done) {
        done();
    }
    var stream = through(write, end);
    process.stdin.pipe(stream).pipe(process.stdout);
}

function transformToJson(filePath) {
    console.log('\r\n File transformation to json');
    const reader = fs.createReadStream(filePath);

    var write = function (buffer, encoding, next) {
        var data = buffer.toString();
        this.push(JSON.stringify(data));
        next();
    }
    var end = function (done) {
        done();
    }
    var stream = through(write, end);
    reader.pipe(stream).pipe(process.stdout);
}

function writeJson(filePath) {
    console.log('\r\n Writing file as json');

    var newPath = replaceExt(filePath, '.json');
    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(newPath);

    const toJson = through((chunk, enc, cb) => {
        cb(null, new Buffer(JSON.stringify(chunk)));
    });

    reader.pipe(toJson).pipe(writer);
}

// node utils\streams -a=bundle-css -path=assets/css
function cssBundler(_path) {

    if (_path == "") {
        throw Error("bundleFilesPath parameter can't be empty!");
    }
    fs.stat(_path, function (err, stats) {
        if (err && err.errno === 34) {
            throw Error("Directory doesn't exist");
        }
    });

    const bundleFilePath = 'assets/bundle.css';
    fs.readdir(_path, (err, files) => {
        files = files || [];

        const writer = fs.createWriteStream(bundleFilePath);
        files.forEach(file => {
            const reader = fs.createReadStream(_path + '\\' + file);
            reader.pipe(writer);
        });

        appendRemoteCss();
    });

    function appendRemoteCss() {
        const remoteCssPath = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

        https.get(remoteCssPath, res => {
            const writer = fs.createWriteStream(bundleFilePath, { flags: 'a' });
            res.pipe(writer);
        })
    }
}

module.exports.streamsActions = streamsActions;







