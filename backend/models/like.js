'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User,
        {
          foreignKey:{
            name: "UserId",
            allowNull: false,
          }, 
          onDelete: "CASCADE",
        });
      models.Like.belongsTo(models.Comment,{
        foreignKey:{
          name:"PostId",
          allowNull:false,
        },
        onDelete: "CASCADE",
      })
      
    }
  }
  Like.init({
   
    likes:{
      type: DataTypes.INTEGER,
      defaultValue :0
    },
    disLikes:{
        type: DataTypes.INTEGER,
        defaultValue :0
      },
   

  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};