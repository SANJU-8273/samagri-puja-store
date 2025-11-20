"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "../../data/products";
import { useCart } from "../context/CartContext";
import { Check, Plus, Minus } from "lucide-react";

export default function CustomKitPage() {
    const selectableProducts = products.filter(
        (p) => p.category !== "Custom Combos" && p.category !== "Festival Kits"
    );

    const { addToCart } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);

    const weightMultipliers = {
        "50g": 0.5,
        "100g": 1,
        "250g": 2.5,
        "500g": 5,
        "1kg": 10,
    };

    const toggleItem = (product) => {
        const exists = selectedItems.find((item) => item.id === product.id);
        if (exists) {
            setSelectedItems(selectedItems.filter((item) => item.id !== product.id));
        } else {
            setSelectedItems([
                ...selectedItems,
                { ...product, quantity: 1, weight: "100g" },
            ]);
        }
    };

    const updateQuantity = (id, inc) => {
        setSelectedItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + inc) }
                    : item
            )
        );
    };

    const updateWeight = (id, weightValue) => {
        setSelectedItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, weight: weightValue } : item
            )
        );
    };

    const totalPrice = selectedItems.reduce(
        (sum, item) =>
            sum +
            item.price * weightMultipliers[item.weight] * item.quantity,
        0
    );

    const handleAddToCart = () => {
        const customProduct = {
            id: "custom_" + Date.now(),
            name: "Custom Puja Kit",
            category: "Custom Combos",
            items: selectedItems,
            price: totalPrice,
        };

        addToCart(customProduct);

    };

    return (
        <div className="min-h-screen mx-auto container bg-gradient-to-b from-[#FFF8EF] to-[#FBEEDD] p-4 sm:p-6 pb-28">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

                {/* LEFT PRODUCTS SECTION */}
                <div className="lg:col-span-3 space-y-5 sm:space-y-7">

                    {/* Heading Section – Mobile Perfect + Premium */}
                    <div className="text-center sm:text-left space-y-2 animate-fadeIn">

                        {/* TITLE */}
                        <h1
                            className="
      text-[20px] sm:text-4xl 
      font-extrabold 
      tracking-tight 
      text-[#4A1E20]
      leading-snug
      font-[Cinzel]
    "
                        >
                            Build Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C3952D]">
                                {" "}Custom Puja Kit
                            </span>
                        </h1>

                        {/* GOLD DECOR LINE – MOBILE SMALL */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-1">

                            <span className="hidden sm:block h-[2px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />

                            {/* Small golden dot */}
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />

                            <span className="hidden sm:block h-[2px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                        </div>

                        {/* SUBTITLE */}
                        <p
                            className="
      text-[#6F4E37] 
      text-[12px] sm:text-base 
      max-w-xs sm:max-w-2xl 
      mx-auto sm:mx-0 
      leading-relaxed
    "
                        >
                            Select items from our spiritual collection and customize quantity & weight.
                        </p>

                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {selectableProducts.map((product) => {
                            const isSelected = selectedItems.some((i) => i.id === product.id);
                            const selectedItem = selectedItems.find((i) => i.id === product.id);

                            return (
                                <div
                                    key={product.id}
                                    className="
                bg-white rounded-xl 
                shadow-sm hover:shadow-xl 
                transition-all duration-300 
                border border-gray-200 
                overflow-hidden group
              "
                                >

                                    {/* IMAGE */}
                                    <div className="relative aspect-[4/4] bg-gray-100 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        {isSelected && (
                                            <div className="
                    absolute top-2 right-2 
                    bg-white/80 backdrop-blur-md 
                    rounded-full p-1 shadow-lg
                  ">
                                                <Check className="h-5 w-5 text-green-600" />
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-3 sm:p-4">

                                        <h3 className="text-sm sm:text-base font-semibold text-[#4B1A1B] line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-[#775947] mt-1 font-medium">
                                            ₹{product.price} / 100g
                                        </p>

                                        {/* ADD / REMOVE BUTTON */}
                                        <button
                                            onClick={() => toggleItem(product)}
                                            className={`
                    w-full mt-3 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold
                    transition-all shadow 
                    ${isSelected
                                                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110"
                                                    : "bg-gradient-to-r from-green-600 to-green-700 hover:brightness-110"}
                  `}
                                        >
                                            {isSelected ? "Remove" : "Add to Kit"}
                                        </button>

                                        {/* OPTIONS */}
                                        {isSelected && (
                                            <div className="mt-4 space-y-3">

                                                {/* QUANTITY */}
                                                <div className="
                      flex items-center justify-between 
                      bg-gray-100 px-3 py-2 
                      rounded-lg border border-gray-300
                      text-xs sm:text-sm
                    ">
                                                    <span className="text-[#4B1A1B] font-medium">Quantity</span>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(product.id, -1)}
                                                            className="p-1 bg-white border rounded-lg shadow-sm active:scale-95"
                                                        >
                                                            <Minus size={14} />
                                                        </button>

                                                        <span className="font-semibold text-[#4B1A1B]">
                                                            {selectedItem.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => updateQuantity(product.id, 1)}
                                                            className="p-1 bg-white border rounded-lg shadow-sm active:scale-95"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* WEIGHT */}
                                                <div className="
                      flex items-center justify-between 
                      bg-gray-100 px-3 py-2 
                      rounded-lg border border-gray-300
                      text-xs sm:text-sm
                    ">
                                                    <span className="text-[#4B1A1B] font-medium">Weight</span>

                                                    <select
                                                        value={selectedItem.weight}
                                                        onChange={(e) => updateWeight(product.id, e.target.value)}
                                                        className="
                          p-1.5 sm:p-2 
                          border rounded-lg bg-white 
                          text-xs sm:text-sm
                          focus:ring-1 focus:ring-[#D4AF37]
                        "
                                                    >
                                                        <option>50g</option>
                                                        <option>100g</option>
                                                        <option>250g</option>
                                                        <option>500g</option>
                                                        <option>1kg</option>
                                                    </select>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* DESKTOP STICKY SUMMARY */}
                <div className="hidden lg:block lg:col-span-1 sticky top-6">
                    <div className="
        bg-white rounded-2xl 
        shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
        border border-[#E5C28A]/50 
        p-6 space-y-4
      ">

                        <h2 className="text-2xl font-bold text-[#4B1A1B] tracking-tight">
                            Your Custom Kit
                        </h2>

                        {selectedItems.length === 0 && (
                            <p className="text-gray-500 text-sm italic">No items selected yet.</p>
                        )}

                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                            {selectedItems.map((item) => (
                                <div key={item.id} className="border-b border-gray-200 pb-3">
                                    <p className="font-semibold text-sm text-[#4B1A1B]">
                                        {item.name}
                                    </p>

                                    <p className="text-xs text-gray-600">
                                        {item.quantity} × {item.weight}
                                    </p>

                                    <p className="text-sm font-bold text-green-700">
                                        ₹{item.price *
                                            weightMultipliers[item.weight] *
                                            item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="pt-3 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-[#4B1A1B]">
                                Total: <span className="text-green-700">₹{totalPrice}</span>
                            </h3>
                        </div>

                        <button
                            disabled={selectedItems.length === 0}
                            onClick={handleAddToCart}
                            className="
            w-full py-3 mt-2
            rounded-xl font-semibold 
            bg-gradient-to-r from-[#D4AF37] to-[#C3992E]
            text-white shadow-md 
            hover:brightness-110
            active:scale-95
            disabled:bg-gray-300 disabled:text-gray-500
            transition-all
          "
                        >
                            Add Custom Kit to Cart
                        </button>

                    </div>
                </div>

            </div>

            {/* MOBILE STICKY SUMMARY */}
            <div className="
    lg:hidden 
    fixed bottom-0 left-0 right-0 
    bg-white/95 backdrop-blur-md 
    border-t border-gray-200 
    shadow-[0_-4px_12px_rgba(0,0,0,0.1)]
    p-4 z-50
  ">
                <div className="flex justify-between items-center">

                    <div>
                        <p className="text-xs text-gray-500">
                            {selectedItems.length} items selected
                        </p>

                        <p className="text-xl font-bold text-[#4B1A1B] leading-none">
                            ₹{totalPrice}
                        </p>
                    </div>

                    <button
                        disabled={selectedItems.length === 0}
                        onClick={handleAddToCart}
                        className="
          bg-gradient-to-r from-[#D4AF37] to-[#C19A2E]
          text-white px-6 py-3 
          rounded-xl font-semibold 
          shadow-md
          hover:brightness-105 
          active:scale-95
          disabled:bg-gray-300 disabled:text-gray-600
          transition-all
        "
                    >
                        Add Kit
                    </button>

                </div>
            </div>

        </div>

    );
}
