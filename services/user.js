import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BASE_URL = "http://lifeaholic-test1.onrender.com/api/v1/data";


export default class UserService {
  static instance = null;
  static userData = null;
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async fetchUserData() {
    let basicDetail = JSON.parse(await AsyncStorage.getItem("personalData"));
    let userId = JSON.parse(await AsyncStorage.getItem("userId"));
    UserService.userData = basicDetail;
    if (basicDetail && userId)
      this.user = {
        ...basicDetail,
        userId: "63d006498e7d8406ef758bf4",
        friendId: "63e23bb3683d333f5b71a423",
        businessId: "63d17a6db686b473a6e33246",
        matchId: "63d1fc4f2e31286c3e1c84c3",
      };
  }

  async fetchBasicDetails() {
    try {
      await this.fetchUserData();
      let { data } = await axios.get(
        `${BASE_URL}/details/get/${this.user.userId}`
      );
      if (data) {
        return data?.data?.detail;
      }
      return null;
    } catch (error) {
      console.log(`User fetch error::${error?.message}`);
      return null;
    }
  }

  async fetchFriendsData() {
    try {
      await this.fetchUserData();
      let { data } = await axios.get(
        `${BASE_URL}/friend/get/${this.user.friendId}`
      );
      if (data) {
        return data?.data?.friends;
      }
      return null;
    } catch (error) {
      console.log(`User friend fetch error::${error?.message}`);
      return null;
    }
  }

  async fetchBusinessData() {
    try {
      await this.fetchUserData();
      let { data } = await axios.get(
        `${BASE_URL}/bussiness/get/${this.user.businessId}`
      );
      if (data) {
        return data?.bussinessData;
      }
      return null;
    } catch (error) {
      console.log(`User business fetch error::${error?.message}`);
      return null;
    }
  }

  async fetchMatchMaking() {
    try {
      await this.fetchUserData();
      let { data } = await axios.get(
        `${BASE_URL}/matchM/get/${this.user.matchId}`
      );
      if (data) {
        return data?.result;
      }
      return null;
    } catch (error) {
      console.log(`User friend fetch error::${error?.message}`);
      return null;
    }
  }
}
