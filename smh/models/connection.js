//Sequelize
const Sequelize = require('sequelize');

//Config Vars
const nameBd = 'schedule';
const userBd = 'root'; //********* Lembrar de mudar isso antes de subir a aplicação
const passwordBd = 'root'; //********** Lembrar de mudar isso antes de subir a aplicação
const config = {
  host: 'localhost', //********** Lembrar de mudar isso antes de subir a aplicação
  dialect: 'mysql',
};

//Configs Sequelize (connection)
const sequelize = new Sequelize(nameBd, userBd, passwordBd, config);

//Exports
module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
