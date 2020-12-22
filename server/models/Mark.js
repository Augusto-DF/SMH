//Connection
const { Sequelize, sequelize } = require('./connection');

const Mark = sequelize.define(
  'mark',
  {
    mark_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: false,
    },

    client_client_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: false,
    },

    funcionary_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: false,
    },

    timetable: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: false,
    },

    created_for: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

/**
 * @description Busca uma marcação de horário com base em um id.
 * @param {*} id_
 * @returns Uma marcação de serviço se encontrar.
 * @returns Menssagem de error caso não ache.
 */
async function find(id_) {
  const mark = await Mark.findAll({
    where: { mark_id: id_ },
  });

  if (mark) {
    return mark;
  } else {
    return { menssage: 'Essa marcação não existe' };
  }
}

/**
 * @description Verifica se uma marcação de horário existe baseada no horário e no funionário.
 * @param {*} funcionary_id_
 * @param {*} timetable_
 * @returns true se existir.
 * @returns false se não existir.
 */
async function exists(funcionary_id_, timetable_) {
  const { Op } = Sequelize;
  const result = await Mark.findAll({
    where: {
      [Op.and]: [{ funcionary_id: funcionary_id_ }, { timetable: timetable_ }],
    },
  });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria uma nova marcação de horário.
 * @param {*} service_id_
 * @param {*} client_client_id_
 * @param {*} funcionary_id_
 * @param {*} timetable_
 * @param {*} created_for_
 * @returns true caso a marcação for adicionada com sucesso.
 * @return Mensagem de erro caso a marcação não seja adicionada com sucesso.
 */
async function create(
  service_id_,
  client_client_id_,
  funcionary_id_,
  timetable_,
  created_for_,
) {
  if (await exists(funcionary_id_, timetable_)) {
    return {
      menssage: 'Esse horário já está ocupado.',
    };
  } else {
    await Mark.create({
      service_id: service_id_,
      client_client_id: client_client_id_,
      funcionary_id: funcionary_id_,
      timetable: timetable_,
      created_for: created_for_,
    });
    return true;
  }
}

/**
 * @description Deleta uma marcação.
 * @param {*} id_
 */
async function destroy(id_) {
  await Mark.destroy({
    where: { mark_id: id_ },
  });
  return true;
}

/**
 * @description Atualiza uma marcação.
 * @param {*} id_
 * @param {*} service_id_
 * @param {*} client_client_id_
 * @param {*} funcionary_id_
 * @param {*} timetable_
 * @param {*} created_for_
 * @returns true caso a marcação for atualizada com sucesso.
 * @return Mensagem de erro caso a marcação não seja atualizada com sucesso.
 */
async function update(
  id_,
  service_id_,
  client_client_id_,
  funcionary_id_,
  timetable_,
  created_for_,
) {
  try {
    await Mark.update(
      {
        service_id: service_id_,
        client_client_id: client_client_id_,
        funcionary_id: funcionary_id_,
        timetable: timetable_,
        created_for: created_for_,
      },
      { where: { mark_id: id_ } },
    );
    return true;
  } catch (err) {
    return err;
  }
}
module.exports = { Mark, find, exists, create, destroy, update };
