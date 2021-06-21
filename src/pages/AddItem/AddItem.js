
import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import axios from 'axios'
import RCreatable from '../../components/RCreatable';
//import {config, baseUrl} from '../config/Config.js';
import { useEffect } from 'react';
import './AddItem.css'
import CtaButton from '../../components/CtaButton/CtaButton';
import Card from '../../components/Card/Card';


const InputLabel = styled.label`
  margin: auto;
  font-size: 1rem;
  /*font-weight: bold;*/
  display: block;
  padding-bottom: 2px;
`;

const InputText = styled.input`
  display:block;
  margin: auto;
  font-size: 1rem;
  height: 30px;
  width:100%;
  border:1px solid rgb(196, 196, 196);
  border-radius: 4px;
  justify-content: flex-start;
`;

const InputTextArea = styled.textarea`
  display:block;
  margin: auto;
  font-size: 1rem;
  height: 80px;
  width:100%;
  border:1px solid rgb(196, 196, 196);
  justify-content: flex-start;
`;


const baseUrl = 'https://api-manager-rf-inventory.azure-api.net/v1/api/'

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
      itemName: '',
      description:'',
      gstPercentage:18,
      costPrice:0,
      brand:'',
      hsnCode:9403,
      aliasCode:'',
      warehouse:'',
      quantity: 0,
      file: null,
      category: [],
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };
    console.log(payload)
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*'
        const customHeaders = {
          'content-type': 'application/json',
        };

    axios.post(baseUrl + 'Items', {
      ItemName:values.itemName,
      CategoryId:values.category.value,
      CategoryName:values.category.label,
      Description:values.description,
      GSTPercent:values.gstPercentage,
      CostPrice:values.costPrice,
      DiscountPercent:0,
      BrandId:values.brand.value,
      BrandName:values.brand.label,
      HsnCode:values.hsnCode,
      AliasCode:values.aliasCode,
      WarehouseId:values.warehouse.value,
      Quantity:values.quantity,
      ImageUrl:values.imageUrl,
    }, customHeaders).then(function (responseArr) {
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
  },
  displayName: 'MyForm',
});





const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;

  const [file, setFile] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [brandOptions, setBrandOptions] = React.useState([]);
  const [warehouseOptions, setWarehouseOptions] = React.useState([]);
  

  useEffect(() => {
    getCategories()
    getBrands()
    getWarehouse()
  }, []);

  function getCategories() {
    axios.get(baseUrl + 'categories').then(function (responseArr) {
      setCategoryOptions(convertDataToDropdownData(responseArr.data))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function getBrands() {
    axios.get(baseUrl + 'brands').then(function (responseArr) {
      setBrandOptions(convertDataToDropdownData(responseArr.data))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function getWarehouse() {
    axios.get(baseUrl + 'warehouse').then(function (responseArr) {
      setWarehouseOptions(convertDataToDropdownData(responseArr.data))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function convertDataToDropdownData(data) {
    let dropdownData = []
    data.map((node, index) => {
      dropdownData.push({'value':node.id , 'label':node.name})
    })

    return dropdownData
  }

  function handleUpload(event) {

  
    setFile(event.target.files[0]);  
    console.log('handleUpload called')
  
    let formData = new FormData()
  
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset','mfdq2wyh')
    formData.append('tag','myUpload')
      console.log('>> formData >> ', formData);
  
      const url = `https://api.cloudinary.com/v1_1/doxjtszxv/image/upload`
  
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      axios.post(url,
          formData,config
        ).then(function (response) {
          console.log('SUCCESS!!');
          setImageUrl(response.data.url)
          setFieldValue('imageUrl', response.data.url)
        })
        .catch(function (reason) {
          console.log('FAILURE!!');
          alert('upload failure' + reason + url + formData)
        });
  }
  
  return (
    <Card className='add-item-container'>
    <form  onSubmit={handleSubmit} >
        <div className="container__field-div">
          <InputLabel>
            Item Name:
          </InputLabel>
          <InputText 
            id="itemName"
            name="itemName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.itemName} />
            {errors.itemName ? <div>{errors.itemName}</div> : null}
        </div>
        <div className="container__field-div">
          <InputLabel>
            Category:
          </InputLabel>
          <RCreatable
          name="category"
          onChange={setFieldValue}
          value = {values.category}
          onBlur={setFieldTouched}
          options={categoryOptions}
      />
        </div>
        <div className="container__field-div">
            <InputLabel>
              Upload Image:
            </InputLabel>
            <input multiple type="file" onChange={handleUpload}/>
        </div>

        <div className="container__field-div">
          <InputLabel>
            Description:
          </InputLabel>
          <InputTextArea 
            id="description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description} />
        </div>
          <div className="container__field-div">
          <InputLabel>
            GST percentage:
          </InputLabel>
          <InputText 
            id="gstPercentage"
            name="gstPercentage"
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gstPercentage} />
          </div>   
          <div className="container__field-div">
        <InputLabel>
          Cost price:
        </InputLabel>
        <InputText 
            id="costPrice"
            name="costPrice"
            type='number'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.costPrice} />
        </div>
        <div className="container__field-div">
        <InputLabel>
          Brand:
        </InputLabel>
        <RCreatable
          name="brand"
          onChange={setFieldValue}
          value = {values.brand}
          onBlur={setFieldTouched}
          options={brandOptions}
      />
        </div>
        <div className="container__field-div">
          <InputLabel>
            HSN code:
          </InputLabel>
          <InputText 
            type="text" 
            id="hsnCode"
            name="hsnCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hsnCode} />
        </div>
        <div className="container__field-div">
          <InputLabel>
            Alias code:
          </InputLabel>
          <InputText 
            type="text" 
            id="aliasCode"
            name="aliasCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.aliasCode} />
        </div>
        <div className="container__field-div">
          <InputLabel>
            Warehouse:
          </InputLabel>
          <RCreatable
          name='warehouse'
          onChange={setFieldValue}
          value = {values.warehouse}
          onBlur={setFieldTouched}
          options={warehouseOptions}
      />
        </div>
        <div className="container__field-div">
          <InputLabel>
            Quantity:
          </InputLabel>
          <InputText 
            type="number" 
            id="quantity"
            name="quantity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quantity} />
        </div>
        <CtaButton type="submit">{'ADD'}</CtaButton>
      </form>
      </Card>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);


const validate = values => {
  const errors = {};

  if (!values.itemName) {
    errors.itemName = 'Required';
  } else if (values.itemName.length > 15) {
    errors.itemName = 'Must be 15 characters or less';
  }

  return errors;
};

const AddItem = () => {

  return (
    <MyEnhancedForm />
  );
};


export default AddItem;
