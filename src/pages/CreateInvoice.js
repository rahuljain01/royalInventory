import React, { useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "../components/Icons.css";
import { getCall, postCall, putCall } from "../helper/ApiHelper";
import Card from "../components/Card/Card";
import "./CreateInvoice.css";
import CtaButton from "../components/CtaButton/CtaButton";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";
import { showMessage } from "../components/Alert/AlertPopup";
import { ConvertDateToDisplayFormat } from "../components/Date/DateHelper/DateHelper";

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
  let initialValues = {
        orderInvoice: "",
        customerNumber: "",
        orderItem: [
          { itemName: "", quantity: "", sellingPrice: "", storeId: 0 },
        ],
        customer: {},
        deliveryDate: "",
        bookingDate: "",
        isGst: false,
        isFullyPaid: false,
        staff: {},
      };

  let isEditing = props.match.params.orderId ? true : false;

  let history = useHistory();

  let [customer, setCustomer] = useState({});

  const [showCustomerFields, setshowCustomerFields] = useState(false);

  const [warehouseDict, setWarehouseDict] = useState([]);
  const [items, setItems] = useState([]);
  const [staff, setStaff] = useState([]);
  const [orderDetails, setOrderDetails] = useState({})

  const [isLoading, setIsLoading] = useState(true)

  const [isOrderItemChanged, setIsOrderItemChanged] = useState(false)

  useEffect(() => {
    getItem();
    getStaff();

    if (props.match.params.orderId) {
      getOrderDetails()
    } else {
      setIsLoading(false)
    }

  }, []);

  const getOrderDetails = () => {
    let orderId = props.match.params.orderId;
    setIsLoading(true)
    getCall('orders',{params:{'orderId':orderId}}, true).then((response) => {
      setOrderDetails(response[0])
      setIsLoading(false)
      
    }).catch((reason) => {
      setIsLoading(false)
    });
  }

  const convertOrderDetailsToFormValues = (orderDetails) => {
    return {
      orderInvoice: orderDetails.orderInvoice,
      customerNumber: orderDetails.customer.phone,
      orderItem: orderDetails.orderItem,
      customer: orderDetails.customer,
      deliveryDate: ConvertDateToDisplayFormat(
        orderDetails.deliveryDate
      ),
      bookingDate: ConvertDateToDisplayFormat(
        orderDetails.bookingDate
      ),
      isGst: orderDetails.isGst == 1 ? true:false,
      isFullyPaid: false,
      staff: {
        text: orderDetails.staff.staffName,
        value: orderDetails.staff.staffId,
      },
    }
  }

  function addItem(e, values, setValues) {
    const orderItem = [...values.orderItem];
    orderItem.push({
      itemName: "",
      quantity: "",
      sellingPrice: "",
      storeId: 0,
    });

    setValues({ ...values, orderItem });
    setIsOrderItemChanged(true)
  }

  const getItem = () => {
    getCall("items")
      .then((data) => {
        setItems(data);
      })
      .catch((reason) => {
        console.log("FAILURE!!");
      });
  };

  const getStaff = () => {
    getCall("staffs")
      .then((data) => {
        setStaff(data);
      })
      .catch((reason) => {
        console.log("FAILURE!!");
      });
  };

  function onCustomerNumberEntry(event) {
    getCall("customers", { params: { phone: event.target.value } })
      .then((data) => {
        setCustomer(data[0]);
        initialValues = {
          customerNumber: event.target.value,
          orderItem: initialValues.orderItem,
          customer: customer,
        };
        setshowCustomerFields(true);
      })
      .catch((reason) => {
        alert(reason);
      });
  }
  function onSubmit(fields) {
    // display form field values on success

    let amount = fields.orderItem.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.sellingPrice * currentValue.quantity;
    }, 0);

    if (!fields["isFullyPaid"]) {
      amount = fields["partialPayment"];
    }

    if (fields["checked"] && fields["checked"].includes("isGst")) {
      fields["isGst"] = 1;
    } else {
      fields["isGst"] = 0;
    }
    fields["orderId"] = isEditing
      ? orderDetails.orderId
      : 0;
    fields["salesTransaction"] = [
      {
        transactionId: isEditing ? orderDetails.salesTransaction.transactionId:0,
        orderId: isEditing ? orderDetails.orderId:0,
        amountPaid: amount,
      },
    ];
    fields["staffId"] = isEditing ? fields["staff"].staffId:fields["staff"];
    fields["customerId"] = customer.customerId;
    delete fields["staff"];
    delete fields["partialPayment"];
    delete fields["customer"];
    delete fields["customerNumber"];
    delete fields["checked"];

    if (isEditing) {
      putCall("orders/" + orderDetails.orderId, JSON.stringify(fields, null, 4), true, {params :{flag:1}})
        .then((data) => {
          showMessage(
            "Done!",
            "Invoice added successfully",
            "success",
            "Ok"
          ).then(() => {
            history.push({ pathname: "/pdf/" + data.orderId });
          });
        })
        .catch((reason) => {});
    } else {
      postCall("orders", JSON.stringify(fields, null, 4), true)
        .then((data) => {
          showMessage(
            "Done!",
            "Invoice added successfully",
            "success",
            "Ok"
          ).then(() => {
            history.push({ pathname: "/pdf/" + data.orderId });
          });
        })
        .catch((reason) => {});
    }
  }

  function getWarehouseForItem(name, index) {
    getCall("warehouse", { itemName: name })
      .then((data) => {
        //setWarehouseDict(warehouseDict.push({'value':data[0].id , 'label':data[0].name}))

        setWarehouseDict((oldArray) => [
          ...oldArray,
          data.map((value) => {
            return { value: value.id, label: value.name };
          }),
        ]);
      })
      .catch((reason) => {
        setWarehouseDict((oldArray) => [
          ...oldArray,
          [{ value: "3", label: "test_store_name" }],
        ]);
        console.log("failed to get warehouse for index : " + index);
      });
  }

  function onItemDropDownChange(index, values, setValues, selectedItem) {
    const orderItem = [...values.orderItem];
    orderItem[index].itemName = selectedItem;

    setValues({ ...values, orderItem });
    setIsOrderItemChanged(true)
    //getWarehouseForItem(selectedItem.itemName, index);
  }

  function onStaffDropDownChange(values, setValues, selectedStaff) {
    var staff = values.staff;
    staff = selectedStaff;

    setValues({ ...values, staff });
  }

  function removeItem(index, values, setValues) {
    const orderItem = [...values.orderItem];
    orderItem.splice(index, 1);

    setValues({ ...values, orderItem });
    setIsOrderItemChanged(true)
  }

  function isFullyPaidClicked(e, setValues, values) {
    let isFullyPaid = values.isFullyPaid;
    isFullyPaid = e.target.checked;
    setValues({ ...values, isFullyPaid });
  }

  const validate = (values) => {
    const errors = {};

    if (!values.customerNumber) {
      errors.customerNumber = "Required";
    }

    if (
      values.customerNumber.stringify < 10 ||
      values.customerNumber.stringify > 11
    ) {
      errors.customerNumber = "Enter valid number";
    }

    if (!values.deliveryDate) {
      errors.deliveryDate = "Required";
    }

    if (!values.bookingDate) {
      errors.bookingDate = "Required";
    }

    return errors;
  };

  return (
    <>
    {!isLoading ? <PageTitleContainer title="Create Invoice">
      <Card className="create-invoice-container">
        <Formik
          initialValues={isEditing ? convertOrderDetailsToFormValues(orderDetails):initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validate={validate}
        >
          {({ errors, values, touched, setValues }) => (
            <Form>
              {initialValues.orderInvoice != "" && (
                <div className="form-group">
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
                </div>
              )}
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

              <div>
                {showCustomerFields && (
                  <AddCustomer customer={customer} isInvoice={true} />
                )}
              </div>
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
                    <ErrorMessage
                      name="bookingDate"
                      component="div"
                      className="invalid-feedback"
                    />
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
                    <ErrorMessage
                      name="deliveryDate"
                      component="div"
                      className="invalid-feedback"
                    />
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
                    checked={values.isGst}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                    }}
                  />
                  Is GST Applied
                </label>
              </div>
              <FieldArray name="orderItem">
                {() =>
                  values.orderItem.map((item, i) => {
                    const ticketErrors =
                      (errors.items?.length && errors.items[i]) || {};
                    const ticketTouched =
                      (touched.items?.length && touched.items[i]) || {};
                    return (
                      <div key={i}>
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
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                            }}
                          >
                            <div
                              className="form-group col-6"
                              style={{
                                margin: "1rem 0 1rem 0rem",
                                width: "90%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div style={{ width: "100%", display: "flex" }}>
                                <div style={{ width: "40%", float: "left" }}>
                                  <Dropdown
                                    name={`orderItem.${i}.itemName`}
                                    placeholder="Select Item"
                                    fluid
                                    search
                                    selection
                                    options={ConvertItemsDataToDropdownData(
                                      items
                                    )}
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
                                    name={`orderItem.${i}.itemName`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div style={{ width: "30%" }}>
                                  <label
                                    style={{
                                      margin: "0rem 1rem 0rem 1rem",
                                      width: "30%",
                                    }}
                                  >
                                    Quantity
                                  </label>
                                  <Field
                                    name={`orderItem.${i}.quantity`}
                                    type="text"
                                    style={{ height: "40px", width: "70%" }}
                                  />
                                  <ErrorMessage
                                    name={`orderItem.${i}.quantity`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div style={{ width: "30%" }}>
                                  <label
                                    style={{
                                      width: "30%",
                                      marginRight: "10px",
                                    }}
                                  >
                                    Selling Price
                                  </label>
                                  <Field
                                    name={`orderItem.${i}.sellingPrice`}
                                    type="number"
                                    style={{ height: "40px", width: "70%" }}
                                  />
                                  <ErrorMessage
                                    name={`orderItem.${i}.sellingPrice`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </div>
                              <div
                                style={{ display: "flex", marginTop: "20px" }}
                              ></div>
                            </div>
                            <div style={{ width: "10%", display: "flex" }}>
                              <button
                                className="removeLink"
                                type="button"
                                onClick={(e) =>
                                  removeItem(i, values, setValues)
                                }
                                style={{
                                  margin: "0rem 0rem 0rem 0rem",
                                  textAlign: "center",
                                }}
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
                  name="staff"
                  placeholder="Select Staff"
                  fluid
                  search
                  selection
                  options={ConvertStaffDataToDropdownData(staff)}
                  onChange={(event, data) => {
                    onStaffDropDownChange(values, setValues, data.value);
                  }}
                  defaultValue={values.staff.value}
                />
              </div>
              <div>
                <label>Payments</label>
                <div
                  style={{
                    display: "flex",
                    margin: "1rem 0 1rem 0rem",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
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
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                      onBlur={(e) => isFullyPaidClicked(e, setValues, values)}
                    />
                    Fully Paid
                  </label>
                  {!values.isFullyPaid && (
                    <>
                      <label>Partial Payment</label>
                      <Field
                        name="partialPayment"
                        type="number"
                        style={{
                          height: "40px",
                          width: "30%",
                          marginLeft: "20px",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <StyledDiv
                style={{
                  justifyContent: "center",
                  height: "40px",
                }}
              >
                <CtaButton
                  type="submit"
                  style={{ width: "100px", margin: "0px" }}
                >
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
    </PageTitleContainer>:<div>Loading...</div>
}
</>
  );
}

export default CreateInvoice;
