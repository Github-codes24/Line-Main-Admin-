import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {X} from "lucide-react";
const TabAdd = () => {
    const navigate = useNavigate();
    const [tabName, setTabName] = useState("");
    const [subTabs, setSubTabs] = useState([{id: Date.now(), name: ""}]);
    const handleBack = () => {
        navigate("/admin/tabmanagement");
    };
    const handleAddSubTab = () => {
        setSubTabs([...subTabs, {id: Date.now(), name: ""}]);
    };
    const handleRemoveSubTab = (id) => {
        setSubTabs(subTabs.filter((sub) => sub.id !== id));
    };
    const handleChangeSubTab = (id, value) => {
        setSubTabs(subTabs.map((sub) => (sub.id === id ? {...sub, name: value} : sub)));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tab Name:", tabName);
        console.log("Sub Tabs:", subTabs);
        navigate("/admin/tabmanagement");
    };
    return (
        <div className="flex flex-col font-medium text-[#0D2E28] p-2 h-full font-[Poppins]">
            <div className="flex items-center bg-white border rounded-lg shadow p-3 mb-4">
                <img src="/Back Button (1).png" onClick={handleBack} className="mr-3 cursor-pointer w-8" alt="Back" />
                <h2 className="text-lg font-semibold">Add New Tab</h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border rounded-lg p-6 space-y-5 h-[85%] border-[#616666]"
                >
                    <div className="flex items-center gap-[24px]">
                        <label className="w-1/4 font-medium">Tab Name:</label>
                        <input
                            type="text"
                            value={tabName}
                            onChange={(e) => setTabName(e.target.value)}
                            placeholder="Enter Tab Name"
                            className="flex-1 border  rounded-lg px-3 py-3 border-[#001580]  bg-[#CED4F2] placeholder:text-black "
                        />
                    </div>
                    {subTabs.map((sub, index) => (
                        <div key={sub.id} className="flex items-center gap-[24px]">
                            <label className="w-1/4 font-medium">{index === 0 ? "Sub Tab Name:" : ""}</label>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={sub.name}
                                    onChange={(e) => handleChangeSubTab(sub.id, e.target.value)}
                                    placeholder="Enter Sub Tab Name"
                                    className="w-full rounded-lg px-3 py-3 pr-8 outline-none border bg-[#CED4F2] border-[#001580] placeholder:text-black"
                                />
                                {subTabs.length > 1 && (
                                    <X
                                        onClick={() => handleRemoveSubTab(sub.id)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSubTab}
                        className="text-base text-[#001580] hover:underline ml-[82%]"
                    >
                        + Add More Sub Tab
                    </button>
                </form>
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-[200px] bg-[#CED4F2] text-[#001580] px-6 py-2 rounded-lg border border-[#001580]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-[200px] bg-[#001580] text-white px-6 py-2 rounded-lg hover:bg-[#001580]"
                        onClick={handleSubmit}
                    >
                        Add Tab
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TabAdd;
