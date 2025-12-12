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

module.exports = endPoints;