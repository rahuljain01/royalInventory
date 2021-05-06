import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Image, Item, Divider } from 'semantic-ui-react'

const ItemView = () => {

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('https://api-manager-rf-inventory.azure-api.net/v1/api/Items'
    ).then(function (responseArr) {
      console.log('SUCCESS!!');
      setItems(responseArr.data)
      alert(responseArr.data)
    })
    .catch(function (reason) {
      console.log('FAILURE!!');
      alert(reason)
    });
  }, []);

  return (

  <Item.Group style={{marginLeft : '80px'}}>
    
    {items.map((item, index) => (
      <>
      <Item>
        <Item.Image size='small' src={item.imageUrl }/>

        <Item.Content>
          <Item.Header>{item.itemName}</Item.Header>
          <Item.Meta>
            <span className='price'>{'Quantity: ' + item.quantity+ '    '}</span>
            <span className='stay'>5 orders</span>
            <br/>
            <br/>
            <span style={{color:'#006400', marginTop:'50px'}} className='stay'>20/11/21, </span>
            <span style={{color:'#006400'}} className='stay'>23/11/21, </span>
            <span style={{color:'#006400'}} className='stay'>25/11/21, </span>
            <span style={{color:'#006400'}} className='stay'>28/11/21, </span>
            <span style={{color:'#006400'}} className='stay'>01/12/21, </span>
            <span style={{color:'#006400'}} className='stay'>05/12/21 </span>
            <br/>
            <br/>
            <span style={{color:'#8B0000'}} className='stay'>2 in Pending State </span>
            
          </Item.Meta>
        </Item.Content>
      </Item>
      <Divider horizontal>
        <h1>-</h1>
      </Divider>
    </>
     ))}
  </Item.Group>
  );
  }

export default ItemView