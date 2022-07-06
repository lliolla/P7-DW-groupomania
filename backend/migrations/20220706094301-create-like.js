'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_posts: {
        type: Sequelize.INTEGER,
        reference:{
          model:'Posts',// attention bien mettre au plusirel
          key:'id'
        }
      },
      id_users: {
        type: Sequelize.INTEGER,
        reference:{
          model:'Users',// attention bien mettre au plusirel
          key:'id'
        }
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
    await queryInterface.dropTable('Likes');
  }
};