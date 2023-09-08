const jwt = require('jsonwebtoken');

//I need this function to get the id from the token
function getPayload(token) {
    return jwt.decode(token);
}
//this function checks if the token is valid
function authToken(req, res, token) {
    if (token === null)
        return res.send(401 + ": no token provided");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.send(403 + ": access forbidden");  //access forbidden
        req.user = user;
    })
}

module.exports = { authToken, getPayload }