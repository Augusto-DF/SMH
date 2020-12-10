//Connection
const { Sequelize, sequelize } = require('./connection');

const Funcionary = sequelize.define(
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
module.exports = { Funcionary };
