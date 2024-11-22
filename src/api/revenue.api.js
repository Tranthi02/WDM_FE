import axiosClient from "./axiosClient"

export const getTotalRevenue = (year, month) => {
  return axiosClient.get('revenue/total', {
    params: {
      month, 
      year
    }
  });
};

export const getMonRevenue = (year, month) => {
  return axiosClient.get('revenue', {
    params: { year, month, },
  });
};

export const getMonthWedding = (year, month) => {
  return axiosClient.get('revenue/wedding-number', {
    params: { year, month, },
  });
};

export const getListRevenue = (includeFee=false, month, year) => {
  return axiosClient.get('revenue/list-revenue', {
    params: {
      includeFee, month, year
    }
  });
};
