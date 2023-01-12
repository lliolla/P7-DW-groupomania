'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User,
        {
          foreignKey:{
            name: "UserId",
            allowNull: false,
          }, 
          onDelete: "CASCADE",
        });
      models.Post.hasMany(models.Comment,{
        foreignKey:{
          name:"PostId",
          allowNull:false,
        },
        onDelete: "CASCADE",
      })
      
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    media: DataTypes.STRING,
    likes:{
      type: DataTypes.INTEGER,
      defaultValue :0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue :0
    },
    usersLiked: {
        type: DataTypes.JSON,
      
        },

    usersDisliked :{
        type: DataTypes.JSON,
      
       }

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};