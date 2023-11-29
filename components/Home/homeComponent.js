import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./homeStyles";
import CreatePost from "./createPost";
import PostList from "./postList";
import { useNavigation } from "@react-navigation/native";

const HomeComponent = () => {
  let navigation = useNavigation();
  // navigation.navigate("Mainnav");
  return (
    <ScrollView>
      <CreatePost />
      <PostList />
    </ScrollView>
  );
};

export default HomeComponent;
