
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
            </Routes>
        </BrowserRouter>
    );
}

export default App