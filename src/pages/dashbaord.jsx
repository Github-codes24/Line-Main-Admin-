import React, { useEffect, useState } from "react";
import TotalCardsPage from "../components/cards/card";
import DashboardTable from "../components/table/dashboardTable";

import useFetch from "../hook/useFetch";
import conf from "../config";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchData] = useFetch();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Fetch dashboard main data
        const dashboardResult = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/dashboard`,
        });

        // Fetch top products separately
        const productsResult = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/admin/dashboard/top-products`,
        });

        if (dashboardResult) {
          console.log("Dashboard API Response:", dashboardResult);
          console.log("Top Workers Data:", dashboardResult.topWorkers);
          setDashboardData(dashboardResult);
        }
        if (productsResult && productsResult.topProducts) {
          setTopProducts(productsResult.topProducts);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, [fetchData]);

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="p-6 text-red-500">Failed to load dashboard data</div>;
  }

  

  return (
    <div className="bg-[#E0E9E9] min-h-screen p-0">
      <div className="bg-[#FFFFFF] p-2 rounded-md ">
        {/* Cards Section */}
        <div className="mb-6">
          <TotalCardsPage
            totalOrders={dashboardData.totalOrders}
            orderChange={dashboardData.orderChange}
            totalCustomers={dashboardData.totalCustomers}
            customerChange={dashboardData.customerChange}
            totalWorkers={dashboardData.totalWorkers}
            workerChange={dashboardData.workerChange}
            totalShops={dashboardData.totalShops}
            shopChange={dashboardData.shopChange}
          />
        </div>

        {/* Orders + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Orders */}
          <DashboardTable
            title="Recent Orders"
            actionLink="See All Order"
            headers={["Order No.", "Service Required", "Status"]}
            isOrderTable={true}
            orderData={dashboardData.recentOrders || []}
            data={
              dashboardData.recentOrders && dashboardData.recentOrders.length > 0
                ? dashboardData.recentOrders.map((order) => [
                  order.orderId, // Display ID for the table
                  order.specificServiceName,
                  <span
                    className={`font-semibold ${order.orderStatus === "Pending"
                      ? "text-yellow-500"
                      : order.orderStatus === "Assigned"
                        ? "text-green-500"
                        : order.orderStatus === "Completed"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                  >
                    {order.orderStatus}
                  </span>,
                ])
                : [["-", "-", "No Orders Found"]]
            }
          />
          {/* Top Products */}
          <DashboardTable
            title="Top Selling Products"
            actionLink="See All Product"
            headers={["Product", "Name", "Category"]}
            showAction={false} // 👈 hides Action column
            data={
              topProducts && topProducts.length > 0
                ? topProducts.map((product) => [
                  <img
                    src={product.productImageUrl}
                    alt={product.productName}
                    className="w-8 h-8 rounded"
                  />,
                  product.productName,
                  product.productCategory,
                ])
                : [["-", "-", "No Products Found"]]
            }
          />

        </div>

        {/* Top Workers */}
        <div className="mb-6">
          <DashboardTable
            title="Top Workers"
            actionLink="See All Worker"
            headers={["Sr.No.", "Worker Name", "Expertise", "Email/Phone", "Total Orders"]}
            isWorkerTable={true}
            workerData={dashboardData.topWorkers || []}
            data={
              dashboardData.topWorkers && dashboardData.topWorkers.length > 0
                ? dashboardData.topWorkers.map((worker, idx) => [
                  idx + 1,
                  worker.name,
                  worker.experties,   // ✅ corrected spelling
                  worker.contact,
                  worker.totalOrders,
                ])
                : [["-", "-", "-", "-", "No Workers Found"]]
            }
          />
        </div>

        {/* Top Shops */}
        <div className="mb-6">
          <DashboardTable
            title="Top Shops"
            actionLink="See All Shops"
            headers={["Sr.No.", "Shop Name", "Owner Name", "Email/Phone", "Total Orders"]}
            isShopTable={true}
            shopData={dashboardData.topShops || []}
            data={
              dashboardData.topShops && dashboardData.topShops.length > 0
                ? dashboardData.topShops.map((shop, idx) => [
                  idx + 1,
                  shop.shopName,
                  shop.ownerName,   //  from API
                  shop.phone,
                  shop.totalOrders,
                ])
                : [["-", "-", "-", "-", "No Shops Found"]]
            }
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
