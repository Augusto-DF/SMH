//Connection
const { Sequelize, sequelize } = require('./connection');
const User = require('./User');

const Functionarys = sequelize.define(
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
 * @description Busca um funcionário com base em um id.
 * @param {*} id_
 * @returns Um funcionary se encontrar.
 * @returns Menssagem de error caso não ache.
 */
async function find(id_) {
  const fun = await Functionarys.findAll({
    where: { funcionary_id: id_ },
  });

  if (fun) {
    return fun;
  } else {
    return { menssage: 'Funcionário não existente' };
  }
}

/**
 * @description Verifica se um usuário é um funcionário.
 * @param {*} idUser
 * @returns true se for um admin.
 * @returns false se não for um admin.
 */
async function userIsFunctionary(idUser) {
  const result = await Functionarys.findAll({ where: { users_id: idUser } });
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
async function create(idUser, permissions_) {
  const user = await User.find(idUser);
  if (user.id) {
    if (await userIsFunctionary(idUser)) {
      return {
        menssage: user.userNickName + ' ja é um funcionário',
      };
    } else {
      await Functionarys.create({
        users_id: idUser,
        permissions: permissions_,
      });
      return true;
    }
  } else return { menssage: 'Usuário inválido' };
}

/**
 * @description Deleta um funcionário.
 * @param {*} id_
 * @returns true se tudo occorer bem.
 */
async function destroy(id_) {
  await Functionarys.destroy({
    where: { funcionary_id: id_ },
  });
  return true;
}

/**
 * @description Atuliaza as informações de um funcionário.
 * @param {*} id_
 * @param {*} permissions_
 */
async function update(id_, permissions_) {
  try {
    await User.update(
      {
        permissions: permissions_,
      },
      { where: { funcionary_id: id_ } },
    );
  } catch (err) {
    return err;
  }
}
/**
 * @description Lista todos os funcionários.
 * @returns Lista de funionários (Com os atributos de usuário tambem) caso exista algum funcionário cadastrado.
 * @returns Menssagem de erro caso não exista nenhum funcionário cadastrado.
 */
async function list() {
  const sql =
    'SELECT * FROM users INNER JOIN funcionary ON users.id = funcionary.users_id;';
  try {
    const [result, metadata] = await sequelize.query(sql);
    return result;
  } catch (err) {
    console.log(err);
    return { menssage: 'Não existe nenhum funcionário cadastrado' };
  }
}

module.exports = { Functionarys, find, create, destroy, update, list };
