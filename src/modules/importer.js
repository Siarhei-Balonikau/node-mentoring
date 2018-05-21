import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export default class Importer {
  listen(eventEmitter, path, sync = false) {
    this.eventEmitter = eventEmitter;

    this.eventEmitter.on('changed', () => {
      if (sync) {
        console.log(this.importSync(path));
      } else {
        let result = this.import(path);

        result.then(data => {
          console.log(data);
        });
      }
    });
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          return reject(err);
        }

        let content = this.readFiles(path, files);
        content.then(csv => {
          return this.csv(csv);
        }).then(data => {
          resolve(data);
        });
      });
    });
  }

  importSync(path) {
    let files = fs.readdirSync(path);
    let csv = this.readFilesSync(path, files);
    let content = this.csvSync(csv);

    return content;
  }

  readFiles(path, files) {
    let content = files.map(file => {
      let fullPath = path + file;

      return readFileAsync(fullPath, 'utf-8');
    });

    return Promise.all(content);
  }

  readFilesSync(path, files) {
    return files.map(file => {
      let fullPath = path + file;

      return this.readFileSync(fullPath);
    });
  }

  readFileSync(path) {
    return fs.readFileSync(path, 'utf8');
  }

  csv(arr) {
    return new Promise((resolve, reject) => {
      let result = this.csvToJSON(arr);

      resolve(result);
    });
  }

  csvSync(arr) {
    return this.csvToJSON(arr);
  }

  csvToJSON(arr) {
    let splittedFiles = arr.map(file => {
      return file.split(/\r\n|\r|\n/);
    });

    let result = splittedFiles.map(file => {
      let jsonObj = [];
      const headers = file[0].split(',');

      for (let i = 1; i < file.length; i++) {
        if (file[i].length > 0) {
          let data = file[i].split(',');
          let obj = {};

          for(let j = 0; j < data.length; j++) {
             obj[headers[j].trim()] = data[j].trim();
          }

          jsonObj.push(obj);
        }
      }

      return jsonObj;
    });

    return result;
  }
}
