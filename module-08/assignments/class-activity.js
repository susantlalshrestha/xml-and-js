const fs = require("fs");
let filename = `../books.json`;

const checkIfExists = (filename) =>
  new Promise((resolve, reject) => {
    fs.exists(filename, (exists) => {
      if (exists) resolve(filename);
      reject(`404: file not found at ${filename}`);
    });
  });

const checkIfFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.stat(filename, (err, stats) => {
      if (err) reject(err);
      if (!stats.isFile()) reject(`400: ${filename} is not a file`);
      resolve(filename);
    });
  });

const readFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, null, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });

checkIfExists(filename)
  .then(checkIfFile)
  .then(readFile)
  .then(console.log)
  .catch(console.error);
