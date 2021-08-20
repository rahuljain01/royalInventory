import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Card from '../../components/Card/Card';
import CtaButton from '../../components/CtaButton/CtaButton';
import './AddVendor.css'
import { postCall, putCall } from '../../helper/ApiHelper';
import PageTitleContainer from '../../components/PageTitleContainer/PageTitleContainer';

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


const validate = values => {
  const errors = {};

  if (!values.vendorName) {
    errors.vendorName = 'Required';
  } else if (values.vendorName.length > 100) {
    errors.vendorName = 'Must be 15 characters or less';
  }

  return errors;
};

const AddVendor = (props) => {

  const [isEditing, setIsEditing] = useState(false)

  useEffect(()=> {
    props.location.state ? setIsEditing(true):setIsEditing(false)
  }, [props.location.state])

  const formik = useFormik({
    initialValues: props.location.state ? props.location.state: {
      vendorName: '',
      phone:0,
      address:'',
      email:'',
      gstnumber:'',
    },
    validate,
    enableReinitialize:false,
    onSubmit: values => {
      if (isEditing) {
        putCall('vendors', values).then((data) => {
          console.log("successfully posted invoice");
        })
        .catch((reason) => {
          console.log("failed in posting invoice");
        });
        alert(JSON.stringify(values, null, 2));
      } else {
      //values['vendorId'] = '1'
      postCall('vendors', values).then((data) => {
        console.log("successfully posted invoice");
      })
      .catch((reason) => {
        console.log("failed in posting invoice");
      });
      alert(JSON.stringify(values, null, 2));
    }
    },
  });

  return (
    <PageTitleContainer title='Add Vendor'>
    <Card className='vendor-container'>
    <form  onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <div>
          <InputLabel>
            Vendor Name:
          </InputLabel>
          <InputText 
            id="vendorName"
            name="vendorName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vendorName} />
            {formik.errors.vendorName ? <div style={{color:'red'}}>{formik.errors.vendorName}</div> : null}
        </div>
        <div>
          <InputLabel>
            Phone Number:
          </InputLabel>
          <InputText 
            id="phone"
            name="phone"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone} />
            {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
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
            id="gstnumber"
            name="gstnumber"
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gstnumber}
            style={{marginBottom:'2rem'}} />
          </div> 
          <div>
          <InputLabel>
            email:
          </InputLabel>
          <InputText 
            id="email"
            name="email"
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{marginBottom:'2rem'}} />
          </div>   
        <CtaButton type="submit" onClick={() => {}}>{isEditing ? 'EDIT':'ADD'}</CtaButton>
      </form>
      </Card>
      </PageTitleContainer>
  );
};

export default AddVendor;