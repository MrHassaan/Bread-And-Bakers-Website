const express = require("express");
const app = express();
const port = 8000;
const product_cake = require("./routes/product-cakerouter");
const product_cupcake = require("./routes/product-cupcakerouter");
const contact = require("./routes/contactrouter");
const login = require("./routes/loginrouter");
const SignUp = require("./routes/SignupPageRouter");
const About = require("./routes/AboutRouter");
const user_recentorders = require("./routes/user-recentordersrouter");
const user_cart = require("./routes/user-cartrouter");
const user_orderDelivery = require("./routes/user-deliverRouter");
const admin_homePage = require("./routes/admin-homepageRouter");
const admin_product = require("./routes/admin-productrouter");
const admin_addproduct = require("./routes/admin-addproductrouter");
const home = require("./routes/homerouter");
const user_profile = require("./routes/user-profilerouter");
const admin_updateproduct = require("./routes/admin-updateproductrouter");
app.use("/", home);
app.use("/", home);
app.use("/Products", product_cake);
app.use("/Products", product_cupcake);
app.use(SignUp);
app.use(contact);
app.use(login);
app.use(About);
app.use("/User", user_recentorders);
app.use("/User", user_cart);
app.use("/User/Cart", user_orderDelivery);
app.use("/User", user_profile);
app.use("/Admin", admin_homePage);
app.use("/Admin/Product", admin_product);
app.use("/Admin/Product", admin_addproduct);
app.use("/Admin/Product", admin_updateproduct);
app.listen(port, () => {
  console.log("Server runing on 8000");
});

app.listen(port,()=>{
    console.log('Server runing on 3000');   
})


