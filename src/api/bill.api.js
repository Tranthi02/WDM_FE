import axiosClient from "./axiosClient"

export const getRoleById = (id, permission=false) => {
  return axiosClient.get(`user/role/${id}`, {
    params: { permission, },
  });
};

export const getRoles = (permission=false) => {
  return axiosClient.get('user/roles', {
    params: { permission, },
  });
};

export const createRole = (dataCreate) => {
  return axiosClient.post('user/role', dataCreate);
};

export const updateRolePermission = (roleID, permissionID) => { //update permission id for specific role id
  return axiosClient.post('user/role/update', { roleID, permissionID });
};

export const removeRolePermission = (roleID, permissionID) => { //remove permission id for specific role id
  return axiosClient.delete('user/role/delete', { roleID, permissionID });
};

export const setUserRole = (roleID, userID) => { //update role id for specific user id
  return axiosClient.post('user/role/user/update', { roleID, userID });
};

