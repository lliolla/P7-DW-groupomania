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
      models.Post.belongsTo(models.User,
        {
          foreignKey: 'id_users', 
          allowNull: false,
        })
      models.Post.hasMany(models.Post,
        {foreignKey :'id_posts', 
        allowNull: false,
        });
    
    }
  };
  Like.init({
    id_users: DataTypes.INTEGER,
    id_posts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};