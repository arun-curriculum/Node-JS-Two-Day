"use strict";

module.exports = function(sequelize, DataTypes) {
  var Chirp = sequelize.define("Chirp", {
    chirp: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Chirp;
};
