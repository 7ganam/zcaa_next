import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "donate",
        payment_method_types: ["card"],
        line_items: [
          {
            amount: req.body.amount,
            name: "Donation",
            currency: "EUR",
            quantity: 1,
          },
        ],
        metadata: {
          cause: req.body.cause,
        },
        success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/DONATE`,
      });

      res.status(200).json(session);
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
