import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { baseService } from '../../../api/baseService';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateCategory() {

    let { id } = useParams();
    const [category, setCategory] = useState([]);
    const [updatedData, setUpdatedData] = useState(category);
    const navigate = useNavigate();

    const getCategory = () => {
        baseService.getById("/categories", id)
            .then((data) => {
                setCategory(data);
            })
    }

    useEffect(() => {
        getCategory();
    }, [])

    const updateCategory = () => {
        let values = {
            name: category.name,
            description: category.description
        }
        if (category.name && category.description) {
            baseService.update("/categories", id, values)
                .then(() => {
                    navigate("/admin/categories");
                }
                )
        } 

    }

    const goToCategories = () => {
        navigate("/admin/categories");
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
                <Input defaultValue={updatedData.name} value={category.name} onChange={(e) => setCategory({ name: e.target.value, description: category.description })} />
                {updatedData.name}
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
                <Input defaultValue={updatedData.description} value={category.description} onChange={(e) => setCategory({ name: category.name, description: e.target.value })} />
                {updatedData.description}
            </Form.Item>



            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Space>
                    <Button onClick={goToCategories} type="danger" htmlType="submit">
                        Cancel
                    </Button>
                    <Button onClick={updateCategory} type="primary" htmlType="submit">
                        Update
                    </Button>
                </Space>

            </Form.Item>
        </Form></>
    )
}

export default UpdateCategory