import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";
import Avatar from "./Avatar";
import ChatStack from "./chat";
import Discover from "./discover";
import Home1 from "./home";
import NotificationScreen from "./notification";
import Activities from "../Activities";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getProfileImage } from "../../services/discovery";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        header: Header,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color }) => <Icons.BoltIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ color }) => <Icons.UserGroupIcon color={color} />,
        }}
      />

    <Tab.Screen
        name="Home"
        component={Home1}
        options={{
          tabBarIcon: ({ color }) => <Icons.HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icons.ChatBubbleOvalLeftEllipsisIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => <Icons.BellIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const Header = ({ options, profileImage }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          //   backgroundColor: "red",
          marginTop: StatusBar.currentHeight,
          paddingVertical: 15,
          paddingHorizontal: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Icons.Bars3CenterLeftIcon color={"black"} />
        </View>
        <View>
          <Text>Logo</Text>
        </View>
        <View>
          {options?.headerRight ? (
            options.headerRight
          ) : (
            <Avatar
              size={35}
              imageUrl={profileImage}
              onPress={() => navigation.navigate("Profile")}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
