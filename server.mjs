import  express from "express";
import Stripe from "stripe";
const app = express();


let stripeGateway = Stripe(process.env.stripe_key);
let DOMAIN = process.env.DOMAIN;


// Your routes go here...
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.post("/stripe-checkout" , async(req , res)=>{
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types:['card'],
        mode:"payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/checkout`,
        line_items: req.body.items.map(item=>{
            return{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.name,
                        description:item.shortDes,
                        images:[item.image]
                    },
                    unit_amount: item.price *100
                },
                quantity: item.item
            }
        })
    })
    res.json(session.url)
})


app.get("/checkout" , (req,res)=>{
    res.sendFile("Checkout.js",{ root:"public"})
})

app.get("/CartPage" , (req,res)=>{
    res.sendFile("CartPage.js",{ root:"public"})
})

