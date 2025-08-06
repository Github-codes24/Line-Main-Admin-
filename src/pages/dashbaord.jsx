import React from "react";
import TotalCardsPage from "../components/cards/card";
import DashboardTable from "../components/table/dashboardTable";

import wireImg from "../assets/images/wire.png";

const Dashboard = () => {
  return (
    <div className="bg-[#E0E9E9] min-h-screen p-4">
      <div className="bg-[#FFFFFF] p-2 rounded-md ">
        {/* Cards */}
        <div className="mb-6">
          <TotalCardsPage />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DashboardTable
            title="Recent Orders"
            actionLink="See All Order"
            headers={["Order No.", "Service Required", "Status"]}
            data={[
              [
                "ORD8468163287164",
                "Plumber",
                <span className="text-green-500 font-semibold">Assigned</span>,
              ],
              [
                "ORD8468163287164",
                "AC Repair",
                <span className="text-yellow-500 font-semibold">Pending</span>,
              ],
              [
                "ORD8468163287164",
                "Electrician",
                <span className="text-blue-500 font-semibold">Completed</span>,
              ],
              [
                "ORD8468163287164",
                "Painter",
                <span className="text-red-500 font-semibold">Rejected</span>,
              ],
              [
                "ORD8468163287164",
                "Carpenter",
                <span className="text-green-500 font-semibold">Assigned</span>,
              ],
            ]}
          />
          <DashboardTable
            title="Top Selling Products"
            actionLink="See All Product"
            headers={["Product", "Name", "Category"]}
            data={[
              [
                <img src={wireImg} alt="product" className="w-8 h-8" />,
                "PVC Wire Cable",
                "Electrician",
              ],
              [
                <img src={wireImg} alt="product" className="w-8 h-8" />,
                "Havells 9W LED Bulb",
                "Electrician",
              ],
              [
                <img src={wireImg} alt="product" className="w-8 h-8" />,
                "UPVC Plumbing Pipe",
                "Plumber",
              ],
              [
                <img src={wireImg} alt="product" className="w-8 h-8" />,
                "Asian Paints Ultima",
                "Painter",
              ],
            ]}
          />
        </div>

        {/* Workers Table */}
        <div className="mb-6">
          <DashboardTable
            title="Top Workers"
            actionLink="See All Worker"
            headers={[
              "Sr.No.",
              "Worker Name",
              "Expertise",
              "Email/Phone",
              "Total Orders",
            ]}
            data={[
              ["1", "Theresa Webb", "Plumber", "example@mail.com", "965"],
              ["2", "Jane Cooper", "AC Mechanic", "+91-9876543210", "945"],
              [
                "3",
                "Brooklyn Simmons",
                "Electrician",
                "example@mail.com",
                "930",
              ],
              ["4", "Jacob Jones", "Painter", "+91-9876543210", "880"],
              ["5", "Jerome Bell", "Tiler", "example@mail.com", "825"],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
