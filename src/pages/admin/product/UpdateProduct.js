////////////////////////////////////////////
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { baseService } from '../../../api/baseService';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateProduct() {

    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const [updatedData, setUpdatedData] = useState(product);
    const navigate = useNavigate();

    const getProduct = () => {
        baseService.getById("/products", id)
            .then((data) => {
                setProduct(data);
            })
    }

    useEffect(() => {
        getProduct();
    }, [])

    const updateProduct = () => {
        let values = {
            name: product.name,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock
        }
        if (product.name && product.unitPrice && product.unitsInStock) {
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
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input defaultValue={updatedData.name} value={product.name} onChange={(e) => setProduct({ name: e.target.value, unitPrice: product.unitPrice , unitsInStock: product.unitsInStock})} />
                {updatedData.name}
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
                <Input defaultValue={updatedData.unitPrice} value={product.unitPrice} onChange={(e) => setProduct({ name: product.name, unitPrice: e.target.value, unitsInStock: product.unitsInStock })} />
                {updatedData.unitPrice}
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
                <Input defaultValue={updatedData.unitsInStock} value={product.unitsInStock} onChange={(e) => setProduct({ name: product.name, unitPrice: product.unitPrice, unitsInStock: e.target.value })} />
                {updatedData.unitsInStock}
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
                    <Button onClick={updateProduct} type="primary" htmlType="submit">
                        Update
                    </Button>
                </Space>

            </Form.Item>
        </Form></>
    )
}

export default UpdateProduct