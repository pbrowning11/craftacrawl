module.exports = function(sequelize, DataTypes) {
  var Crawl = sequelize.define("Crawl", {
    crawlName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    barList: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    owner:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    position:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Crawl;
};
