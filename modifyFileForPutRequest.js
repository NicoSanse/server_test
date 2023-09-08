const fs = require('fs');

// this function changes a field to a user in the json file. Non controlla se il campo è assente
function modifyFileForPutRequest(users, user, element_to_change) {
    user_data_string = JSON.stringify(user.data);
    element_to_change_string = JSON.stringify(element_to_change);

    a = element_to_change_string.split(":");

    var pos = user_data_string.indexOf(a[0].substring(1));
    user_data_string = user_data_string.slice(0, pos) + element_to_change_string.slice(1, element_to_change_string.length - 1) + ", " + user_data_string.slice(pos + a[0].length + a[1].length);
    //aggiorno il json
    user.data = JSON.parse(user_data_string);

    jsonString = JSON.stringify(users);
    fs.writeFileSync('./users.json', jsonString);
}

module.exports = { modifyFileForPutRequest }