import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { db } from "./db";
import { orders } from "./db/schema";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.use(cors());
app.use(express.json());

// ✅ Create Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      locale: "auto", // Auto-detect locale OR use "he-IL"
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Digital Book" },
            unit_amount: 1999,
          },
          quantity: 1,
        },
      ],
    });

    const data = { stripeSessionId: session.id, status: "pending", amount: 1999 };

    await db.insert(orders).values(data);

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Create Payment Intent (for Stripe Elements)
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
