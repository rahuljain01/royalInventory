import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './CustomerList.css'
import { useHistory } from "react-router-dom";

const CustomerList = () => {

    let history = useHistory();

    const [customers, setCustomers] = useState([]);

    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const getCustomer = () => {
        getCall('customers').then(function (responseArr) {
            setCustomers(responseArr)
            setFilteredCustomers(responseArr)
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }

    useEffect(() => {
        getCustomer()
      }, []);

      function checkMatchesInCustomerList(item, value) {
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
        var filteredList = customers.filter(function (item) {
          return checkMatchesInCustomerList(item, event.target.value);
        });
        setFilteredCustomers(filteredList);
      };

    const customerData = filteredCustomers.map( (customer) => (
        [customer.customerId, customer.customerName, customer.phone, customer.address]
      ))

    const heading = ['Customer Id', 'Name', 'Phone Number', 'Address']

    const onEditClick = (index) => {
        history.push({ pathname: "/addCustomer", state: filteredCustomers[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Customer List">
    
          <div className='customer-search-container'>
            <input
              id="invoiceSearchKey"
              name="invoiceSearchKey"
              type="text"
              placeholder="   Search"
              onChange={handleSearchChange}
              style={{
                margin: "0rem 0rem 1rem 0px",
                width: "60%",
                height: "40px",
                border: "1px solid",
                borderRadius: "20px",
              }}
            />
          </div>
          <Card className="customer-list-container">
            <Table heading={heading} body={customerData} onEditClick={onEditClick}/>
          </Card>
        </PageTitleContainer>
      );

}

export default CustomerList;