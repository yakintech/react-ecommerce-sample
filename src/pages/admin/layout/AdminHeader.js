import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;

function AdminHeader() {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item>
          <Link to="/admin/categories">Category List</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/addcategory">Add Category</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/suppliers">Supplier List</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default AdminHeader;
