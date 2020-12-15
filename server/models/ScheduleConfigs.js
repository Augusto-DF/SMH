//Connection
const { Sequelize, sequelize } = require('./connection');

const ScheduleConfigs = sequelize.define(
  'schedule_configs',
  {
    schedule_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    schedule_tittle: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },

    schedule_open_at: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: false,
    },

    schedule_closed_at: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: false,
    },

    admin_id: {
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
 * @description Busca um ScheduleConfigs apartir de seu id.
 * @param {*} id_
 * @returns Um objeto ScheduleConfigs caso exista.
 * @returns false caso não exista.
 */
async function find(id_) {
  const config = await ScheduleConfigs.findOne({
    where: { schedule_id: id_ },
  });

  if (config) {
    return config.dataValues;
  } else return { menssage: 'Id não encontrado' };
}

/**
 * @description Cria uma configuração de agenda.
 * @param {*} schedule_tittle_
 * @param {*} schedule_open_at_
 * @param {*} schedule_closed_at_
 * @param {*} admin_id_
 */
async function create(
  schedule_tittle_,
  schedule_open_at_,
  schedule_closed_at_,
  admin_id_,
) {
  await ScheduleConfigs.create({
    schedule_tittle: schedule_tittle_,
    schedule_open_at: schedule_open_at_,
    schedule_closed_at: schedule_closed_at_,
    admin_id: admin_id_,
  });
  return true;
}

/**
 * @description Deleta uma configuração de agenda.
 * @param {*} id_
 */
async function destroy(id_) {
  await ScheduleConfigs.destroy({
    where: { schedule_id: id_ },
  });
  return true;
}

/**
 * @description Atualiza uma configuração de agenda.
 * @param {*} id_
 * @param {*} schedule_tittle_
 * @param {*} schedule_open_at_
 * @param {*} schedule_closed_at_
 * @param {*} admin_id_
 */
async function update(
  id_,
  schedule_tittle_,
  schedule_open_at_,
  schedule_closed_at_,
  admin_id_,
) {
  try {
    await User.update(
      {
        schedule_tittle: schedule_tittle_,
        schedule_open_at: schedule_open_at_,
        schedule_closed_at: schedule_closed_at_,
        admin_id: admin_id_,
      },
      { where: { schedule_id: id_ } },
    );
  } catch (err) {
    return err;
  }
}

module.exports = {
  ScheduleConfigs,
  find,
  create,
  destroy,
  update,
};
