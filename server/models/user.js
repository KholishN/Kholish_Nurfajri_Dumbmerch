'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // profile
      user.hasOne(models.profile, {
        as:"profile",
        foreignKey:{
          name:"idUser"
        }
      });

      // product
      user.hasMany(models.product, {
        as:"userProduct",
        foreignKey:{
          name:"idUser"
        }
      });

      // transaction
      user.hasMany(models.transaction, {
        as: "buyerTransaction",
        foreignKey: {
          name: "idBuyer",
        },
      });

      user.hasMany(models.transaction, {
        as: "sellerTransaction",
        foreignKey: {
          name: "idSeller",
        },
      });

      // review
      user.hasMany(models.review, {
        as: "reviewer",
        foreignKey: {
          name: "idBuyer",
        },
      });

      // chat
      user.hasMany(models.chat, {
        as: 'senderMessage',
        foreignKey: {
          name: 'idSender',
        },
      });
      user.hasMany(models.chat, {
        as: 'recipientMessage',
        foreignKey: {
          name: 'idRecipient',
        },
      });


    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};