const express = require('express')
const app = express()
const port = 3000
const product_cake = require("./routes/product-cakerouter")
const product_cupcake = require("./routes/product-cupcakerouter")
const contact = require("./routes/contactrouter")
const login = require("./routes/loginrouter")
const user_recentorders = require("./routes/user-recentordersrouter")
const user_cart = require("./routes/user-cartrouter")
const admin_product = require("./routes/admin-productrouter")
const admin_addproduct = require("./routes/admin-addproductrouter")

app.use('/Products',product_cake)
app.use('/Products',product_cupcake)
app.use(contact)
app.use(login)
app.use('/User',user_recentorders)
app.use('/User',user_cart)
app.use('/Admin',admin_product)
app.use('/Admin/Product',admin_addproduct)


app.listen(port,()=>{
    console.log('Server runing on 3000');   
})



