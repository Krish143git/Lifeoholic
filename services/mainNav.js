import axios from "axios";
import { API_BASE_URL } from "./config";

export const fetchFriends = async (userId) => {
  let { data } = await axios.get(
    `${API_BASE_URL}/data/friend/get/${userId}`
  );
  return data.data;
};

export const createFriends = async (data) => {
  let resp = await axios.post(
    `${API_BASE_URL}/data/friend/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  ).then((res) => {
    return res.data;
  })
  return resp;
};

export const updateFriends = async (data, userId) => {
  let resp = await axios.put(
    `${API_BASE_URL}/data/friend/update/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log('error', err);
  })
  return resp;
};


export const fetchBusiness = async (userId) => {
  let { data } = await axios.get(
    `${API_BASE_URL}/data/bussiness/get/${userId}`
  );
  return data.data;
};

export const fetchMatchMaking = async (userId) => {
  let { data } = await axios.get(
    `${API_BASE_URL}/data/matchM/get/${userId}`
  );
  return data.data;
};

export const fetchTravelPartner = async (userId) => {
  let { data } = await axios.get(
    `${API_BASE_URL}/data/travelP/get/${userId}`
  );
  return data.data;
};