"use client";

import AddressSection from "../../components/Checkout/AddressSection";
import DeliveryOptions from "../../components/checkout/DeliveryOptions";
import PaymentSection from "../../components/checkout/PaymentSection";
import OrderSummary from "../../components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-8 py-10 px-4">
      
      {/* Left Section */}
      <div className="space-y-6 lg:col-span-2">
        <AddressSection />
        <DeliveryOptions />
        <PaymentSection />
      </div>

      {/* Right Section */}
      <div>
        <OrderSummary />
      </div>

    </div>
  );
}
