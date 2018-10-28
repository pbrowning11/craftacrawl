module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};
