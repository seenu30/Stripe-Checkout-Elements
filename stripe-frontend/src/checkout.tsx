import React from "react";
import { useState } from "react";

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/create-checkout-session", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
};

export default Checkout;
