const { Database } = require("../Database");
const { v4: uuidv4 } = require('uuid');

var endPoints = [];

endPoints.push({method: 'GET', path: '/bookings', oapi: {
    summary: 'Get bookings by user ID',
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
            description: 'Bookings retrieved successfully'
        }
    }
}, handler: (req, res) => {
    const userId = req.query.id;
    const bookings = Database.getInstance('bookings').select({userId});
    res.json(bookings);
}});

endPoints.push({method: 'GET', path: '/bookings/bookingId', oapi: {
    summary: 'Get booking by booking ID',
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
            description: 'Booking retrieved successfully'
        },
        404: {
            description: 'Booking not found'
        }
    }
}, handler: (req, res) => {
    const bookingId = req.query.id;
    const bookings = Database.getInstance('bookings').select({id: bookingId});
    if (bookings.length === 0) {
        return res.status(404).send({error: 'Booking not found'});
    }
    res.json(bookings[0]);
}});

endPoints.push({
    method: 'POST', path: '/create/booking', oapi: {
        summary: 'Create a new booking',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            userId: {type: 'string', format: 'uuid'},
                            carId: {type: 'string', format: 'uuid'},
                            startDate: {type: 'string', format: 'date'},
                            endDate: {type: 'string', format: 'date'},
                            totalCost: {type: 'number'},
                            pickUpLocation: {type: 'string'},
                            deliveryLocation: {type: 'string'},
                            payMethod: {type: 'string'}
                        }
                    }
                }
            }
        },
        responses: {
            201: {
                description: 'Booking created successfully'
            }
        }
    }, handler: (req, res) => {
        const {userId, carId, startDate, endDate, totalCost, pickUpLocation, deliveryLocation, payMethod} = req.body;

        if (!userId || !carId || !startDate || !endDate || !totalCost || !pickUpLocation || !deliveryLocation || !payMethod) {
            console.log(userId, carId, startDate, endDate, totalCost, pickUpLocation, deliveryLocation, payMethod);
            return res.status(400).send({error: 'No valid values.'});
        }

        const newBooking = {
            id: uuidv4(),
            userId,
            carId,
            startDate,
            endDate,
            totalCost,
            pickUpLocation,
            deliveryLocation,
            payMethod
        };
        Database.getInstance('bookings').insert(newBooking);

    res.status(201).json(newBooking);
}});

module.exports = endPoints;