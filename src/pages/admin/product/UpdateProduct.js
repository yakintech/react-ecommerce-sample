import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { baseService } from '../../../api/baseService';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateProduct() {

    let { id } = useParams();
    var formRef = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = () => {
        baseService.getById("/products", id)
            .then((data) => {
                formRef.current.setFieldsValue({ name: data.name, unitPrice: data.unitPrice, unitsInStock: data.unitsInStock })
            })
    }


    const updateProduct = (item) => {
        let values = {
            name: item.name,
            unitPrice: item.unitPrice,
            unitsInStock: item.unitsInStock
        }
        console.log(item);
        console.log(values);
        if (item.name && item.unitPrice && item.unitsInStock) {
            baseService.update("/products", id, values)
                .then(() => {
                    navigate("/admin/products");
                }
                )
        }

    }

    const goToProducts = () => {
        navigate("/admin/products");
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
            onFinish={updateProduct}
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
                        message: 'Please input product unit price!',
                    },
                ]}

            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Units in Stock"
                name="unitsInStock"
                rules={[
                    {
                        required: true,
                        message: 'Please input product number in stock!',
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
                    <Button onClick={goToProducts} type="danger" htmlType="submit">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Space>

            </Form.Item>
        </Form></>
    )
}

export default UpdateProduct