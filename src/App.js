import React from "react";
import "./index.css";
import EditTab from "./pages/module/tab/tab-edit";
import TabOfList from "./pages/module/tab/tab-list";
import AddTab from "./pages/module/tab/tab-add";
import ViewTab from "./pages/module/tab/tab-view";
import ProductList from "./pages/module/small-product/small-product-list";


function App() {
  return (
    <>
      <div>
        <TabOfList />
        <AddTab />
        <EditTab />
        <ViewTab />
        {/* <ProductList/> */}
      </div>
    </>
  );
}

export default App;
