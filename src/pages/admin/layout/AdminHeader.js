import { Layout, Menu } from 'antd';
import React from 'react'



const {  Header } = Layout;

function AdminHeader() {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(3).fill(null).map((_, index) => ({
                    key: String(index + 1),
                    label: `nav ${index + 1}`,
                }))}
            />
        </Header>
    )
}

export default AdminHeader