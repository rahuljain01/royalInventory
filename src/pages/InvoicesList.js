import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card/Card";
import FilterButton from "../components/FilterButton/FilterButton";
import InvoiceItem from "../components/Invoice/InvoiceItem";
import Table from "../components/Table/Table";
import "./InvoiceList.css";
import DateInput from '../components/DateInput/DateInput'
import LinkButton from "../components/Button/LinkButton/LinkButton";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";

let invoiceList = [
  {
    OrderId: "1",
    invoiceNumber: "1",
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
    invoiceNumber: "2",
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
    bookingDate: "2021-07-12T17:16:40",
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
    invoiceNumber: "3",
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
    bookingDate: "2021-07-13T17:16:40",
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

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isTodaySelected, setIsTodaySelected] = useState(false)
  const [isYesterdaySelected, setIsYesterdaySelected] = useState(false)

  let history = useHistory();

  var filterFromDate
  var filterToDate

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

  const onEditClick = (index) => {
    history.push({ pathname: "/createInvoice", state: invoices[index] });
    console.log('edit clicked for index: ' + index)
  }
  const onCancelClick = (index) => {

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

  const convertDateToDisplayFormat = (date) => {
    let givenDate = new Date(date)
    return givenDate.toLocaleDateString("en-US")
  }

  const invoiceData = invoices.map( (invoice) => (
    [invoice.invoiceNumber, invoice.customerName, invoice.amount, convertDateToDisplayFormat(invoice.bookingDate), convertDateToDisplayFormat(invoice.deliveryDate)]
  ))

  const compareDate = (firstDate, secondDate) => {
    return firstDate.getDay() == secondDate.getDay() && firstDate.getMonth() == secondDate.getMonth() && firstDate.getYear() == secondDate.getYear();
  }

  const checkBetweenDateRange = (to, from , checkingDate) => {
    if((checkingDate <= to && checkingDate >= from)) {
      return true
    }
  }
    

  const fromDateSelected = (event) => {
    filterFromDate = event.target.value
  }

  const toDateSelected = (event) => {
    
    filterToDate = event.target.value
    console.log('to date selected')
    if (filterFromDate != null) {
      var filteredList = invoiceList.filter(function (item) {
        return checkBetweenDateRange(new Date(filterToDate),new Date(filterFromDate), new Date(item.bookingDate));
      });
      setInvoices(filteredList);
    }
  }

  const onTodayClick = () => {
    var filteredList = invoiceList.filter(function (item) {
      let todayDate = new Date()
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(true)
    setIsYesterdaySelected(false)
    setInvoices(filteredList);
  }

  const onYesterdayClick = () => {
    var filteredList = invoiceList.filter(function (item) {
      let todayDate = new Date()
      todayDate.setDate(todayDate.getDate() - 1)
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(false)
    setIsYesterdaySelected(true)
    setInvoices(filteredList);
  }

  const onClearFilterClick = () => {
    setIsTodaySelected(false)
    setIsYesterdaySelected(false)
    setInvoices(invoiceList)
  }

  return (
    <PageTitleContainer title="Invoice List">

      <div className='search-container'>
        <input
          id="invoiceSearchKey"
          name="invoiceSearchKey"
          type="text"
          placeholder="   Search"
          onChange={handleSearchChange}
          style={{
            margin: "0rem 0rem 1rem 80px",
            width: "60%",
            height: "40px",
            border: "1px solid",
            borderRadius: "20px",
          }}
        />
      </div>
      <div style={{
        display:'flex',
            margin: "0rem 0rem 0rem 0rem",
            justifyContent:"center",
          }}>
            <FilterButton isSelected={isTodaySelected} onClick={onTodayClick}>Today</FilterButton>
            <FilterButton isSelected={isYesterdaySelected} onClick={onYesterdayClick}>Yesterday</FilterButton>
            <DateInput placeholder={'From:'} onChange={fromDateSelected}></DateInput>
            <DateInput placeholder={'To:'} onChange={toDateSelected}></DateInput>
            <LinkButton type="button"
                              onClick={onClearFilterClick}
                            >
                              Clear filter
                            </LinkButton>
        </div>
      <Card className="invoice-container">
        <Table heading={heading} body={invoiceData} onEditClick={onEditClick} onCancelClick={onCancelClick}/>
      </Card>

      {/* <Card className="invoice-container">
        {invoiceData.map((invoice, index) => (
          <InvoiceItem onClick={() => handleClick(index)} invoice={invoice} />
        ))}
      </Card> */}
    </PageTitleContainer>
  );
};

export default InvoiceList;
