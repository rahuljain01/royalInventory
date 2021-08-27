import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Card from '../../components/Card/Card';
import CtaButton from '../../components/CtaButton/CtaButton';
import './AddStore.css'
import { postCall, putCall } from '../../helper/ApiHelper';
import PageTitleContainer from '../../components/PageTitleContainer/PageTitleContainer';
import { showMessage } from '../../components/Alert/AlertPopup';

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

  if (!values.storeName) {
    errors.storeName = 'Required';
  }

  return errors;
};

const AddStore = (props) => {

  const [isEditing, setIsEditing] = useState(false)

  useEffect(()=> {
    props.location.state ? setIsEditing(true):setIsEditing(false)
  }, [props.location.state])

  const formik = useFormik({
    initialValues: props.location.state ? props.location.state: {
      storeName: '',
      address:'',
    },
    validate,
    enableReinitialize:false,
    onSubmit: values => {
      if (isEditing) {
        putCall('stores', values, true).then((data) => {
          showMessage('Done!!!', 'Store edited successfully','success', 'OK');
        })
      } else {
      postCall('stores', values, true).then((data) => {
        showMessage('Done!!!', 'Store added successfully','success', 'OK');
      })
    }
    },
  });

  return (
    <PageTitleContainer title='Add Store'>
    <Card className='store-container'>
    <form  onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <div>
          <InputLabel>
            Store Name:
          </InputLabel>
          <InputText 
            id="storeName"
            name="storeName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.storeName} />
            {formik.errors.storeName ? <div style={{color:'red'}}>{formik.errors.storeName}</div> : null}
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
        <CtaButton type="submit" onClick={() => {}}>{isEditing ? 'EDIT':'ADD'}</CtaButton>
      </form>
      </Card>
      </PageTitleContainer>
  );
};

export default AddStore;