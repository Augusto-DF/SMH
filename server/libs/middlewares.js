const bp = require('body-parser');
const cors = require('cors');
module.exports = (app) => {
  //Config BodyParser
  app.use(bp.urlencoded({ extended: false }));
  app.use(bp.json());

  //React Server
  const clientServer = 'http://localhost:3000';

  //Cors config
  const corsOptions = {
    origin: clientServer,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
};
