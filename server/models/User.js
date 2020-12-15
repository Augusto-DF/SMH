//Connection
const { Sequelize, sequelize } = require('./connection');

//User table
const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  userFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },

  userLastName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false,
  },

  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
    unique: true,
  },

  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },

  userNickName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
    unique: true,
  },

  userIsAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },

  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },

  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

/**
 * @description Busca um usuário a partir do id.
 * @param {*} idTarget
 * @returns Um usuário caso encontre.
 * @returns Menssagem de error caso não encontre.
 */
async function find(idTarget) {
  const target = await User.findOne({
    where: { id: idTarget },
  });
  if (target) {
    return target.dataValues;
  } else {
    return { menssage: 'Id não cadastrado' };
  }
}

/**
 * @description Verifica se existe aquele usuário.
 * @param {*} userNickName_
 * @param {*} userEmail_
 * @returns true se existir.
 * @returns false se não existir.
 */
async function exists(userNickName_, userEmail_) {
  const { Op } = Sequelize;
  const result = await User.findAll({
    where: {
      [Op.or]: [{ userNickName: userNickName_ }, { userEmail: userEmail_ }],
    },
  });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria um novo usuário.
 * @param {*} userFirstName_
 * @param {*} userLastName_
 * @param {*} userEmail_
 * @param {*} userPassword_
 * @param {*} userNickName_
 */
async function create(
  userFirstName_,
  userLastName_,
  userEmail_,
  userPassword_,
  userNickName_,
) {
  const userExist = await exists(userNickName_, userEmail_);
  if (userExist) return { menssage: 'Usuário já cadastrado' };
  else {
    await User.create({
      userFirstName: userFirstName_,
      userLastName: userLastName_,
      userEmail: userEmail_,
      userPassword: userPassword_,
      userNickName: userNickName_,
    });
    return true;
  }
}
/**
 * @description Deleta um usuário a partir do id.
 * @param {*} id_
 */
async function destroy(id_) {
  await User.destroy({
    where: { id: id_ },
  });
  return true;
}

/**
 * @description Atuliaza as informações do usuário.
 * @param {*} id_
 * @param {*} userFirstName_
 * @param {*} userLastName_
 * @param {*} userEmail_
 * @param {*} userPassword_
 * @param {*} userNickName_
 */
async function update(
  id_,
  userFirstName_,
  userLastName_,
  userEmail_,
  userPassword_,
  userNickName_,
) {
  try {
    await User.update(
      {
        userFirstName: userFirstName_,
        userLastName: userLastName_,
        userEmail: userEmail_,
        userPassword: userPassword_,
        userNickName: userNickName_,
      },
      { where: { id: id_ } },
    );
  } catch (err) {
    return err;
  }
}

//User.sync({ force: true });
module.exports = {
  User,
  find,
  exists,
  create,
  destroy,
  update,
};
