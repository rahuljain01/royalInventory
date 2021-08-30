import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import SubMenuButton from './SubMenuButton';
import { logout } from '../store/auth-api';


const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  top:0;
  left:0;
  justify-content: flex-start;
  align-items: center;
  position:fixed;
  width:100%;
  z-index:200;
`;

const TitleDiv = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
`;

const Label = styled.label`
  font-size: 1.5rem;
  display: block;
  color: white;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y:scroll;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const history = useHistory()

  const onLogout = () => {
    props.onLogout();
    history.push('/login');
    
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <TitleDiv> <Label>Royal Furniture</Label> </TitleDiv>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            <SubMenuButton clickHandler={() => {logout(onLogout)}} title='Logout'/>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
