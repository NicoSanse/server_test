const fs = require('fs');

// this function adds one element from to the json file 
function writeToFile(users, element) {
    users.push(element);
    jsonString = JSON.stringify(users);
    fs.writeFileSync('./users.json', jsonString);
}

module.exports = { writeToFile }