import React, { Fragment, useEffect, useRef, useState } from 'react'
 
import { baseService } from '../../../api/baseService';

import {
    DatePicker,
    Form,
    Input,
    Spin,

  } from 'antd';

  import moment from 'moment';
  
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  
  function OrderUpdateForm({ formRef, orders, id }) {


    var formRef = useRef()


    const [loadingModal, setLoadingModal] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [orderID, setOrderID] = useState();


    const getSelectedData = () => {
      baseService.getById("/orders", id)
      .then((data) => {
        setSelectedOrder(data);
        setLoadingModal(false);
        formRef.current.setFieldsValue({ 
          shipName: data.shipName, 
          orderDate: data.orderDate 
        })

      

      });
    }

    useEffect(() => {
      getSelectedData();
 
    }, []);
    
    var sampleDate = '1998-03-15 03:03:03.000' 
     
    console.log('ORDER ID: ', id)
 
    console.log('ORDER Selected: ', selectedOrder)
    
  return (<>
  <Spin tip="Loading..." spinning={loadingModal}>
    <Form
      ref={formRef}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "default",
      }}
      size={"default"}
    >
        
        <Form.Item label="Date Time " >
            <DatePicker 
                defaultValue={moment(sampleDate, 'YYYY-MM-DD')} 
                format={'YYYY-MM-DD'}
                renderExtraFooter={() => 'extra footer'}
            />
        </Form.Item>
        <Form.Item label="Ship Name" name="shipName" >
            <Input />
        </Form.Item>
        {

        }
        <p>{selectedOrder.orderDate}</p>
        <p>{selectedOrder.shippedDate}</p>
        <p>{selectedOrder.requiredDate}</p>

    </Form>
    </Spin>
  </>)
}

export default OrderUpdateForm