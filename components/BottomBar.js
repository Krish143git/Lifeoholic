import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function BottomBar() {
  const navigation = useNavigation();
  const navigationsList = [
    {
      name: "Discover",
      icon: "",
    },
    {
      name: "Activities",
      icon: "",
    },
    {
      name: "Home",
      icon: "",
    },
    {
      name: "Chat",
      icon: "",
    },
    {
      name: "Notifications",
      icon: "",
    },
  ];

  const TextComponent = (props) => (
    <Text style={[styles.text]} {...props}>
      {props.children}
    </Text>
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={navigations}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <Image
              source={{
                uri: "https://www.pngitem.com/pimgs/m/493-4937014_discover-icon-compass-hd-png-download.png",
              }}
              style={styles.icon}
            />
            <TextComponent>{item.name}</TextComponent>
          </View>
        )}
        horizontal
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "space-evenly",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}
        scrollEnabled={false}
      /> */}
      {navigationsList.map((el) => {
        return (
          <View style={styles.wrapper}>
            <Image
              source={{
                uri: "https://www.pngitem.com/pimgs/m/493-4937014_discover-icon-compass-hd-png-download.png",
              }}
              style={styles.icon}
            />
            <TextComponent>{el.name}</TextComponent>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 80,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
    paddingTop: 7,
    // padding: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  wrapper: {
    alignItems: "center",
    width: "20%",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "white",
    marginBottom: 7,
  },
});
