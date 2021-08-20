import React, { useEffect } from "react";
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

function ConvertStaffDataToDropdownData(staff) {
  var dropdownItem = [];
  staff.map((staff, i) => {
    dropdownItem.push({
      text: staff.staffName,
      value: staff.staffId,
    });
  });
  return dropdownItem;
}

function CreateInvoice(props) {
  let initialValues = props.location.state
    ? {
        orderInvoice: props.location.state.orderInvoice,
        customerNumber: props.location.state.customerId,
        orderItems: props.location.state.orderItems,
        customer: {},
        deliveryDate: props.location.state.deliveryDate,
        bookingDate: props.location.state.bookingDate,
        isGst: false,
        isFullyPaid:false,
        staff:{},
      }
    : {
        orderInvoice: "",
        customerNumber: "",
        orderItems: [{ name: "", quantity: "", sellingPrice: "", warehouseId: "" }],
        customer: {},
        deliveryDate: "",
        bookingDate: "",
        isGst: false,
        isFullyPaid:false,
        staff:{},
      };

  let isEditing = props.location.state ? true : false;

  let history = useHistory();

  let [customer, setCustomer] = useState({});

  const [showCustomerFields, setshowCustomerFields] = useState(false);

  const [warehouseDict, setWarehouseDict] = useState([]);
  const [items, setItems] = useState([])
  const [staff, setStaff] = useState([])

  useEffect(() => { getItem()
    getStaff() }, [])

  function addItem(e, values, setValues) {
    const orderItems = [...values.orderItems];
    orderItems.push({ name: "", quantity: "", sellingPrice: "", warehouseId: "" });

    setValues({ ...values, orderItems });
  }

  const getItem = () => {
    getCall('items').then((data) => {
      setItems(data)
    } ).catch((reason) => {
      console.log("FAILURE!!");
    })
  }

  const getStaff = () => {
    getCall('staffs').then((data) => {
      setStaff(data)
    } ).catch((reason) => {
      console.log("FAILURE!!");
    })
  }

  function onCustomerNumberEntry(event) {   

    getCall("customers", { params: {phone:event.target.value}})
      .then((data) => {
        console.log("SUCCESS!!");
        setCustomer(data[0]);
        initialValues = {
          customerNumber: event.target.value,
          orderItems: initialValues.orderItems,
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

    let amount = fields.orderItems.reduce((accumulator, currentValue) => { return accumulator + (currentValue.sellingPrice * currentValue.quantity) }, 0);

    if (!fields['isFullyPaid']) {
      amount = fields['partialPayment']
    }

    if (fields['isGst'] ) {
      fields['isGst'] = 1
    } else {
      fields['isGst'] = 0
    }
    fields['orderId'] = 0
    fields['salesTransaction'] = [{
      "transactionId": 0,
      "orderId": 0,
      "amountPaid": amount,
    }]
    fields['staffId'] = fields['staff']
    fields['customerId'] = customer.customerId
    delete fields['staff']
    delete fields['partialPayment']
    delete fields['customer']
    console.log(JSON.stringify(fields, null, 4))
    postCall("orders", JSON.stringify(fields, null, 4))
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
      setWarehouseDict(oldArray => [...oldArray,  [{'value':'3' ,'label':'test_store_name'}]])
      console.log("failed to get warehouse for index : "+  index);
    })
  }

  function onItemDropDownChange(index, values, setValues, selectedItem) {
    const orderItems = [...values.orderItems];
    orderItems[index].name = selectedItem;

    setValues({ ...values, orderItems });

    getWarehouseForItem(selectedItem.itemName, index)
  }

  function onStaffDropDownChange(values, setValues, selectedStaff) {
    var staff = values.staff;
    staff = selectedStaff;

    setValues({ ...values, staff });
  }

  function removeItem(index, values, setValues) {
    const orderItems = [...values.orderItems];
    orderItems.splice(index, 1);

    setValues({ ...values, orderItems });
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
            {initialValues.orderInvoice != "" && <div className="form-group">
              <label>Invoice Number</label>
              <Field
                name="orderInvoice"
                type="text"
                style={fullWidthTextFieldStyle}
                onBlur={() => {}}
              ></Field>
              <ErrorMessage
                name="orderInvoice"
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
                    name="bookingDate"
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
                  value="isGst"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                Is GST Applied
              </label>
            </div>
            <FieldArray name="orderItems">
              {() =>
                values.orderItems.map((item, i) => {
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
                            <div style={{ width: "40%", float: "left" }}>
                            <Dropdown
                              name={`orderItems.${i}.name`}
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
                              name={`orderItems.${i}.name`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div style={{ width: "30%" }}>
                            <label style={{ margin: "0rem 1rem 0rem 1rem", width:'30%' }}>
                              Quantity
                            </label>
                            <Field
                              name={`orderItems.${i}.quantity`}
                              type="text"
                              style={{ height: "40px", width:'70%'  }}
                            />
                            <ErrorMessage
                              name={`orderItems.${i}.quantity`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div style={{width:'30%'}}>
                            <label style={{width:'30%', marginRight:'10px'}}>
                              Selling Price
                            </label>
                            <Field
                              name={`orderItems.${i}.sellingPrice`}
                              type="number"
                              style={{ height: "40px", width:'70%' }}
                            />
                            <ErrorMessage
                              name={`orderItems.${i}.sellingPrice`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                          </div>
                          <div style={{display:'flex', marginTop:'20px'}}>
                            {/* <div style={{width:'45%'}}>
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
                            </div> */}
                            {/* <div  style={{width:'55%', display:'flex', alignItems:'center'}}>
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
                            </div> */}
                          </div>
                        </div>
                        <div style={{width:'10%', display:'flex'}}>
                        <button
                              className="removeLink"
                              type="button"
                              onClick={(e) => removeItem(i, values, setValues)}
                              style={{ margin: "0rem 0rem 0rem 0rem", textAlign:'center' }}
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
            <div>
            <Dropdown
                              name='staff'
                              placeholder="Select Staff"
                              fluid
                              search
                              selection
                              options={ConvertStaffDataToDropdownData(staff)}
                              onChange={(event, data) => {
                                onStaffDropDownChange(
                                  values,
                                  setValues,
                                  data.value
                                );
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
