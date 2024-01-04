'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DompetTernak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DompetTernak.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    amount: DataTypes.INTEGER,
    category: DataTypes.ENUM('income', 'expense'),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DompetTernak',
  });
  return DompetTernak;
};