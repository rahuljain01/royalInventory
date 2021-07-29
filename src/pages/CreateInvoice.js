import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import axios from "axios";
import { useState } from "react";
import ItemListDropdown from "../components/ItemListDropdown";
import { Dropdown } from "semantic-ui-react";
import "../components/Icons.css";
import { getCall, postCall } from "../helper/ApiHelper";
import Card from "../components/Card/Card";
import "./CreateInvoice.css";
import CtaButton from "../components/CtaButton/CtaButton";
import RCreatable from "../components/RCreatable";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";

const StyledDiv = styled.div`
  margin-bottom: 2rem;
  font-size: 1rem;
  height: 80px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

let items = [
  {
    itemName: "item1",
    itemId: 1,
    categoryId: "cat1",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand1",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl:
      "https://res.cloudinary.com/doxjtszxv/image/upload/v1620122700/zj1sjjojjrvi7unamnz7.jpg",
  },
  {
    itemName: "item2",
    itemId: 2,
    categoryId: "cat2",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand2",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl:
      "https://res.cloudinary.com/doxjtszxv/image/upload/v1620070516/klaxao8dnwt4o3sv8k4a.jpg",
  },
  {
    itemName: "item3",
    itemId: 3,
    categoryId: "cat3",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl:
      "https://res.cloudinary.com/doxjtszxv/image/upload/v1620070426/koy8u8rguufyquu10e2x.jpg",
  },
  {
    itemName: "item4",
    itemId: 4,
    categoryId: null,
    categoryName: null,
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: null,
    brandName: null,
    hsnCode: "",
    aliasCode: "",
    warehouseId: null,
    quantity: 3,
    imageUrl:
      "https://res.cloudinary.com/doxjtszxv/image/upload/v1619299004/b9ghw2weqr3oxhnhedav.jpg",
  },
  {
    itemName: "item5",
    itemId: 5,
    categoryId: null,
    categoryName: null,
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: null,
    brandName: null,
    hsnCode: "",
    aliasCode: "",
    warehouseId: null,
    quantity: 3,
    imageUrl: "imageUrl4",
  },
  {
    itemName: "item6",
    itemId: 6,
    categoryId: null,
    categoryName: null,
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "wh1",
    quantity: 3,
    imageUrl: "imageUrl4",
  },
  {
    itemName: "item7",
    itemId: 7,
    categoryId: null,
    categoryName: null,
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "item7",
    itemId: 8,
    categoryId: null,
    categoryName: null,
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "item7",
    itemId: 9,
    categoryId: "cat3",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "item10",
    itemId: 10,
    categoryId: "cat3",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "item11",
    itemId: 11,
    categoryId: "cat3",
    categoryName: "Chair",
    description: "patio furniture",
    gstPercent: 18.5,
    costPrice: 3000,
    sellingPrice: 6500,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "",
    aliasCode: "",
    warehouseId: "",
    quantity: 3,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "sofa green corner",
    itemId: 12,
    categoryId: "",
    categoryName: "sofa set",
    description: "awesome sofa set",
    gstPercent: 18,
    costPrice: 35000,
    sellingPrice: 0,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "9403",
    aliasCode: "100000000001",
    warehouseId: "",
    quantity: 0,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "sofa green corner",
    itemId: 13,
    categoryId: "",
    categoryName: "sofa set",
    description: "awesome sofa set",
    gstPercent: 18,
    costPrice: 35000,
    sellingPrice: 0,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "9403",
    aliasCode: "100000000001",
    warehouseId: "",
    quantity: 0,
    imageUrl: "imageUrl3",
  },
  {
    itemName: "New sofa green corner",
    itemId: 14,
    categoryId: "",
    categoryName: "sofa set",
    description: "awesome sofa green",
    gstPercent: 18,
    costPrice: 35000,
    sellingPrice: 0,
    discountPercent: 0,
    brandId: "brand3",
    brandName: "Royal Furniture",
    hsnCode: "9403",
    aliasCode: "100000000001",
    warehouseId: "",
    quantity: 0,
    imageUrl: "imageUrl3",
  },
];

const fullWidthTextFieldStyle = {
  width: "100%",
  height: "40px",
  border: "1px solid",
};

function ConvertItemsDataToDropdownData(items) {
  var dropdownItem = [];
  items.map((item, i) => {
    dropdownItem.push({
      image: item.imageUrl,
      text: item.itemName,
      value: item.itemName,
    });
  });
  return dropdownItem;
}

function CreateInvoice(props) {
  let initialValues = props.location.state
    ? {
        invoiceNumber: props.location.state.invoiceNumber,
        customerNumber: props.location.state.customerId,
        items: props.location.state.items,
        customer: {},
        deliveryDate: props.location.state.deliveryDate,
        invoiceDate: props.location.state.bookingDate,
        isGstApplicable: false,
        isFullyPaid:false,
      }
    : {
        invoiceNumber: "",
        customerNumber: "",
        items: [{ name: "", quantity: "", sellingPrice: "", warehouseId: "" }],
        customer: {},
        deliveryDate: "",
        invoiceDate: "",
        isGstApplicable: false,
        isFullyPaid:false,
      };

  let isEditing = props.location.state ? true : false;

  let history = useHistory();

  let [customer, setCustomer] = useState({});

  const [showCustomerFields, setshowCustomerFields] = useState(false);

  const [warehouseDict, setWarehouseDict] = useState([]);

  function addItem(e, values, setValues) {
    const items = [...values.items];
    items.push({ name: "", quantity: "", sellingPrice: "", warehouseId: "" });

    setValues({ ...values, items });
  }

  function onCustomerNumberEntry() {   

    getCall("getCustomer/8008911176")
      .then((data) => {
        console.log("SUCCESS!!");
        setCustomer(data);
        initialValues = {
          customerNumber: "8008911176",
          items: initialValues.items,
          customer: customer,
        };
        setshowCustomerFields(true);
      })
      .catch((reason) => {
        console.log("FAILURE!!");
        alert(reason);
      });
  }
  function onSubmit(fields) {
    // display form field values on success

    let amount = fields.items.reduce((accumulator, currentValue) => { return accumulator + (currentValue.sellingPrice * currentValue.quantity) }, 0);

    if (!fields['isFullyPaid']) {
      amount = fields['partialPayment']
    }
    fields['salesTransaction'] = {
      "transactionId": 0,
      "orderId": 0,
      "amountPaid": amount,
    }

    delete fields['partialPayment']
    console.log(JSON.stringify(fields, null, 4))
    postCall("createInvoice", JSON.stringify(fields, null, 4))
      .then((data) => {
        console.log("successfully posted invoice");
      })
      .catch((reason) => {
        console.log("failed in posting invoice");
      });
    history.push({ pathname: "/pdf", state: fields });
  }

  function getWarehouseForItem(name, index) {
    getCall("warehouse", {'itemName':name}).then((data) => {
      //setWarehouseDict(warehouseDict.push({'value':data[0].id , 'label':data[0].name}))
      
      setWarehouseDict(oldArray => [...oldArray, data.map( value => { return {'value':value.id ,'label':value.name}})])
    }).catch((reason) => {
      console.log("failed to get warehouse for index : "+  index);
    })
  }

  function onItemDropDownChange(index, values, setValues, selectedItem) {
    const items = [...values.items];
    items[index].name = selectedItem;

    setValues({ ...values, items });

    getWarehouseForItem(selectedItem.itemName, index)
  }

  function onWarehouseDropDownChange(index, values, setValues, selectedWarehouse) {
    const items = [...values.items];
    items[index].warehouseId = selectedWarehouse;

    setValues({ ...values, items });
  }

  function removeItem(index, values, setValues) {
    const items = [...values.items];
    items.splice(index, 1);

    setValues({ ...values, items });
  }

  function isFullyPaidClicked(e , setValues , values) {
    let isFullyPaid = values.isFullyPaid;
    isFullyPaid = e.target.checked
    setValues({ ...values, isFullyPaid });
  }

  return (
    <PageTitleContainer title='Create Invoice'>
    <Card className="create-invoice-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={false}
      >
        {({ errors, values, touched, setValues }) => (
          <Form>
            {initialValues.invoiceNumber != "" && <div className="form-group">
              <label>Invoice Number</label>
              <Field
                name="invoiceNumber"
                type="text"
                style={fullWidthTextFieldStyle}
                onBlur={() => {}}
              ></Field>
              <ErrorMessage
                name="invoiceNumber"
                component="div"
                className="invalid-feedback"
              />
            </div>}
            <div className="form-group">
              <label>Customer Number</label>
              <Field
                name="customerNumber"
                type="text"
                style={fullWidthTextFieldStyle}
                onBlur={onCustomerNumberEntry}
              ></Field>
              <ErrorMessage
                name="customerNumber"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div>{showCustomerFields && <AddCustomer customer={customer} isInvoice={true}/>}</div>
            <div>
              <div>
                <div>
                  <label>Invoice Date</label>
                  <Field
                    name="invoiceDate"
                    type="date"
                    style={{
                      margin: "1rem 0 1rem 2rem",
                      width: "300px",
                      height: "40px",
                    }}
                  ></Field>
                  <br />
                  <label
                    style={{
                      margin: "1rem 0 1rem 0rem",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    Delivery Date
                  </label>
                  <Field
                    name="deliveryDate"
                    type="date"
                    style={{
                      margin: "0rem 0 1rem 1.4rem",
                      width: "300px",
                      height: "40px",
                    }}
                  ></Field>
                </div>
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  margin: "1rem 0 1rem 0rem",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: "30%",
                  height: "40px",
                }}
              >
                <Field
                  type="checkbox"
                  name="checked"
                  value="isGstApplicable"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                Is GST Applied
              </label>
            </div>
            <FieldArray name="items">
              {() =>
                values.items.map((item, i) => {
                  const ticketErrors =
                    (errors.items?.length && errors.items[i]) || {};
                  const ticketTouched =
                    (touched.items?.length && touched.items[i]) || {};
                  return (
                    <div key={item.itemId}>
                      <div className="list-group-item">
                        <h5
                          className="card-title"
                          style={{
                            margin: "1rem 0 1rem 0rem",
                            width: "100%",
                            height: "40px",
                          }}
                        >
                          Item {i + 1}
                        </h5>
                        <div style={{
                            width: "100%",
                            display:'flex',
                            
                          }}>
                        <div
                          className="form-group col-6"
                          style={{
                            margin: "1rem 0 1rem 0rem",
                            width: "90%",
                            display:'flex',
                            flexDirection:'column',
                            
                          }}
                        >
                          <div style={{ width: "100%",display:'flex'}}>
                            <div style={{ width: "55%", float: "left" }}>
                            <Dropdown
                              name={`items.${i}.name`}
                              placeholder="Select Item"
                              fluid
                              search
                              selection
                              options={ConvertItemsDataToDropdownData(items)}
                              onChange={(event, data) => {
                                onItemDropDownChange(
                                  i,
                                  values,
                                  setValues,
                                  data.value
                                );
                              }}
                              defaultValue={item.itemName}
                            />
                            <ErrorMessage
                              name={`items.${i}.name`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div style={{ width: "45%" }}>
                            <label style={{ margin: "0rem 1rem 0rem 1rem", width:'30%' }}>
                              Quantity
                            </label>
                            <Field
                              name={`items.${i}.quantity`}
                              type="text"
                              style={{ height: "40px", width:'70%'  }}
                            />
                            <ErrorMessage
                              name={`items.${i}.quantity`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                          </div>
                          <div style={{display:'flex', marginTop:'20px'}}>
                            <div style={{width:'45%'}}>
                            <label style={{width:'30%', marginRight:'10px'}}>
                              Selling Price
                            </label>
                            <Field
                              name={`items.${i}.sellingPrice`}
                              type="number"
                              style={{ height: "40px", width:'70%' }}
                            />
                            <ErrorMessage
                              name={`items.${i}.sellingPrice`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div  style={{width:'55%', display:'flex', alignItems:'center'}}>
                              <label  style={{width:'30%'}}>Warehouse:</label>
                              <RCreatable
                                name={`items.${i}.warehouseId`}
                                onChange={(event, data) => {
                                  onWarehouseDropDownChange(
                                    i,
                                    values,
                                    setValues,
                                    data.value
                                  );
                                }}
                                onBlur={() => {}}
                                options={warehouseDict[i]}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{width:'10%', display:'flex', justifyContent:'center',alignItems:'center'}}>
                        <button
                              className="removeLink"
                              type="button"
                              onClick={(e) => removeItem(i, values, setValues)}
                              style={{ margin: "0rem 1rem 0rem 1rem" }}
                            >
                              remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </FieldArray>

            <StyledDiv
              style={{
                width: "200px",
                justifyContent: "left",
                float: "right",
              }}
            >
              <button
                className="link"
                type="button"
                onClick={(e) => addItem(e, values, setValues)}
              >
                <span className="icon icon-add bg-green ml-10"></span>
                Add Line Item
              </button>
            </StyledDiv>

            <div
              style={{
                margin: "3rem 0 1rem 0rem",
                width: "100%",
              }}
            >
              <label
                style={{
                  margin: "2rem 0 0rem 0rem",
                  width: "100%",
                  height: "40px",
                }}
              >
                Remarks
              </label>
              <Field
                name="remarks"
                type="textarea"
                style={{
                  margin: "0rem 0 1rem 0rem",
                  width: "100%",
                  height: "100px",
                }}
              />
            </div>
            <div >
              <label>Payments</label>
              <div style={{
                  display: "flex",
                  margin: "1rem 0 1rem 0rem",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}>
              <label
                style={{
                  display: "flex",
                  margin: "1rem 0 1rem 0rem",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "30%",
                  height: "40px",
                }}
              >
                <Field
                  type="checkbox"
                  name="checked"
                  value="isFullyPaid"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                  onBlur={(e) => isFullyPaidClicked(e , setValues , values)}
                />
                Fully Paid
              </label>
              {!values.isFullyPaid && <><label>Partial Payment</label>
              <Field
                  name="partialPayment"
                  type="number"
                  style={{ height: "40px", width:'30%', marginLeft:'20px'  }}
                  
              /></>}
              
              </div>
            </div>
            <StyledDiv
              style={{
                justifyContent: "center",
                height: "40px",
              }}
            >
              <CtaButton type="submit" style={{ width: "100px", margin: '0px' }}>
                {isEditing ? "Edit Invoice" : "Create Invoice"}
              </CtaButton>
              <button
                style={{ marginLeft: "50px", height: "40px", width: "80px" }}
                type="reset"
              >
                Reset
              </button>
            </StyledDiv>
          </Form>
        )}
      </Formik>
    </Card>
    </PageTitleContainer>
  );
}

export default CreateInvoice;
