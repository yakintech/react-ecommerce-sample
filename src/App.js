import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/admin'
import CategoryList from './pages/admin/category/CategoryList';
import AdminHeader from './pages/admin/layout/AdminHeader';
import Home from './pages/admin/home'
import { Content } from 'antd/lib/layout/layout';
import AddCategory from './pages/admin/category/AddCategory';
import ProductList from './pages/admin/product/ProductList';
import AddProduct from './pages/admin/product/AddProduct';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import Pricing from './pages/site/HomePage';
import UpdateProduct from './pages/admin/product/UpdateProduct';


function App() {
  return (
    <>
    

    {/* <Pricing></Pricing> */}


      <Layout>
        <AdminHeader></AdminHeader>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/categories/update/:id" element={<UpdateCategory />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/products/update/:id" element={<UpdateProduct />} />
            </Routes>

          </div>
        </Content>

      </Layout>


    </>
  );
}

export default App;
