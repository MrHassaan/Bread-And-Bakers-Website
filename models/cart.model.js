module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define("cart", {
    id: {
      type: Sequelize.INTEGER,
    },
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
