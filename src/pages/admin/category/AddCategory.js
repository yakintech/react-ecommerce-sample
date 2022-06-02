import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { baseService } from '../../../api/baseService';


function AddCategory() {

    const onFinish = (values) => {
        baseService.add("/categories",values)
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
                        message: 'Please input category name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input category description!',
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

export default AddCategory