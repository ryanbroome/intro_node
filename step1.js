// import needed module to read a file
const fs = require("fs");

// capture the command line arguments in an array called args
let args = process.argv;

// function that takes in a path parameter and passes that to file sytem read file respond with utf8 text encoding and print the data if no errors otherwise print errors
function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(data);
      // had to exit when importing to another file otherwise it would run cat(args[2]) again and print twice.
      process.exit(0);
    }
  });
}
// call the function and pass in the second command line variable
cat(args[2]);

// Just in case, never know who may find this module handy
// export any useful functions from the module to be used elsewhere in the program
module.exports = {
  cat: cat,
};
