const {Database} = require("../Database");
const {v4: uuidv4} = require('uuid');

var endPoints = [];

endPoints.push({
    method: 'POST', path: '/login', oapi: {
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
        if (!name || !password) {
            return res.status(400).send({error: 'Please enter a valid name and password'});
        }

        const users = Database.getInstance('users').select({name, password});
        if (users.length === 0) {
            return res.status(401).send({error: 'Invalid credentials'});
        }

        res.json(users[0]);
    }
});

endPoints.push({
    method: 'POST', path: '/create/user', oapi: {
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

        if (!name || !password) {
            return res.status(400).send({error: 'Please enter a valid name and password'});
        }

        const newUser = {
            id: uuidv4(),
            name: name,
            password: password,
            birthday: "2001-01-01",
            email: "example@mail.com",
            phone: "+45 12345678",
            location: "Unknown location"
        };
        Database.getInstance('users').insert(newUser);

        res.status(201).json(newUser);
    }
});

endPoints.push({
    method: 'PUT', path: '/user/:id',
    oapi: {
        summary: 'Edit user information',
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: {type: 'string'},
            }
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: {type: 'string'},
                            email: {type: 'string'},
                            phone: {type: 'string'},
                            birthday: {type: 'string'},
                            location: {type: 'string'},
                        }
                    }
                }
            }
        },
        responses: {
            201: {
                description: 'User updated successfully'
            },
            404: {
                description: 'User not found'
            }
        }
    }, handler: (req, res) => {
        const userId = req.params.id;

        const userDb = Database.getInstance('users');
        const users = userDb.all();

        const currentUser = users.find((user) => user.id === userId);

        if(!currentUser) {
            return res.status(401).send({error: 'User not found'});
        }

        const updatedUser = {
            ...currentUser,
            ...req.body,
        };

        userDb.update(userId, req.body);

        return res.status(201).json(updatedUser);
    }
});

module.exports = endPoints;