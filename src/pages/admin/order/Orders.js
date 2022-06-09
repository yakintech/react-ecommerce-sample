import React, { useState, useEffect, useLayoutEffect } from 'react'
import { baseService } from '../../../api/baseService';

import { Table, Spin, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoadingModal] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const [visible, setVisible] = useState(false);
 
  const getData = () => {
    baseService.getAll("/orders")
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
  }

  const getSelectedData = (id) => {
    baseService.getById("/orders", id)
    .then((data) => {
      setSelectedOrder(data);
      setLoadingModal(false);
    })
  }

  
  useEffect(() => {
    getData();
  }, []);


  const showModal = (id) => {
    
    getSelectedData(id)
    setVisible(true);
    
  };

  const handleOk = () => {

    setVisible(false);
    setLoadingModal(true);
    alert("Updated")

  };

  const handleCancel = () => {

    console.log('Clicked cancel button');
    setVisible(false);

  };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Ship Name',
        dataIndex: 'shipName',
      },
      {
        title: 'Order Date',
        dataIndex: 'orderDate',
      },
      {
        title: 'Required Date',
        dataIndex: 'requiredDate',
      },
      {
        title: 'Shipped Date',
        dataIndex: 'shippedDate',
      },
      {
        title: 'Detail',
        dataIndex: 'id',
        render: (id) => (<Button onClick={() => {showModal(id)} }> Show Detail </Button>)
      },
    ] 


  return (<>

        <Spin tip="Loading..." spinning={loading}>
            <Table columns={columns} dataSource={orders} rowKey="id"></Table>
            
            <Modal
              title="Order"
              
              visible={visible}
              confirmLoading={loading2}

              onOk={handleOk}
              onCancel={handleCancel}

              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                  Update
                </Button>,

              ]}


              
            >
              <h3><b>Order ID:</b> {selectedOrder.id}</h3>
              <h3><b>Ship Name:</b> {selectedOrder.shipName}</h3>
              <h3><b>Order Date:</b> {selectedOrder.orderDate}</h3>

            </Modal>
        
        </Spin>
  </>)
}

export default Orders