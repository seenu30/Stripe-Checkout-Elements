import React, { useState } from "react";
import Checkout from "./checkout"; // Stripe Checkout flow
import ElementsWrapper from "./ElementsWrapper"; // Payment Intent (Elements) flow

const App = () => {
  const [paymentMethod, setPaymentMethod] = useState("checkout");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">Stripe Payment Integration</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => setPaymentMethod("checkout")}
          className={`px-4 py-2 rounded ${paymentMethod === "checkout" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Checkout (Redirect)
        </button>
        <button
          onClick={() => setPaymentMethod("elements")}
          className={`px-4 py-2 rounded ${paymentMethod === "elements" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Payment Intent (Elements)
        </button>
      </div>

      {paymentMethod === "checkout" ? <Checkout /> : <ElementsWrapper />}
    </div>
  );
};

export default App;
