import React, { useState } from 'react';
//import onClickOutside from 'react-onclickoutside';
import { Image, Item } from 'semantic-ui-react'
import './ItemListDropdown.css'

function ItemListDropdown({ title, items, multiSelect = false }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  const [query, setQuery] = useState("");
 // ItemListDropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  function filter(options) {
      return options.filter(
          (option) => 
            option['itemName'].toLowerCase().indexOf(query.toLowerCase()) > -1
      );
  }

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        role="button"
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <input type='text' onChange={
              e => {
                  setQuery(e.target.value)
              }
          } placeholder={title}></input>
        </div>
        <div className="dd-header__action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {filter(items).map(item => (
            <li className="dd-list-item" key={item.id}>
              <Item >
                    <Item.Image size='tiny' src={item.imageUrl }/>
                    <Item.Content>
                    <Item.Header>{item.itemName}</Item.Header>
                    </Item.Content>
                </Item>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



// const clickOutsideConfig = {
//   handleClickOutside: () => ItemListDropdown.handleClickOutside,
// };

// export default onClickOutside(ItemListDropdown, clickOutsideConfig);

export default ItemListDropdown;