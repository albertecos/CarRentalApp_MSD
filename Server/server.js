const {v4: uuidv4} = require('uuid');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This middleware is used to parse JSON bodies.


app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


function readJsonFile(path) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

function writeToJsonFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}


app.get('/cars', (req, res) => {
    var cars = readJsonFile('data/cars.json');
    // res.send(cars);
    res.json(cars);
});



app.post('/create/user', (req, res) => {
  const usersJson = readJsonFile('data/users.json');
  const {name, password} = req.body;
  //TODO: should also take phone, birthday and
  //TODO: email, and should write that information to db as well

  if(!name || !password) {
      return res.status(400).send({error: 'Please enter a valid name and password'});
  }
  //email, phone and location values are placeholders
  //until createAccount is updated
  const newUser = {
      id: uuidv4(),
      name: name,
      password: password,
      birthday: "2001-01-01",
      email: "example@mail.com",
      phone: "+45 12345678",
      location: "Unknown location"};

  usersJson.push(newUser);
  writeToJsonFile('data/users.json', usersJson);

  res.status(201).json(newUser);
});

app.get(`/bookings/:id`, (req, res) => {
    const bookingsJson = readJsonFile('data/bookings.json');
    const userBookings = bookingsJson.filter((b) => b.userId === req.params.id);
    res.json(userBookings);
});

//Getting booking by id
app.get('/bookings/bookingId/:id', (req, res) => {
    const bookings = readJsonFile('data/bookings.json');
    const booking = bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).send({error: 'Booking not found'});
    res.json(booking);
});

app.post('/login', (req, res) => {
    const usersJson = readJsonFile('data/users.json');
    const {name, password} = req.body;

    if(!name || !password) {
        return res.status(400).send({error: 'Please enter a valid name and password'});
    }

    const user = usersJson.find(
        user => user.name === name && user.password === password
    );

    if(!user) {
        return res.status(404).send({error: 'User not found'});
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        location: user.location,
    });
});

app.put('/user/:id', (req, res) => {
    const usersJson = readJsonFile('data/users.json');
    const userId = req.params.id;

    const userIndex = usersJson.findIndex(
        (user) => user.id === userId
    );
    if(userIndex === -1){
        return res.status(404).send({error: 'User not found'});
    }

    const updatedUser = {
        ...usersJson[userIndex],
        ...req.body,
    };

    usersJson[userIndex] = updatedUser;
    writeToJsonFile('data/users.json', usersJson);

    res.json(updatedUser);

})

app.post('/create/booking', (req, res) => {
    try {
        const bookingsJson = readJsonFile('data/bookings.json');
        const {userId, carId, startDate, endDate, totalCost} = req.body;

        console.log("creating booking in server.js: ", req.body);

        if (!userId || !carId || !startDate || !endDate || !totalCost) {
            return res.status(400).send({error: 'No valid values.'});
        }

        const newBooking = {id: uuidv4(), userId, carId, startDate, endDate, totalCost};
        bookingsJson.push(newBooking);
        writeToJsonFile('data/bookings.json', bookingsJson);
        console.log("booking from server: ", newBooking);
        res.status(201).json(newBooking);
    }catch(err){
        console.error("error in server.js with creating booking.. ", err);
        res.status(500).json({error: err.message});
    }
});

app.listen(3000, "0.0.0.0", () => console.log('Server running on \'0.0.0.0:3000\''));
