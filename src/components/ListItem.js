import { Item } from "semantic-ui-react";
import "./ListItem.css";

const ListItem = (props) => {
  const item = props.item;
  const orderDates = ['20/11/21','23/11/21','25/11/21','28/11/21','01/12/21' ]

  const orderDateText = 'Order dates: ' + orderDates.reduce((value,item) => value + ', ' + item, '')

  return (
    <div className="pending-item">
      <Item.Image size="small" src={item.imageUrl} />

      <div className="item-info">
        <h1>{item.itemName}</h1>
        <div>
          <span className="price">{"Quantity: " + item.quantity + "    "}</span>
          <br />

          <span
            style={{ color: "#006400", marginTop: "50px" }}
            className="stay"
          >
            {orderDateText}
          </span>
          <br />
          <span style={{ color: "#8B0000" }} className="stay">
            2 in Pending State{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
