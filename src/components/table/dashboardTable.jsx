
import React from 'react';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DashboardTable = ({
  title,
  headers,
  data,
  actionLink,
  actionText,
  isOrderTable,
  orderData,
  isShopTable,
  shopData,
  isWorkerTable,
  workerData,
  showAction = true, // new prop to control Action column
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full border border-[#616666] font-myfont">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">

        <h3 className="text-md font-medium text-[#0D2E28]">{title}</h3>

        {/* <a href="/" className="text-[#001580] text-sm hover:underline">
          {actionLink || "See All"}
        </a> */}
        {actionLink && (
    <span
      onClick={() => navigate(actionLink)}

      className="text-[#001580] text-sm font-medium hover:underline cursor-pointer"

    >
      {actionText || "See All"} {/*  dynamic text */}
    </span>
  )}
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto border border-[#616666] rounded-md">
        {/* <table className="w-full text-sm text-left"> */}
          <table className="w-full text-sm text-center "> 
          <thead className="bg-[#E4E5EB] text-[#0D2E28] font-medium">
            <tr>
              {headers.map((head, idx) => (
                <th key={idx} className="px-3 py- text-sm font-medium ">{head}</th>
              ))}
              {/* Render Action column only if showAction is true */}
              {showAction && <th className="px-3 py-2 text-sm font-medium">Action</th>}
            </tr>
          </thead>
          <tbody className="text-[#0D2E28]">
            {data.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, i) => (
                  <td key={i} className="px-3 py-2">{cell}</td>
                ))}

                {/* Render Action cell only if showAction is true */}
                {showAction && (
                //  <td className="px-3 py-2 flex justify-center items-middle">
                  <td className="px-3 py-2 text-center align-middle">
  <FiEye
    size={18} // or use text-2xl
    className="text-[#001580] cursor-pointer inline-block"
                      onClick={() => {
                        if (isOrderTable && orderData) {
                          const actualId = orderData[idx]?._id || orderData[idx]?.id;
                          navigate(`/orderview/${actualId}`);
                        } else if (isShopTable && shopData) {
                          const shop = shopData[idx];
                          const shopId = shop?.workerId || shop?._id || shop?.id;

                          if (shopId && shop) {
                            navigate(`/admin/shopmanagement/view/${shopId}`, {
                              state: { 
                                shop: {
                                  _id: shopId,
                                  shopName: shop.shopName,
                                  ownerName: shop.ownerName,
                                  contact: shop.phone,
                                  address: shop.address || "",
                                  aadhaarNumber: shop.aadhaarNumber || "",
                                  aadhaarImage: shop.aadhaarImage || "",
                                  gstin: shop.gstin || "",
                                  gstinImage: shop.gstinImage || "",
                                  isActive: shop.isActive !== false,
                                  status: shop.isActive !== false ? "Active" : "Inactive"
                                }
                              }
                            });
                          } else {
                            alert("Shop ID not found. Cannot navigate to shop view.");
                          }
                        } else if (isWorkerTable && workerData) {
                          console.log("Worker table clicked!");
                          console.log("Current index:", idx);
                          console.log("workerData:", workerData);
                          console.log("workerData length:", workerData.length);
                          
                          const worker = workerData[idx];
                          console.log("Selected worker:", worker);
                          console.log("Worker keys:", worker ? Object.keys(worker) : "No worker object");
                          
                          const workerId = worker?._id || worker?.id || worker?.workerId || worker?.userId;
                          console.log("Extracted workerId:", workerId);

                          if (workerId && worker) {
                            console.log("Navigating to:", `/admin/workermanagement/view/${workerId}`);
                            navigate(`/admin/workermanagement/view/${workerId}`);
                          } else {
                            console.error("No valid worker ID found in:", worker);
                            console.error("Available keys:", worker ? Object.keys(worker) : "No worker object");
                            alert("Worker ID not found. Cannot navigate to worker view.");
                          }
                        }
                        // Add other navigation logic for other tables if needed
                      }}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
