import { useEffect,useState } from "react";
import Card from "../../components/Card/Card";
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import Table from "../../components/Table/Table";
import { getCall } from "../../helper/ApiHelper";
import './StaffList.css'
import { useHistory } from "react-router-dom";

const StaffList = () => {

    let history = useHistory();

    const [staff, setStaff] = useState([]);

    const [filteredStaff, setFilteredStaff] = useState([]);

    const getStaff = () => {
        getCall('staffs').then(function (responseArr) {
            setStaff(responseArr)
            setFilteredStaff(responseArr)
            console.log('SUCCESS!!');
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            alert(reason)
          });
    }

    useEffect(() => {
        getStaff()
      }, []);

      function checkMatchesInStaffList(item, value) {
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
        var filteredList = staff.filter(function (item) {
          return checkMatchesInStaffList(item, event.target.value);
        });
        setFilteredStaff(filteredList);
      };

    const staffData = filteredStaff.map( (staff) => (
        [staff.staffId, staff.staffName, staff.phone, staff.address]
      ))

    const heading = ['Employee Id', 'Name', 'Phone Number', 'Address', 'Designation']

    const onEditClick = (index) => {
        history.push({ pathname: "/addStaff", state: filteredStaff[index] });
        console.log('edit clicked for index: ' + index)
      }

    return (
        <PageTitleContainer title="Staff List">
    
          <div className='staff-search-container'>
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
          <Card className="staff-list-container">
            <Table heading={heading} body={staffData} onEditClick={onEditClick}/>
          </Card>
        </PageTitleContainer>
      );

}

export default StaffList;