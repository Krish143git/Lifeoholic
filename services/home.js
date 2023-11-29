import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const fetchPost = async () => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  console.log('userId',userId);
  let { data } = await axios.get(
    `${API_BASE_URL}/data/post/get-all`
  );
  console.log('data',data)
  if(data.message == "successfully fetched all posts"){
    return data.posts;
  }else{
    return [];
  }
};

export const likeDislikePosts = async (postId) => {
  let userId = JSON.parse(await AsyncStorage.getItem("userId"));
  // let { data } = await axios.post(
  //   `${API_BASE_URL}/add-delete-like`
  // );
 let result = await axios({
    method:'POST',
    url:`${API_BASE_URL}/add-delete-like`,
    data: {
      postId,
      userId
    }
  }).then((res)=> {
    return res.data;
  }).catch((err)=> {
    console.log('error',err);
    return null
  })

  return result;
}

export const fetchAllPosts = async () => {
  let { data } = await axios.get(
    `${API_BASE_URL}/data/post/get-all`
  );
  return data.data;
};

export const fetchCategories = async () => {
  let { data } = await axios.get(`${API_BASE_URL}/home`);
  return data.filter;
};
