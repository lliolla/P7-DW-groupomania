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
      models.Comment.belongsTo(models.Post,
        {
          foreignKey: {
            name: "PostId",
            allowNull: false,
          },
          onDelete: "CASCADE",
        });
      models.Comment.belongsTo(models.User,
        {
          foreignKey:{
             name: "UserId",
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
      //on precise que la relation de la clef etrangere ne doit pas etre egale a null
    }
  };
  Comment.init({
  
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};