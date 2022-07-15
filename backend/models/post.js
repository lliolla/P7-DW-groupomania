'use strict';
const { Model} = require('sequelize');

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
          foreignKey: 'id_users', 
          allowNull: false,
        })
      models.Post.hasMany(models.Comment,
        {foreignKey :'id_posts', 
        allowNull: false,
        });
    }

  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    id_users: DataTypes.INTEGER,
    media: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};