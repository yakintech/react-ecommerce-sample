import { DownOutlined } from "@ant-design/icons";
import { Form, Table, Button, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import confirm from "antd/lib/modal/confirm";
import { baseService } from "../../../api/baseService";
import { useNavigate } from "react-router-dom";

const SupplierList = () => {
  //
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [inputValue, setInputValue] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  let navigate =useNavigate()

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
      content: "Some descriptions",
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
  const showModal = (id) => {
    setVisible(true);
    baseService.getById(`/suppliers`,id).then((data) => {
      setInputValue(data);
      console.log(data)
    });
  };

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    console.log("veri", inputValue);
    const data = {
      companyName: inputValue.companyName,
      contactName: inputValue.contactName,
      contactTitle: inputValue.contactTitle,
      address: {
        street: inputValue.address.street,
        city: inputValue.address.city,
        region: inputValue.address.region,
        postalCode: inputValue.address.postalCode,
        country: inputValue.address.country,
        phone: inputValue.address.phone,
      },
    };
    console.log(data);
    baseService.put(`/suppliers/${inputValue.id}`, data).then(() => {
      getData();
    });

    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);

    setInputValue([]);
  };

  const handleCancel = () => {
    setVisible(false);
    setInputValue([]);
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
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item label="Company">
            <Input
              name="companyName"
              value={inputValue.companyName}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="Contact ">
            <Input
              name="contactName"
              value={inputValue.contactName}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>

          <Form.Item label="Tittle">
            <Input
              name="contactTitle"
              value={inputValue.contactTitle}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="Street">
            <Input
              name="street"
              value={inputValue.street}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              name="city"
              // value={inputValue.address.city}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="Region">
            <Input
              name="region"
              // value={inputValue.address.region}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="PostalCode">
            <Input
              name="postalCode"
              // value={inputValue.address.postalCode}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              name="country"
              // value={inputValue.address.country}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="phone"
              // value={inputValue.address.phone}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SupplierList;
