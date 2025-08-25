import React from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../assets/images/Rectangle.png";

const ProgressOrder = () => {
  const navigate = useNavigate();
  return (
    <div className="p-2 font-[Poppins]">
      <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-lg border shadow">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-black hover:text-gray-600"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
              stroke="#0D2E28"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
              stroke="#0D2E28"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M26.6663 20H13.333"
              stroke="#0D2E28"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-semibold">View Order</h1>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="border border-[#616666] p-4 rounded-lg h-screen overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-4 gap-4 mb-2 mt-4 ml-10">
            <label className="col-span-1 text-black font-bold">
              Order Number :
            </label>
            <input
              disabled
              value="ORD8468163287164"
              className="col-span-1 px-4 py-2 font-bold text-black rounded-lg bg-[#CED4F2] border border-[#001580]"
            />
          </div>

          {/* Customer Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Customer Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Customer Name :</label>
              <input
                disabled
                value="Suresh Raina"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">
                Email/Phone Number :
              </label>
              <input
                disabled
                value="+91-9876543210"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
          </div>
          <hr className="my-6 w-8/12" />

          {/* Worker Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Worker Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Worker Name :</label>
              <input
                disabled
                value="Ashok Raina"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Email/Phone Number :</label>
              <input
                disabled
                value="+91-9876543210"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
          </div>
          <hr className="my-6 w-8/12" />

          {/* Shopkeeper Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Shopkeeper Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Shop Name :</label>
              <input
                disabled
                value="Ajit Hardware"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Shopkeeper Name :</label>
              <input
                disabled
                value="Ajit Raina"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium">Email/Phone Number :</label>
              <input
                disabled
                value="+91-9876543210"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium">Address :</label>
              <textarea
                disabled
                value="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
          </div>

          <hr className="my-6 w-8/12" />

          {/* Service Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Service Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Service Required :</label>
              <input
                disabled
                value="Electrician"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Date :</label>
              <input
                disabled
                value="16/07/2024"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <label className="col-span-1 font-medium">Photos :</label>
              <div className="col-span-2">
                <img
                  src={rectangle}
                  alt="uploaded"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="grid  grid-cols-3 gap-4">
              <label className="col-span-1 font-medium">Product List :</label>
              <br />

              <div className="col-span-3 overflow-x-auto">
                <table className=" border border-black">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b border-black p-2">#</th>
                      <th className="border-b border-black p-2">Products</th>
                      <th className="border-b border-black p-2">Price</th>
                      <th className="border-b border-black p-2">Qty</th>
                      <th className="border-b border-black p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">1</td>
                      <td className="p-2">PVC Wire</td>
                      <td className="p-2">400</td>
                      <td className="p-2">1</td>
                      <td className="p-2">400</td>
                    </tr>
                    <tr>
                      <td className="p-2">2</td>
                      <td className="p-2">LED Light</td>
                      <td className="p-2">80</td>
                      <td className="p-2">5</td>
                      <td className="p-2">400</td>
                    </tr>
                    <tr>
                      <td className="p-2">3</td>
                      <td className="p-2">Switches</td>
                      <td className="p-2">10</td>
                      <td className="p-2">7</td>
                      <td className="p-2">400</td>
                    </tr>
                    <tr>
                      <td className="p-2">4</td>
                      <td className="p-2">LED light</td>
                      <td className="p-2">120</td>
                      <td className="p-2">3</td>
                      <td className="p-2">400</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="4"
                        className="border-t border-black p-2 text-right font-semibold"
                      >
                        Final Amount
                      </td>
                      <td className="border-t border-black p-2 font-semibold">6,000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <hr className="my-6 w-8/12" />

          {/* Payment Details */}
          <div className="mb-6 ml-10">
            <h2 className="font-semibold text-lg mb-4">Payment Details</h2>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Total Bill :</label>
              <input
                disabled
                value="6000"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">
                Payment Method :
              </label>
              <input
                disabled
                value="Online"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-2">
              <label className="col-span-1 font-medium">Transaction ID :</label>
              <input
                disabled
                value="TRNS6a8d64HGD6S4"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580]"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-medium">Payment Status :</label>
              <input
                disabled
                value="Paid"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580] text-[#22C55E]"
              />
            </div>
            <hr className="my-6 w-8/12" />
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-bold text-lg">Customer <br />Feedback :</label>
              <input
                disabled
                value="Pending"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580] text-[#FFCC00]"
              />
            </div>
            <hr className="my-6 w-8/12" />
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1 font-semibold">Order Status :</label>
              <input
                disabled
                value="Work in Progress"
                className="col-span-1 px-4 py-2 rounded-lg bg-[#CED4F2] border border-[#001580] text-[#3B82F6]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOrder;
