const Sequelize = require('sequelize');
const User = require(__dirname + '/../models/User');
const { jwt, jwtFun } = require(__dirname + '/../token/jwt.js');

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
        res.json({
          menssage: 'Bem vindo ' + response[0].userFirstName + '!',
          token: jwtFun(response),
          sucess: true,
        });
      else
        res.json({
          menssage: 'Usuário não encontrado ',
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
};
