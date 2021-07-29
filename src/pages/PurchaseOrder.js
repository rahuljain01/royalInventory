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
import AddItemModal from "./AddItemModel";
import PopUp from "./Popup";
import Card from "../components/Card/Card";
import './PurchaseOrder.css'
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";
import RCreatable from "../components/RCreatable";
import { getCall } from "../helper/ApiHelper";
import { config } from "../config/Config";

const StyledDiv = styled.div`
  margin-left: 40rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  height: 80px;
  justify-content: flex-start;
`;

const companies = [
  { text: "Kurl On", value: 1 },
  { text: "Good luck", value: 2 },
  { text: "Arora furnishers", value: 3 },
  { text: "Ideal Furniture", value: 4 },
];
const fullWidthTextFieldStyle = {
  margin: "1rem 0 1rem 0rem",
  width: "80%",
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

function ConvertWarehouseDataToDropdownData(warehouses) {
  var dropdownItem = [];
  warehouses.map((warehouse, i) => {
    dropdownItem.push({
      value: warehouse.storeId,
      label: warehouse.address,
    });
  });
  return dropdownItem;
}

function PurchaseOrder(props) {
  let initialValues = {
    vendorId: "",
    purchaseItem: [{ itemName: "", quantity: "", storeId:"", costPrice:"" }],
    purchaseDate: "",
    taxPaid: 0,
  };

  let isEditing = props.location.state ? true : false;

  let history = useHistory();
  let [shouldShowPopup, setShouldShowPopup] = useState(false);

  const [warehouse, setWarehouse] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
    getWarehouse()
  }, []);

  function addItem(e, values, setValues) {
    const purchaseItem = [...values.purchaseItem];
    purchaseItem.push({ itemName: "", quantity: "", storeId:"", costPrice:""  });

    setValues({ ...values, purchaseItem });
  }

  function onSubmit(fields) {
    // display form field values on success
    
    let amount = fields.purchaseItem.reduce((accumulator, currentValue) => { return accumulator + (currentValue.costPrice * currentValue.quantity) }, 0);
    console.log(amount)
    fields["amount"] = amount
    alert(JSON.stringify(fields, null, 4));
    
  }

  function onItemDropDownChange(index, values, setValues, selectedItem) {
    const purchaseItem = [...values.purchaseItem];
    purchaseItem[index].itemName = selectedItem;

    setValues({ ...values, purchaseItem });
  }

  function onWarehouseDropDownChange(index, values, setValues, selectedWarehouse) {
    const purchaseItem = [...values.purchaseItem];
    purchaseItem[index].storeId = selectedWarehouse;

    setValues({ ...values, purchaseItem });
  }

  function onCompanyDropDownChange(values, setValues, selectedItem) {
    let vendorId = values.vendorId;

    vendorId = selectedItem
    setValues({ ...values, vendorId });
  }

  const getItems = () => {
    getCall('items').then(function (responseArr) {
      setItems(responseArr)
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  const getWarehouse = () => {
    getCall('stores').then(function (responseArr) {
      setWarehouse(responseArr)
      console.log('SUCCESS!!');
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }

  function removeItem(index, values, setValues) {
    const purchaseItem = [...values.purchaseItem];
    purchaseItem.splice(index, 1);

    setValues({ ...values, purchaseItem });
  }

  return (
    <PageTitleContainer title='Create Purchase Order'>
    <Card className='purchase-container'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, values, touched, setValues }) => (
          <Form>
            <div>
              <div style={{
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: "1rem 1rem 1rem 0rem",
                        width: "100px",
                        height: "40px",
                        verticalAlign: 'middle'
                      }}
                    >
                      Select Company
                    </label>
                    <Dropdown
                      name="vendorId"
                      fluid
                      search
                      selection
                      options={companies}
                      style={fullWidthTextFieldStyle}
                      onChange={(event, data) => {
                        onCompanyDropDownChange(values, setValues, data.value);
                      }}
                    />
              </div>

              <div className="card-body border-bottom">
                <div className="form-row">
                  <div className="form-group">
                    <label
                      style={{
                        margin: "1rem 0 1rem 0rem",
                        width: "100px",
                        height: "40px",
                      }}
                    >
                      Invoice Date
                    </label>
                    <Field
                      name="invoiceDate"
                      type="text"
                      style={{
                        margin: "1rem 0 1rem 2rem",
                        width: "300px",
                        height: "40px",
                        borderWidth: "1px solid",
                      }}
                    ></Field>
                  </div>
                </div>
              </div>
              <div className='purchase-form-group-container-div'>
                <label className='gst-label'>
                  <Field
                    type="checkbox"
                    name="checked"
                    value="isGstApplicable"
                    style={{ width: "20px", height: "20px", marginRight: '10px' }}
                  />
                  Is GST Applied
                </label>
              </div>
              <FieldArray name="items">
                {() =>
                  values.purchaseItem.map((item, i) => {
                    const ticketErrors =
                      (errors.items?.length && errors.items[i]) || {};
                    const ticketTouched =
                      (touched.items?.length && touched.items[i]) || {};
                    return (
                      <div key={i} className="list-group list-group-flush">
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
                              name={`purchaseItem.${i}.name`}
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
                              name={`purchaseItem.${i}.name`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div style={{ width: "45%" }}>
                            <label style={{ margin: "0rem 1rem 0rem 1rem", width:'30%' }}>
                              Quantity
                            </label>
                            <Field
                              name={`purchaseItem.${i}.quantity`}
                              type="text"
                              style={{ height: "40px", width:'70%'  }}
                            />
                            <ErrorMessage
                              name={`purchaseItem.${i}.quantity`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                          </div>
                          <div style={{display:'flex', marginTop:'20px'}}>
                            <div style={{width:'45%'}}>
                            <label style={{width:'30%', marginRight:'10px'}}>
                              Cost Price
                            </label>
                            <Field
                              name={`purchaseItem.${i}.costPrice`}
                              type="number"
                              style={{ height: "40px", width:'70%' }}
                            />
                            <ErrorMessage
                              name={`purchaseItem.${i}.costPrice`}
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            <div  style={{width:'55%', display:'flex', alignItems:'center'}}>
                              <label  style={{width:'30%'}}>Warehouse:</label>
                              <RCreatable
                                name={`items.${i}.storeId`}
                                onChange={(event, data) => {
                                  onWarehouseDropDownChange(
                                    i,
                                    values,
                                    setValues,
                                    data.value
                                  );
                                }}
                                onBlur={() => {}}
                                options={ConvertWarehouseDataToDropdownData(warehouse)}
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

              <div
                style={{
                  width: "200px",
                  marginBottom: '50px',
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
              </div>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: '50px',
                  display: 'flex',
                }}
              >
                <button
                  className="link"
                  type="button"
                  onClick={(e) => {
                    setShouldShowPopup(true);
                  }}
                >
                  <span className="icon icon-add bg-green ml-10"></span>
                  Add New Item
                </button>
              </div>
              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  width: "100%",
                  justifyContent: 'center',
                }}
              >
                <button
                  type="submit"
                  style={{
                    height: "40px",
                    backgroundColor: "#4CAF50",
                    width: "140px",
                    float: "left",
                    color: "white",
                    borderRadius: "4px",
                    border: "0px",
                  }}
                >
                  {isEditing ? "Edit Purchase" : "Create Purchase"}
                </button>
                <button
                  style={{ marginLeft: "50px", height: "40px", width: "80px" }}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {shouldShowPopup ? (
        <PopUp shouldShowPopup={shouldShowPopup} onClose={setShouldShowPopup} />
      ) : null}
    </Card>
    </PageTitleContainer>
  );
}

export default PurchaseOrder;
