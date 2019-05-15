module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Todos.associate = (models) => {
    Todos.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'owner',
    });
  };

  return Todos;
};
