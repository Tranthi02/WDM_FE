import { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = (p) => {
  const { children } = p
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState({});
  const [permissionList, setPermissionList] = useState([]);
  const [isLoad, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role);
        setPermissionList(decoded.permissionList);
        if(decoded.permissionList.length === 0) {
          logOut()
          toast.warn("This account do not have any permission")
          return
        }
        await verifyToken();
        setToken(storedToken);
      } catch (err) {
        console.error('Token verification failed:', err);
        logOut();
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    window.history.pushState(null, '', '/');
    setToken(null);
    setRole({});
    setPermissionList([]);
  };

  const value = {
    logOut,
    role,
    permissionList,
    isLoad,
    token,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
