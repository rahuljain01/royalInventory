import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card/Card";
import FilterButton from "../components/FilterButton/FilterButton";
import "./InvoiceList.css";
import DateInput from '../components/DateInput/DateInput'
import LinkButton from "../components/Button/LinkButton/LinkButton";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";
import { getCall,putCall } from "../helper/ApiHelper";
import InvoiceTable from "../components/Invoice/InvoiceTable";
import { showMessageWithMultipleButton } from '../components/Alert/AlertPopup';


var heading = ['Invoice Id', 'Name', 'Amount', 'Invoice Date', 'Delivery Date', 'Status'];

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isTodaySelected, setIsTodaySelected] = useState(false)
  const [isYesterdaySelected, setIsYesterdaySelected] = useState(false)

  let history = useHistory();

  var filterFromDate
  var filterToDate

  useEffect(() => {

    getCall('orders')
      .then(function (responseArr) {
        console.log("SUCCESS!!");
        setInvoices(responseArr);
        setFilteredInvoices(responseArr);
      })
      .catch(function (reason) {
        setInvoices(invoices);
        console.log("FAILURE!!");
        alert(reason);
      });
  }, []);

  const onEditClick = (index) => {
    history.push({ pathname: "/createInvoice/" + invoices[index].orderId});
    console.log('edit clicked for index: ' + index)
  }
  const onCancelClick = (index) => {

  }

  const onStatusSelection = (index, status , resetDropdown) => {

    const statusDict = {'Pending':'p', 'Delivered':'d', 'Cencel':'c'}

    showMessageWithMultipleButton('Do you really want to change order status?', {
      buttons: {
        cancel: 'cancel',
        Yes: true,
      },
    }).then((value) => {
      if (value) {
        let invoice = filteredInvoices[index]
        invoice.status = statusDict[status]
        putCall('orders/' + filteredInvoices[index].orderId,invoice).then(function (responseArr) {
          console.log("SUCCESS!!");
        })
        .catch(function (reason) {
          alert(reason);
        });
      } else {
        resetDropdown()
      }

    })
    
  }

  function checkMatchesIninvoices(item, value) {
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
    var filteredList = invoices.filter(function (item) {
      return checkMatchesIninvoices(item, event.target.value);
    });
    setFilteredInvoices(filteredList);
  };

  const convertDateToDisplayFormat = (date) => {
    let givenDate = new Date(date)
    return givenDate.toLocaleDateString("en-US")
  }

  const invoiceData = invoices.map( (invoice) => (
    [invoice.orderId, invoice.customer.customerName, invoice.amount, convertDateToDisplayFormat(invoice.bookingDate), convertDateToDisplayFormat(invoice.deliveryDate)]
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
      var filteredList = invoices.filter(function (item) {
        return checkBetweenDateRange(new Date(filterToDate),new Date(filterFromDate), new Date(item.bookingDate));
      });
      setFilteredInvoices(filteredList);
    }
  }

  const onTodayClick = () => {
    var filteredList = invoices.filter(function (item) {
      let todayDate = new Date()
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(true)
    setIsYesterdaySelected(false)
    setFilteredInvoices(filteredList);
  }

  const onYesterdayClick = () => {
    var filteredList = invoices.filter(function (item) {
      let todayDate = new Date()
      todayDate.setDate(todayDate.getDate() - 1)
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(false)
    setIsYesterdaySelected(true)
    setFilteredInvoices(filteredList);
  }

  const onClearFilterClick = () => {
    setIsTodaySelected(false)
    setIsYesterdaySelected(false)
    setInvoices(invoices)
  }

  const status = invoices.map( (invoice) => (
    invoice.status
  ))
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
        <InvoiceTable heading={heading} body={invoiceData} onEditClick={onEditClick} onCancelClick={onCancelClick} status={status} onStatusSelection={onStatusSelection}/>
      </Card>

      {/* <Card className="invoice-container">
        {invoiceData.map((invoice, index) => (
          <InvoiceItem onClick={() => handleClick(index)} invoice={invoice} />
        ))}
      </Card> */}
    </PageTitleContainer>
  );
};

export default InvoicesList;
