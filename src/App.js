import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import React, {useEffect} from "react";

// Pages
import Dashboard from "./pages/dashbaord";

// Customer
import CustomerList from "./pages/module/customer/customer-list";
import CustomerAdd from "./pages/module/customer/customer-add";
import CustomerView from "./pages/module/customer/customer-view";
import CustomerEdit from "./pages/module/customer/customer-edit";

// Worker
import WorkerList from "./pages/module/worker/WorkerList";
import WorkerAdd from "./pages/module/worker/WorkerAdd";
import WorkerView from "./pages/module/worker/WorkerView";
import WorkerEdit from "./pages/module/worker/WorkerEdit";

// Shop
import ShopList from "./pages/module/shop/ShopList";
import ShopAdd from "./pages/module/shop/ShopAdd";
import ShopView from "./pages/module/shop/ShopView";
import ShopEdit from "./pages/module/shop/ShopEdit";

// Tab
import TabList from "./pages/module/tab/TabList";
import TabAdd from "./pages/module/tab/TabAdd";
import TabEdit from "./pages/module/tab/TabEdit";
import TabView from "./pages/module/tab/TabView";

// Small Product
import SmallProductList from "./pages/module/small-product/small-product-list";
import SmallProductAdd from "./pages/module/small-product/small-product-add";
import SmallProductEdit from "./pages/module/small-product/small-product-edit";
import SmallProductView from "./pages/module/small-product/small-product-view";

// Big Product
import BigProductList from "./pages/module/big-product/big-product-list";
import BigProductAdd from "./pages/module/big-product/big-product-add";
import BigProductView from "./pages/module/big-product/big-product-view";
import BigProductEdit from "./pages/module/big-product/big-product-edit";
import BigProductApprove from "./pages/module/big-product/big-product-approve";

// Orders
import ListOrder from "./pages/module/order/list-order";
import PendingOrder from "./pages/module/order/pending-order";
import ProgressOrder from "./pages/module/order/progress-order";
import CompleteOrder from "./pages/module/order/completed-order";
import RejectOrder from "./pages/module/order/reject-order";

// Payments
import PaymentList from "./pages/module/payment/paymentList";
import Payment from "./pages/module/payment/payment";

// Commission
import CommissionList from "./pages/module/set-commission/commmission-list";
import AddCommission from "./pages/module/set-commission/add-commission";
import EditCommission from "./pages/module/set-commission/edit-commission";
import ViewCommission from "./pages/module/set-commission/view-commission";

// Charges of Worker
import ChargesList from "./pages/module/set-charges-of-worker/charges-list";
import AddCharges from "./pages/module/set-charges-of-worker/add-commission";
import EditCharges from "./pages/module/set-charges-of-worker/edit-commission";
import ViewCharges from "./pages/module/set-charges-of-worker/view-commission";

// Limit Amount
import SetLimitAmount from "./pages/module/set-limit-amount/set-limit-amount";
import SetLimitAmount2 from "./pages/module/set-limit-amount/set-limit-amount2";

// Layout wrapper so you don’t repeat AdminLayout for every route
function AdminRoute({children, activeTab, setActiveTab}) {
    const location = useLocation();

    useEffect(() => {
        setActiveTab(location.pathname); // update active tab automatically
    }, [location.pathname, setActiveTab]);

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {children}
        </AdminLayout>
    );
}

function App() {
    const [activeTab, setActiveTab] = React.useState("/admin/dashboard");

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            {/* Dashboard */}
            <Route
                path="/admin/dashboard"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <Dashboard />
                    </AdminLayout>
                }
            />

            {/* Customer Routes */}
            <Route
                path="/admin/customermanagement"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CustomerList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/customermanagement/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CustomerAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/customermanagement/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CustomerView />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/customermanagement/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CustomerEdit />
                    </AdminLayout>
                }
            />

            {/* Worker Routes */}
            <Route
                path="/admin/workermanagement"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <WorkerList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/workermanagement/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <WorkerAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/workermanagement/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <WorkerView />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/workermanagement/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <WorkerEdit />
                    </AdminLayout>
                }
            />

            {/* Shop Routes */}
            <Route
                path="/admin/shopmanagement"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ShopList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/shopmanagement/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ShopAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/shopmanagement/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ShopView />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/shopmanagement/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ShopEdit />
                    </AdminLayout>
                }
            />

            {/* Tab Routes */}
            <Route
                path="/admin/tabmanagement"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <TabList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/tabmanagement/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <TabAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/tabmanagement/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <TabEdit />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/tabmanagement/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <TabView />
                    </AdminLayout>
                }
            />

            {/* Small Product Routes */}
            <Route
                path="/admin/smallproduct"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SmallProductList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/smallproduct/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SmallProductAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/smallproduct/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SmallProductEdit />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/smallproduct/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SmallProductView />
                    </AdminLayout>
                }
            />

            {/* Big Product Routes */}
            <Route
                path="/admin/bigproduct"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <BigProductList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/bigproduct/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <BigProductAdd />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/bigproduct/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <BigProductView />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/bigproduct/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <BigProductEdit />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/bigproduct/approve/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <BigProductApprove />
                    </AdminLayout>
                }
            />

            {/* Order Routes */}
            <Route
                path="/admin/order/list"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ListOrder />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/order/pending/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <PendingOrder />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/order/progress/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ProgressOrder />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/order/complete/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CompleteOrder />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/order/reject/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <RejectOrder />
                    </AdminLayout>
                }
            />

            {/* Payment Routes */}
            <Route
                path="/admin/payment"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <PaymentList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/payment/details/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <Payment />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-commission"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <CommissionList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-commission/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <AddCommission />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-commission/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ViewCommission />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-commission/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <EditCommission />
                    </AdminLayout>
                }
            />

            {/* Set Charges of Worker Routes */}
            <Route
                path="/admin/set-charges-of-worker"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ChargesList />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-charges-of-worker/add"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <AddCharges />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-charges-of-worker/view/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <ViewCharges />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-charges-of-worker/edit/:id"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <EditCharges />
                    </AdminLayout>
                }
            />

            {/* Set Limit Amount Routes */}
            <Route
                path="/admin/set-limit-amount"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SetLimitAmount />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/set-limit-amount/alt"
                element={
                    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                        <SetLimitAmount2 />
                    </AdminLayout>
                }
            />
        </Routes>
    );
}

export default App;
