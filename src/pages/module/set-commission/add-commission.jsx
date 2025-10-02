// // src/pages/module/set-commission/EditCommission.jsx
// import React, { useState, useEffect } from "react";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";
// import conf from "../../../config";
// import useFetch from "../../../hook/useFetch";

// export default function EditCommission() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [fetchData] = useFetch();

//   const [form, setForm] = useState({
//     category: "",
//     workerCommission: "",
//     shopkeeperCommission: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Fetch single commission
//   const getCommission = async () => {
//     try {
//       const res = await fetchData({
//         method: "GET",
//         url: `${conf.apiBaseUrl}/admin/commissions/get-single-commission/${id}`,
//       });
//       if (res?.commission) {
//         setForm({
//           category: res.commission.category || "",
//           workerCommission: res.commission.workerPercentageCommission || "",
//           shopkeeperCommission: res.commission.shopkeeperPercentageCommission || "",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch commission!");
//     }
//   };

//   useEffect(() => {
//     getCommission();
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       await fetchData({
//         method: "PUT",
//         url: `${conf.apiBaseUrl}/admin/commissions/update-commission/${id}`,
//         data: {
//           category: form.category,
//           workerPercentageCommission: form.workerCommission,
//           shopkeeperPercentageCommission: form.shopkeeperCommission,
//         },
//       });
//       alert("Commission updated successfully!");
//       navigate("/admin/set-commission");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update commission!");
//     }
//   };

//   return (
//     <div className="flex bg-[#E0E9E9] font-[Poppins] min-h-screen">
//       <div className="flex-1 px-4 md:px-0 max-w-[1080px] mx-auto">
//         {/* Header */}
//         <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow mb-4">
//           <IoArrowBackCircleOutline
//             size={30}
//             className="mr-3 cursor-pointer text-[#001580]"
//             onClick={() => navigate("/admin/set-commission")}
//           />
//           <h2 className="text-lg font-medium text-[#0D2E28]">Edit Commission</h2>
//         </div>

//         {/* Main Container */}
//         <div className="bg-white p-4 rounded-lg shadow min-h-[600px]">
//           <div className="border border-[#616666] rounded-lg p-6 min-h-[500px] space-y-6">
//             {/* Category */}
//             <div className="flex items-center gap-[70px] whitespace-nowrap">
//               <label className="w-1/4 font-medium">Category:</label>
//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
//               >
//                 <option value="">Select</option>
//                 <option>Electrician</option>
//                 <option>Plumbing</option>
//                 <option>Tiler</option>
//                 <option>Painter</option>
//                 <option>AC & Refrigerator Mechanic</option>
//               </select>
//             </div>

//             {/* Commission From Worker */}
//             <div className="flex items-center gap-[70px] whitespace-nowrap">
//               <label className="w-1/4 font-medium">Commission From Worker:</label>
//               <input
//                 type="text"
//                 name="workerCommission"
//                 value={form.workerCommission}
//                 onChange={handleChange}
//                 className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
//               />
//             </div>

//             {/* Commission From Shopkeeper */}
//             <div className="flex items-center gap-[70px] whitespace-nowrap">
//               <label className="w-1/4 font-medium">Commission From Shopkeeper:</label>
//               <input
//                 type="text"
//                 name="shopkeeperCommission"
//                 value={form.shopkeeperCommission}
//                 onChange={handleChange}
//                 className="flex-1 border font-medium rounded-lg px-3 py-3 border-[#001580] bg-[#E4E5EB] text-[#0D2E28] outline-none"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-4 pt-6">
//             <button
//               className="px-12 py-2 rounded border border-[#001580] bg-white text-[#001580]"
//               onClick={() => navigate("/admin/set-commission")}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-12 py-2 rounded bg-[#001580] text-white"
//               onClick={handleUpdate}
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
