import { Image, Item, Divider } from "semantic-ui-react";
import './InvoiceItem.css'

const InvoiceItem = (props) => {
  return (
    <div className="invoice-item-container">
      <Item onClick={props.handleClick}>
        <Item.Content>
          <Item.Header>{"Invoice No: #" + props.invoice.invoiceId}</Item.Header>
          <Item.Meta>
            <span className="price" style={{ fontWeight: "bold" }}>
              {"Name: " + props.invoice.customerName + "    "}
            </span>
            <span
              className="price"
              style={{ fontWeight: "bold", marginLeft: "50px" }}
            >
              {"Amount: " + props.invoice.amount + "    "}
            </span>
            <span
              className="price"
              style={{ fontWeight: "bold", marginLeft: "50px" }}
            >
              {"Invoice Date: " + props.invoice.bookingDate + "    "}
            </span>
            <span
              className="price"
              style={{ fontWeight: "bold", marginLeft: "50px" }}
            >
              {"Delivery Date: " + props.invoice.deliveryDate + "    "}
            </span>
          </Item.Meta>
        </Item.Content>
      </Item>
    </div>
  );
};

export default InvoiceItem;
