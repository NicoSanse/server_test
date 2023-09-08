const fs = require('fs');

// this function adds a field to a user in the json file. Non controlla se il campo è già presente
function modifyFile(users, user, element_to_add) { 
    user_string = JSON.stringify(user.data);
    to_add_string = JSON.stringify(element_to_add);
    //aggiungo il nuovo campo
    user_string = user_string.slice(0, -1) + ", " + to_add_string.slice(1);
    //aggiorno il json
    user.data = JSON.parse(user_string);
    //scrivo il file
    jsonString = JSON.stringify(users);
    fs.writeFileSync('./users.json', jsonString);
}

module.exports = { modifyFile }