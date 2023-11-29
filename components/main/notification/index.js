import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";
import * as Icon from "react-native-heroicons/solid";
import Avatar from "../Avatar";
import { getNotification, getProfileImage } from "../../../services/discovery";
import axios from 'axios'
// const notifications = [
//   {
//     id: 1,
//     message: "Viewed your profile",
//     profileType: "Friends",
//     notifierName: "Vishnu Vamsi",
//   },
//   {
//     id: 2,
//     message: "Sent you a message",
//     profileType: "Strangers",
//     notifierName: "John Doe",
//   },
//   {
//     id: 3,
//     message: "Liked your photo",
//     profileType: "Friends",
//     notifierName: "Jane Smith",
//   },
// ];

const NotificationScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      let image = await getProfileImage();
      setProfileImage(image.image);
      let notification = await getNotification();
      setNotifications([...notification]);
    };
    fetchProfileImage();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationIconContainer}>
        <Icon.BellIcon size={24} color="#FFC107" />
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.notificationDetails}>{item.notifierName}</Text>
          <Text style={styles.notificationDetails}>{item.profileType}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.screenTitle}>Notifications</Text> */}
      <Header profileImage={profileImage} />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.notificationList}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center",marginTop: '50%' }}>No notification found</Text>
        )}
      />
    </View>
  );
};

const Header = ({ profileImage }) => {
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
          <Icon.Bars3CenterLeftIcon color={"black"} />
        </View>
        <View>
        <Image source={require('../../../assets/images/logo.png')} style={{
            width: 35,
            height: 35,
            resizeMode:'contain'
        }} />
        </View>
        <View>
          {/* {options?.headerRight ? (
            options.headerRight
          ) : ( */}
          <Avatar
            size={35}
            imageUrl={profileImage}
            onPress={() => navigation.navigate("Profile")}
          />
          {/* )} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  notificationList: {
    flexGrow: 1,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
  },
  notificationIconContainer: {
    marginRight: 16,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDetails: {
    fontSize: 14,
    color: "#777",
  },
});

export default NotificationScreen;
