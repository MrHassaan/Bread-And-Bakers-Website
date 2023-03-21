module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      c_name: {
        type: Sequelize.STRING,
      }
    });  
    return Category ;
  };
  