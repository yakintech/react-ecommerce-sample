import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseService } from "../../../api/baseService";

function UpdateSupplier() {
  const [form] = Form.useForm();
  let { id } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const [text, setText] = useState("deneme");

  useEffect(() => {
    getSupplierById();
  }, []);

  const getSupplierById = () => {
    baseService.getById(`/suppliers`, id).then((data) => {
      setSuppliers(data);
      console.log(data);
    });
  };
  return (
    <>
        {
            suppliers ?   <input value="var"></input>:
      <Form
      form={form}
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ fullName: suppliers.companyName }}
        onFinish={(values) => {
          console.log({ values });
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            { type: "email", message: "Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input placeholder="Type your email" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 2 }}
          style={{ justifyContent: "center" }}
        >
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
        }

      
    </>
  );
}

export default UpdateSupplier;
