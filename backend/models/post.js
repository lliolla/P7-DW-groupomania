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
          onDelete: "cascade",
        });
      models.Post.hasMany(models.Comment,{
        foreignKey:{
          name:"PostId",
          allowNull:false,
          onDelete: "cascade",
        }
      })
      
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    media: DataTypes.STRING,
    like:{
      type: DataTypes.INTEGER,
      defaultValue :0
    },
    dislike: {
      type: DataTypes.INTEGER,
      defaultValue :0
    },
    usersLiked: DataTypes.STRING,
    usersDisliked :DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};