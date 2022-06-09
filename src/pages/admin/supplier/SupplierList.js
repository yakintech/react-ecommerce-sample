import { DownOutlined } from "@ant-design/icons";
import { Form, Table, Button, Modal, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import confirm from "antd/lib/modal/confirm";
import { baseService } from "../../../api/baseService";
import { useNavigate } from "react-router-dom";

const SupplierList = () => {
  //
  const form = useRef(null);
  let navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    baseService.getAll("/suppliers").then((data) => {
      setSuppliers(data);
      setLoading(false);
    });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        baseService.delete("/suppliers", id).then(() => {
          getData();
        });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getSelectedData = async (id) => {
    baseService.getById(`/suppliers`, id).then((data) => {
      form.current.setFieldsValue({
        street: data.address.street,
        city: data.address.city,
        region: data.address.region,
        postalCode: data.address.postalCode,
        country: data.address.country,
        phone: data.address.phone,
      });
    });
  };

  const showModal = (id) => {
    setVisible(true);
    getSelectedData(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      sorter: (a, b) => a.contactName.localeCompare(b.contactName),
    },
    {
      title: "Contact Title",
      dataIndex: "contactTitle",
    },

    {
      title: "Actions",
      dataIndex: "id",
      render: (id, key) => (
        <>
          <Button onClick={() => showModal(id)} type="primary">
            Show Details
          </Button>
          <Button
            style={{ margin: 5 }}
            onClick={() => showDeleteConfirm(id)}
            danger
          >
            Delete
          </Button>
          <Button
            style={{ color: "green" }}
            onClick={() => navigate(`/admin/suppliers/${id}`)}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  const tableProps = {
    loading,
  };
  return (
    <>
      <Table
        {...tableProps}
        columns={columns}
        dataSource={suppliers}
        rowKey="id"
      />

      <Modal
        title="Supplier"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          ref={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item name="street" label="Street">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Form.Item name="region" label="Region">
            <Input />
          </Form.Item>
          <Form.Item name="postalCode" label="PostalCode">
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SupplierList;
