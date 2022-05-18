'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.Post,{foreignKey: 'id_users', allowNull: false})
      models.Comment.belongsTo(models.User,{foreignKey:'id_messages', allowNull: false})
      //on precise que la relation de la clef etrangere ne doit pas etre egale a null
    }
  };
  Comment.init({
    id_users: DataTypes.INTEGER,
    id_messages: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};