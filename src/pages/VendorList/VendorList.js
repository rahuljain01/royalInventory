import { useEffect,useState } from "react";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './VendorList.css'
import { useHistory } from "react-router-dom";

const VendorList = () => {

    let history = useHistory();

    const [vendor, setVendor] = useState([]);

    const [filteredVendor, setFilteredVendor] = useState([]);

    const getVendors = () => {
        getCall('vendors').then(function (responseArr) {
            setVendor(responseArr)
            setFilteredVendor(responseArr)
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }

    useEffect(() => {
        getVendors()
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
        var filteredList = vendor.filter(function (item) {
          return checkMatchesInCustomerList(item, event.target.value);
        });
        setFilteredVendor(filteredList);
      };

    const vendorData = filteredVendor.map( (vendor) => (
        [vendor.vendorId, vendor.vendorName, vendor.phone, vendor.address,vendor.gstnumber, vendor.email ]
      ))

    const heading = ['vendor Id', 'Name', 'Phone Number', 'Address', 'GST No','Email']

    const onEditClick = (index) => {
        history.push({ pathname: "/addVendor", state: filteredVendor[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Vendor List">
    
          <div className='vendor-search-container'>
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
          <Card className="vendor-list-container">
            <Table heading={heading} body={vendorData} onEditClick={onEditClick}/>
          </Card>
        </PageTitleContainer>
      );

}

export default VendorList;