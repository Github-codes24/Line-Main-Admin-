// import React from 'react';
// import { FiEye } from 'react-icons/fi';

// const DashboardTable = ({ title, headers, data, actionLink }) => {
//   return (
//     <div className="bg-white shadow-md rounded-md p-4 w-full border border-[#616666] font-myfont">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-md font-bold">{title}</h3>
//         <a href="/" className="text-teal-600 text-sm hover:underline">
//           {actionLink || "See All"}
//         </a>
//       </div>
//       <div className="overflow-x-auto border border-[#616666] rounded-md">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-[#E0E9E9]">
//             <tr>
//               {headers.map((head, idx) => (
//                 <th key={idx} className="px-3 py-2">{head}</th>
//               ))}
//               <th className="px-3 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx} className="">
//                 {row.map((cell, i) => (
//                   <td key={i} className="px-3 py-2">{cell}</td>
//                 ))}
//                 <td className="px-3 py-2">
//                   <FiEye className="text-teal-600 cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardTable;
// import React from 'react';
// import { FiEye } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom'; // 👈 add this

// const DashboardTable = ({ title, headers, data, actionLink, isOrderTable, orderData, isShopTable, shopData }) => {
//   const navigate = useNavigate(); // 👈 hook for navigation

//   return (
//     <div className="bg-white shadow-md rounded-md p-4 w-full border border-[#616666] font-myfont">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-md font-bold">{title}</h3>
//         <a href="/" className="text-teal-600 text-sm hover:underline">
//           {actionLink || "See All"}
//         </a>
//       </div>
//       <div className="overflow-x-auto border border-[#616666] rounded-md">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-[#E0E9E9]">
//             <tr>
//               {headers.map((head, idx) => (
//                 <th key={idx} className="px-3 py-2">{head}</th>
//               ))}
//               <th className="px-3 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx}>
//                 {row.map((cell, i) => (
//                   <td key={i} className="px-3 py-2">{cell}</td>
//                 ))}
//                 <td className="px-3 py-2">
//                   {/* <FiEye
//                     className="text-teal-600 cursor-pointer"
//                     onClick={() => navigate(`/orders/${row[0]}`)} // 👈 row[0] = orderId
//                   /> */}
//                  <FiEye
//   className="text-teal-600 cursor-pointer"
//   onClick={() => {
//     console.log("Eye icon clicked!");
//     console.log("isOrderTable:", isOrderTable);
//     console.log("isShopTable:", isShopTable);
//     console.log("Current index:", idx);
//     console.log("shopData:", shopData);
    
//     if (isOrderTable && orderData) {
//       // For Recent Orders table, get the actual database ID from orderData
//       const actualId = orderData[idx]?._id || orderData[idx]?.id;
//       navigate(`/orderview/${actualId}`);
//     } else if (isShopTable && shopData) {
//       // For Top Shops table, get the actual database ID from shopData
//       console.log("shopData length:", shopData.length);
//       console.log("shopData[idx]:", shopData[idx]);
      
//       const shop = shopData[idx];
//       const shopId = shop?.workerId || shop?._id || shop?.id;
      
//       console.log("Extracted shopId:", shopId);
//       console.log("Shop data:", shop);
      
//       if (shopId && shop) {
//         console.log("Navigating to:", `/admin/shopmanagement/view/${shopId}`);
//         // Pass the shop data via state to avoid API call
//         navigate(`/admin/shopmanagement/view/${shopId}`, {
//           state: { 
//             shop: {
//               _id: shopId,
//               shopName: shop.shopName,
//               ownerName: shop.ownerName,
//               contact: shop.phone,
//               address: shop.address || "",
//               aadhaarNumber: shop.aadhaarNumber || "",
//               aadhaarImage: shop.aadhaarImage || "",
//               gstin: shop.gstin || "",
//               gstinImage: shop.gstinImage || "",
//               isActive: shop.isActive !== false,
//               status: shop.isActive !== false ? "Active" : "Inactive"
//             }
//           }
//         });
//       } else {
//         console.error("No valid shop ID found in:", shop);
//         console.error("Available keys:", shop ? Object.keys(shop) : "No shop object");
//         alert("Shop ID not found. Cannot navigate to shop view.");
//       }
//     }
//     // For other tables, you can add different navigation logic here if needed
//   }}
// />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardTable;
import React from 'react';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DashboardTable = ({
  title,
  headers,
  data,
  actionLink,
  isOrderTable,
  orderData,
  isShopTable,
  shopData,
  isWorkerTable,
  workerData,
  showAction = true, // ✅ new prop to control Action column
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full border border-[#616666] font-myfont">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-bold">{title}</h3>
        <a href="/" className="text-[#001580] text-sm hover:underline">
          {actionLink || "See All"}
        </a>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto border border-[#616666] rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#E0E9E9]">
            <tr>
              {headers.map((head, idx) => (
                <th key={idx} className="px-3 py-2">{head}</th>
              ))}
              {/* Render Action column only if showAction is true */}
              {showAction && <th className="px-3 py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, i) => (
                  <td key={i} className="px-3 py-2">{cell}</td>
                ))}

                {/* Render Action cell only if showAction is true */}
                {showAction && (
                  <td className="px-3 py-2">
                    <FiEye
                    className="text-[#001580] cursor-pointer"
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
