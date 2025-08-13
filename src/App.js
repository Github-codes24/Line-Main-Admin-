
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import React from "react";
import WorkerList from "./pages/module/worker/WorkerList";
import WorkerAdd from "./pages/module/worker/WorkerAdd";
import WorkerView from "./pages/module/worker/WorkerView";
import WorkerEdit from "./pages/module/worker/WorkerEdit";
import ShopList from "./pages/module/shop/ShopList";
import ShopAdd from "./pages/module/shop/ShopAdd";
import ShopView from "./pages/module/shop/ShopView";
import ShopEdit from "./pages/module/shop/ShopEdit";

import BigProductList from "./pages/module/big-product/big-product-list";
import BigProductAdd from "./pages/module/big-product/big-product-add";
import BigProductView from "./pages/module/big-product/big-product-view";
import BigProductEdit from "./pages/module/big-product/big-product-edit";
import BigProductApprove from "./pages/module/big-product/big-product-approve";
import ListOrder from "./pages/module/order/list-order";
import PendingOrder from "./pages/module/order/pending-order";
import ProgressOrder from "./pages/module/order/progress-order";
import CompleteOrder from "./pages/module/order/completed-order";
import RejectOrder from "./pages/module/order/reject-order";

function App() {
    const [activeTab, setActiveTab] = React.useState("/admin/workermanagement");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/workermanagement" />} />
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
                    path="/admin/workermanagement/workeradd"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerAdd />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/workermanagement/workerview"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <WorkerView />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/workermanagement/workeredit"
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
                    path="/admin/shopmanagement/shopadd"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopAdd />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/shopmanagement/shopview"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopView />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/shopmanagement/shopedit"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ShopEdit />
                        </AdminLayout>
                    }
                />
                      <Route
                    path="/admin/shopmanagement/big-product-list"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductList />
                        </AdminLayout>
                    }
                />
                  <Route
                    path="/admin/shopmanagement/big-product-add"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductAdd />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/big-product-view"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductView />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/big-product-edit/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductEdit />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/big-product-approve/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <BigProductApprove />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/order/list"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ListOrder />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/pending-order/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <PendingOrder />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/shopmanagement/progress-order/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <ProgressOrder />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/shopmanagement/complete-order/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <CompleteOrder />
                        </AdminLayout>
                    }
                />
                 <Route
                    path="/admin/shopmanagement/reject-order/:id"
                    element={
                        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                            <RejectOrder />
                        </AdminLayout>
               }
                />

            </Routes>
        </BrowserRouter>
    );


}


export default App;


