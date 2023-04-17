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
  origin: "http://localhost:8000",
};
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down due to uncaught exception: ${err.stack}`);
  process.exit(1);
});

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

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Handle Sequelize database errors
app.use((err, req, res, next) => {
  if (err instanceof db.Sequelize.ValidationError) {
    // Handle validation errors
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(

422).json({ errors });
} else if (err instanceof db.Sequelize.DatabaseError) {
// Handle database errors
res.status(500).json({ error: "Internal Server Error" });
} else {
// Handle other errors
console.error('Error: ${err.message}');
res.status(500).json({ error: "Internal Server Error" });
}
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
console.log("Server is running on port http://127.0.01:${PORT} .");
});