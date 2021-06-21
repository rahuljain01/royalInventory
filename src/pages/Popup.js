import React, { Component, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import MyEnhancedForm from "./AddItem/AddItem";
import "./Popup.css";

// const customStyles = {
//     content : {
//       top                   : '50%',
//       left                  : '50%',
//       right                 : 'auto',
//       bottom                : 'auto',
//       marginRight           : '-50%',
//       transform             : 'translate(-50%, -50%)'
//     }
//   };

Modal.setAppElement("#root");
function PopUp(props) {
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    props.onClose(false);
  }
  return (
    <Modal
      isOpen={props.shouldShowPopup}
      scrollable={true}
      onAfterOpen={() => {}}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className="scroll-component">
        <div className="scroll-content">
          <MyEnhancedForm />
        </div>
      </div>
    </Modal>
  );
}

export default PopUp;
