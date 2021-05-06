import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import AddCustomer from './AddCustomer';
import axios from 'axios'
import { useState } from 'react';
import ItemListDropdown from '../components/ItemListDropdown';
import { Dropdown } from 'semantic-ui-react'
import '../components/Icons.css'

const StyledDiv = styled.div`
  margin-left: 40rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  height: 80px;
  justify-content: flex-start;
`;

let items = [{"itemName":"item1","itemId":1,"categoryId":"cat1","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand1","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"https://res.cloudinary.com/doxjtszxv/image/upload/v1620122700/zj1sjjojjrvi7unamnz7.jpg"},{"itemName":"item2","itemId":2,"categoryId":"cat2","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand2","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"https://res.cloudinary.com/doxjtszxv/image/upload/v1620070516/klaxao8dnwt4o3sv8k4a.jpg"},{"itemName":"item3","itemId":3,"categoryId":"cat3","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"https://res.cloudinary.com/doxjtszxv/image/upload/v1620070426/koy8u8rguufyquu10e2x.jpg"},{"itemName":"item4","itemId":4,"categoryId":null,"categoryName":null,"description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":null,"brandName":null,"hsnCode":"","aliasCode":"","warehouseId":null,"quantity":3,"imageUrl":"https://res.cloudinary.com/doxjtszxv/image/upload/v1619299004/b9ghw2weqr3oxhnhedav.jpg"},{"itemName":"item5","itemId":5,"categoryId":null,"categoryName":null,"description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":null,"brandName":null,"hsnCode":"","aliasCode":"","warehouseId":null,"quantity":3,"imageUrl":"imageUrl4"},{"itemName":"item6","itemId":6,"categoryId":null,"categoryName":null,"description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"wh1","quantity":3,"imageUrl":"imageUrl4"},{"itemName":"item7","itemId":7,"categoryId":null,"categoryName":null,"description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"imageUrl3"},{"itemName":"item7","itemId":8,"categoryId":null,"categoryName":null,"description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"imageUrl3"},{"itemName":"item7","itemId":9,"categoryId":"cat3","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"imageUrl3"},{"itemName":"item10","itemId":10,"categoryId":"cat3","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"imageUrl3"},{"itemName":"item11","itemId":11,"categoryId":"cat3","categoryName":"Chair","description":"patio furniture","gstPercent":18.5,"costPrice":3000,"sellingPrice":6500,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"","aliasCode":"","warehouseId":"","quantity":3,"imageUrl":"imageUrl3"},{"itemName":"sofa green corner","itemId":12,"categoryId":"","categoryName":"sofa set","description":"awesome sofa set","gstPercent":18,"costPrice":35000,"sellingPrice":0,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"9403","aliasCode":"100000000001","warehouseId":"","quantity":0,"imageUrl":"imageUrl3"},{"itemName":"sofa green corner","itemId":13,"categoryId":"","categoryName":"sofa set","description":"awesome sofa set","gstPercent":18,"costPrice":35000,"sellingPrice":0,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"9403","aliasCode":"100000000001","warehouseId":"","quantity":0,"imageUrl":"imageUrl3"},{"itemName":"New sofa green corner","itemId":14,"categoryId":"","categoryName":"sofa set","description":"awesome sofa green","gstPercent":18,"costPrice":35000,"sellingPrice":0,"discountPercent":0,"brandId":"brand3","brandName":"Royal Furniture","hsnCode":"9403","aliasCode":"100000000001","warehouseId":"","quantity":0,"imageUrl":"imageUrl3"}]

const countryOptions = [
    { key: 'af', value: 'af', image: 'https://res.cloudinary.com/doxjtszxv/image/upload/v1620122700/zj1sjjojjrvi7unamnz7.jpg', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  ]

  
function ConvertItemsDataToDropdownData(items) {

    var dropdownItem = []
    items.map( (item, i) => {
        dropdownItem.push({'image':item.imageUrl, 'text': item.itemName, 'value': item.itemName})
    }
    )
    return dropdownItem
}

function CreateInvoice() {
    let initialValues = {
        customerNumber: '',
        items: [],
        customer:{},
        deliveryDate:'',
        invoiceDate:'',
        isGstApplicable:false,
    };

    let history = useHistory(); 

    let [customer, setCustomer] = useState({})

    const [showCustomerFields, setshowCustomerFields] = useState(false);

    


    function addItem(e, values, setValues) {
      const items = [...values.items]
      items.push({ name: '', quantity: '', sellingPrice: '' })

      setValues({ ...values, items });

    }

    function onCustomerNumberEntry(){

        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*'
        axios.get('http://api.dream11.com/getCustomer/8008911176'
          ).then(function (responseArr) {
            console.log('SUCCESS!!');
            setCustomer(responseArr.data)
            initialValues = {
                customerNumber: '8008911176',
                items: initialValues.items,
                customer:customer,
            }
            setshowCustomerFields(true)
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }
    function onSubmit(fields) {
        // display form field values on success
        alert(JSON.stringify(fields, null, 4));
        alert(fields.customerNumber);
        history.push({pathname: '/pdf',
                        state: fields,
    })

    }

    function onDropDownChange(index, values, setValues,selectedItem) {
        const items = [...values.items]
        items[index].name = selectedItem
  
        setValues({ ...values, items });
    }

    function removeItem(index, values, setValues) {
        const items = [...values.items]
        items.splice(index, 1)
  
        setValues({ ...values, items });
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <div className="card-body border-bottom">
                            <div className="form-row">
                                <div className="form-group">
                                    <label style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>Customer Number</label>
                                    <Field name="customerNumber" type='text' style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} } onBlur={onCustomerNumberEntry}>

                                    </Field>
                                    <ErrorMessage name="customerNumber" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                        
                        <div> 
                        {showCustomerFields && <AddCustomer {...customer}/> }                      
                         
                        </div>
                        <div className="card-body border-bottom">
                            <div className="form-row">
                                <div className="form-group">
                                <label style={ {margin: '1rem 0 1rem 20rem', width: '100px', height: '40px'} }>Invoice Date</label>
                                    <Field name="invoiceDate" type='text' style={ {margin: '1rem 0 1rem 2rem', width: '300px', height: '40px'} }>

                                    </Field>
                                    <br/>
                                    <label style={ {margin: '1rem 0 1rem 20rem', width: '100px', height: '40px'} }>Delivery Date</label>
                                    <Field name="deliveryDate" type='text' style={ {margin: '1rem 0 1rem 1.4rem', width: '300px', height: '40px'} }>

                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>
                                <Field type="checkbox" name="checked" value="isGstApplicable" style={ { width: '20px', height: '20px'}}/>
                                Is GST Applied
                            </label>
                        </div>
                        <FieldArray name="items">
                        {() => (values.items.map((item, i) => {
                            const ticketErrors = errors.items?.length && errors.items[i] || {};
                            const ticketTouched = touched.items?.length && touched.items[i] || {};
                            return (
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title" style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>Item {i + 1}</h5>
                                        <div className="form-row">
                                            <div className="form-group col-6" style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>
                                                <div style={ {width: '45%', float: 'left'}}>
                                                    <Dropdown name={`items.${i}.name`} placeholder='Select Item'
                                                                fluid
                                                                search
                                                                selection
                                                                options={ConvertItemsDataToDropdownData(items)}
                                                                onChange={(event, data) => {
                                                                    onDropDownChange(i,values, setValues, data.value )
                                                                  }}/>
                                                </div>
                                                <div style={ {marginLeft: '30%',width: '90%'}}>
                                                    <ErrorMessage name={`items.${i}.name`} component="div" className="invalid-feedback" />
                                                    <label style={ {margin: '0rem 1rem 0rem 1rem'} }>Quantity</label>
                                                    <Field name={`items.${i}.quantity`} type="text" style={{height:'40px'}} />
                                                    <ErrorMessage name={`items.${i}.quantity`} component="div" className="invalid-feedback" />
                                                    <label style={ {margin: '0rem 1rem 0rem 1rem'} }>Selling Price</label>
                                                    <Field name={`items.${i}.sellingPrice`} type="number" style={{height:'40px'}} />
                                                    <ErrorMessage name={`items.${i}.sellingPrice`} component="div" className="invalid-feedback" />
                                                    <button className="removeLink" type="button" onClick={e => removeItem(i, values, setValues)} style={ {margin: '0rem 1rem 0rem 1rem'} }>
                                                            remove
                                                    </button>   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                        </FieldArray>

                        
                        <StyledDiv style={{width: '200px', justifyContent: 'left', float: 'right'}} >
                        <button className="link" type="button" onClick={e => addItem(e, values, setValues)}>
                                <span className="icon icon-add bg-green ml-10"></span>
                                    Add Line Item
                        </button>
                        </StyledDiv>

                        <div style={ {margin: '3rem 0 1rem 0rem', width: '1000px', height: '40px'} }>
                            <label style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>Remarks</label>
                            <Field name="remarks" type='textarea' style={ {margin: '-2rem 0 1rem 20rem', width: '1000px', height: '100px'} } />
                        </div>
                        <StyledDiv style={{ marginTop:'100px',height:'40px',display: 'inline-block', width:'300px' }}>
                            <button type="submit" style={{height:'40px', backgroundColor:'green', width:'140px', float: 'left', color: 'white'}}>
                                Create Invoice
                            </button>
                            <button style={{marginLeft:'50px', height:'40px',width:'80px'}} type="reset">Reset</button>
                        </StyledDiv>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateInvoice;