const fs = require('fs');

// this function deletes one element from the json file 
function deleteThisFile(users, element) {
    let users_filtered = users.filter(item => item.id !== element.id);
    jsonString = JSON.stringify(users_filtered);
    fs.writeFileSync('./users.json', jsonString);
}


module.exports = { deleteThisFile }