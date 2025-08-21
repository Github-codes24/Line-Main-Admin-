import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: 1, name: "Plumbing", subTabs: "Plumber, Tank Cleaner" },
  { id: 2, name: "Electrician", subTabs: "NA" },
  { id: 3, name: "Tiles Fitting", subTabs: "NA" },
  { id: 4, name: "Painting", subTabs: "Painter, POP Person" },
  { id: 5, name: "AC & Refrigerator Repairing", subTabs: "NA" },
];

const TabList = () => {
  const navigate = useNavigate();

  const handleEdit = () => navigate("/admin/tabmanagement/tabedit");
  const handleView = () => navigate("/admin/tabmanagement/tabview");
  const handleAdd = () => navigate("/admin/tabmanagement/tabadd");

  return (
    <div className="flex bg-[#E0E9E9] font-medium min-h-screen h-full">
      <main className="flex-1 p-3 gap-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 shadow-xl bg-white h-70 border rounded-xl p-2  ">
          <h1 className="text-xl font-semibold ml-2">Tab List</h1>

          {/* Search */}
          <div className="flex border-[#001580] border-2 rounded-full w-80 bg-[#E4E5EB]"> 
            <img className="p-1" src="Search.png" alt="" />
            <input
              type="text"
              placeholder="Search by Tab Name, Sub Tab Name..."
              className="outline-none border placeholder:text-black bg-[#E4E5EB] pr-4"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#001580] text-white px-4 rounded-lg h-10 mr-2"
          >
            + Add New Tab
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-xl rounded-lg p-3  ">
          <table className="w-full text-left border-2 rounded-xl shadow-lg border-[#001580] ">
            <thead className="bg-[#E4E5EB]">
              <tr>
                <th className="p-2">Sr.No.</th>
                <th className="p-2">Tab Name</th>
                <th className="p-2">Sub Tabs</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tabs.map((tab, index) => (
                <tr key={tab.id} className="border-t h-20">
                  <td className="p-2 ">{index + 1}</td>
                  <td className="p-2 ">{tab.name}</td>
                  <td className="p-2">{tab.subTabs}</td>
                  <td className="p-2 flex gap-2 text-gray-700">
                    <Eye
                      onClick={handleView}
                      className="w-4 h-4 cursor-pointer text-red-600"
                    />
                    <Pencil
                      onClick={handleEdit}
                      className="w-4 h-4 cursor-pointer text-red-600"
                    />
                    <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="w-full p-2 text-sm font-semibold text-black flex justify-between items-center">
            <span>Showing 1 to 5 of 5 Entries</span>
            <div className="flex items-center gap-2">
              <button className="px-1 py-1 text-[#001580] hover:bg-[#E4E5EB] rounded">
                &lt;
              </button>
              <button className="px-2 rounded bg-[#001580] text-white">1</button>
              <button className="px-2 rounded bg-[#E4E5EB] text-[#001580]">2</button>
              <button className="px-2 rounded bg-[#E4E5EB] text-[#001580]">3</button>
              <button className="px-2 py-1 text-[#001580] hover:bg-purple-100 rounded">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TabList;
