'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_users: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{
          model:'Users',// attention bien mettre au plusirel
          key:'id'
        }
      },
      id_posts: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{
          model:'Posts',// attention bien mettre au plusirel
          key:'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};