'use strict';
const fs = require('fs');


/**
 * assumptions:
 *      1) our providers can only add files (they cannot rename/edit/delete)
 *      2) all files have '*.csv' extension
 */
class DirWatcher {
    _watcher;
    _newFiles;
    _interval;

    constructor() {
        console.log("DirWatcher Module");
        this._newFiles = [];
    }

    // this should not be async
    watch(path, delay) {
        const that = this; // why do I do this?

        console.log(`start watch: ${path}`);

        // TODO: throw exception if the folder does not exists
        // TODO: throw exception if this.watcher is already running

        const watchOptions = {
            persistent: true,   // watch constantly
            recursive: false    // do not watch sub-folders
        };

        this.watcher = fs.watch(path, watchOptions, (event, filename) => {
            console.log(`event: ${event}, filename: ${filename}`);

            // TODO: handle only *.csv files
            // TODO: choose correct event to watch

            // for now I just add without validations above
            this._newFiles.push(filename);
        });

        this._interval = setInterval(() => {
            detectChanges();
        }, delay * 1000); // 'delay' is in seconds

        function detectChanges() {
            // TODO: emit event is changes are detected and clean up this.filesToSync

            // below I use 'that' instead of 'this' - why?
            if (that._newFiles.length) {
                console.log(`new files: ${that._newFiles.join(' ,')}`);
                that._newFiles = [];
            }
        }
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