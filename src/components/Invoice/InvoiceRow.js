import EditButton from "../Button/EditButton/EditButton";
import DeleteButton from "../Button/DeleteButton/DeleteButton";
import "../Table/TableRow.css";
import { Dropdown } from "semantic-ui-react";
import {useState} from 'react';

const InvoiceRow = (props) => {
  const row = props.row;
  const index = props.index;

let [statusValue, setStatusValue] = useState(props.status)

const resetDropdown = () => {
    setStatusValue(props.status)
}

const statusDict = {'Pending':'p', 'Delivered':'d', 'Cencel':'c'}

const onDropdownChange = (event) => {
    setStatusValue(statusDict[event.target.textContent])
    props.onStatusSelection(index, event.target.textContent, resetDropdown)
}
  return (
    <tr className="table-row">
      {row.map((val) => (
        <td className="table-data">{val}</td>
      ))}
      <td className="table-data">
        <Dropdown
          name='status'
          placeholder="Select Status"
          fluid
          search
          selection
          options={props.statusOptions}
          onChange={onDropdownChange}
          defaultValue={props.status}
          value={statusValue}
        />
      </td>
      <div className="table-row-buttons">
        {(statusValue == 'p' && props.onEditClick) && (
          <EditButton
            type="button"
            onClick={() => props.onEditClick(props.index)}
          />
        )}
      </div>
    </tr>
  );
};

export default InvoiceRow;
