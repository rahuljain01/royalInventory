import React from 'react';
import styled from 'styled-components';

const SidebarButton = styled.button`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  background: transparent;
  border: 0px;
  width: 100%;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenuButton = (props) => {

  return (
    <>
      <SidebarButton onClick={props.clickHandler}>
        <div>
          <SidebarLabel>{props.title}</SidebarLabel>
        </div>
      </SidebarButton>
    </>
  );
};

export default SubMenuButton;