const Sequelize = require('sequelize');
const User = require(__dirname + '/../models/User');
const { jwtFun, verifyJWT } = require(__dirname + '/../token/jwt.js');

// Login Function
function login(req, res) {
  const { Op } = Sequelize;
  User.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { userEmail: req.body.username },
            { userNickName: req.body.username },
          ],
        },
        {
          userPassword: req.body.password,
        },
      ],
    },
  })
    .then((response) => {
      if (response.length === 1)
        res.status(200).json({
          menssage: 'Bem vindo ' + response[0].userFirstName + '!',
          token: jwtFun(response),
          sucess: true,
        });
      else
        res.status(401).json({
          menssage: 'Usuário ou senha incorretos ',
          sucess: false,
        });
    })
    .catch((err) => {
      res.json({
        menssage: 'Ocorreu um erro: ' + err,
        sucess: false,
      });
    });
}

module.exports = (app) => {
  app.post('/login', login);
  app.get('/tokendecode', verifyJWT);
  app.post('/tokendecodePOST', verifyJWT);
};
