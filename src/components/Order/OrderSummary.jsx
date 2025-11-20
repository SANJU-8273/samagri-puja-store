import { useCart } from "@/app/context/CartContext";

export default function OrderSummary() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sticky top-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
        Order Summary
      </h2>

      {/* PRICES */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98]"
      >
        Proceed to Payment
      </button>

      {/* TRUST BADGES (Optional premium feel) */}
      <div className="mt-4 text-[11px] text-gray-500 text-center leading-4">
        100% Secure Payments • SSL Encrypted Checkout
      </div>
    </div>
  );
}
