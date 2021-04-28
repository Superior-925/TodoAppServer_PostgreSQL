module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Todos', 'taskText', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Todos', 'taskText', {
      type: Sequelize.STRING,
    });
  },
};
