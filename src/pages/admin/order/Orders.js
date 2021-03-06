import React, { useState, useEffect, useRef } from 'react'
import { baseService } from '../../../api/baseService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Spin, Button, Modal } from 'antd';

import OrderUpdate from './OrderUpdate'
const { confirm } = Modal;

function Orders() {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //*------------------------------------[ CHANGE DATE ]
  const changeDate = (date) => {

    var day, mounth, year;

    year = date.split(' ')[0].split("-")[0];
    mounth = date.split(' ')[0].split("-")[1];
    day = date.split(' ')[0].split("-")[2];
  
    var trMounths = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  
    return day + " " + trMounths[Number(mounth)-1] + " " + year + " ";
  }

  //console.log('DATE: ', orders.orderDate)

  //*------------------------------------[ SERVICES ]

  const getData = () => {
    baseService.getAll("/orders")
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  //*-----------------------------------[ CONFIRM ]
  const showPropsConfirm = (id) => {
    
    confirm({
      title: <h3><b>Order ID:</b> {id}</h3>,
      icon: <ExclamationCircleOutlined />,
      content:<>
        <OrderUpdate orders={orders} id={id} getData={getData} />
      </>,
      cancelText: 'Cancel',
      okText: 'Update',
      okType: 'ghost',
      okButtonProps: {
        form:'orderForm', 
        key: 'submit',
        htmlType: 'submit'
      }, 
      style: {
        width: 600
      },
      onOk() {
      },  
      onCancel() {
        console.log('Cancel');
      },


    });
  };

  //*------------------------------------[ DELETE CONFIRM ]
  const showDeleteConfirm = (id) => {
    confirm({
      title: <h3><b>Order ID:</b> {id}</h3>,
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure delete this order?',
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
  
      onOk() {
        console.log('OK');
        baseService.delete("/orders", id)
          .then(() => {
            getData();
          })
        success();
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  //*------------------------------------[ SUCCESS ]
  const success = () => {
    Modal.success({
      content: 'Delete Success!',
    });
  };

  //*------------------------------------[ TABLE COLUMNS ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,

    },
    {
      title: 'Ship Name',
      dataIndex: 'shipName',
      sorter: (a, b) => a.shipName.localeCompare(b.shipName),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      render: (orderDate) => (<p>{changeDate(orderDate)}</p>),
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Required Date',
      dataIndex: 'requiredDate',
      render: (requiredDate) => (<p>{changeDate(requiredDate)}</p>)
    },
    {
      title: 'Shipped Date',
      dataIndex: 'shippedDate', 
      render: (shippedDate) => (<p>{changeDate(shippedDate)}</p>)
    },
    {
      title: 'Order Delete',
      dataIndex: 'id',
      render: (id) => (<Button onClick={() => showDeleteConfirm(id)} danger>Delete</Button>)
    },
    {
      title: 'Order Detail',
      dataIndex: 'id',
      render: (id) => (<Button onClick={() => {showPropsConfirm(id)}} type="primary" ghost> Show Detail </Button>)
    },
  ] 


  return (<>
        <Spin tip="Loading..." spinning={loading}>
            <Table columns={columns} dataSource={orders} rowKey="id"></Table> 
        </Spin>
  </>)
}

export default Orders