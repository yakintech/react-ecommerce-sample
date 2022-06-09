import { Button, Form, Input, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { baseService } from "../../../api/baseService";

function UpdateSupplier() {
  let { id } = useParams();
  var formRef = useRef();
 
  const [text, setText] = useState("deneme");

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
console.log("gönderilecek data", requestBody);
    baseService.update(`/suppliers`, id, requestBody).then((data) => {
      console.log("updated");
    });
  };
  return (
    <>
      <Form
        ref={formRef}
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        //initialValues={{ fullName: suppliers.companyName }}
        onFinish={(suppliers) => {
          console.log("formsubmit verileri",suppliers);
          updateSupplier(suppliers);
        }}
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
          <Input placeholder="Type your street" />
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
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your postal code" />
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
            <Button block type="primary" htmlType="submit">
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateSupplier;
