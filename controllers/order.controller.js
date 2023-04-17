const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.order;

const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: orders } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, orders, totalPages, currentPage };
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.p_name) {
    res.status(400).send({
      message: "Product name can not be empty!",
    });
    return;
  }

  // Create an order
  const order = {
    p_name: req.body.p_name,
    cust_id: req.body.cust_id,
    p_price: req.body.p_price,
    p_quantity: req.body.p_quantity,
    total: req.body.total,
  };

  // Save order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, p_name } = req.query;
  const size = 2;
  const { limit, offset } = getPagination(page, size);

  var condition = p_name ? { p_name: { [Op.like]: `%${p_name}%` } } : null;

  Order.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data)=> {
      res.send(data);
      })
      .catch((err) => {
      res.status(500).send({
      message: "Error retrieving order with id=" + id,
      });
      });
      };
      
exports.update = (req, res) => {
        const id = req.params.id;
            
        Order.update(req.body, {
          where: { id: id },
        })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Order was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Order with id=" + id,
          });
        });
      };
            
exports.delete = (req, res) => {
        const id = req.params.id;
            
        Order.destroy({
          where: { id: id },
        })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Order was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Order with id=" + id,
          });
        });
      };
            
exports.deleteAll = (req, res) => {
        Order.destroy({
          where: {},
          truncate: false,
        })
        .then((nums) => {
          res.send({ message: `${nums} Orders were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while removing all orders.",
          });
        });
      };
      