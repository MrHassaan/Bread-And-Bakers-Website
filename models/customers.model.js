module.exports = (sequelize, Sequelize) => {
  const customers = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
    },
    c_name: {
      type: Sequelize.STRING,
    },
    c_email: {
      type: Sequelize.STRING,
    },
    c_password: {
      type: Sequelize.STRING,
    },
  });
  return customers;
};
