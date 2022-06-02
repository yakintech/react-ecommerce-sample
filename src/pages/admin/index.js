import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import './index.css'
import AdminHeader from './layout/AdminHeader'
import CategoryList from './category/CategoryList';
import AddCategory from './category/AddCategory';

const { Content, Footer } = Layout;

function Index() {
    return (
        <>
            <Layout>
                <AdminHeader></AdminHeader>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <AddCategory></AddCategory>
                    </div>
                </Content>
            </Layout></>
    )
}

export default Index
