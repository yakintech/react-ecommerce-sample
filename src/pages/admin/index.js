import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import './index.css'
import AdminHeader from './layout/AdminHeader'
import CategoryList from './category/CategoryList';
import AddCategory from './category/AddCategory';
import Home from './home'
import { Route, Routes } from 'react-router-dom';
import ProductList from './product/ProductList';
import AddProduct from './product/AddProduct';
const { Content, Footer } = Layout;

function Index() {
    return (
        <>
            <Layout>
                <AdminHeader></AdminHeader>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <CategoryList></CategoryList>
                        <ProductList></ProductList>
                    </div>
                </Content>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/categories" element={<CategoryList />} />
                    <Route path="/admin/addCategory" element={<AddCategory />} />
                    <Route path="/admin/products" element={<ProductList />} />
                    <Route path="/admin/addProduct" element={<AddProduct />} />


                </Routes>

            </Layout>
            </>
    )
}

export default Index
