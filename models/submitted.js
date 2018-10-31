module.exports = function(sequelize, DataTypes) {
  var Submitted = sequelize.define( "submittedBar", {
    barName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Submitted;
};
