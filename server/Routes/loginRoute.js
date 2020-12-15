const Sequelize = require('sequelize');
const { User, find, exists, create, destroy, update } = require(__dirname +
  '/../models/User');
const Admin = require(__dirname + '/../models/Admin');
const Functionary = require(__dirname + '/../models/Functionary');
const ScheduleConfigs = require(__dirname + '/../models/ScheduleConfigs');
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

async function teste(req, res) {
  /*res.json(
    await create(
      'Nelsu',
      'Paxêcu',
      'nelsin123@gmail.com',
      '159357',
      'nenelsu',
    ),
  );*/
  //res.json(await destroy(10));
  /*res.json(
    await update(
      11,
      'Nelsuu',
      'Paxêcu',
      'nelsin123@gmail.com',
      '159357',
      'nenelsu',
    ),
  );*/
  //res.json(await Admin.create(11));
  //res.json(await Admin.destroy(3));
  //res.json(await Funcionary.create(11, { permissions: 'basic' }));
  res.json(await ScheduleConfigs.find(4));
  /*res.json(
    await ScheduleConfigs.create('Agenda do admin', '8:00:00', '22:00:00', 2),
  );*/
  //res.json(await ScheduleConfigs.destroy(3));
}

module.exports = (app) => {
  app.post('/login', login);
  app.get('/tokendecode', verifyJWT);
  app.post('/tokendecodePOST', verifyJWT);
  app.get('/teste', teste);
};
