module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Logs');
  },
};