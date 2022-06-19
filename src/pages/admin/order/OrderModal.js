import React, { Fragment, useEffect, useRef, useState } from 'react'
 
import { baseService } from '../../../api/baseService';

import {
    DatePicker,
    Form,
    Input,
    Spin,

  } from 'antd';

  import moment from 'moment';
    
  function OrderModal({ formRef, orders, id, orderDate }) {

    var formRef = useRef()


    const [loadingModal, setLoadingModal] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState([]);

    const getSelectedData = () => {
      baseService.getById("/orders", id)
      .then((data) => {
        formRef.current.setFieldsValue({ 
          shipName: data.shipName, 
          orderDate: data.orderDate, 
          street: data.shipAddress.street,
          city: data.shipAddress.city,
          region: data.shipAddress.region,
          postalCode: data.shipAddress.postalCode,
          country: data.shipAddress.country,
          date: data.orderDate
        })
        setLoadingModal(false);
        setSelectedOrder(data)
        
      });
    }

    useEffect(() => {
      getSelectedData();
    }, []);
    

    console.log('ORDER ID: ', id);

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
          <Form.Item label="Date Time" >
              <DatePicker defaultValue={moment(selectedOrder.orderDate, 'YYYY/MM/DD')} format={'YYYY/MM/DD'}  name="date" />
          </Form.Item>
          <Form.Item label="Ship Name" name="shipName" >
              <Input />
          </Form.Item>
          <Form.Item label="Street" name="street" >
              <Input />
          </Form.Item>
          <Form.Item label="City" name="city" >
              <Input />
          </Form.Item>
          <Form.Item label="Region" name="region" >
              <Input />
          </Form.Item>
          <Form.Item label="Postal Code" name="postalCode" >
              <Input />
          </Form.Item>
          
          <Form.Item label="Country" name="country" >
              <Input />
          </Form.Item>
      </Form>
      </Spin>
  </>)
}

export default OrderModal