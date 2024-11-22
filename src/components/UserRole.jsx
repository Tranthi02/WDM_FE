import { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { AuthContext } from '../context/auth.context';


const UserRole = () => {

  const { role } = useContext(AuthContext)
  return (
    <div>
      <FaUserTie className="icon" />
      {role && <span className="text">{role.name}</span>}
    </div>
  );
};
export default UserRole;
