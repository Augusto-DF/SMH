//Express
const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');
const { _LOGIN } = require('./Routes/RouteFunctions');

//Port
const port = process.env.PORT || 9000;

//React Server
const clientServer = 'http://localhost:3000';

//Cors config
const corsOptions = {
  origin: clientServer,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Config BodyParser
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

//Root
app.get('/', (req, res) => {
  res.send('Deu bom');
});

// Login Route
app.post('/login', _LOGIN);

//Server Start
app.listen(port, () => {
  console.log('Servidor rodando na url: http://localhost:' + port);
});
