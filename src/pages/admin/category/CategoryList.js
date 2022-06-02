import { Table, Spin, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { baseService } from '../../../api/baseService';

function CategoryList() {



    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    const deleteCategory = (id) => {
        baseService.delete("/categories", id)
            .then(() => {
                getData();
            })
    }

    const getData = () => {
        baseService.getAll("/categories")
            .then((data) => {
                setCategories(data);
                setLoading(false)
            })
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Delete',
            dataIndex: 'id',
            render: (id) => (<Button onClick={() => deleteCategory(id)} danger>Delete</Button>)
        }
    ]

    return (<>
        <Spin tip="Loading..." spinning={loading}>
            <Table columns={columns} dataSource={categories} rowKey="id"></Table>
        </Spin>
    </>)
    
}



export default CategoryList