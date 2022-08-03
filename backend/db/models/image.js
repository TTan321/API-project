'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.Review, { foreignKey: 'reviewId' }
      );
<<<<<<< HEAD
=======
      Image.belongsTo(
        models.User, { foreignKey: 'userId' }
      );
      Image.belongsTo(
        models.Spot, { foreignKey: 'spotId' }
      );
>>>>>>> main
    }
  }
  Image.init({
    url: DataTypes.STRING,
    previewImage: DataTypes.BOOLEAN,
<<<<<<< HEAD
    spotId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
=======
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
>>>>>>> main
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
