const db = require("../models");
const order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.c_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a order
  const order = {
    p_name: req.body.p_name,
    cust_id: req.body.cust_id,
    p_price: req.body.p_price,
    p_quantity:req.body.p_quantity,
    total:req.body.total       
  };

  // Save order in the database
  order.create(order)
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
const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: order } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, order, totalPages, currentPage };
};

// Retrieve all order from the database.
exports.findAll = (req, res) => {
  const { page, p_name } = req.query;
  // const  p_name= req.query.p_name;
  var condition = p_name? { p_name: { [Op.like]: `%${p_name}%` } } : null;
  const size=2
  const { limit, offset } = getPagination(page, size);


  order.findAndCountAll({ where: condition , limit, offset})
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order.",
      });
    });
};

// Find a single order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  order.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find order with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving order with id=" + id,
      });
    });
};

// Update a order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating order with id=" + id,
      });
    });
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete order with id=" + id,
      });
    });
};

// Delete all order from the database.
exports.deleteAll = (req, res) => {
  order.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};

