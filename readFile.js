const fs = require('fs');

// this function reads the json file and returns the data
function readThisFile(path) {
    try {
        const data = fs.readFileSync(path);
        return data;
    } catch (error) {
        console.error(`Got an error trying to read the file:' {error.message}`);
    }
}

module.exports = { readThisFile }