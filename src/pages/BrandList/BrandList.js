import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './BrandList.css'
import { useHistory } from "react-router-dom";

const BrandList = () => {

    let history = useHistory();

    const [brand, setBrand] = useState([]);

    const [filteredBrand, setFilteredBrand] = useState([]);

    const getBrand = () => {
        getCall('brands').then(function (responseArr) {
            setBrand(responseArr)
            setFilteredBrand(responseArr)
          })
          .catch(function (reason) {
            alert(reason)
          });
    }

    useEffect(() => {
        getBrand()
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
        var filteredList = brand.filter(function (item) {
          return checkMatchesInCustomerList(item, event.target.value);
        });
        setFilteredBrand(filteredList);
      };

    const brandData = filteredBrand.map( (brand) => (
        [brand.brandId, brand.brandName]
      ))

    const heading = ['Brand Id', 'Name']

    const onEditClick = (index) => {
        history.push({ pathname: "/addBrand", state: filteredBrand[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Brand List">
    
          <div className='brand-search-container'>
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
          <Card className="brand-list-container">
            <Table heading={heading} body={brandData}/>
          </Card>
        </PageTitleContainer>
      );

}

export default BrandList;