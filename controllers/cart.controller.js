const db = require("../models");
const Cart = db.cart;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.id || !req.body.c_name || !req.body.p_id || !req.body.quantity) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  // Create a new cart object
  const newCart = {
    id: req.body.id,
    c_id: req.body.c_name,
    p_id: req.body.p_id,
    quantity: req.body.quantity,
  };

  // Save cart in the database
  Cart.create(newCart)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cart.",
      });
    });
};

// Retrieve all carts from the database with pagination
exports.findAllWithPagination = (req, res) => {
  const id = req.query.id;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Cart.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
    })
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit);
      res.send({
        totalItems: data.count,
        totalPages: totalPages,
        currentPage: offset > 0 ? Math.floor(offset / limit) + 1 : 1,
        carts: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts.",
      });
    });
};

// Retrieve all carts from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Cart.findAll({ where: condition })
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

  Cart.findByPk(id)
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
        message: err.message || "Error retrieving cart with id=" + id,
      });
    });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Cart.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Cart was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update cart with id=${id}. Maybe cart was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating cart with id=" + id,
        });
      });
  };
  
  // Delete a cart with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cart.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Cart was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete cart with id=${id}. Maybe cart was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not delete cart with id=" + id,
        });
      });
  };
  
  // Delete all carts from the database
  exports.deleteAll = (req, res) => {
    Cart.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} carts were deleted successfully!` });
      })
  
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all carts.",
        });
      });
  };
  
  // Find all carts with the customer name in the request
  exports.findAllByCustomer = (req, res) => {
    const c_name = req.params.c_name;
  
    Cart.findAll({ where: { c_id: c_name } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving carts.",
        });
      });
  };
  
