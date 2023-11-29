import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "./Header";
import useLocation from "../useLocation";
import ProfileCard from "./friends/profileCard";

const { width, height } = Dimensions.get("screen");

export default function Landing() {
  const navigation = useNavigation();
  const [filterModel, setFilterModal] = useState(false);
  const { address } = useLocation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const navigateTo = (name, type) => {
    navigation.navigate(name, {
      type: type,
    });
  };
  // console.log('typeeee',route.params);
  return (
    <>
      <Header
        isFilterVisible={filterModel}
        onFilterOpen={() => setFilterModal(true)}
        onClose={() => setFilterModal(false)}
        onSearch={(value) => {
          console.log(value);
          setFilterModal(false);
        }}
        address={address}
        onBackPress={() => navigation.navigate("Mainnav")}
      />
      <View style={styles.container}>
        {categories.map((el, index) => {
          return (
            <TouchableOpacity
              key={el.title}
              activeOpacity={0.7}
              style={styles.card}
              onPress={() => navigateTo(el.routeName, el.name)}
            >
              <Image
                source={{
                  uri: el.imageUrl,
                }}
                style={styles.bgImage}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{el.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 8,
    marginHorizontal: 8,
  },
  card: {
    width: width * 0.47,
    height: height * 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    width: "80%",
    backgroundColor: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    alignSelf: "center",
  },
});

const categories = [
  {
    title: "Friends",
    name: "friends",
    imageUrl:
      "https://post.psychcentral.com/wp-content/uploads/sites/4/2022/05/group-of-young-adults-diverse-friends-732x549-thumbnail.jpg",
    routeName: "friends",
  },
  {
    title: "Business",
    name: "business",
    imageUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20191127190639-shutterstock-431848417-crop.jpeg",
    routeName: "friends",
  },
  {
    title: "Match Making",
    name: "match",
    imageUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20150105141237-you-should-love-your-job-your-real-one.jpeg",
    routeName: "friends",
  },
  {
    title: "Travel Partner",
    imageUrl:
      "https://jonilar.net/wp-content/uploads/2018/07/couples-traveling.jpg",
    routeName: "travelPartner",
  },
];
