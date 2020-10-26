//Express
const express = require('express');
const app = express();
const consign = require('consign');

//Root
app.get('/', (req, res) => {
  res.send('API Schedule');
});

consign()
  .include('libs/middlewares.js')
  .then('Routes')
  .then('libs/boot.js')
  .into(app);
