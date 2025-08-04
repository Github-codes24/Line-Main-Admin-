import React from "react";
import { IoArrowBack } from "react-icons/io5";

const CompleteOrder = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <IoArrowBack className="text-2xl" />
        <h1 className="text-xl font-semibold">View Order</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="grid grid-cols-8 gap-4 mb-2">
          <label className="col-span-1 text-black font-bold">
            Order Number :
          </label>
          <input
            disabled
            value="ORD8468163287164"
            className="col-span-2 px-4 py-2 font-bold text-black rounded-md bg-blue-100 border border-blue-300"
          />
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Customer Details</h2>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">Customer Name :</label>
            <input
              disabled
              value="Suresh Raina"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">
              Email/Phone Number :
            </label>
            <input
              disabled
              value="+91-9876543210"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>

          <div className="grid grid-cols-8 gap-4">
            <label className="col-span-1 font-medium">Address :</label>
            <textarea
              disabled
              value="1901 Thornridge Cir. Shiloh, Hawaii 81063"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* Service Details */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Worker Details</h2>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">Worker Name :</label>
            <input
              disabled
              value="Apoorv singh"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">
              Email/phone <br /> number :
            </label>
            <input
              disabled
              value="+91-9876543210"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>
          <div className="grid grid-cols-8 gap-4">
            <label className="col-span-1 font-medium">Address :</label>
            <textarea
              disabled
              value="1901 Thornridge Cir. Shiloh, Hawaii 81063"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>

          <h2 className="font-semibold text-lg mb-2">Shopkeeper Details</h2>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">Shop Name :</label>
            <input
              disabled
              value="xgt"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>

          <div className="grid grid-cols-8 gap-4 mb-2">
            <label className="col-span-1 font-medium">Shopkeeper Name :</label>
            <input
              disabled
              value="xgt"
              className="col-span-2 px-4 py-2 rounded-md bg-blue-100 border border-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
