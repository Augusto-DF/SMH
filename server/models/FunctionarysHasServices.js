//Connection
const { Sequelize, sequelize } = require('./connection');
const Func = require('./Functionary');
const Service = require('./Service');

const FuncsHasServices = sequelize.define(
  'funcionary_has_service',
  {
    funcionary_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  },
);

/**
 * @description Busca uma relação de funcionario com um serviço.
 * @param {*} idFunctionary
 * @param {*} idService
 * @returns A relação se existir.
 * @returns Menssagem de error caso não ache.
 */
async function find(idFunctionary, idService) {
  const relation = await FuncsHasServices.fidAll({
    where: { funcionary_id: idFunctionary, service_id: idService },
  });

  if (relation) return relation;
  else return { menssage: 'Relação não encontrada.' };
}

/**
 * @description Verifica se existe uma relação entre funcionario e um serviço.
 * @param {*} idFunctionary
 * @param {*} idService
 * @returns true se a relação existir.
 * @returns false se a relação não existir.
 */
async function exists(idFunctionary, idService) {
  const sql =
    'SELECT * FROM funcionary_has_service WHERE funcionary_id = ' +
    idFunctionary +
    ' AND service_id = ' +
    idService;
  const [results, metadata] = await sequelize.query(sql);

  if (results.length > 0) return true;
  else return false;
}

/**
 * @description Cria uma relação de funcionario com um serviço se ambos existirem.
 * @param {*} idFunctionary
 * @param {*} idService
 * @returns true se a relação for criada.
 * @returns Menssagem de error caso não ache.
 */
async function create(idFunctionary, idService) {
  const relationExists = await exists(idFunctionary, idService);
  if (relationExists === true) return { menssage: 'A relação ja existe.' };
  else {
    const sql =
      'INSERT INTO funcionary_has_service (funcionary_id, service_id) VALUES (' +
      idFunctionary +
      ',' +
      idService +
      ')';
    try {
      await sequelize.query(sql);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

/**
 * @description Deleta uma relação de funcionario com um serviço.
 * @param {*} idFunctionary
 * @param {*} idService
 */
async function destroy(idFunctionary, idService) {
  await FuncsHasServices.destroy({
    where: { funcionary_id: idFunctionary, service_id: idService },
  });
  return true;
}

module.exports = { FuncsHasServices, find, create, destroy };
