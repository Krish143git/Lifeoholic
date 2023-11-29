import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import * as Icons from "react-native-heroicons/solid";
import * as HomeService from "../../../services/home";
import { getProfileImage } from "../../../services/discovery";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../Avatar";
import * as Icon from "react-native-heroicons/solid";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from "../discover";
import ActivityHome from "../../Activities";
import Home from "../../Home";
import ChatStack from "../chat";
import NotificationScreen from "../notification";
import Loader from "../../../common/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Home1() {
  const [categories, setCategories] = useState([]);
  const [posts, setPost] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [profileImage, setProfileImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const Tab = createBottomTabNavigator();
  useEffect(() => {
    const fetchProfileImage = async () => {
      let image = await getProfileImage();
      setProfileImage(image.image);
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    setLoading(true)
    let data = await HomeService.fetchPost();
    console.log('daaattaa',data)
    setPost([...data]);
    setLoading(false)
  };

  const fetchCategories = async () => {
    let data = await HomeService.fetchCategories();
    console.log(data);
    setCategories([...data]);
  };


  return (

      <><Header profileImage={profileImage?.length ? profileImage[0] : null} />
      {loading && <Loader/>}
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 8,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Create Post */}
      <CreatePost />
      {/* Category */}
      <View>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => {
            return (
              <Category
                title={item}
                onPress={() => setSelectedCategory(item)}
                selected={item === selectedCategory} />
            );
          } }
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
            marginTop: 8 * 2,
            // backgroundColor: "#fff",
          }} />
      </View>

      {/* Posts */}
      <View>
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            return (
              <Post
                name={item?.name}
                postId={item?._id}
                like={item?.likes?.length}
                description={item.content}
                postedAt={new Date(item?.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                comment={item.comments.length}
                images={item?.uploadImage}
                profileImage={item?.profileImage.length > 0 ? item?.profileImage[0] : null} />
            );
          } } 
          ListEmptyComponent={()=>{
            return(
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Please Turn on Near By Location</Text>
              </View>
            )
          }}
          />
      </View>
    </ScrollView>
    </>
  );
}

const Category = ({ title, onPress = () => {}, selected = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? "black" : "#fff",
        padding: 8,
        borderRadius: 50,
        minWidth: 80,
        borderColor: "#ecedee",
        borderWidth: 0.5,
      }}
    >
      <Text
        style={{
          color: selected ? "#fff" : "black",
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const Tab=()=>
{
  
}

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
        <TouchableOpacity onPress={()=>  navigation.navigate('Mainnav')}>
          <Icon.Bars3CenterLeftIcon color={"black"} size={30}/>
        </TouchableOpacity>
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
