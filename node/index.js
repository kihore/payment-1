const cors = require('cors')
const express = require('express')
const stripe = require('stripe')('sk_test_51K5WZ2SHED3fFCZOKQwdLOQbiFHvDGjXkUTmXUh9sLuu2lYXBeHjN7T9oGaUgzEjqtln12CxlNxhw5k9ll4ezM5g00yFPbKljB')
const uuid = require('uuid')

const app = express()

app.use(express.json)
app.use(cors())

app.get("/",(req,res)=>{
    res.send("it works")
})

app.post("/payment",(req,res)=>{

    const{product,token} = req.body
    console.log("PRODUCT",product);
    console.log("PRICE",product.price);
    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount: product.price *100,
            currency: 'usd',
            customer: customer.id,
            description: 'product.name'
        },{idempontencyKey})
    }).then(result=>res.status(200).json(result))
    .catch(err=> console.log(err))

})

app.listen(8080,()=>console.log("listening at port 8080"))
