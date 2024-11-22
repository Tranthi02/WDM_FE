import axiosClient from "./axiosClient"

export const getUsers = () => {
  return axiosClient.get('users');
};

export const findUserByUserName = (username) => {
  return axiosClient.get('users/find', { params: { username } });
};

export const updateUserInfo = (id, dataUpdate) => {
  return axiosClient.patch(`users/${id}/update`, dataUpdate);
};

export const deleteUser = (id) => {
  return axiosClient.delete(`users/${id}/delete`);
};

