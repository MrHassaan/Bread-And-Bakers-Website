module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define("cart", {
    c_id: {
      type: Sequelize.INTEGER,
    },
    p_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });
  return cart;
};
