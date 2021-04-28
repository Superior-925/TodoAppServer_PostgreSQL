'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init(
    {
      taskText: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'Text is missing',
          },
          notEmpty: {
            args: true,
            msg: 'Text is required',
          },
        },
      },
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    },
  );
  return Todo;
};
