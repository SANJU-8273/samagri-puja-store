"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import ImageWithFallback from "../../components/Fallback/ImageWithFallback";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 40;
  const total = subtotal + shipping;

  /* ---------------- EMPTY CART ---------------- */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Looks like you haven't added anything yet.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100">

      {/* CONTENT SAFE SPACE BOTTOM FIXED */}
      <div className="max-w-6xl mx-auto px-4 pb-36 pt-6">

        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* --------- LEFT : ITEMS LIST --------- */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex gap-4"
              >
                {/* IMAGE */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 font-medium text-sm mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* QTY + REMOVE */}
                  <div className="flex items-center justify-between mt-3">

                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>

                      <span className="px-3 text-sm">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right hidden md:block min-w-[80px]">
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --------- RIGHT : ORDER SUMMARY --------- */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-fit">

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>

            {/* Subtotal Block */}
            <div className="space-y-3 text-sm pb-4 border-b">

              <div className="flex justify-between">
                <span className="text-gray-600">Cart Total</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Charges</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Packaging Fee</span>
                <span className="font-medium">₹0</span>
              </div>

            </div>

            {/* Total */}
            <div className="flex justify-between text-base font-bold text-gray-900 py-4">
              <span>Order Total</span>
              <span className="text-blue-600">₹{total}</span>
            </div>

            {/* Delivery Estimate */}
            <div className="flex items-start gap-3 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-12 4h14m-7 4h7m-9 0H3"
                  />
                </svg>
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">Estimated Delivery</p>
                <p className="text-sm text-gray-600">Arrives in <span className="font-medium text-gray-800">1–2 Business Days</span></p>
                <span className="text-xs text-green-600 font-medium mt-1">
                  ✔ Fast Delivery Available
                </span>
              </div>
            </div>


            {/* Payment Methods */}
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Select Payment Method
            </h4>

            <div className="space-y-2 text-sm">

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>UPI (GPay / PhonePe / Paytm)</span>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Debit Card</span>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Credit Card</span>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Net Banking</span>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Wallets</span>
              </label>

              <label className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:border-blue-500 cursor-pointer transition">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Cash on Delivery (COD)</span>
              </label>

            </div>

            {/* Checkout Button */}
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
              Proceed to Payment
            </button>
          </div>

        </div>
      </div>

      {/* -------- STICKY MOBILE CHECKOUT BAR -------- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg 
                      flex items-center justify-between px-4 py-4 z-50">

        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-900">₹{total}</p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm">
          Checkout
        </button>
      </div>
    </div>
  );
}
