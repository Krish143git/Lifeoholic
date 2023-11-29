import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 

let jwttoken = "";
AsyncStorage.getItem('token').then(token => {
    jwttoken = token;
})

const APIURL = "http://16.171.175.25:3000/api/v1"

export const InstanceWithOutToken =  axios.create({
  baseURL : APIURL,
  headers: {
    "Content-Type": "application/json"
  }
 
});


export const InstanceWithToken = axios.create({
    baseURL : `${APIURL}/data`,
    headers: {
      "Content-Type": "application/json",
    }
   
  });
