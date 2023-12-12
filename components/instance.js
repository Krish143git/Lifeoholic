import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 
import { API_BASE_URL } from "../services/config";

let jwttoken = "";
AsyncStorage.getItem('token').then(token => {
    jwttoken = token;
})

// const APIURL = "http://16.171.175.25:3000/api/v1"

export const InstanceWithOutToken =  axios.create({
  baseURL : API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
 
});


export const InstanceWithToken = axios.create({
    baseURL : `${API_BASE_URL}/data`,
    headers: {
      "Content-Type": "application/json",
    }
   
  });
