import React from 'react';
import MyEnhancedForm from './AddItem'
import styled from 'styled-components';

const ModalDiv = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);

`;

const ModalContentDiv = styled.div`

  background-color: white;
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid black;

`;

const AddItemModal = () => {

    return (
      <ModalDiv>
        <ModalContentDiv>
          <MyEnhancedForm />
      </ModalContentDiv>
      </ModalDiv>
    );
  };

  export default AddItemModal;