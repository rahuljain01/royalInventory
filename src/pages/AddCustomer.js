import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import FileUpload from '../components/FileUpload';
import axios from 'axios'
import Card from '../components/Card/Card';
import CtaButton from '../components/CtaButton/CtaButton';
import './AddCustomer.css'
import { postCall } from '../helper/ApiHelper';
import PageTitleContainer from '../components/PageTitleContainer/PageTitleContainer';

const InputLabel = styled.label`
  margin-top: 1rem;
  display: block;
  font-size: 1rem;
  height: 20px;
  justify-content: flex-start;
`;

const InputText = styled.input`
  margin-top: 0rem;
  font-size: 1rem;
  border: 1px solid grey;
  height: 40px;
  width:100%;
  justify-content: flex-start;
`;

const InputTextArea = styled.textarea`
  font-size: 1rem;
  height: 80px;
  width:100%;
  justify-content: flex-start;
`;

const InputSelect = styled.select`
  margin-bottom: 1rem;
  font-size: 1rem;
  height: 40px;
  width:100%;
  justify-content: flex-start;
`;


const validate = values => {
  const errors = {};

  if (!values.customerName) {
    errors.customerName = 'Required';
  } else if (values.customerName.length > 15) {
    errors.customerName = 'Must be 15 characters or less';
  }

  return errors;
};

const AddCustomer = (props) => {

  const formik = useFormik({
    initialValues: props.customer ? props.customer: {
      customerName: '',
      phoneNumber:0,
      address:'',
      emailAddress:'',
      gstNumber:'',
    },
    validate,
    enableReinitialize:false,
    onSubmit: values => {
      postCall('customer', values).then((data) => {
        console.log("successfully posted invoice");
      })
      .catch((reason) => {
        console.log("failed in posting invoice");
      });
      alert(JSON.stringify(values, null, 2));
    },
  });

  const containerClass = props.isInvoice ? 'customer-invoice-container':'customer-container'

  return (
    <PageTitleContainer title='Add Customer'>
    <Card className={containerClass}>
    <form  onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <div>
          <InputLabel>
            Customer Name:
          </InputLabel>
          <InputText 
            id="customerName"
            name="customerName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customerName} />
            {formik.errors.customerName ? <div style={{color:'red'}}>{formik.errors.customerName}</div> : null}
        </div>
        <div>
          <InputLabel>
            Phone Number:
          </InputLabel>
          <InputText 
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber} />
            {formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
        </div>

        <div>
          <InputLabel>
            Address:
          </InputLabel>
          <InputTextArea 
            id="address"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address} />
        </div>
          <div>
          <InputLabel>
            GST no:
          </InputLabel>
          <InputText 
            id="gstNumber"
            name="gstNumber"
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gstNumber}
            style={{marginBottom:'2rem'}} />
          </div>   
        <CtaButton type="submit" onClick={() => {}}>{'ADD'}</CtaButton>
      </form>
      </Card>
      </PageTitleContainer>
  );
};

export default AddCustomer;