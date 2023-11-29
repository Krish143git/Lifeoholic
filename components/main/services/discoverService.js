import axios from "axios";

const BASE_URL = "https://lifeaholic-test1.onrender.com/api/v1";

export const getAllFriendList = async () => {
  try {
    let response = (await axios.get(`${BASE_URL}/all-friends-list`)).data;
    return response.friends;
  } catch (error) {
    console.log("API FAIL(all-friends-list) ", error.message);
  }
};

export const updateProfileToggle = () => {
  // Check profile toggle is created
  axios.get("/toggle/profile/");
};
