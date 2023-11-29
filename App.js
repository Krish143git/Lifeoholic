import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  BusinessAboutme,
  BusinessUpdate,
  BusinessFilter,
  DetailsForm,
  GrantLocation,
  Login,
  OTP,
  Settings,
  Welcome,
  Profile,
  MainNav,
  Terms,
  Privacy,
  UpdateTravel,
  TravelAboutMe,
  TravelLocation,
  IndividualLocation,
  EditNowTravel,
  TravelFilter,
  Refer,
  Payment,
  Stripe,
  Signin,
  Signup,
  ProfileDetail,
  Logout,
  FindFriends,
} from "./components";
import {
  Search,
  Push,
  Activities,
  BusinessEditpage,
  FriendUpdate,
  FriendEditpage,
  FriendAboutme,
  FriendFilter,
  UpdateMatchMaking,
  MatchAboutMe,
  EditNowMatch,
  FilterMatch,
  Notifications,
  Home1,
} from "./components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import useFonts from "./useFonts";
import AppLoading from "expo-app-loading";
import { StripeProvider } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainTabs from "./components/main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfileImageUpload from "./components/main/Profile/Profile";
import * as ExpoNotifications from "expo-notifications";
import Discover from "./components/main/discover";
import { PUBLISH_KEY } from "./common/Constants";
import BackButton from "./components/backButton/BackButton";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import FindFriendsComponent from "./components/findfriends/FindFriendsComponent";
import ResetPassword from "./components/resetpassword";
import PasswordUpdateSucess from "./components/successupdate/PasswordUpdateSuccess";
import Map from "./components/main/discover/friends/map";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [ready, isReady] = useState(false);
  const [token, setToken] = useState("");
  const [isExistUser,setIsExistUser] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    LoadFonts();
    AsyncStorage.getItem("token").then((token) => {
      setToken(token);
    });
    AsyncStorage.getItem("existUser").then((isUser)=> {
      if(isUser != null){
        setIsExistUser(isExistUser)
      }
    })
  }, []);

  useEffect(() => {
    ExpoNotifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        // Get the push token for the device
        ExpoNotifications.getExpoPushTokenAsync().then((token) => {
          console.log(token);
        });
      } else {
        console.log("Permission not granted for push notifications");
      }
    });
  }, []);

  if (!ready) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => isReady(true)}
        onError={() => { }}
      />
    );
  }

  // return <Notification />;


  const BeforeLogin = () => {
    return(
      <Stack.Navigator 
      initialRouteName={isExistUser ? "Signin" : "FindFriends"}
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        // headerRight: () => <Logout />,
        headerLeft: () => <BackButton />
      }}
      >
      <Stack.Screen
       name="FindFriends"
       component={FindFriends}
       options={{ headerShown: false, headerRight: () => <Text></Text> }}
      />   
      <Stack.Screen
              name="Signin"
              component={Signin}
              options={{ headerShown: false, headerRight: () => <Text></Text> }}
            />
        <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false, headerRight: () => <Text></Text> }}
            />   
         <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword}/>  
          <Stack.Screen name="Reset Password" component={ResetPassword}/> 
          <Stack.Screen name="Password Update Success" component={PasswordUpdateSucess}/>
      </Stack.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StripeProvider publishableKey={PUBLISH_KEY}>
          <Stack.Navigator
            initialRouteName={!token ? !isExistUser ? "Welcome" : "LoginFlow" : "Home1"}
            screenOptions={{
              headerShown: false,
              headerBackVisible: false,
              // headerRight: () => <Logout />,
              headerLeft: () => <BackButton />
            }}
          >
            {/* <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            /> */}
        <Stack.Screen name="Welcome" component={Welcome} />    
        <Stack.Screen name="LoginFlow" component={BeforeLogin}/>
       <Stack.Screen
              name="Home1"
              component={MainTabs}
              options={{
                title: "Home",
                headerTitleAlign: "left",
                headerShown: false,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen name="Form" component={DetailsForm} />
            <Stack.Screen name="AllowLocation" component={GrantLocation} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true, title: 'Subscribe to Premium', headerTitleAlign: "center" }} />
            <Stack.Screen name="Find Friends" component={FindFriends} />
           
            <Stack.Screen
              name="Push"
              component={Push}
              options={{
                title: "Push Notifications",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Activities"
              component={Activities}
              options={{
                title: "Activities",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Aboutme"
              component={BusinessAboutme}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="BusinessUpdate"
              component={BusinessUpdate}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="BusinessEditpage"
              component={BusinessEditpage}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="FriendUpdate"
              component={FriendUpdate}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="FriendEditpage"
              component={FriendEditpage}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="FriendAboutme"
              component={FriendAboutme}
              options={{
                title: "Preview Friend Profile",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile & Settings",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={{
                title: "Terms & Conditions",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Privacy"
              component={Privacy}
              options={{
                title: "Privacy Policy",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="UpdateMatchMaking"
              component={UpdateMatchMaking}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="MatchAboutMe"
              component={MatchAboutMe}
              options={{
                title: "Preview Match Making",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="EditNowMatch"
              component={EditNowMatch}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="TravelAboutMe"
              component={TravelAboutMe}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="UpdateTravel"
              component={UpdateTravel}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="EditNowTravel"
              component={EditNowTravel}
              options={{
                title: "",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Mainnav"
              component={MainNav}
              options={{
                title: "",
                headerTitleAlign: "center",

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="Refer"
              component={Refer}
              options={{
                title: "Refer a Friend",
                headerTitleAlign: "center",
                headerShown: true,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                title: "Payment",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Stripe"
              component={Stripe}
              options={{
                title: "Stripe",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="BusinessFilter"
              component={BusinessFilter}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="FriendFilter"
              component={FriendFilter}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="FilterMatch"
              component={FilterMatch}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="TravelFilter"
              component={TravelFilter}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="TravelLocation"
              component={TravelLocation}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="IndividualLocation"
              component={IndividualLocation}
              options={{
                title: "Filters",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen name="Search" component={Search} />

            <Stack.Screen
              name="MainHome"
              component={Discover}
              options={{
                title: "Home",
                headerTitleAlign: "left",
                headerShown: false,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />

            <Stack.Screen
              name="ProfileImageUpload"
              component={ProfileImageUpload}
              options={{
                title: "Home",
                headerTitleAlign: "left",
                headerShown: false,

                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </StripeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
