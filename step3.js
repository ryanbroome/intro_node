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

function catSave(path, flag) {
  fs.writeFile(`${path}`, { encoding: "utf8", flag: "a" }, (err, data) => {
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
  if (args[0]) {
    if (args[2] === "--out") {
      catSave(args[3]);
    }
    if (args[2].slice(0, 4) === "http") {
      webCat(arg);
    } else {
      cat(args[2]);
    }
  }
}

function isURL(entry) {
  if (entry.slice(0, 4) === "http") {
    return true;
  }
}

function isFlag(entry) {
  if (entry.slice(0, 5) === "--out") {
    return true;
  }
}

start();
