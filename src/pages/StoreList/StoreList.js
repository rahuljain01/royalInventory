import { useEffect,useState } from "react";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './StoreList.css'
import { useHistory } from "react-router-dom";

const StoreList = () => {

    let history = useHistory();

    const [store, setStore] = useState([]);

    const [filteredStore, setFilteredStore] = useState([]);

    const getStore = () => {
        getCall('stores').then(function (responseArr) {
            setStore(responseArr)
            setFilteredStore(responseArr)
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }

    useEffect(() => {
        getStore()
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
        var filteredList = store.filter(function (item) {
          return checkMatchesInCustomerList(item, event.target.value);
        });
        setFilteredStore(filteredList);
      };

    const storeData = filteredStore.map( (store) => (
        [store.storeId,store.storeName, store.address]
      ))

    const heading = ['Store Id', 'Name', 'Address']

    const onEditClick = (index) => {
        history.push({ pathname: "/addStore", state: filteredStore[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Store List">
    
          <div className='store-search-container'>
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
          <Card className="store-list-container">
            <Table heading={heading} body={storeData} onEditClick={onEditClick}/>
          </Card>
        </PageTitleContainer>
      );

}

export default StoreList;