import axiosClient from "./axiosClient"

export const login = (username, password) => {
  return axiosClient.post('auth/login', { username, password });
};

export const register = (username, password, display_name) => {
  return axiosClient.post('auth/register', { username, password, display_name });
};

export const changePassword = (username, password, oldPassword) => {
  return axiosClient.patch('auth/change-password', { username, password, oldPassword });
};

export const checkUserPermissionWithPage = (id, page) => {
  return axiosClient.get(`auth/check-permission/${id}`, { 
    params: { page, },
  });
};

export const verifyToken = () => {
  return axiosClient.get('auth/verify-token');
};

