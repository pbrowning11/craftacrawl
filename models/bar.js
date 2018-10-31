module.exports = function(sequelize, DataTypes) {
  var Bar = sequelize.define("Bar", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cat1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cat2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
  return Bar
}
