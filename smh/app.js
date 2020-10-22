//Express
const express = require('express');
const app = express();

//Port
const port = process.env.PORT || 9000;

//Server Start
app.listen(port, () => {
  console.log('Servidor rodando na url: http://localhost:' + port);
});
