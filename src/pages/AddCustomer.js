import React, { useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import Card from "../components/Card/Card";
import CtaButton from "../components/CtaButton/CtaButton";
import "./AddCustomer.css";
import { postCall, putCall } from "../helper/ApiHelper";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";
import { useState } from "react";
import swal from 'sweetalert';
import { showMessage } from "../components/Alert/AlertPopup";


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
  width: 100%;
  justify-content: flex-start;
`;

const InputTextArea = styled.textarea`
  font-size: 1rem;
  height: 80px;
  width: 100%;
  justify-content: flex-start;
`;

const InputSelect = styled.select`
  margin-bottom: 1rem;
  font-size: 1rem;
  height: 40px;
  width: 100%;
  justify-content: flex-start;
`;

const validate = (values) => {
  const errors = {};

  if (!values.customerName) {
    errors.customerName = "Required";
  } else if (values.customerName.length > 15) {
    errors.customerName = "Must be 15 characters or less";
  }

  return errors;
};

const AddCustomer = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isInInvoice, setIsInInvoice] = useState(false);

  useEffect(() => {
    if (props.location == undefined && !props.customer) {
      setIsEditing(false)
    }  else if (props.customer){
      setIsEditing(true)
    } else if (props.location.state){
      setIsEditing(true)
    }
    props.isInvoice ? setIsInInvoice(true) : setIsInInvoice(false);
  }, []);

  

  const submitForm = (values) => {
    if (isEditing) {
      putCall("customers", values)
        .then((data) => {
          console.log("successfully posted invoice");
          
        })
        .catch((reason) => {
          console.log("failed in posting invoice");
          showMessage("OOPS!",
          "Something Went Wrong!!",
          "error",
          "Ok")
        });
      alert(JSON.stringify(values, null, 2));
    } else {
      values["customerId"] = "1";
      postCall("customers", values)
        .then((data) => {
          console.log("successfully posted invoice");
          showMessage("Done!",
          "Customer added successfully",
          "success",
          "Ok")
        })
        .catch((reason) => {
          console.log("failed in posting invoice");
          showMessage("OOPS!",
          "Something Went Wrong!!",
          "error",
          "Ok")
        });
      alert(JSON.stringify(values, null, 2));
    }
  }

  const formik = useFormik({
    initialValues: props.customer
      ? props.customer
      : {
          customerName: "",
          phone: 0,
          address: "",
          email: "",
          gstNumber: "",
        },
    validate,
    enableReinitialize: false,
    onSubmit: submitForm,
  });

  const containerClass = isInInvoice
    ? "customer-invoice-container"
    : "customer-container";

let customerForm = {}

  return (
    <PageTitleContainer title={isInInvoice ? "":"Add Customer"}>
      <Card className={containerClass}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div>
            <InputLabel>Customer Name:</InputLabel>
            <InputText
              id="customerName"
              name="customerName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customerName}
            />
            {formik.errors.customerName ? (
              <div style={{ color: "red" }}>{formik.errors.customerName}</div>
            ) : null}
          </div>
          <div>
            <InputLabel>Phone Number:</InputLabel>
            <InputText
              id="phone"
              name="phone"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
          </div>

          <div>
            <InputLabel>Address:</InputLabel>
            <InputTextArea
              id="address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
          </div>
          <div>
            <InputLabel>GST no:</InputLabel>
            <InputText
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              style={{ marginBottom: "2rem" }}
            />
          </div>
          <CtaButton type={isInInvoice ? 'button':'submit'} onClick={() => {submitForm(formik.values)}}>
            {isEditing ? "EDIT" : "ADD"}
          </CtaButton>
        </form>
      </Card>
    </PageTitleContainer>
  );
};

export default AddCustomer;
