import fs from 'fs';
import AppEmitter from './../AppEmitter.js';

export default class DirWatcher {
  constructor() {
    this.eventEmitter = new AppEmitter();
  }

  getEventEmitter() {
    return this.eventEmitter;
  }

  watch (path, delay) {
    let previousStats = [];

    setInterval(() => {
      fs.readdir(path, (err, newFiles) => {
        let newStats = this.getStats(path, newFiles);

        newStats.then(currentStats => {
          if (err) {
            console.error('Readdir error: ', err);
            return;
          }

          let {deletedStats, addedStats} = this.checkFiles(previousStats, currentStats);

          currentStats.sort(this.compareIno);

          if (deletedStats.length !== 0) {
            previousStats = this.deleteStats(deletedStats, previousStats);

            //console.log('deleted');
            this.eventEmitter.emit('changed');
          }

          if (addedStats.length !== 0) {
            previousStats = this.addStats(addedStats, previousStats);

            //console.log('added');
            this.eventEmitter.emit('changed');
          }

          if (this.isModifiedStats(previousStats, currentStats)) {
            previousStats = currentStats;

            //console.log('changed');
            this.eventEmitter.emit('changed');
          }
        });
      });
    }, delay);
  }

  getStats (path, files) {
    let stats = files.map(file => {
      let fullPath = path + file;

      return this.getStat(fullPath);
    });

    return Promise.all(stats);
  }

  getStat (path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          return reject(err);
        }

        resolve(stats);
      });
    });
  }

  compareIno (objectA, objectB) {
    return objectA.ino - objectB.ino;
  }

  clean (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == undefined) {
        array.splice(i, 1);
        i--;
      }
    }

    return array;
  };

  checkFiles (oldFiles, newFiles) {
    let deletedStats = oldFiles.slice();
    let addedStats = newFiles.slice();
    let changedStatus;

    oldFiles.forEach((oldFile, i) => {
      newFiles.forEach((newFile, k) => {
        if (oldFile.ino === newFile.ino) {
          delete deletedStats[i];
          delete addedStats[k];
        }
      });
    });

    changedStatus = {
      deletedStats: this.clean(deletedStats),
      addedStats: this.clean(addedStats)
    }

    return changedStatus;
  }

  isModifiedStats (oldFiles, newFiles) {
    let isModified = false;

    oldFiles.forEach((oldFile, index) => {
      if (oldFile['mtime'].getTime() !== newFiles[index]['mtime'].getTime() || oldFile['ctime'].getTime() !== newFiles[index]['ctime'].getTime()) {
        isModified = true;
      }
    });

    return isModified;
  }

  deleteStats(deletedStats, previousStats) {
    return deletedStats.reduce((previousValue, delFile, index, array) => {
      previousValue = previousValue.filter(file => delFile.ino !== file.ino);

      return previousValue;
    }, previousStats);
  }

  addStats(addedStats, previousStats) {
    previousStats = previousStats.concat(addedStats);
    previousStats.sort(this.compareIno);

    return previousStats;
  }
}
