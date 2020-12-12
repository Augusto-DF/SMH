//Connection
const { Sequelize, sequelize } = require('./connection');
const { findUser_id } = require('./User');

const Funcionary = sequelize.define(
  'funcionary',
  {
    funcionary_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    users_id: {
      //FK para Users
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: false,
    },

    permissions: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

/**
 * @description Verifica se um usuário é um Funcionário.
 * @param {*} idUser
 * @returns true se for um admin.
 * @returns false se não for um admin.
 */
async function userIsFuncionary(idUser) {
  const result = await Funcionary.findAll({ where: { users_id: idUser } });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria um novo funcionário.
 * @param {*} idUser
 * @param {*} permissions_
 * @returns true se tudo der certo.
 * @returns Objeto javascript com manssege de erro caso aconteça algum erro.
 */
async function createFuncionary(idUser, permissions_) {
  const user = await findUser_id(idUser);
  if (user.id) {
    if (await userIsFuncionary(idUser)) {
      return {
        menssage: user.userNickName + ' ja é um funcionário',
      };
    } else {
      await Funcionary.create({ users_id: idUser, permissions: permissions_ });
      return true;
    }
  } else return { menssage: 'Usuário inválido' };
}
module.exports = { Funcionary, createFuncionary };
