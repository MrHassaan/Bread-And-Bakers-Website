const db = require("../models");
const Delivery = db.Delivery;
const Op = db.Sequelize.Op;

// Create and Save a new Delivery
exports.create = (req, res) => {
  // Validate request
  if (!req.body.c_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Delivery object
  const newDelivery = {
    p_name: req.body.p_name,
    c_name: req.body.c_name,
    p_price: req.body.p_price,
    address:req.body.address,
    total:req.body.total       
  };

  // Save Delivery object in the database
  Delivery.create(newDelivery)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Delivery.",
      });
    });
};

// Retrieve all Delivery from the database.
exports.findAll = (req, res) => {
  const  p_name= req.query.p_name;
  var condition = p_name? { p_name: { [Op.like]: `%${p_name}%` } } : null;

  Delivery.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Delivery.",
      });
    });
};

// Find a single Delivery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Delivery.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Delivery with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Delivery with id=" + id,
      });
    });
};

// Update a Delivery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Delivery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Delivery with id=${id
          }. Maybe Delivery was not found or req.body is empty!`,
          });
          }
          })
          .catch((err) => {
          res.status(500).send({
          message: "Error updating Delivery with id=" + id,
          });
          });
          };
          
          // Delete a Delivery with the specified id in the request
          exports.delete = (req, res) => {
          const id = req.params.id;
          
          Delivery.destroy({
          where: { id: id },
          })
          .then((num) => {
          if (num == 1) {
          res.send({
          message: "Delivery was deleted successfully!",
          });
          } else {
          res.send({
          message:' Cannot delete Delivery with id=${id}. Maybe Delivery was not found!',
          });
          }
          })
          .catch((err) => {
          res.status(500).send({
          message: "Could not delete Delivery with id=" + id,
          });
          });
          };
          
          // Delete all Delivery from the database.
          exports.deleteAll = (req, res) => {
          Delivery.destroy({
          where: {},
          truncate: false,
          })
          .then((nums) => {
          res.send({ message:' ${nums} Delivery were deleted successfully! '});
          })
          .catch((err) => {
          res.status(500).send({
          message:
          err.message || "Some error occurred while removing all Delivery.",
          });
          });
          };
          
          // Find all published Delivery
          exports.findAllPublished = (req, res) => {
          Delivery.findAll({ where: { published: true } })
          .then((data) => {
          res.send(data);
          })
          .catch((err) => {
          res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving Delivery.",
          });
          });
          };