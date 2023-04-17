const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.c_name) {
    return res.status(400).json({ message: "Content can not be empty! 400" });
  }

  // Create a Product
  const product = {
    p_name: req.body.p_name,
    c_name: req.body.c_name,
    p_price: req.body.p_price       
  };

  // Save Product in the database
  Product.create(product)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message || "Some error occurred while creating the Product." });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  const { page, p_name } = req.query;
  // const  p_name= req.query.p_name;
  
  var condition = p_name? { p_name: { [Op.like]: `%${p_name}%` } } : null;
  const size=2
  const { limit, offset } = getPagination(page, size);

  Product.findAndCountAll({ where: condition, limit, offset})
    .then((data) => {
      const response = getPagingData(data, page, limit);
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message || " 500 Some error occurred while retrieving products." });
    });
};

exports.findByPrice = (req, res) => {
  const { page, p_price } = req.query;
  // const  p_name= req.query.p_name;
  
  var condition = p_price? { p_price: { [Op.eq] : parseInt(p_price)} }  : null;
  const size=2
  const { limit, offset } = getPagination(page, size);

  Product.findAndCountAll({ where: condition, limit, offset})
    .then((data) => {
      const response = getPagingData(data, page, limit);
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message || "500 Some error occurred while retrieving products." });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ message: `404 Cannot find Product with id=${id}.` });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "500 Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the

exports.update = (req, res) => {
const id = req.params.id;

Product.update(req.body, {
where: { id: id }
})
.then((num) => {
if (num == 1) {
return res.status(200).json({ message: "Product was updated successfully." });
} else {
return res.status(404).json({ message: "Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty! "});
}
})
.catch((err) => {
return res.status(500).json({ message: "Error updating Product with id=" + id });
});
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
const id = req.params.id;

Product.destroy({
where: { id: id }
})
.then((num) => {
if (num == 1) {
return res.status(200).json({ message: "Product was deleted successfully!" });
} else {
return res.status(404).json({ message: "Cannot delete Product with id=${id}. Maybe Product was not found! 404" });
}
})
.catch((err) => {
return res.status(500).json({ message: " 500 Could not delete Product with id=" + id });
});
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
Product.destroy({
where: {},
truncate: false
})
.then((nums) => {
return res.status(200).json({ message: "${nums} Products were deleted successfully! "});
})
.catch((err) => {
return res.status(500).json({ message: err.message || "Some error occurred while removing all products. 500" });
});
};

// Find all published Product
exports.findAllPublished = (req, res) => {
Product.findAll({ where: { published: true } })
.then((data) => {
return res.status(200).json(data);
})
.catch((err) => {
return res.status(500).json({ message: err.message || "Some error occurred while retrieving products.500 " });
});
};