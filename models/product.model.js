module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      p_name: {
        type: Sequelize.STRING,
        },
      c_name: {
        type: Sequelize.STRING,
      },
      p_price: {
        type: Sequelize.INTEGER,
      }
    });  
    return Product ;
  };
  