import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, { locale: "he" });

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      alert("Stripe is not ready. Please try again.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
    });

    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right"> 
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading} className="bg-green-500 text-white px-4 py-2 rounded">
        {loading ? "מעבד..." : "שלם עכשיו"}
      </button>
    </form>
  );
};

const ElementsWrapper = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to retrieve client secret.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching payment intent.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading payment intent...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return clientSecret ? (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: { colorPrimary: "#0A2540" },
          rules: {
            ".Input": {
              textAlign: "right",
              direction: "rtl",
            },
            ".Label": {
              textAlign: "right",
              direction: "rtl",
            },
          },
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  ) : (
    <p className="text-red-500">Error: clientSecret is missing</p>
  );
};

export default ElementsWrapper;
