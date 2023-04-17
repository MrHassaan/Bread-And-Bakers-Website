module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("Delivery", {
      p_name: {
        type: Sequelize.STRING,
        },
      c_name: {
        type: Sequelize.STRING,
      },
      p_price: {
        type: Sequelize.INTEGER,
      },
      address:{
        type: Sequelize.STRING,
      },
      total:{
        type: Sequelize.INTEGER,
      }
    });  
    return Delivery ;
  };