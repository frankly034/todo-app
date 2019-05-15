import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Todos, {
      foreignKey: 'id',
      as: 'todoId',
    });
  };
  User.beforeCreate(user => bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.setDataValue('password', hash);
    })
    .catch((err) => {
      console.log(err);
    }));
  return User;
};
