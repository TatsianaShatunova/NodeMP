'use strict';
const fs = require('fs');
const pt = require('path');
const EventEmitter = require('events');


/**
 * assumptions:
 *      1) our providers can only add files (they cannot rename/edit/delete)
 *      2) all files have '*.csv' extension
 */
class DirWatcher{
    _watcher;
    _newFiles;
    _interval;
    _path;
    changedEmitter;

    constructor() {
        console.log("DirWatcher Module");
        this._newFiles = [];  
        this.changedEmitter = new EventEmitter();  
    }

    watch(path, delay) {
        const that = this; 
        this._path = path;

        console.log(`start watch: ${path}`);

        this.checkDirectoryExistence(path);

        if (this.watcher) {
            throw Error("Watcher is already running");
        }
        
        const watchOptions = {
            persistent: true,   // watch constantly
            recursive: false    // do not watch sub-folders
        };

        this.watcher = fs.watch(path, watchOptions, (event, filename) => {
            console.log(`event: ${event}, filename: ${filename}`);
            
            // handle only *.csv files
            if (event === 'rename' && pt.extname(filename) == '.csv') {
                this._newFiles.push(filename);
            }
        });

        this._interval = setInterval(() => {
            detectChanges();
        }, delay * 1000); // 'delay' is in seconds

        function detectChanges() {
            // emit event is changes are detected and clean up this.filesToSync
            if (that._newFiles.length) {
                console.log(`new files: ${that._newFiles.join(' ,')}`);
                that.changedEmitter.emit('dirwatcher:changed', that._newFiles);
                that._newFiles = [];
            }
        }
    }
    
    checkDirectoryExistence(directory) {
        fs.stat(directory, function (err, stats) {
            //Check if error defined and the error code is "not exists"
            if (err && err.errno === 34) {
                throw Error("Directory doesn't exist");
            } 
        });
    }

    // clean-up
    stop() {
        if (this._watcher && this._watcher.close) {
            this._watcher.close();
        }

        if (this._interval) {
            clearInterval(this._interval);
        }
    }
}

module.exports = DirWatcher;