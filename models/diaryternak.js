'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryTernak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiaryTernak.init({
    user_id: DataTypes.INTEGER,
    harvest_date: DataTypes.DATEONLY,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryTernak',
  });
  return DiaryTernak;
};