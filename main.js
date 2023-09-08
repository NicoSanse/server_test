//import e moduli necessari
require('dotenv').config({ path: './.env' })
const filePath = "C:/Users/nicos/OneDrive/Desktop/efebia/serverino_efebia/users.json"
const users = require(filePath);
const fastify = require('fastify')({ logger: true })
const { readThisFile } = require('./readFile');
const { setToken } = require('./token_generation');
const { deleteThisFile } = require('./deleteFromFile');
const { writeToFile } = require('./writeToFile');
const { createNewUser } = require('./newUser');
const { authToken } = require('./authenticate_token');
const { getPayload } = require('./authenticate_token');
const { modifyFile } = require('./modifyFile');
const { modifyFileForPutRequest } = require('./modifyFileForPutRequest');
var token = null;

// un po' di stampe
console.log("-----------");
console.log(users);
console.log("-----------");
users.forEach(element => {console.log(element.id)});
console.log("-----------");
users.forEach(element => { console.log(element.data) });
console.log("-----------");


//shows all users
fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
        info = readThisFile(filePath);
        reply.send(info.toString());
    }
})
//register a new user
fastify.route({
    method: 'POST',
    url: '/register',
    handler: function (request, reply) {
        newUser = createNewUser(request);
        writeToFile(users, newUser);
        reply.send("new user registered: " + newUser.data.name + " " + newUser.data.surname);
    }
})
//searches for a user by id and creates token if found
fastify.route({
    method: 'POST',
    url: '/login',
    handler: function (request, reply) {
        //loop cycle to find the id of the request
        users.forEach(element => {
            if (element.id == request.body.id) {
                token = setToken(request.body.id);
                reply.send("token generated: " + token);
            }
        })
        //if the id is not found, do nothing
        reply.send("id not found");
    }
})
//adds additional information about a user
fastify.route({
    method: 'POST',
    url: '/data/:id',
    handler: function (request, reply) {
        //check token's validity with authToken
        authToken(request, reply, token);
        //loop cycle to find the id of the request
        users.forEach(element => { 
            check_presence = false;
            if (element.id == request.params.id) { 
                check_presence = true;
                //token's id must be equal to request's id
                if (getPayload(token).id == request.params.id) {
                    modifyFile(users, element, request.body);
                    reply.send("new field added");
                }
                else { 
                    //the id of the token is not equal to the id of the request
                    reply.send("token not valid");
                }
            }
        })
        if (check_presence == false) {
            //the id of the request is not found
            reply.send("id not found");
        }
    }
})
//shows all the data of a user
fastify.route({
    method: 'GET',
    url: '/data/:id',
    handler: function (request, reply) {
        //check token's validity with authToken
        authToken(request, reply, token);
        //token's id must be equal to request's id
        if (getPayload(token).id == request.params.id) {
            //with filter function i return the user with the id of the request
            reply.send(users.filter(element => element.id == request.params.id));
        }
        else {
            reply.send("token not valid");
        }
    }
})
//modifies a field of a user
fastify.route({
    method: 'PUT',
    url: '/data/:id',
    handler: function (request, reply) {
        //check token's validity with authToken
        authToken(request, reply, token);
        //loop cycle to find the id of the request
        users.forEach(element => {
            check_presence = false;
            if (element.id == request.params.id) {
                check_presence = true;
                //token's id must be equal to request's id
                if (getPayload(token).id == request.params.id) {
                    modifyFileForPutRequest(users, element, request.body);
                    reply.send("field updated");
                }
                else {
                    reply.send("token not valid");
                }
            }
        })
        //id not found
        if (check_presence == false) {
            reply.send("id not found");
        }
    }
})
//deletes a user
fastify.route({
    method: 'DELETE',
    url: '/data/:id',
    handler: function (request, reply) {
        //check token's validity with authToken
        authToken(request, reply, token);
        //loop cycle to find the id of the request
        users.forEach(element => {
            check_presence = false;
            if (element.id == request.params.id) {
                check_presence = true;
                //token's id must be equal to request's id
                if (getPayload(token).id == request.params.id) {
                    deleteThisFile(users, element);
                    reply.send("id removed: " + element.id);
                }
                else {
                    reply.send("token not valid");
                }
            }
        })
        //id not found
        if (check_presence == false) {
            reply.send("id not found");
        }
    }
})

// Run the server
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})