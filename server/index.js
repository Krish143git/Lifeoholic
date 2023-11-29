import express from "express";

const app = express();
const port = 3000;

const PUBLISHABLE_KEY ="pk_test_51LEAIoSIECiNS67jZARIQYpJdnKz0JroPgPljlhlQNKWqqzD65MsAY7eeYAzBsG1xi75JVBm8FbQu7W0RMphNirw00F5RdYRZk";
const SECRET_KEY = "sk_test_51LEAIoSIECiNS67jgVTYwrCP7NsHcJ5ggebCgkmwSZU53wzd0ms4hUZdV7bp2ir09AeqsPh1mdEirLGkusUnzmVc001a0SdfdL";

import Stripe from 'stripe';
const stripe = Stripe(SECRET_KEY, {apiVersion:"2020-08-27"})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.post("/payment", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 500, //lowest denomination of particular currency
        currency: "inr",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  }); 