module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      admin_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true,
        validate:{
          isEmail: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Admins');
  }
};
