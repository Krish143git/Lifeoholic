import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => JSON.parse(await AsyncStorage.getItem("userId"));

export const getChatList = async () => {
  let userId = await getUserId();
  let { data } = await axios.get(`${API_BASE_URL}/chat/list/${userId}`);
  return data.data;
};

export const getChatRoom = async (roomId, receiverId) => {
  let userId = await getUserId();
  let { data } = await axios.get(
    `${API_BASE_URL}/message/read-all/${roomId}/${userId}`
  );
  let clientMessages = await axios.get(
    `${API_BASE_URL}/message/read-all/${roomId}/${receiverId}`
  );

  return [
    ...data.data,
    ...clientMessages.data.data.map((el) => ({ ...el, isSender: true })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const sendMessage = async (payload) => {
  let { data } = await axios.post(`${API_BASE_URL}/message`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const deleteMessage = async (messageId) => {
  let { data } = await axios.delete(`${API_BASE_URL}/message/${messageId}`);
  return data;
};
