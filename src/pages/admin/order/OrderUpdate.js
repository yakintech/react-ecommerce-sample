import React, { Fragment, useEffect, useRef, useState } from 'react'
 
import { baseService } from '../../../api/baseService';

import {
    DatePicker,
    Form,
    Input,
    Spin,
    Modal

  } from 'antd';

import moment from 'moment';
    
  function OrderUpdate({ orders, id, getData }) {

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
        })
        setLoadingModal(false);
        setSelectedOrder(data);
      });
    } 
    const onFinish = (item) => {
      let values = {
        customerId: selectedOrder.customerId,
        employeeId: selectedOrder.employeeId,
        orderDate: selectedOrder.orderDate,
        requiredDate: selectedOrder.requiredDate,
        shippedDate: selectedOrder.shippedDate,
        shipVia: selectedOrder.shipVia,
        freight: selectedOrder.freight,
        shipName: item.shipName,
        shipAddress: {
          street: selectedOrder.shipAddress.street,
          city: selectedOrder.shipAddress.city,
          region: selectedOrder.shipAddress.region,
          postalCode: selectedOrder.shipAddress.postalCode,
          country: selectedOrder.shipAddress.country,
        },
        details: [
          {
            productId: selectedOrder.details[0],
            unitPrice: selectedOrder.details[1],
            quantity: selectedOrder.details[2],
            discount: selectedOrder.details[3],
          }
        ]
      }

      const message = (msg, val) => {
        if(val==1){

          Modal.success({
            content: msg,
          });
        }else{

          Modal.error({
            content: msg,
          });
        }
      }

      if(values.shipName){
        baseService.update("/orders", id, values)
        .then(() => {
          getData();
          message('Success!',1);
        })
      }
      else{
        message('It cannot be empty!',0)
      }
        
    }
 
    useEffect(() => {
      getSelectedData();
    }, []);
    
  return (<>
    <Spin tip="Loading..." spinning={loadingModal}>
        <Form
          id='orderForm'
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
            orderDate: selectedOrder.orderDate,
          }}
          size={"default"}
          onFinish={onFinish}
        >
            <Form.Item label="Date Time" >
                <DatePicker defaultPickerValue={moment(selectedOrder.orderDate, 'YYYY/MM/DD')} format={'YYYY/MM/DD'}  name="orderDate" />
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

export default OrderUpdate