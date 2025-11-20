import { useState } from "react";
import { Wallet, Smartphone, CreditCard } from "lucide-react";

export default function PaymentSection() {
  const [method, setMethod] = useState("cod");

  const methods = [
    {
      id: "cod",
      title: "Cash on Delivery (COD)",
      icon: <Wallet className="h-5 w-5 text-emerald-600" />,
      desc: "Pay at your doorstep",
    },
    {
      id: "upi",
      title: "UPI / GPAY / PhonePe / Paytm",
      icon: <Smartphone className="h-5 w-5 text-blue-600" />,
      desc: "Fast & secure UPI payments",
    },
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      desc: "Visa, Mastercard, Rupay supported",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
        Payment Method
      </h2>

      <div className="grid gap-4">
        {methods.map((m) => {
          const active = method === m.id;
          return (
            <label
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all
              ${
                active
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                {m.icon}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{m.title}</p>
                  <p className="text-xs text-gray-600">{m.desc}</p>
                </div>
              </div>

              <input
                type="radio"
                name="payment"
                value={m.id}
                checked={active}
                readOnly
                className="h-4 w-4 accent-blue-600"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
