const User = require(__dirname + '/../models/User');
const Sequelize = require('sequelize');

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
      res.json(response);
    })
    .catch((err) => {
      res.json({ menssage: 'Usuário não encontrado ' + err });
    });
}

module.exports = {
  _LOGIN: login,
};
