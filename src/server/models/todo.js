'use strict';
export default (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Please enter title'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: {
        args: false, 
        message: 'Please enter description'
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};