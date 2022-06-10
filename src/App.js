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
import SupplierList from './pages/admin/supplier/SupplierList';
import UpdateSupplier from './pages/admin/supplier/UpdateSupplier';
import AddSupplier from './pages/admin/supplier/AddSupplier';
import Orders from './pages/admin/order/Orders';
import ProductsPage from './pages/site/ProductsPage';
import ProductDetail from './pages/site/ProductDetail';
import AdminRoute from './routers/AdminRoute';
import PublicRoute from './routers/PublicRoute';


function App() {
  return (
    <>
      <Routes>
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path="/*" element={<PublicRoute />} />
      </Routes>

       
    </>
  );
}

export default App;
