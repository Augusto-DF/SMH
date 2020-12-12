const Sequelize = require('sequelize');
const {
  User,
  findUser_id,
  userExists,
  createUser,
  deleteUser,
  updateUser,
} = require(__dirname + '/../models/User');
const Admin = require(__dirname + '/../models/Admin');
const Funcionary = require(__dirname + '/../models/Funcionary');
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
    await createUser(
      'Nelsu',
      'Paxêcu',
      'nelsin123@gmail.com',
      '159357',
      'nenelsu',
    ),
  );*/
  //res.json(await deleteUser(10));
  /*res.json(
    await updateUser(
      11,
      'Nelsuu',
      'Paxêcu',
      'nelsin123@gmail.com',
      '159357',
      'nenelsu',
    ),
  );*/
  //res.json(await Admin.createAdmin(11));
  //res.json(await Admin.deleteAdmin(3));
  //res.json(await Funcionary.createFuncionary(11, { permissions: 'basic' }));
}

module.exports = (app) => {
  app.post('/login', login);
  app.get('/tokendecode', verifyJWT);
  app.post('/tokendecodePOST', verifyJWT);
  app.get('/teste', teste);
};
