'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User, { foreignKey: 'ownerId', as: 'Owner' }
      );
      Spot.belongsToMany(
        models.User, { through: models.Review }
      );
      Spot.belongsToMany(
        models.User, { through: models.Image }
      );
      Spot.belongsToMany(
        models.User, { through: models.Booking }
      );
      Spot.hasMany(
        models.Image, { foreignKey: 'spotId' }
      );
      Spot.hasMany(
        models.Review, { foreignKey: 'spotId' }
      );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
