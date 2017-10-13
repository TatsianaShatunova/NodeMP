
    const parseArgs = require('minimist');
    const fs = require('fs');
    const through = require('through2');
    const replaceExt = require('replace-ext');
    const request = require('request');

    var args = parseArgs(process.argv.slice(2), {
        boolean: ['help'],
        string: ['file', 'action', 'path'],
        alias: {help: ['h'], file: ['f'], action: ['a'], path: ['p']}, 
        //default: {'help': true},
        unknown: (arg) => {
            if(arg !== 'help' && arg !== 'h' && arg !== 'file' && arg !== 'f' && arg !== 'action' && arg != 'a' && arg != 'path' && arf != 'p'){
                console.error('Unknown argument', arg);
                return false;
            }
        }
    });

    console.dir(args);
    chooseAction(args);
    if(process.argv.slice(2).length == 0 || args.help){
        printHelp();
    }
     
    function chooseAction(args){

     var _help = args.help;
     var _file = args.file;
     var _action = args.action;
     var _path = args.path;
      console.log(`\r\n Action = ${_action}`);
      console.log(`\r\n File = ${_file}`);
      switch (_action){
          case 'io':
            inputOutput(_file);
          break;
          case 'transformToApper':
          transformToApper();
          break;
          case 'transformToJson':
            transformToJson(_file);
          break;
          case 'writeJson':
            writeJson(_file);
          break;
          case 'bundle-css':
          cssBundler(_path);
          break;
      }
    }
    
    function printHelp(){
        if(process.argv.slice(2).length == 0){
            console.log('Wrong input!');
        }
      console.log("-h, --help  Shows application usage message \r\n-a, --action: Action  Action to be called \r\n-f, --file: File   File to be used ");
    }

    function inputOutput(filePath){
        console.log('\r\n Creating pipe');
        const reader = fs.createReadStream(filePath);

        reader.pipe(process.stdout);
    }
    
    function transformToApper(){

        console.log('\r\n File transformation to upper');

        var write = function(buffer,encoding,next){
            var data = buffer.toString();
            this.push(data.toUpperCase());
            next();
        }
        var end = function (done){
            done();
        }
        var stream = through(write,end);
        process.stdin.pipe(stream).pipe(process.stdout);
    }

    function transformToJson(filePath){
        console.log('\r\n File transformation to json');
        const reader = fs.createReadStream(filePath);

        //  const toJson = through ((chunc, enc, cb) => {      
        //     cb(null, new Buffer(JSON.stringify(chunc))); 
        //   });
          
        //   reader.pipe(toJson).pipe(process.stdout);
        var write = function(buffer,encoding,next){
            var data = buffer.toString();
            this.push(JSON.stringify(data));
            next();
        }
        var end = function (done){
            done();
        }
        var stream = through(write,end);
        reader.pipe(stream).pipe(process.stdout);
    }

    function writeJson(filePath){
        console.log('\r\n Writing file as json');

        var newPath = replaceExt(filePath, '.json');
        const reader = fs.createReadStream(filePath);
        const writer = fs.createWriteStream(newPath);

        const toJson = through ((chunc, enc, cb) => {      
            cb(null, new Buffer(JSON.stringify(chunc))); 
          });
         
        reader.pipe(toJson).pipe(writer);
    }

    function cssBundler(_path){

        request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css', function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode); 
            console.log('body:', body); 
          });
    }







  