// TabView.jsx
import React from "react";
import {useNavigate, useParams} from "react-router";

const TabView = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const handleBack = () => {
        navigate("/admin/tabmanagement");
    };
    return (
        <div className="p-2 font-[Poppins]">
            <div className="bg-white shadow rounded-lg p-3 flex items-center gap-2 border-2">
                <img src="/Back Button (1).png" onClick={handleBack} className="mr-3 cursor-pointer w-8" alt="Back" />
                <h2 className="text-lg font-semibold text-gray-800">View Tab</h2>
            </div>
            <div className="bg-white shadow rounded-lg p-4 mt-4 h-screen">
                <div className="bg-white rounded-lg p-6 border h-[90%] border-[#001580]">
                    <div className="mb-4 flex items-center ">
                        <label className="w-80 font-medium text-black ">Tab Name:</label>
                        <input
                            type="text"
                            value="Plumbing"
                            disabled
                            className="flex-1 p-3 rounded-lg text-black border border-[#001580] bg-[#E4E5EB] "
                        />
                    </div>
                    <div className="mb-4 flex items-start">
                        <label className="w-80 font-medium text-black ">Sub Tab Name:</label>
                        <div className="flex-1 space-y-4 ">
                            <input
                                type="text"
                                value="Plumber"
                                disabled
                                className="w-full p-3  rounded-lg  text-black border bg-[#E4E5EB] border-[#001580]"
                            />
                            <input
                                type="text"
                                value="Tank Cleaner"
                                disabled
                                className="w-full p-3  rounded-lg  text-black border bg-[#E4E5EB] border-[#001580]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-4 ">
                    <button
                        onClick={() => navigate(`/admin/tabmanagement/edit/${id}`)}
                        className="w-[200px] bg-[#001580] hover:bg-[#001580] text-white px-6 py-2 rounded-lg"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TabView;
