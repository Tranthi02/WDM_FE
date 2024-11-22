import axiosClient from './axiosClient';

/*
=================== SHIFT ===================
*/
export const getShifts = () => {
  return axiosClient.get('lobby/shifts');
};

export const createShifts = (name) => {
  return axiosClient.post('lobby/shifts', {name});
};

export const deleteShifts = (id) => {
  return axiosClient.delete(`lobby/shifts/${id}`)
};
/*
=================== LOBBY TYPE ===================
*/
export const getLobbyTypes = (includeDeleted = false, includeLobby=false) => {
  return axiosClient.get('lobby/types', { params: { includeDeleted, includeLobby } });
};

export const getLobbyTypeByID = (id) => {
  return axiosClient.get(`lobby/type/${id}`);
};

export const findLobTypeByName = (type_name) => {
  return axiosClient.get('lobby/find_type_by_name/', {
    params: {
      type_name: type_name
    }
  });
};

export const createLobType = (createData) => {
  return axiosClient.post('lobby/type/create/', createData);
};

export const updateLobType = (id, updateData) => {
  return axiosClient.patch(`lobby/type/${id}/update`, updateData);
};

export const deleteLobType = (id) => {
  return axiosClient.patch(`lobby/type/${id}/soft-delete`);
};

/*
=================== LOBBY ===================
*/

export const getLobbies = (date, lob_type_id) => {
  const params = {};
  if (date) {
    params.date = date;
  }
  if (lob_type_id) {
    params.lob_type_id = lob_type_id;
  }

  return axiosClient.get('lobby', {
    params,
  });
};

export const findLobByName = (name, lob_type_id) => {
  return axiosClient.get('lobby/find_lob_by_name/', {
    params: {
      name: name,
      lobType_id: lob_type_id
    }
  });
};

export const getLobbyById = (id, includeDeleted = false) => {
  return axiosClient.get(`lobby/${id}`, {
    params: { includeDeleted },
  });
};

export const createLobby = (dataCreate) => {
  return axiosClient.post('lobby/create', dataCreate);
};

export const updateLobby = (id, dataUpdate) => {
  return axiosClient.patch(`lobby/${id}/update`, dataUpdate);
};

export const softDeleteLobby = (id) => {
  return axiosClient.patch(`lobby/${id}/soft-delete`);
};
