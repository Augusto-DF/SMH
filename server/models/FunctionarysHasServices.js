//Connection
const { Sequelize, sequelize } = require('./connection');
const Func = require('./Functionary');
const Service = require('./Service');

const FuncsHasServices = sequelize.define(
  'funcionary_has_service',
  {
    funcionary_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },

    service_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
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
  const relation = await FuncsHasServices.fidAll({
    where: { funcionary_id: idFunctionary, service_id: idService },
  });

  if (relation) return true;
  else return false;
}

/**
 * @description Cria uma relação de funcionario com um serviço se ambos existirem.
 * @param {*} idFunctionary
 * @param {*} idService
 * @returns A relação se existir.
 * @returns Menssagem de error caso não ache.
 */
async function create(idFunctionary, idService) {
  const func = await Func.find(idFunctionary);
  const service = await Service.find(idService);

  if (func.funcionary_id && service.service_id) {
    const relationExists = await exists(idFunctionary, idService);

    if (relationExists) return { menssage: 'A relação ja existe.' };
    else {
      await FuncsHasServices.create({
        where: { funcionary_id: idFunctionary, service_id: idService },
      });
    }
  } else return { menssage: 'Funcionário ou serviço não encontrados' };
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
