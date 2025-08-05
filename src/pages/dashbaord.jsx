import React from 'react';
import DashboardCard from '../components/cards/card';
import DashboardTable from '../components/table/dashboardTable';
import { FiUsers, FiTool, FiShoppingBag, FiClipboard, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <DashboardCard icon={<FiUsers />} title="Total Customer" value="5612" change={3.7} changeText="This Month" color="bg-blue-500" />
        <DashboardCard icon={<FiTool />} title="Total Worker" value="1059" change={-1.7} changeText="This Month" color="bg-pink-500" />
        <DashboardCard icon={<FiShoppingBag />} title="Total Shop" value="1896" change={3.7} changeText="This Month" color="bg-orange-400" />
        <DashboardCard icon={<FiClipboard />} title="Total Order" value="1896" change={-1.7} changeText="This Month" color="bg-green-500" />
        <DashboardCard icon={<FiDollarSign />} title="Total Sales" value="₹ 15,40,259" change={-1.7} changeText="This Month" color="bg-rose-500" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DashboardTable
          title="Recent Orders"
          actionLink="See All Order"
          headers={["Order No.", "Service Required", "Status"]}
          data={[
            ["ORD8468163287164", "Plumber", <span className="text-green-500 font-semibold">Assigned</span>],
            ["ORD8468163287164", "AC Repair", <span className="text-yellow-500 font-semibold">Pending</span>],
            ["ORD8468163287164", "Electrician", <span className="text-blue-500 font-semibold">Completed</span>],
            ["ORD8468163287164", "Painter", <span className="text-red-500 font-semibold">Rejected</span>],
            ["ORD8468163287164", "Carpenter", <span className="text-green-500 font-semibold">Assigned</span>],
          ]}
        />
        <DashboardTable
          title="Top Selling Products"
          actionLink="See All Product"
          headers={["Product", "Name", "Category"]}
          data={[
            [<img src="/assets/product.png" alt="product" className="w-8 h-8" />, "PVC Wire Cable", "Electrician"],
            [<img src="/assets/product.png" alt="product" className="w-8 h-8" />, "Havells 9W LED Bulb", "Electrician"],
            [<img src="/assets/product.png" alt="product" className="w-8 h-8" />, "UPVC Plumbing Pipe", "Plumber"],
            [<img src="/assets/product.png" alt="product" className="w-8 h-8" />, "Asian Paints Ultima", "Painter"],
          ]}
        />
      </div>

      <DashboardTable
        title="Top Workers"
        actionLink="See All Worker"
        headers={["Sr.No.", "Worker Name", "Expertise", "Email/Phone", "Total Orders"]}
        data={[
          ["1", "Theresa Webb", "Plumber", "example@mail.com", "965"],
          ["2", "Jane Cooper", "AC Mechanic", "+91-9876543210", "945"],
          ["3", "Brooklyn Simmons", "Electrician", "example@mail.com", "930"],
          ["4", "Jacob Jones", "Painter", "+91-9876543210", "880"],
          ["5", "Jerome Bell", "Tiler", "example@mail.com", "825"],
        ]}
      />
    </div>
  );
};

export default Dashboard;
