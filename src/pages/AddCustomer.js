import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import FileUpload from '../components/FileUpload';
//import {InputLabel,InputText,InputSelect } from '../components/Styles';
import axios from 'axios'

const InputLabel = styled.label`
  margin-left: 20rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  height: 80px;
  justify-content: flex-start;
`;

const InputText = styled.input`
  margin-left: 20rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  height: 40px;
  width:1000px;
  justify-content: flex-start;
`;

const InputTextArea = styled.textarea`
  margin-left: 20rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  height: 80px;
  width:1000px;
  justify-content: flex-start;
`;

const InputSelect = styled.select`
  margin-left: 20rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  height: 40px;
  width:1000px;
  justify-content: flex-start;
`;

const SubmitButton = styled.button`
  margin-left: 700px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  height: 40px;
  width:80px;
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

const AddCustomer = (customer) => {

  const formik = useFormik({
    initialValues: customer? customer: {
      customerName: '',
      phoneNumber:0,
      address:'',
      emailAddress:'',
      gstNumber:'',
    },
    validate,
    enableReinitialize:true,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form  onSubmit={formik.handleSubmit}>
        <div>
          <InputLabel>
            Customer Name:
          </InputLabel>
          <br />
          <InputText 
            id="customerName"
            name="customerName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customerName} />
            {formik.errors.customerName ? <div>{formik.errors.customerName}</div> : null}
        </div>
        <div>
          <InputLabel>
            Phone Number:
          </InputLabel>
          <br />
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
          <br />
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
          <br />
          <InputText 
            id="gstNumber"
            name="gstNumber"
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gstNumber} />
          </div>   
        <SubmitButton type="submit">{'ADD'}</SubmitButton>
      </form>
  );
};

export default AddCustomer;