const express = require('express');
const app = express();
const fs = require('fs');
// const {v4:uuidv4} = require('uuid');
app.use(express.json()); // This middleware is used to parse JSON bodies.

function readJsonFile(path) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

function writeToJsonFile(path, data) {
    fs.writeFileSync(path, data);
}


app.get('/cars', (req, res) => {
    var cars = readJsonFile('data/cars.json');
    res.send(cars);
});



app.post('/create/user', (req, res) => {
  const usersJson = readJsonFile('data/users.json');
  const {name} = req.body;

  if(!name) {
      return res.status(400).send({error: 'Please enter a valid name'});
  }

  const newUser = {id: uuidv4(), name, password};
  usersJson.push(newUser);
  writeToJsonFile('data/users.json', newUser);

  res.status(201).json(newUser);
});

app.get('/bookings/:userId', (req, res) => {
    const bookingsJson = readJsonFile('data/bookings.json');
    const userBookings = bookingsJson.filter((b) => b.userId === req.params.userId);
    res.json(userBookings);
});

app.post('/create/booking', (req, res) => {
    const bookingsJson = readJsonFile('data/bookings.json');
    const {id, userId, carId, startDate, endDate, totalCost} = req.body;

    if(!id || !userId || !carId || !startDate || !endDate || !totalCost) {
        return res.status(400).send({error: 'No valid values.'});
    }

    const newBooking = {id: uuidv4(), userId, carId, startDate, endDate, totalCost};
    bookingsJson.push(newBooking);
    writeToJsonFile('data/bookings.json', newBooking);

    res.status(201).json(newBooking);
})

app.listen(3000, () => console.log('Server running on port 3000'));
