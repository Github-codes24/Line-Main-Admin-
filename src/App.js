import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
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
        <BrowserRouter>
            <Routes>
                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />

                {/* Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                {/* Customer Routes */}
                <Route
                    path="/admin/customermanagement"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CustomerList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/customermanagement/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CustomerAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/customermanagement/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CustomerView />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/customermanagement/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CustomerEdit />
                        </AdminRoute>
                    }
                />

                {/* Worker Routes */}
                <Route
                    path="/admin/workermanagement"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/workermanagement/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/workermanagement/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerView />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/workermanagement/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerEdit />
                        </AdminRoute>
                    }
                />

                {/* Shop Routes */}
                <Route
                    path="/admin/shopmanagement"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/shopmanagement/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/shopmanagement/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopView />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/shopmanagement/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopEdit />
                        </AdminRoute>
                    }
                />

                {/* Tab Routes */}
                <Route
                    path="/admin/tabmanagement"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <TabList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/tabmanagement/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <TabAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/tabmanagement/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <TabEdit />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/tabmanagement/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <TabView />
                        </AdminRoute>
                    }
                />

                {/* Small Product Routes */}
                <Route
                    path="/admin/smallproduct"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <SmallProductList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/smallproduct/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <SmallProductAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/smallproduct/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <SmallProductEdit />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/smallproduct/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <SmallProductView />
                        </AdminRoute>
                    }
                />

                {/* Big Product Routes */}
                <Route
                    path="/admin/bigproduct"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/bigproduct/add"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductAdd />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/bigproduct/view/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductView />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/bigproduct/edit/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductEdit />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/bigproduct/approve/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductApprove />
                        </AdminRoute>
                    }
                />

                {/* Order Routes */}
                <Route
                    path="/admin/order/list"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ListOrder />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/order/pending/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <PendingOrder />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/order/progress/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ProgressOrder />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/order/complete/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CompleteOrder />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/order/reject/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <RejectOrder />
                        </AdminRoute>
                    }
                />

                {/* Payment Routes */}
                <Route
                    path="/admin/payment"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <PaymentList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/payment/details/:id"
                    element={
                        <AdminRoute activeTab={activeTab} setActiveTab={setActiveTab}>
                            <Payment />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
