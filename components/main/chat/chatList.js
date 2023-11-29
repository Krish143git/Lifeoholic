import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import Avatar from "../Avatar";
import * as ChatServices from "../../../services/chat";

export default function ChatList() {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    setLoading(true);
    try {
      let data = await ChatServices.getChatList();
      setFriends([...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {isLoading && (
        <View
          style={{
            position: "absolute",
            // backgroundColor: "rgba(0,0,0,0.5)",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <ActivityIndicator size={50} color={"blue"} />
        </View>
      )}
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          paddingVertical: 15,
          paddingHorizontal: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Bars3CenterLeftIcon color={"black"} />
        <Image source={require('../../../assets/images/logo.png')} style={{
            width: 35,
            height: 35,
            resizeMode:'contain'
        }} />
        <PlusCircleIcon color={"black"} />
      </View>
      {/* Search Chat */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 8,
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#dfdfdf",
        }}
      >
        <TextInput placeholder="Search" style={{ flex: 1 }} />
        <MagnifyingGlassIcon color={"black"} />
      </View>

      {/* Chat */}
      <FlatList
        data={friends}
        ListEmptyComponent={() => (
          <Text>{!isLoading ? "No friends found" : ""}</Text>
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 8,
              }}
              onPress={() =>
                navigation.navigate("personalChat", {
                  data: item,
                })
              }
            >
              <Avatar imageUrl={item.senderImage[0]} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.senderUsername}
                </Text>
                <Text>{item.lastMsg}</Text>
              </View>

              <View>
                {/* <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    left: -35,
                    top: -8,
                    backgroundColor: "black",
                    borderRadius: 100,
                    padding: 5,
                    height: 25,
                    width: 25,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                    }}
                  >
                    {item.unReadMessage}
                  </Text>
                </View> */}
                {/* <Text style={{ color: "#a7a7a7" }}>{item.status}</Text> */}
                <Text style={{ color: "#a7a7a7" }}>{item.senderType}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: 8,
              borderWidth: 0.5,
              borderColor: "#bbbbbb",
            }}
          />
        )}
        contentContainerStyle={{
          marginVertical: 10,
        }}
      />
    </View>
  );
}
