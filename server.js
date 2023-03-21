const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");
const categoryRoutes = require("./routes/category.router");
const productRoutes = require("./routes/product.router");
const orderRoutes = require("./routes/order.router");
const DeliveryRoutes = require("./routes/Delivery.router");
const cartRoutes = require("./routes/cart.router");
const customerRoutes = require("./routes/customers.router");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/Delivery", DeliveryRoutes);
app.use("/api/Cart", cartRoutes);
app.use("/api/Customer", customerRoutes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD Application!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});