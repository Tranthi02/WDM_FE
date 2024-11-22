import { Link } from 'react-router-dom';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/SidebarWrapper';
import { UserRole, NavLinks } from '../components';
import styled from 'styled-components';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);

  const handleClickLogoutBtn = () => {
    logOut();
  };

  return (
    <Wrapper>
      <header>
        <Link to=".">
          <Logo />
        </Link>
      </header>
      <NavLinks />
      <div className="role">
        <UserRole />
        <LogoutBtn onClick={handleClickLogoutBtn}>Logout</LogoutBtn>
      </div>
    </Wrapper>
  );
};
export default Sidebar;

const LogoutBtn = styled.button`
  background-color: #1d00ff;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    background-color: #483e95;
  }
`;
