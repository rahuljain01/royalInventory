import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card/Card";
import FilterButton from "../../components/FilterButton/FilterButton";
import Table from "../../components/Table/Table";
import "./PurchaseList.css";
import DateInput from '../../components/DateInput/DateInput'
import LinkButton from "../../components/Button/LinkButton/LinkButton";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import { getCall } from "../../helper/ApiHelper";

var heading = ['Purchase Id', 'Business Name', 'Amount', 'Purchase Date'];

const PurchaseList = () => {
  const [purchase, setPurchase] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [isTodaySelected, setIsTodaySelected] = useState(false)
  const [isYesterdaySelected, setIsYesterdaySelected] = useState(false)

  let history = useHistory();

  var filterFromDate
  var filterToDate

  useEffect(() => {
    getCall('purchases').then(function (responseArr) {
        console.log("SUCCESS!!");
        setPurchase(responseArr);
        setFilteredPurchase(responseArr)
      })
      .catch(function (reason) {
        console.log("FAILURE!!");
        alert(reason);
      });
  }, []);

  const onEditClick = (index) => {
    history.push({ pathname: "/createPurchase", state: purchase[index] });
    console.log('edit clicked for index: ' + index)
  }
  const onCancelClick = (index) => {

  }

  function checkMatchesInInvoiceList(item, value) {
    var ifTrue = false;
    Object.keys(item).forEach((key) => {
        if (item[key] != null) {
            if (               
              item[key].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
            ) {
              ifTrue = true;
            }
          }
    });

    return ifTrue;
  }

  const handleSearchChange = (event) => {
    var filteredList = purchase.filter(function (item) {
      return checkMatchesInInvoiceList(item, event.target.value);
    });
    setFilteredPurchase(filteredList);
  };

  const convertDateToDisplayFormat = (date) => {
    let givenDate = new Date(date)
    return givenDate.toLocaleDateString("en-US")
  }

  const purchaseData = filteredPurchase.map( (purchaseObject) => (
    [purchaseObject.purchaseId, purchaseObject.vendor.vendorName, purchaseObject.amount, convertDateToDisplayFormat(purchaseObject.purchaseDate)]
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
      var filteredList = purchaseData.filter(function (item) {
        return checkBetweenDateRange(new Date(filterToDate),new Date(filterFromDate), new Date(item.bookingDate));
      });
      setFilteredPurchase(filteredList);
    }
  }

  const onTodayClick = () => {
    var filteredList = purchase.filter(function (item) {
      let todayDate = new Date()
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(true)
    setIsYesterdaySelected(false)
    setFilteredPurchase(filteredList);
  }

  const onYesterdayClick = () => {
    var filteredList = purchase.filter(function (item) {
      let todayDate = new Date()
      todayDate.setDate(todayDate.getDate() - 1)
      let bookingDate = new Date(item.bookingDate)
      return compareDate(todayDate, bookingDate);
    });
    setIsTodaySelected(false)
    setIsYesterdaySelected(true)
    setFilteredPurchase(filteredList);
  }

  const onClearFilterClick = () => {
    setIsTodaySelected(false)
    setIsYesterdaySelected(false)
    setPurchase(purchase)
  }

  return (
    <PageTitleContainer title="Purchase List">

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
      <Card className="purchase-list-container">
        <Table heading={heading} body={purchaseData} onEditClick={onEditClick} onCancelClick={onCancelClick}/>
      </Card>
    </PageTitleContainer>
  );
};

export default PurchaseList;
