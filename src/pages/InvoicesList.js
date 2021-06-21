import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card/Card";
import InvoiceItem from "../components/Invoice/InvoiceItem";
import Table from "../components/Table/Table";
import "./InvoiceList.css";

let invoiceList = [
  {
    OrderId: "1",
    invoiceId: "1",
    customerId: "8126767579",
    customerName: "Rahul Jain",
    amount: 5000,
    tax: [
      {
        label: "sgst",
        value: 400,
      },
      {
        label: "cgst",
        value: 400,
      },
    ],
    DiscountPercent: 15,
    bookingDate: "2019-01-06T17:16:40",
    deliveryDate: "2019-01-12T17:16:40",
    Remarks: "Paid through paytm",
    advancePaid: 2000,
    items: [
      {
        itemName: "item2",
        quantity: 3,
        sellingPrice: 5000,
      },
      {
        itemName: "item1",
        quantity: 5,
        sellingPrice: 10000,
      },
    ],
  },
  {
    OrderId: "1",
    invoiceId: "2",
    customerId: "8126767579",
    customerName: "Arpit jain",
    amount: 5000,
    tax: [
      {
        label: "sgst",
        value: 400,
      },
      {
        label: "cgst",
        value: 400,
      },
    ],
    DiscountPercent: 15,
    bookingDate: "2019-01-06T17:16:40",
    deliveryDate: "2019-01-12T17:16:40",
    Remarks: "Paid through paytm",
    advancePaid: 2000,
    items: [
      {
        itemName: "item14",
        quantity: 3,
        sellingPrice: 5000,
      },
      {
        itemName: "item14",
        quantity: 3,
        sellingPrice: 5000,
      },
    ],
  },
  {
    OrderId: "1",
    invoiceId: "3",
    customerId: "8126767579",
    customerName: "Priyanka Jain",
    amount: 5000,
    tax: [
      {
        label: "sgst",
        value: 400,
      },
      {
        label: "cgst",
        value: 400,
      },
    ],
    DiscountPercent: 15,
    bookingDate: "2019-01-06T17:16:40",
    deliveryDate: "2019-01-12T17:16:40",
    Remarks: "Paid through paytm",
    advancePaid: 2000,
    items: [
      {
        itemName: "item14",
        quantity: 3,
        sellingPrice: 5000,
      },
    ],
  },
];

var heading = ['Invoice Id', 'Name', 'Amount', 'Invoice Date', 'Delivery Date'];
        var body =
            [['#1','Rahul', '5000', '2019-01-06T17:16:40','2019-01-06T17:16:40'],
            ['#2','priyanka', '5000', '2019-01-06T17:16:40','2019-01-06T17:16:40'],
            ['#3','Rahul', '5000', '2019-01-06T17:16:40','2019-01-06T17:16:40'],
            ['#4','Rahul', '5000', '2019-01-06T17:16:40','2019-01-06T17:16:40']
            ];

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios
      .get("https://api-manager-rf-inventory.azure-api.net/v1/api/Items")
      .then(function (responseArr) {
        console.log("SUCCESS!!");
        setInvoices(invoiceList);
        alert(responseArr.data);
      })
      .catch(function (reason) {
        setInvoices(invoiceList);
        console.log("FAILURE!!");
        alert(reason);
      });
  }, []);

  function handleClick(index) {
    history.push({ pathname: "/createInvoice", state: invoices[index] });
  }

  function checkMatchesInInvoiceList(item, value) {
    var ifTrue = false;
    Object.keys(item).forEach((key) => {
      if (
        item[key].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
      ) {
        ifTrue = true;
      }
    });

    return ifTrue;
  }

  const handleSearchChange = (event) => {
    var filteredList = invoiceList.filter(function (item) {
      return checkMatchesInInvoiceList(item, event.target.value);
    });
    setInvoices(filteredList);
  };

  const invoiceData = invoices.map( (invoice) => (
    [invoice.invoiceId, invoice.customerName, invoice.amount, invoice.bookingDate, invoice.deliveryDate]
  ))

  return (
    <>

      <div className='search-container'>
        <input
          id="invoiceSearchKey"
          name="invoiceSearchKey"
          type="text"
          placeholder="   Search"
          onChange={handleSearchChange}
          style={{
            margin: "7rem 20rem 1rem 80px",
            width: "70%",
            height: "40px",
            border: "1px solid",
            borderRadius: "20px",
          }}
        />
      </div>
      <Card className="invoice-container">
        <Table heading={heading} body={invoiceData} />
      </Card>

      {/* <Card className="invoice-container">
        {invoiceData.map((invoice, index) => (
          <InvoiceItem onClick={() => handleClick(index)} invoice={invoice} />
        ))}
      </Card> */}
    </>
  );
};

export default InvoiceList;
