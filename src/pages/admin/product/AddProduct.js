import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { baseService } from '../../../api/baseService';


function AddProduct() {

    const onFinish = (values) => {
        baseService.add("/products",values)
        .then(() => {
            alert("Success!")
        })
    }

    return (<>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[
                    {
                        required: true,
                        message: 'Please input product price!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Count"
                name="unitsInStock"
                rules={[
                    {
                        required: true,
                        message: 'Please input product count!',
                    },
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form></>
    )
}

export default AddProduct