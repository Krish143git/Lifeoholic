import axios from "axios";

export const BASE_URL = "http://lifeaholic-test1.onrender.com/api/v1";

export const fetchSubscriptionPlans = async () => {
  try {
    let { data } = await axios.get(`${BASE_URL}/subscription-list`);
    console.log(data, "Data");
    if (data) return data?.subs;
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
