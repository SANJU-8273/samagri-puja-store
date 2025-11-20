export default function AddressSection() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
        Delivery Address
      </h2>

      <div className="grid gap-6 text-sm text-gray-800">

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-gray-600 pl-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-gray-600 pl-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="+91 9876543210"
            type="tel"
            autoComplete="tel"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-gray-600 pl-1">
            Email Address
          </label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="example@mail.com"
            type="email"
            autoComplete="email"
          />
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-gray-600 pl-1">
            Complete Address <span className="text-red-500">*</span>
          </label>
          <textarea
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="House No, Street, Area, Landmark"
            rows={3}
            autoComplete="address-line1"
          />
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-gray-600 pl-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="Mumbai"
              autoComplete="address-level2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-gray-600 pl-1">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="400001"
              type="number"
              autoComplete="postal-code"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
