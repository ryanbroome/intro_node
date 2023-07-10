const fs = require("fs");
const axios = require("axios");
const args = process.argv;

function handleOutput(text, out) {
  if (out) {
    fs.appendFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Could not write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url} : ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (args[2] === "--out") {
  out = args[3];
  path = args[4];
} else {
  path = args[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path, out);
}

// TODO RECAP NOTES AFTER REVIEWING SOLUTION.
// TODO I was there with the logic and how to, I got caught up for awhile and am still not sure how come it would not work when i tried to use the data from reading a file to write to a file. step3.js LN: 83: 84 would not work. Would either say "data must be a certain type, Buffer, string, etc" or would come back as "undefined". When reading a file, how exactly are we getting the data to be written to the new file.

// *FIRST TRY BELOW
// const fs = require("fs");
// const axios = require("axios");
// const s2 = require("./step2.js");

// let args = process.argv;

// async function webbyCat(url) {
//   let res = axios.get(`${url}`);
//   let response = await res;
//   console.log(response.data);
// }

// function appendTo(path, data) {
//   fs.appendFile(path, data, "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       process.exit(2);
//     }
//     console.log(data);
//   });
// }

// function start() {
//   if (args[2]) {
//     if (args[2] === "--out") {
//       const content = cat(args[4]);
//       appendTo(args[3], content);
//     }
//     if (args[2].slice(0, 4) === "http") {
//       webCat(args[2]);
//     } else {
//       cat(args[2]);
//     }
//   }
// }
