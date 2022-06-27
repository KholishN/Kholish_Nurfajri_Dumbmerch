'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.product, {
        as: "reviewProduct",
        foreignKey: {
          name: "idProduct",
        },
      });

      review.belongsTo(models.user, {
        as: "reviewer",
        foreignKey: {
          name: "idBuyer",
        },
      });

      review.belongsTo(models.transaction, {
        as: "reviewTransaction",
        foreignKey: {
          name: "idTransaction",
        },
      });


    }
  }
  review.init({
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    idBuyer: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    idTransaction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};