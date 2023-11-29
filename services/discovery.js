import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getListByType = async (type) => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  console.log(userId, "UserId");
  let url = "";
  switch (type) {
    case "friends":
      url = `${API_BASE_URL}/all-friends-list/${userId}`;
      break;
    case "business":
      url = `${API_BASE_URL}/all-business-list/${userId}`;
      break;
    case "match":
      url = `${API_BASE_URL}/all-match-making-list/${userId}`;
      break;
    default:
      break;
  }
  if (!url.length) return {};
  let response = await axios.get(url);
  return response.data;
};

export const getNearerListByType = async (type) => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  let url = "";
  switch (type) {
    case "friends":
      url = `${API_BASE_URL}/friends/near-by-location/${userId}`;
      break;
    case "business":
      url = `${API_BASE_URL}/business/near-by-location/${userId}`;
      break;
    case "match":
      url = `${API_BASE_URL}/match/near-by-location/${userId}`;
      break;
    default:
      break;
  }
  if (!url.length) return;
  let response = await axios.get(url);
  return response.data;
};

export const likeFriends = async (
  type,
  payload = { sender: "", receiver: "" }
) => {
  let url = "";
  switch (type) {
    case "like":
      url = `${API_BASE_URL}/send-request`;
      break;
    case "dislike":
      url = `${API_BASE_URL}/dislike-request`;
      break;
    default:
      break;
  }
  console.log(url, payload);
  let response = await axios.post(url, payload);
  console.log('res',response);
  return response.data;
};

export const getRecentPostedPlaces = async () => {
  let data = (await axios.get(`${API_BASE_URL}/travel/places/recent/posts`))
    .data;
  return data;
};

export const getTravelPartners = async () => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  let data = (
    await axios.get(`${API_BASE_URL}/all-travel-partner-list/${userId}`)
  ).data;
  return data;
};

export const getPlaceByUserView = async () => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  let data = (await axios.get(`${API_BASE_URL}/travel/places/user/${userId}`))
    .data;
  return data;
};

export const getTravelers = async (category) => {
  let { data } = await axios.post(
    `${API_BASE_URL}/travel/travellers/categories`,
    {
      categories: category,
    }
  );
  return data.travellers;
};

export const updateProfile = async (payload) => {
  console.log(`${API_BASE_URL}/picture-verify-step-1`);
  let { data } = await axios.put(`${API_BASE_URL}/picture-verify-step-1`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => console.log(err));
  return data;
};

export const getProfileImage = async () => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  let { data } = await axios.get(
    `${API_BASE_URL}/picture-verify-step-1/${userId}`
  );
  return data;
};

export const getNotification = async () => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  let { data } = await axios.get(`${API_BASE_URL}/list/notification/${userId}`);
  return data.notifier;
};
