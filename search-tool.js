// Script which can be run from the command line that can be used to quickly search files for regular expressions.

// First command line arg is reg expression
// Any other args are files to search
// Outputs contents of any file whose content matches the regex.
const {statSync, readFileSync, readdirSync} = require('fs');
const {sep} = require('path');

// grab regex term
const searchTerm = new RegExp(process.argv[2]);

// get the files to search in
const files = process.argv.slice(3);

// call search on each file
for (let file of files) {
    search(file);
}

function search(file) {
    // get the stats object of info about the directory/file
    let stats = statSync(file);

    // if it's a dir
    if (stats.isDirectory()) {
        for (nextFile of readdirSync(file)) {
            search(`${file}${sep}${nextFile}`);
        }

    } else if (searchTerm.test(readFileSync(path, 'utf8'))) {
        console.log(file);
    }
}

// process.argv gives list of command line args
// statSync is like stat but synchronous. Helps determine if is a dir or not "isDirectory()"
// readdir or readdirSync used to read the contents of a file