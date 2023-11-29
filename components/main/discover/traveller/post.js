import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../../Avatar";
import * as Icons from "react-native-heroicons/solid";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export default function Post({
  name = "",
  userProfile,
  description = "",
  postedAt = "",
  post = "",
  activeLookingForTravel = "",
  tags = "",
  like,
  onLike,
  onComment,
  comment,
}) {
  return (
    <View
      style={{ flexDirection: "row", marginVertical: 8, paddingBottom: 10 }}
    >
      <View style={{ marginRight: 8 }}>
        <Avatar imageUrl={userProfile} size={45} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Text
            style={{
              color: "#bbbbbb",
              fontWeight: "bold",
              fontSize: 12,
              marginLeft: 8,
            }}
          >
            {postedAt}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", color: "#009f3d" }}>
          {activeLookingForTravel}
        </Text>
        <View
          style={{
            width: WIDTH * 0.8,
            height: HEIGHT * 0.2,
            borderRadius: 10,
            overflow: "hidden",
            marginVertical: 8,
          }}
        >
          <Image
            source={{
              uri: post,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View>
          <Text>{tags}</Text>
          <Text>{description}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={onLike}>
            <Icons.HandThumbUpIcon color={"black"} />
            <Text style={{ marginLeft: 5 }}>{like}</Text>
          </TouchableOpacity>
          <View>
            <Icons.ChatBubbleBottomCenterTextIcon color={"black"} />
            <Text style={{ marginLeft: 5 }}>{comment}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#e2e2e2",
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}
