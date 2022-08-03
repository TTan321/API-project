'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      Review.hasMany(
        models.Image, { foreignKey: 'reviewId' }
=======
      Review.belongsTo(
        models.User, { foreignKey: 'userId' }
>>>>>>> main
      );
    }
  }
  Review.init({
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER,
<<<<<<< HEAD
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
=======
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
>>>>>>> main
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
