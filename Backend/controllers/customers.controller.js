const db = require("../models");
const customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a customer
  const customer = {
    id: req.body.id,
    c_name: req.body.c_name,
    c_email: req.body.c_email,
    c_password: req.body.c_password,
  };

  // Save customer in the database
  customer
    .create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer.",
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  // Find all customers that match the condition
  customer
    .findAll({ 
      where: condition,
      limit: limit,
      offset: offset
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  customer
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id,
      });
    });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  customer
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating customer with id=" + id,
      });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  customer
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id,
      });
    });
};

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
  customer
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} customers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing the customer.",
      });
    });
};
