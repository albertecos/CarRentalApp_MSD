const express = require('express');
const cors = require('cors');
const app = express();
const openapi = require('@wesleytodd/openapi');
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This middleware is used to parse JSON bodies.

const oapi = openapi({
    title: "CarRentalApp API",
  version: "0.1.0",
  description: "API documentation for CarRentalApp",
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ]
});

app.use(oapi);
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


const usersEndpoints = require('./endpoints/users');
const bookingEndpoints = require('./endpoints/bookings');
const carsEndpoints = require('./endpoints/cars');
const imagesEndpoints = require('./endpoints/images');

registerGroupEndpoints(usersEndpoints);
registerGroupEndpoints(bookingEndpoints);
registerGroupEndpoints(carsEndpoints);
registerGroupEndpoints(imagesEndpoints);


function registerGroupEndpoints(endPoints) {
    for (const endpoint of endPoints) {
        if (endpoint.method === 'GET') {
            app.get(endpoint.path, oapi.path(endpoint.oapi), endpoint.handler);
        } else if (endpoint.method === 'POST') {
            app.post(endpoint.path, oapi.path(endpoint.oapi), endpoint.handler);
        }
    }
}

app.use('/swaggerui', oapi.swaggerui())
app.listen(3000, "0.0.0.0", () => console.log('Server running on \'0.0.0.0:3000\''));
