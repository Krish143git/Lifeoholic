import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "../hoc/showMessage";

export const getProfileToggles = async () => {
  let userId = await JSON.parse(await AsyncStorage.getItem("userId"));
  console.log('useIdd', userId)
  let { data } = await axios.get(`${API_BASE_URL}/activity/${userId}`);
  return data;
};

export const updateToggle = async (toggleReq, userId) => {
  console.log(toggleReq, "@Activity Toggle payload");
  let data = await axios.put(`${API_BASE_URL}/activity/update`, toggleReq, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log('error', err);
  })
  console.log(data, 'data')
  return data;
};

export const getSubscriptionList = async () => {
  try {
    let { data } = await axios.get(`${API_BASE_URL}/subscription-list`);
    if (data?.message == 'subscription fetched successful') {
      return data?.all;
    } else {
      showMessage({ text: data?.message })
      return null;
    }
  } catch (error) {
    console.log('error', error)
    showMessage({ text: 'Something went wrong' })
    return null;
  }
}
