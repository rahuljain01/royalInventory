import { useEffect,useState } from "react";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './CategoryList.css'
import { useHistory } from "react-router-dom";

const CategoryList = () => {

    let history = useHistory();

    const [category, setCategory] = useState([]);

    const [filteredCategory, setFilteredCategory] = useState([]);

    const getCategory = () => {
        getCall('categories').then(function (responseArr) {
            setCategory(responseArr)
            setFilteredCategory(responseArr)
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }

    useEffect(() => {
        getCategory()
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
        var filteredList = category.filter(function (item) {
          return checkMatchesInCustomerList(item, event.target.value);
        });
        setFilteredCategory(filteredList);
      };

    const categoryData = filteredCategory.map( (category) => (
        [category.categoryId, category.categoryName]
      ))

    const heading = ['Category Id', 'Name']

    const onEditClick = (index) => {
        history.push({ pathname: "/addCategory", state: filteredCategory[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Category List">
    
          <div className='category-search-container'>
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
          <Card className="category-list-container">
            <Table heading={heading} body={categoryData}/>
          </Card>
        </PageTitleContainer>
      );

}

export default CategoryList;