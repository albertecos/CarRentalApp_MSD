const { Database } = require("../Database");
const { v4: uuidv4 } = require('uuid');

var endPoints = [];

endPoints.push({method: 'GET', path: '/cars', oapi: {
    summary: 'Get all cars',
    responses: {
        200: {
            description: 'Bookings retrieved successfully'
        }
    }
}, handler: (req, res) => {
    const cars = Database.getInstance('cars').all();
    res.json(cars);
}});

endPoints.push({method: 'GET', path: '/car', oapi: {
    summary: 'Get car by ID',
    parameters: [
        {
            name: 'id',
            in: 'query',
            required: true,
            schema: {
                type: 'string',
                format: 'uuid'
            }
        }
    ],
    responses: {
        200: {
            description: 'Car retrieved successfully'
        }
    }
}, handler: (req, res) => {
    const carId = req.query.id;
    const car = Database.getInstance('cars').select({carId});
    res.json(car);
}});

module.exports = endPoints;