import Layout, { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCategory from '../pages/admin/category/AddCategory'
import CategoryList from '../pages/admin/category/CategoryList'
import UpdateCategory from '../pages/admin/category/UpdateCategory'
import AdminHeader from '../pages/admin/layout/AdminHeader'
import Orders from '../pages/admin/order/Orders'
import AddProduct from '../pages/admin/product/AddProduct'
import ProductList from '../pages/admin/product/ProductList'
import UpdateProduct from '../pages/admin/product/UpdateProduct'
import AddSupplier from '../pages/admin/supplier/AddSupplier'
import SupplierList from '../pages/admin/supplier/SupplierList'
import UpdateSupplier from '../pages/admin/supplier/UpdateSupplier'
import Home from '../pages/admin/home'

function AdminRoute() {
    return (
       
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
                        <Route path="/categories" element={<CategoryList />} />
                        <Route
                            path="/categories/update/:id"
                            element={<UpdateCategory />}
                        />
                        <Route path="/addCategory" element={<AddCategory />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/addproduct" element={<AddProduct />} />
                        <Route
                            path="/products/update/:id"
                            element={<UpdateProduct />}
                        />
                        <Route path="/suppliers" element={<SupplierList />} />
                        <Route path="/suppliers/:id" element={<UpdateSupplier />} />
                        <Route path="/addsupplier" element={<AddSupplier />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </div>
            </Content>
        </Layout>
    )
}

export default AdminRoute