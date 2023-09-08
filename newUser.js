// this function creates a new user
// I get the data from the body request and create the id
function createNewUser(request) {
    newUser = {
        "id": require('crypto').randomBytes(4).toString('hex'),
        "data": {
            "name": request.body.name,
            "surname": request.body.surname,
            "age": request.body.age,
            "city": request.body.city,
        }
    }
    return newUser;
}

module.exports = { createNewUser }