const cors = require("cors");
const express = require("express");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.post("/api/create-checkout-session", async (req, res) => {

    const {product} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: "price_1NkqVPG4SOZ9pQkbwCPPNETy",
                quantity: product.quantity,

            }
        ],

        mode: "payment",
        success_url: "http://127.0.0.1:5500/front/success.html",
        cancel_url: "http://127.0.0.1:5500/front/cancel.html",

    });

    return res.json({
        id: session.id,
    })
})

app.get("/api/test", () => {
    console.log("test route");
})

app.listen(8080, () => {
    console.log("server started");
});