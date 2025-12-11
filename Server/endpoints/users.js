const { Database } = require("../Database");
const { v4: uuidv4 } = require('uuid');

var endPoints = [];

endPoints.push({method: 'POST', path: '/login', oapi: {
    summary: 'User login',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        password: {type: 'string'}
                    }
                }
            }
        },
    },
    responses: {
        200: {
            description: 'Login successful'
        },
        401: {
            description: 'Invalid credentials'
        }
    }
}, handler: (req, res) => {
    const {name, password} = req.body;
    if(!name || !password) {
        return res.status(400).send({error: 'Please enter a valid name and password'});
    }

    const users = Database.getInstance('users').select({name, password});
    if(users.length === 0) {
        return res.status(401).send({error: 'Invalid credentials'});
    }

    res.json(users[0]);
}});

endPoints.push({method: 'POST', path: '/create/user', oapi: {
    summary: 'User signup',
    requestBody: {
        required: true,
        content: { 
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        password: {type: 'string'}
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: 'User created successfully'
        }
    }
}, handler: (req, res) => {
    const {name, password} = req.body;

    if(!name || !password) {
        return res.status(400).send({error: 'Please enter a valid name and password'});
    }

    const newUser = {id: uuidv4(), name, password};
    Database.getInstance('users').insert(newUser);

    res.status(201).json(newUser);
}});

module.exports = endPoints;