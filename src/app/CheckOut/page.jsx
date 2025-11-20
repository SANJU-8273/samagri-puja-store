"use client";

import AddressSection from "../../components/Order/AddressSection";
import DeliveryOptions from "../../components/Order/DeliveryOptions";
import PaymentSection from "../../components/Order/PaymentSection";
import OrderSummary from "../../components/Order/OrderSummary";

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
