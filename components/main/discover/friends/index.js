import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../Header";
import ProfileCard from "./profileCard";
import { AdjustmentsVerticalIcon } from "react-native-heroicons/solid";
import Map from "./map";
import FilterModal from "../FilterModal";
import useLocation from "../../useLocation";
import Loader from "../../../../common/Loader";

export default function Friends({ route }) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Discover", "Nearby"];
  const [filterModel, setFilterModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { address } = useLocation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onChangeTab = (position) => {
    setActiveTab(position);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <Loader />}
      {filterModel ? (
        <FilterModal
          type={route.params.type}
          address={address}
          onClose={() => {
            setFilterModal(false);
          }}
          onSearch={(value) => {
            console.log(value);
            setFilterModal(false);
          }}
          visible={filterModel}
        />
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
            {activeTab === i && <View style={styles.activeBorder} />}
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setFilterModal(true)}>
          <AdjustmentsVerticalIcon color={"black"} />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View style={{ flex: 1 }}>
        {activeTab === 0 ? (
          <ProfileCard isLoading={isLoading} setLoading={setLoading} type={route.params.type} />
        ) : (
          <Map type={route.params.type} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    backgroundColor: "#F5F5F5",
    flex: 1,
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
    height: 5,
    width: 30,
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 30,
  },
});
