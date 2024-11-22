import { useContext } from 'react';
import links from '../utils/navLinks';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const NavLinks = () => {

  const { permissionList } = useContext(AuthContext)
  const permissionFilter = (links) => {

    const result = links.filter(link => permissionList.some(permission => permission.page === link.page) )
    return result
  }
  return (
    <div className="nav-links">
      {permissionFilter(links).map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink to={path} key={text} className="nav-link" end>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
