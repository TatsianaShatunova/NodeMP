'use strict';
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readDirAsync = promisify(fs.readdir);

class Importer {
    _dirwatcher;
    _directory;
    constructor(dirwatcher, directory) {
        console.log("Importer Module");
        this._dirwatcher = dirwatcher;
        this._directory = directory;
        this._dirwatcher.on('changed', function(path) {
         this.importFiles(path);
        });
    }

    async import(path){
      console.log(`start async files import from ${path}`);
       try{
        readDirAsync(path, function(err, filenames) {
          
            filenames.forEach(function(filename) {
            const content = await readFileAsync(dirname + filename, 'utf-8');
            await writeFileAsync(this._directory + filename, content);             
            });
          });
       } catch(error){
         console.error(error);
       } 
             
    }

    importSync(path){
      console.log(`start sync files import from ${path}`);
      
              fs.readdir(path, function(err, filenames) {
                  if (err) {
                    onError(err);
                    return;
                  }
                  filenames.forEach(function(filename) {
                    fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                      if (err) {
                        onError(err);
                        return;
                      }
                      fs.writeFile(this._directory + filename, content, function(err) {
                        if(err) {
                            return console.log(`start files import from ${err}`);
                        }
                        });              
                    });
                  });
                });
    }

}

module.exports = Importer;