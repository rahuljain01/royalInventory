
import React from 'react';
import styled from 'styled-components';
import {withFormik } from 'formik';
import axios from 'axios'
import RCreatable from '../components/RCreatable';
//import {config, baseUrl} from '../config/Config.js';
import { useEffect } from 'react';


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

const SubmitButton = styled.button`
  margin-left: 700px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  height: 40px;
  width:80px;
  justify-content: flex-start;
  background-color:green;
  color: white;
  border-radius:4px;
  border: 0px;
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
    <form  onSubmit={handleSubmit}>
        <div>
          <InputLabel>
            Item Name:
          </InputLabel>
          <br />
          <InputText 
            id="itemName"
            name="itemName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.itemName} />
            {errors.itemName ? <div>{errors.itemName}</div> : null}
        </div>
        <div>
          <InputLabel>
            Category:
          </InputLabel>
          <br />
          <RCreatable
          name="category"
          onChange={setFieldValue}
          value = {values.category}
          onBlur={setFieldTouched}
          options={categoryOptions}
      />
        </div>
        <div>
            <InputLabel>
              Upload Image:
            </InputLabel>
            <br />
            <InputText type="file" onChange={handleUpload}/>
        </div>

        <div>
          <InputLabel>
            Description:
          </InputLabel>
          <br />
          <InputTextArea 
            id="description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description} />
        </div>
          <div>
          <InputLabel>
            GST percentage:
          </InputLabel>
          <br />
          <InputText 
            id="gstPercentage"
            name="gstPercentage"
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gstPercentage} />
          </div>   
          <div>
        <InputLabel>
          Cost price:
        </InputLabel>
        <br />
        <InputText 
            id="costPrice"
            name="costPrice"
            type='number'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.costPrice} />
        </div>
        <div>
        <InputLabel>
          Brand:
        </InputLabel>
        <br />
        <RCreatable
          name="brand"
          onChange={setFieldValue}
          value = {values.brand}
          onBlur={setFieldTouched}
          options={brandOptions}
      />
        </div>
        <div>
          <InputLabel>
            HSN code:
          </InputLabel>
          <br />
          <InputText 
            type="text" 
            id="hsnCode"
            name="hsnCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hsnCode} />
        </div>
        <div>
          <InputLabel>
            Alias code:
          </InputLabel>
          <br />
          <InputText 
            type="text" 
            id="aliasCode"
            name="aliasCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.aliasCode} />
        </div>
        <div>
          <InputLabel>
            Warehouse:
          </InputLabel>
          <br />
          <RCreatable
          name='warehouse'
          onChange={setFieldValue}
          value = {values.warehouse}
          onBlur={setFieldTouched}
          options={warehouseOptions}
      />
        </div>
        <div>
          <InputLabel>
            Quantity:
          </InputLabel>
          <br />
          <InputText 
            type="number" 
            id="quantity"
            name="quantity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quantity} />
        </div>
        <SubmitButton type="submit">{'ADD'}</SubmitButton>
      </form>
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
