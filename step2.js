const fs = require("fs");

const axios = require("axios");

let args = process.argv;

function cat(path) {
  fs.readFile(`${path}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.kill();
    }
    console.log(data);
  });
}

async function webCat(url) {
  let res = axios.get(`${url}`);
  let response = await res;
  console.log(response.data);
}

function start() {
  if (args[2]) {
    if (args[2].slice(0, 4) === "http") {
      webCat(args[2]);
    } else {
      cat(args[2]);
    }
  }
}

start();
