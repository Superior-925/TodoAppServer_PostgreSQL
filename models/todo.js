'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init(
    {
      title: {
        field: 'title',
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Tilte is missing',
          },
          notEmpty: {
            args: true,
            msg: 'Tilte is required',
          },
        },
      },
      isCompleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    },
  );
  return Todo;
};
