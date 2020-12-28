//Connection
const { Sequelize, sequelize } = require('./connection');
const FuncsHasService = require(__dirname + '/FunctionarysHasServices');

const Service = sequelize.define(
  'service',
  {
    service_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    serviceName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },

    duration: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

/**
 * @description Busca um Serviço com base em um id.
 * @param {*} id_
 * @returns Um serviço se encontrar.
 * @returns Menssagem de error caso não ache.
 */
async function find(id_) {
  console.log('Entrou em serviço');
  const service = await Service.findAll({
    where: { service_id: id_ },
  });
  console.log('Entrou em serviço 2');
  if (service) {
    console.log('Entrou em serviço 3');
    return service;
  } else {
    console.log('Entrou em serviço 4');
    return { menssage: 'Serviço não existente' };
  }
}

/**
 * @description Verifica se um serviço ja existe baseado em seu nome.
 * @param {*} name_
 * @returns true se existir.
 * @returns false se não existir.
 */
async function exists(name_) {
  const result = await Service.findAll({ where: { serviceName: name_ } });
  if (result.length > 0) return true;
  else return false;
}

/**
 * @description Cria um novo serviço.
 * @param {*} serviceName_
 * @param {*} duration_
 * @param {*} description_
 * @returns service caso o serviço for adicionado com sucesso.
 * @return Mensagem de erro caso o serviço não seja adicionado com sucesso.
 */
async function create(serviceName_, duration_, description_) {
  if (await exists(serviceName_)) {
    return {
      menssage: serviceName_ + ' ja é um serviço',
    };
  } else {
    const service = await Service.create({
      serviceName: serviceName_,
      duration: duration_,
      description: description_,
    });
    return service;
  }
}

/**
 * @description Deleta um serviço.
 * @param {Array} list_id
 * @returns true se tudo ocorrer bem.
 * @returns false se algo não ocorrer bem.
 */
async function destroy(list_id) {
  const targets = list_id.toString().replace(',', ' OR service_id = ');
  const sql = 'DELETE FROM service WHERE service_id = ' + targets;
  try {
    await sequelize.query(sql);
  } catch (err) {
    console.log(err);
    return false;
  }
  /*await Service.destroy({
    where: { service_id: list_id },
  });*/
  return true;
}

/**
 * @description Atualiza um serviço.
 * @param {*} id_
 * @param {*} serviceName_
 * @param {*} duration_
 * @param {*} description_
 * @returns true caso o serviço for atualizado com sucesso.
 * @return Mensagem de erro caso o serviço não seja atualizado com sucesso.
 */
async function update(id_, serviceName_, duration_, description_) {
  try {
    await Service.update(
      {
        serviceName: serviceName_,
        duration: duration_,
        description: description_,
      },
      { where: { service_id: id_ } },
    );
    return true;
  } catch (err) {
    return err;
  }
}

/**
 * @description Lista todos os serviços.
 * @returns Uma lista de serviços caso exista ao menos 1 serviço.
 * @return Mensagem de erro caso não exista nenhum serviço.
 */
async function list() {
  try {
    const services = await Service.findAll();
    if (services.length > 0) return JSON.stringify(services);
    else return { menssage: 'Não existe nenhum serviço cadastrado' };
  } catch (err) {
    return err;
  }
}

module.exports = { Service, create, destroy, update, list, find };
