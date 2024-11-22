import axiosClient from "./axiosClient"

export const getServices = () => {
  return axiosClient.get('service');
};

export const getServiceById = (id) => {
  return axiosClient.get(`service/${id}`);
};

/**
 *  Example create data 
 const data = {
"name": "dance 3",
 "price": 2004,
  "status": true,
  "inventory": 100
}
 */
export const createService = (createData) => {
  return axiosClient.post(`service/create`, createData);
};


/**
 *  Example update data 
 const data = {
"name": "dance 3",
 "price": 2004,
  "status": true,
  "inventory": 100
}
 */
export const updateService = (id, updateData) => {
  return axiosClient.patch(`service/${id}`, updateData);
};

export const deleteService = (id) => {
  return axiosClient.patch(`service/delete/${id}`);
};

export const findServiceByName = (name) => {
  return axiosClient.get(`service/find`, {
    params: { q: name, },
  });
}