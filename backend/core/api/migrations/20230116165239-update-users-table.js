module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'username_login', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'password_login', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'email_login', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'username_login');
    await queryInterface.removeColumn('Users', 'password_login');
    await queryInterface.removeColumn('Users', 'email_login');
  }
};
