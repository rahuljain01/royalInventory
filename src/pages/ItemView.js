import axios from "axios";
import React, { useEffect, useState } from "react";
import { Item } from "semantic-ui-react";
import Card from "../components/Card/Card";
import ListItem from "../components/ListItem";
import "../components/ListItem.css";
import "./ItemView.css";
import { useHistory } from "react-router-dom";
import PageTitleContainer from "../components/PageTitleContainer/PageTitleContainer";
import { config } from "../config/Config";

const ItemView = () => {
  const [items, setItems] = useState([]);

  const [filteredItem, setFilteredItem] = useState([]);

  let history = useHistory();

  useEffect(() => {
    
    axios
      .get(config.baseUrl + 'items')
      .then(function (responseArr) {
        console.log("SUCCESS!!");
        setItems(responseArr.data);
        setFilteredItem(responseArr.data)
      })
      .catch(function (reason) {
        console.log("FAILURE!!");
        alert(reason);
      });
  }, []);

  const filterItem = (event) => {
     setFilteredItem(items.filter(item => {return item.itemName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1})) 
  }

  const onItemClick = (index) => {
    history.push({ pathname: "/addItem", state: filteredItem[index] });
  }

  return (
    <PageTitleContainer title='Item List'>
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
          <ListItem item={item} index={index} onClick={onItemClick}/>
        </>
      ))}
    </Card>
    </PageTitleContainer>
  );
};

export default ItemView;
