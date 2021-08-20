
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
import PageTitleContainer from '../../components/PageTitleContainer/PageTitleContainer';
import { getCall, postCall } from '../../helper/ApiHelper';


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


const baseUrl = 'https://royalfurniture.azurewebsites.net/api/'

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
      itemName: props.initialValues.itemName,
      description:props.initialValues.description,
      gstpercent:props.initialValues.gstpercent,
      brand:props.initialValues.brand,
      hsnCode:props.initialValues.hsnCode,
      aliasCode:props.initialValues.aliasCode,
      file: null,
      parentItemName:props.initialValues.parentItemName,
      category: props.initialValues.category,
      numberOfCopy:props.initialValues.numberOfCopy,
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };
    console.log(payload)

      var bodyDict = {
        itemName:values.itemName,
        isParent:values.parentItemName == {} ? 1:0,
        parentItemName:values.parentItemName,
        numberOfCopy: values.numberOfCopy,
        description:values.description,
        gstpercent:values.gstpercent,
        hsncode:values.hsnCode,
        aliasCode:values.aliasCode,
        imageUrl:values.imageUrl,
      }

      let isBrandCreated = !Number.isInteger(parseInt(values.brand.value))
      let isCategoryCreated = !Number.isInteger(parseInt(values.category.value))

      if (isBrandCreated) {
        bodyDict['brand'] = {
          brandId:'0',
          brandName: values.brand.value
        }
      } else {
        bodyDict['brandId'] = values.brand.value
      }

      if (isCategoryCreated) {
        bodyDict['category'] = {
          categoryId:'0',
          categoryName: values.category.value
        }
      } else {
        bodyDict['categoryId'] = values.category.value
      }

      bodyDict['parentItemName'] = values.parentItemName.value ? values.parentItemName.value:''

      bodyDict['isParent'] = Object.keys(values.parentItemName).length == 0 ? 1:0
    postCall('items', bodyDict).then(function (responseArr) {
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
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = props;

  const [file, setFile] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [brandOptions, setBrandOptions] = React.useState([]);
  const [parentItems, setParentItems] = React.useState([]);
  

  useEffect(() => {
    getCategories()
    getBrands()
    getAllParentItems()
  }, []);

  function getCategories() {
    getCall('categories').then(function (responseArr) {
      setCategoryOptions(convertCategoryDataToDropdownData(responseArr))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function getBrands() {
    getCall('brands').then(function (responseArr) {
      setBrandOptions(convertBrandDataToDropdownData(responseArr))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  } 

  function getAllParentItems() {
    getCall('items', {isParent: 1}).then(function (responseArr) {
      setParentItems(convertItemDataToDropdownData(responseArr))
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function convertBrandDataToDropdownData(data) {
    let dropdownData = []
    data.map((node, index) => {
      dropdownData.push({'value':node.brandId , 'label':node.brandName})
    })

    return dropdownData
  }

  function convertItemDataToDropdownData(data) {
    let dropdownData = []
    data.map((node, index) => {
      dropdownData.push({'value':node.itemName , 'label':node.itemName})
    })

    return dropdownData
  }

  function convertCategoryDataToDropdownData(data) {
    let dropdownData = []
    data.map((node, index) => {
      dropdownData.push({'value':node.categoryId , 'label':node.categoryName})
    })

    return dropdownData
  }

  function handleUpload(event) {
 
    setFile(event.target.files[0]);  
  
    let formData = new FormData()
  
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset','mfdq2wyh')
    formData.append('tag','myUpload')
  
      const url = `https://api.cloudinary.com/v1_1/doxjtszxv/image/upload`
  
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      axios.post(url,
          formData,config
        ).then(function (response) {
          setImageUrl(response.data.url)
          setFieldValue('imageUrl', response.data.url)
        })
        .catch(function (reason) {
          console.log('FAILURE!!');
          alert('upload failure' + reason + url + formData)
        });
  }
  
  return (
    <PageTitleContainer title='Add Item'>
    <Card className='add-item-container'>
    <form  onSubmit={handleSubmit}>
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
        <div className="container__field-div" >
        <InputLabel>
              Upload Image:
            </InputLabel>
        <div style={{display:'flex', alignItems:'center'}}>           
            <input multiple type="file" onChange={handleUpload}/>
            {imageUrl != "" ? <img src={imageUrl} height='200px' width='200px'></img>:null}
        </div>
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
            id="gstpercent"
            name="gstpercent"
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gstpercent} />
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
        <div className="inline__container__div">
          <label>
            Alias code:
          </label>
          <input 
            className='inline_input'
            type="text" 
            id="aliasCode"
            name="aliasCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.aliasCode} />
            <label style={{paddingLeft:'10px'}}>
            HSN code:
          </label>
          <input 
            className='inline_input'
            type="text" 
            id="hsnCode"
            name="hsnCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hsnCode} />
          <label className='inline_label' style={{paddingLeft:'10px'}}>
            Copy Required:
          </label>
          <input 
            className='inline_input'
            type="number" 
            id="numberOfCopy"
            name="numberOfCopy"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numberOfCopy} />
        </div>
        <div className="container__field-div">
          <InputLabel>
            Parent Item:
          </InputLabel>
          <RCreatable
          name='parentItemName'
          onChange={setFieldValue}
          value = {values.parentItemName}
          onBlur={setFieldTouched}
          options={parentItems}
      />
      </div>
        <CtaButton type="submit">{'ADD'}</CtaButton>
      </form>
      </Card>
      </PageTitleContainer>
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

const AddItem = (props) => {

  let item = props.location.state

  let initialValues =  item ? {
    itemName: item.itemName,
  description:item.description,
  gstpercent:item.gstpercent,
  brand:{value:item.brand.brandId, label:item.brand.brandName},
  hsnCode:9403,
  aliasCode:item.aliasCode,
  file: null,
  parentItemName:{value:item.parentItemName, label:item.parentItemName},
  category: {value:item.category.categoryId, label:item.category.categoryName},
  numberOfCopy:item.numberOfCopy,} : {
    itemName: '',
    description:'',
    gstpercent:18,
    brand:{},
    hsnCode:9403,
    aliasCode:'',
    file: null,
    parentItemName:{},
    category: {},
    numberOfCopy:1,
}

  return (
    <MyEnhancedForm initialValues={initialValues}/>
  );
};


export default AddItem;
