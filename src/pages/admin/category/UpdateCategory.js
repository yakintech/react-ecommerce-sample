import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { baseService } from '../../../api/baseService';
import { useParams } from 'react-router-dom';


function UpdateCategory() {

    let { id } = useParams();
    const [category, setCategory] = useState("")

    const getCategory = () => {
        baseService.getById("/categories", id)
            .then((data) => {
                setCategory(data);
            })
    }

    useEffect(() => {
      getCategory();
    }, [])
    

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
                    Update
                </Button>
            </Form.Item>
        </Form></>
    )
}

export default UpdateCategory