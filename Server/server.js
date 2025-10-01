const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This middleware is used to parse JSON bodies.

function readJsonFile(path) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

function writeToJsonFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}


app.get('/cars', (req, res) => {
    var cars = readJsonFile('data/cars.json');
    res.send(cars);
});



app.post('/create/user', (req, res) => {
  const usersJson = readJsonFile('data/users.json');
  const {name, password} = req.body;

  if(!name || !password) {
      return res.status(400).send({error: 'Please enter a valid name and password'});
  }

  const newUser = {id: uuidv4(), name, password};
  usersJson.push(newUser);
  writeToJsonFile('data/users.json', usersJson);

  res.status(201).json(newUser);
});

app.get('/bookings/:userId', (req, res) => {
    const bookingsJson = readJsonFile('data/bookings.json');
    const userBookings = bookingsJson.filter((b) => b.userId === req.params.userId);
    res.json(userBookings);
});

app.post('/create/booking', (req, res) => {
    const bookingsJson = readJsonFile('data/bookings.json');
    const {userId, carId, startDate, endDate, totalCost} = req.body;

    if(!userId || !carId || !startDate || !endDate || !totalCost) {
        return res.status(400).send({error: 'No valid values.'});
    }

    const newBooking = {id: uuidv4(), userId, carId, startDate, endDate, totalCost};
    bookingsJson.push(newBooking);
    writeToJsonFile('data/bookings.json', bookingsJson);

    res.status(201).json(newBooking);
})

app.listen(3000, () => console.log('Server running on port 3000'));
