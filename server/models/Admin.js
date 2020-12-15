//Connection
const { Sequelize, sequelize } = require('./connection');
const User = require('./User');

const Admin = sequelize.define(
  'admin',
  {
    admin_id: {
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
  },
  {
    //Força o sequelize a usar o nome da definição do modelo.
    freezeTableName: true,
    //Impede a criação dos campos (criados por default) createdAt e updatedAt
    timestamps: false,
  },
);

/**
 * @description Busca um administrador com base em um id.
 * @param {*} id_
 * @returns Um admin se encontrar.
 * @returns Menssagem de error caso não ache.
 */
async function find(id_) {
  const admin = await Admin.findAll({
    where: { admin_id: id_ },
  });

  if (admin) {
    return admin;
  } else {
    return { menssage: 'Administrador não existente' };
  }
}

/**
 * @description Verifica se um usuário é um administrador.
 * @param {*} id_
 * @returns true se for um admin.
 * @returns false se não for um admin.
 */
async function userIsAdmin(id_) {
  const result = await Admin.findAll({ where: { users_id: id_ } });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria um novo administrador.
 * @param {*} idUser
 * @returns true caso o admin for adicionado com sucesso.
 * @return Mensagem de erro caso o admin não seja adicionado com sucesso.
 */
async function create(idUser) {
  const user = await User.find(idUser);
  if (user.id) {
    if (await userIsAdmin(idUser)) {
      return {
        menssage: user.userNickName + ' ja é um administrador',
      };
    } else {
      await Admin.create({ users_id: idUser });
      return true;
    }
  } else return { menssage: 'Usuário inválido' };
}

/**
 * @description Deleta um administrador.
 * @param {*} id_
 */
async function destroy(id_) {
  await Admin.destroy({
    where: { admin_id: id_ },
  });
  return true;
}

//Admin.sync({ force: true });
module.exports = { Admin, find, userIsAdmin, create, destroy };
