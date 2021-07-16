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
import AddItemModal from "./AddItemModel";
import PopUp from "./Popup";
import Card from "../components/Card/Card";
import './PurchaseOrder.css'
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";

const StyledDiv = styled.div`
  margin-left: 40rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  height: 80px;
  justify-content: flex-start;
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

function PurchaseOrder(props) {
  let initialValues = {
    businessId: "",
    items: [{ itemName: "", quantity: "" }],
    purchaseDate: "",
    taxPaid: 0,
  };

  let isEditing = props.location.state ? true : false;

  let history = useHistory();
  let [shouldShowPopup, setShouldShowPopup] = useState(false);

  function addItem(e, values, setValues) {
    const items = [...values.items];
    items.push({ itemName: "", quantity: "" });

    setValues({ ...values, items });
  }

  function onSubmit(fields) {
    // display form field values on success
    alert(JSON.stringify(fields, null, 4));
    alert(fields.customerNumber);
    //history.push({pathname: '/pdf',state: fields})
  }

  function onDropDownChange(index, values, setValues, selectedItem) {
    const items = [...values.items];
    items[index].name = selectedItem;

    setValues({ ...values, items });
  }

  function onCompanyDropDownChange(values, setValues, selectedItem) {
    const items = [...values.items];

    setValues({ ...values, items });
  }

  function removeItem(index, values, setValues) {
    const items = [...values.items];
    items.splice(index, 1);

    setValues({ ...values, items });
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
                      name="businessId"
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
                  values.items.map((item, i) => {
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
                          <div className="form-row">
                            <div
                              className="form-group col-6"
                              style={{
                                display: 'flex',
                                margin: "1rem 0 1rem 0rem",
                                width: "100%",
                                height: "40px",
                              }}
                            >
                              <div style={{ width: "45%", float: "left" }}>
                                <Dropdown
                                  name={`items.${i}.name`}
                                  placeholder="Select Item"
                                  fluid
                                  search
                                  selection
                                  options={ConvertItemsDataToDropdownData(
                                    items
                                  )}
                                  onChange={(event, data) => {
                                    onDropDownChange(
                                      i,
                                      values,
                                      setValues,
                                      data.value
                                    );
                                  }}
                                  defaultValue={item.itemName}
                                />
                              </div>
                              <div style={{display:'flex', width: '50%'}}>
                                <ErrorMessage
                                  name={`items.${i}.name`}
                                  component="div"
                                  className="invalid-feedback"
                                />
                                <label style={{display:'flex' , alignItems:'center', marginRight: '20px', marginLeft: '20px'}}>
                                  Quantity
                                </label>
                                <Field
                                  name={`items.${i}.quantity`}
                                  type="number"
                                  style={{
                                    height: "40px",
                                    width: "450px",
                                    borderWidth: "1px solid",
                                  }}
                                />
                                <ErrorMessage
                                  name={`items.${i}.quantity`}
                                  component="div"
                                  className="invalid-feedback"
                                />
                                <button
                                  className="removeLink"
                                  type="button"
                                  onClick={(e) =>
                                    removeItem(i, values, setValues)
                                  }
                                  style={{ margin: "0rem 1rem 0rem 1rem" }}
                                >
                                  remove
                                </button>
                              </div>
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
