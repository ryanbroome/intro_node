const fs = require('fs');

let args = process.argv;

function cat(path) {
  fs.readFile(`${path}`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.kill();
    }
    console.log(data);
  });
}

function start() {
  if (args[2]) {
    cat(args[2]);
  }
}

start();

module.exports = {
  cat: cat,
  start: start,
};
