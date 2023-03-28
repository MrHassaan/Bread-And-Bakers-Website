const db = require("../models");
const cart = db.cart;
const Op = db.Sequelize.Op;

// Create and Save a new cart
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a cart
  const cart = {
    id: req.body.id,
    c_id: req.body.c_name,
    p_id: req.body.p_id,
    quantity: req.body.quantity,
  };

  // Save cart in the database
  cart.create(cart)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cart.",
      });
    });
};

// Retrieve all cart from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  cart
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts.",
      });
    });
};

// Find a single cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  cart
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find cart with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving cart with id=" + id,
      });
    });
};

// Update a cart by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  cart
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "cart was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update cart with id=${id}. Maybe cart was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating cart with id=" + id,
      });
    });
};

// Delete a cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  cart
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "cart was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete cart with id=${id}. Maybe cart was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete cart with id=" + id,
      });
    });
};

// Delete all cart from the database.
exports.deleteAll = (req, res) => {
  cart
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing the cart.",
      });
    });
};
