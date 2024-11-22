import axiosClient from "./axiosClient"

export const getCustomers = () => {
  return axiosClient.get('customer');
};

export const findCustomerByName = (name) => {
  return axiosClient.get('customer/find',{ params: { name, }, });
};

export const createUser = (dataCreate) => {
  return axiosClient.post('customer/create', dataCreate);
};

