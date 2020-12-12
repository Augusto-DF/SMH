//Connection
const { Sequelize, sequelize } = require('./connection');
const { findUser_id } = require('./User');

const Client = sequelize.define(
  'client',
  {
    client_id: {
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
 * @description Busca um Cliente com base em um id.
 * @param {*} id_
 * @returns Um client se encontrar.
 * @returns Menssagem de error caso não ache.
 */
async function findClient_id(id_) {
  const client = await Client.findAll({
    where: { client_id: id_ },
  });

  if (client) {
    return client;
  } else {
    return { menssage: 'Cliente não existente' };
  }
}

/**
 * @description Verifica se um usuário é um Cliente.
 * @param {*} id_
 * @returns true se for um client.
 * @returns false se não for um client.
 */
async function userIsClient(id_) {
  const result = await Client.findAll({ where: { users_id: id_ } });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria um novo Cliente.
 * @param {*} idUser
 * @returns true caso o client for adicionado com sucesso.
 * @return Mensagem de erro caso o client não seja adicionado com sucesso.
 */
async function createClient(idUser) {
  const user = await findUser_id(idUser);
  if (user.id) {
    if (await userIsClient(idUser)) {
      return {
        menssage: user.userNickName + ' ja é um cliente',
      };
    } else {
      await Client.create({ users_id: idUser });
      return true;
    }
  } else return { menssage: 'Usuário inválido' };
}

/**
 * @description Deleta um cliente.
 * @param {*} id_
 */
async function deleteClient(id_) {
  await Client.destroy({
    where: { client_id: id_ },
  });
  return true;
}

//Admin.sync({ force: true });
module.exports = {
  Client,
  findClient_id,
  userIsClient,
  createClient,
  deleteClient,
};
