import axios from "axios";
import React, { useEffect, useState } from "react";
import { Item } from "semantic-ui-react";
import Card from "../components/Card/Card";
import ListItem from "../components/ListItem";
import "../components/ListItem.css";
import "./ItemView.css";

const ItemView = () => {
  const [items, setItems] = useState([]);

  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-manager-rf-inventory.azure-api.net/v1/api/Items")
      .then(function (responseArr) {
        console.log("SUCCESS!!");
        setItems(responseArr.data);
      })
      .catch(function (reason) {
        console.log("FAILURE!!");
        alert(reason);
      });
  }, []);

  const filterItem = (event) => {
     setFilteredItem(items.filter(item => {return item.itemName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1})) 
  }

  return (
    <>
    <div className='background-div'></div>
    <div className='search-div'><input 
            id="itemName"
            name="itemName"
            type="text"
            placeholder='   Search'
            onChange={filterItem}
            onBlur={() => {}} /></div>
    <Card className="item-view-container">
      {filteredItem.map((item, index) => (
        <>
          <ListItem item={item} />
        </>
      ))}
    </Card>
    </>
  );
};

export default ItemView;
