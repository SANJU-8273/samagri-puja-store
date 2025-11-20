"use client";

import Link from "next/link";
import { ShoppingCart, Star, Tag, Plus, Minus } from "lucide-react";
import ImageWithFallback from "./Fallback/ImageWithFallback";
import { useCart } from "../app/context/CartContext";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";  // ⭐ Clerk Hooks

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const { user } = useUser();         // ⭐ Check logged-in user
  const { openSignIn } = useClerk();  // ⭐ Open login modal

  const discount = product.discount || 12;
  const originalPrice = Math.round(product.price * (100 + discount) / 100);

  const increaseQty = () => setQty((p) => p + 1);
  const decreaseQty = () => setQty((p) => (p > 1 ? p - 1 : 1));

  return (
    <div
      className="
        bg-white
        rounded-2xl 
        overflow-hidden
        border border-gray-200
        shadow-2xl 
        hover:shadow-md 
        hover:-translate-y-0.5        
        transition-all duration-300
      "
    >

      {/* IMAGE */}
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-4/4 bg-gray-100 overflow-hidden rounded">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="
              w-full h-full object-cover
              transition-transform duration-500 
              group-hover:scale-105
            "
          />

          {/* DISCOUNT BADGE */}
          <span
            className="
              absolute top-2 left-2
              bg-red-600 text-white text-[10px]
              px-1.5 py-[1.5px] 
              rounded-full 
              font-semibold
              flex items-center gap-1
              shadow-sm
            "
          >
            <Tag className="h-3 w-3" />
            {discount}% OFF
          </span>
        </div>
      </Link>

      {/* CONTENT */}
      <div
        className="
          px-2.5 py-2.5
          bg-gradient-to-br from-[#FFF4D6] via-[#FFE9AD] to-[#FFDD85]
          rounded-b-2xl
          border-t border-[#E6D9A4]
        "
      >

        {/* NAME */}
        <Link href={`/shop/${product.id}`}>
          <h3
            className="
              text-[12px] font-semibold 
              text-gray-900 
              leading-tight 
              line-clamp-2
              hover:text-[#C79A3B] 
              transition
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* PRICE + RATING */}
        <div className="mt-1.5 flex items-center justify-between">

          {/* PRICE */}
          <div className="flex items-end gap-1">
            <p className="text-[14px] font-bold text-[#3B1F1E] leading-none">
              ₹{product.price}
            </p>
            <p className="text-[10px] text-gray-500 line-through leading-none">
              ₹{originalPrice}
            </p>
          </div>

          {/* RATING */}
          <div
            className="
              inline-flex items-center gap-1
              bg-green-50
              border border-green-200
              px-1.5 py-[1px]
              rounded-full
              text-[10px] font-semibold text-green-700
            "
          >
            <Star className="h-2.5 w-2.5 fill-green-500 text-green-500" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        {/* QUANTITY */}
        <div
          className="
            mt-2 
            bg-gray-100 
            px-2 py-1
            rounded-md 
            flex items-center justify-between
            border border-gray-200
          "
        >
          <span className="text-[10px] text-[#3B1F1E] font-medium">
            Qty
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={decreaseQty}
              className="
                h-5 w-5 
                bg-white 
                border border-gray-300 
                rounded 
                flex items-center justify-center
                hover:bg-gray-200 
                active:scale-95 
                transition
              "
            >
              <Minus size={10} />
            </button>

            <span className="font-semibold text-[12px] w-4 text-center text-[#3B1F1E]">
              {qty}
            </span>

            <button
              onClick={increaseQty}
              className="
                h-5 w-5 
                bg-white border border-gray-300 
                rounded 
                flex items-center justify-center
                hover:bg-gray-200 
                active:scale-95 
                transition
              "
            >
              <Plus size={10} />
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-3 grid grid-cols-2 gap-2">

          {/* ADD TO CART */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ ...product, quantity: qty });
            }}
            className="
              py-2.5 text-[12px] font-semibold rounded-md
              flex items-center justify-center gap-1
              select-none text-[#8A4A08]
              bg-gradient-to-r from-[#FFF7E6] to-[#FFE8BF]
              border border-[#E6CFA3]
              shadow-sm
              transition-all duration-300
              hover:shadow-md hover:-translate-y-[1.5px]
              active:scale-95
            "
          >
            <ShoppingCart className="h-3.5 w-3.5 text-[#C27A14]" />
            Add
          </button>

          {/* BUY NOW (WITH CLERK LOGIN CHECK) */}
          <button
            onClick={() => {
              if (!user) {
                // ❌ User NOT logged in → Open Clerk Login
                openSignIn({
                  redirectUrl: `/CheckOut?productId=${product.id}&qty=${qty}`,
                });
                return;
              }

              // ✅ User logged in → Go to Checkout
              window.location.href = `/CheckOut?productId=${product.id}&qty=${qty}`;
            }}
            className="
              py-2.5 text-[12px] font-semibold rounded-md text-center
              select-none text-white
              bg-gradient-to-r from-[#F4A100] to-[#F6C453]
              border border-[#E4B65B]
              shadow-sm
              transition-all duration-300
              hover:shadow-md hover:-translate-y-[1.5px]
              active:scale-95
            "
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}
