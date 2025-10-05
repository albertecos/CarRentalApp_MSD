# CarRentalApp_MSD

## How to run

### CarRental (Frontend)
Create .env file in the CarRental folder with the the following
```sh
# API Configuration
API_BASE_URL=http://YOURIPADDRESS:3000
# API_BASE_URL=http://localhost:3000
```

From the CarRental folder run the command
```bash
npx expo start
# or for ease of use
npx expo start --web
```

### Server
From the Server folder run the command

```bash
npm install
node server.js
```