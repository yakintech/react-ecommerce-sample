import { Button, Form, Input, Space } from "antd";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseService } from "../../../api/baseService";

function UpdateSupplier() {
  let { id } = useParams();
  var formRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    getSupplierById();
  }, []);

  const getSupplierById = () => {
    baseService.getById(`/suppliers`, id).then((data) => {
      formRef.current.setFieldsValue({
        companyName: data.companyName,
        contactName: data.contactName,
        contactTitle: data.contactTitle,

        street: data.address.street,
        city: data.address.city,
        region: data.address.region,
        postalCode: data.address.postalCode,
        country: data.address.country,
        phone: data.address.phone,
      });
      console.log(data.address.street);
    });
  };

  const updateSupplier = (suppliers) => {
    let requestBody = {
      companyName: suppliers.companyName,
      contactName: suppliers.contactName,
      contactTitle: suppliers.contactTitle,
      address: {
        street: suppliers.street,
        city: suppliers.city,
        region: suppliers.region,
        postalCode: suppliers.postalCode,
        country: suppliers.country,
        phone: suppliers.phone,
      },
    };

    baseService.update(`/suppliers`, id, requestBody).then(() => {
      navigate("/admin/suppliers");
    });
  };
  return (
    <>
      <Form
        ref={formRef}
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={updateSupplier}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[
            {
              required: true,
              message: "Please enter your company name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your company name" />
        </Form.Item>
        <Form.Item
          name="contactName"
          label="Contact Name"
          rules={[
            {
              required: true,
              message: "Please enter your contact name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your contact name" />
        </Form.Item>
        <Form.Item
          name="contactTitle"
          label="Contact Title"
          rules={[
            {
              required: true,
              message: "Please enter contact title",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your contact title" />
        </Form.Item>
        <Form.Item
          name="street"
          label="Street"
          rules={[
            {
              required: true,
              message: "Please enter your street",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="Type your street" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please enter your city",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your city" />
        </Form.Item>
        <Form.Item
          name="region"
          label="Region "
          rules={[
            {
              required: true,
              message: "Please enter your region",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your region" />
        </Form.Item>
        <Form.Item
          name="postalCode"
          label="Postal Code"
          rules={[
            {
              required: true,
              message: "Please enter your postal code",
            },
            { whitespace: true },
            { min: 4 },
          ]}
          hasFeedback
        >
          <Input type="number" placeholder="Type your postal code" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Please enter your country",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your country" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please enter your phone",
            },
            { type: "phone", message: "Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your phone" />
        </Form.Item>

        <Form.Item style={{ justifyContent: "center" }}>
          <Space>
            <Button block type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              onClick={() => navigate("/admin/suppliers")}
              block
              htmlType="submit"
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateSupplier;
