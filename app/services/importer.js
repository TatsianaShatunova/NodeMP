'use strict';

class Importer {
    _dirwatcher;
    constructor(dirwatcher) {
        console.log("Importer Module");
        this._dirwatcher = dirwatcher;
        this._dirwatcher.on('changed', function(path) {
         this.importFiles(path);
        });
    }

    importFiles(path){
        console.log(`start files import from ${path}`);
    }

    copyFiles(){

    }

}

module.exports = Importer;