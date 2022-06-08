import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { baseService } from '../../../api/baseService';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateCategory() {

    let { id } = useParams();

    var formRef = useRef()

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    const getCategory = () => {
        baseService.getById("/categories", id)
            .then((data) => {
                setCategory(data);
                formRef.current.setFieldsValue({name: data.name, description: data.description})
                
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

        console.log(values);
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
            ref={formRef}
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