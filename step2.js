const fs = require("fs");
const axios = require("axios");
const s1 = require("./step1.js");
let args = process.argv;

// read file at path and print it out, use async function to wait for result before proceeding.
async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`error fetching: ${url}: ${err}`);
    process.exit(1);
  }
}

let path = args[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  s1.cat(path);
}

module.exports = {
  cat: s1.cat,
  webCat: webCat,
};
