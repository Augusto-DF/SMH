//Connection
const { Sequelize, sequelize } = require('./connection');

//User table
const User = sequelize.define('users', {
  //First Name
  userFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },
  //Second Name
  userLastName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: false,
  },

  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
    unique: true,
  },

  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },

  userNickName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
    unique: true,
  },

  userIsAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },

  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },

  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

//User.sync({ force: true });
module.exports = User;
