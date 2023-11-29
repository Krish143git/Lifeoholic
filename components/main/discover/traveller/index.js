import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../Header";
import { AdjustmentsVerticalIcon } from "react-native-heroicons/solid";
import Places from "./places";
import TravelerTab from "./traveler";
import {
  getPlaceByUserView,
  getRecentPostedPlaces,
} from "../../../../services/discovery";

export default function Traveler() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const tabs = ["Places", "Travelers"];

  useEffect(() => {
    fetchRecentPost();
    fetchPlaces();
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchRecentPost = async () => {
    setLoading(true);
    try {
      let response = await getRecentPostedPlaces();
      if (response.places) setRecentPosts(response.places);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      let response = await getPlaceByUserView();
      if (response.usersPosts) setPlaces(response.usersPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeTab = (position) => {
    setActiveTab(position);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : null}
      <View style={styles.headerContainer}>
        {tabs.map((el, i) => (
          <TouchableOpacity
            key={el}
            style={[styles.tabButton]}
            onPress={() => onChangeTab(i)}
          >
            <Text
              style={[
                styles.tabBarButtonText,
                activeTab === i && styles.activeTabBarText,
              ]}
            >
              {el}
            </Text>
            {
              <View
                style={[
                  styles.activeBorder,
                  { opacity: activeTab === i ? 1 : 0 },
                ]}
              />
            }
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {activeTab === 1 ? (
          <TravelerTab />
        ) : (
          <Places recentPosts={recentPosts} posts={places} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    backgroundColor: "#F5F5F5",
    // flex: 1,
    marginHorizontal: 10,
  },
  tabBarButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c7c7c",
  },
  activeTabBarText: {
    color: "black",
    borderBottomColor: "red",
  },
  activeBorder: {
    height: 3,
    width: 30,
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 5,
  },
});
