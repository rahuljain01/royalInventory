import EditButton from "../Button/EditButton/EditButton";
import DeleteButton from "../Button/DeleteButton/DeleteButton";
import "./TableRow.css";

const TableRow = (props) => {
  const row = props.row;
  return (
    <tr className="table-row">
      {row.map((val) => (
        <td className="table-data">{val}</td>
      ))}
      <div className="table-row-buttons">
        {props.onEditClick && (
          <EditButton
            type="button"
            onClick={() => props.onEditClick(props.index)}
          />
        )}
        {props.onCancelClick && (
          <DeleteButton
            className="table-row-button"
            type="button"
            onClick={() => props.onCancelClick(props.index)}
          >
            cancel
          </DeleteButton>
        )}
      </div>
    </tr>
  );
};

export default TableRow;
