module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
      p_name: {
        type: Sequelize.STRING,
        },
      c_name: {
        type: Sequelize.STRING,
      },
      p_price: {
        type: Sequelize.INTEGER,
      },
      p_quantity:{
        type: Sequelize.INTEGER,
      },
      total:{
        type: Sequelize.INTEGER,
      }
    });  
    return order ;
  };