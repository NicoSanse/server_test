const jwt = require('jsonwebtoken');

//creates a token with the id of the user
function setToken(id) {
    let payload = { id: id };
    var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: "1d" });
    return token;
}

module.exports = { setToken }