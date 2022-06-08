import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import CategoryList from "./pages/admin/category/CategoryList";
import AdminHeader from "./pages/admin/layout/AdminHeader";
import Home from "./pages/admin/home";
import { Content } from "antd/lib/layout/layout";
import AddCategory from "./pages/admin/category/AddCategory";
import SupplierList from "./pages/admin/supplier/SupplierList";

function App() {
  return (
    <>
      {/* <Admin></Admin> */}

      <Layout>
        <AdminHeader></AdminHeader>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/suppliers" element={<SupplierList />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App;
