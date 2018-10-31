var bCrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bCrypt.compareSync(password, this.Password)
  }
  User.hook("beforeCreate", function(user) {
    user.Password = bCrypt.hashSync(user.Password, bCrypt.genSaltSync(10), null)
  })
  return User;
};
