import "./EditButton.css";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";

const EditButton = (props) => {
  return (
    <IconContext.Provider value={{ color: "#000" }}>
      <button className="link-button" type={props.type} onClick={props.onClick}>
        <FaIcons.FaEdit />
      </button>
    </IconContext.Provider>
  );
};

export default EditButton;
