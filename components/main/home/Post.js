import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Avatar from "../Avatar";
import * as Icons from "react-native-heroicons/solid";
import * as HomeService from '../../../services/home'

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export default function Post({
  profileImage = "https://play-lh.googleusercontent.com/i1qvljmS0nE43vtDhNKeGYtNlujcFxq72WAsyD2htUHOac57Z9Oiew0FrpGKlEehOvo=w240-h480-rw",
  name = "Sijmens Immense",
  postedAt = "2 hours ago",
  images = "http://res.cloudinary.com/dmtvycwhy/image/upload/v1682353328/twaihxoi4cl14dlweytu.png",
  description = "Before the establishment of the Unicode Standard,There were hundreds...",
  like = 80,
  comment = 120,
  postId
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [like1, setLike] = useState(like);

  const likepost= async()=>
  {
    let data = await HomeService.likeDislikePosts(postId);
    if(data.message == "Like added"){
      setLike(like+1)
    }else{
      setLike(like-1)
    }
  }
  const onScroll = ({ nativeEvent }) => {
    let slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    setActiveSlide(slide);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar imageUrl={profileImage} size={40} />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.time}>{postedAt}</Text>
      </View>
      {/* Photo with slide */}
      <View style={styles.postImageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          style={styles.slideContainer}
        >
          {/* {images.map((el, i) => ( */}
          <Image
            // key={el + i}
            source={{
              uri: images,
            }}
            style={styles.postImage}
          />
          {/* // ))} */}
        </ScrollView>
      </View>
      <View>
        {/* <View style={styles.dotContainer}>
          {images.map((el, index) => {
            return (
              <View
                key={el + index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      activeSlide === index ? "black" : "#bbbbbb",
                    width: activeSlide === index ? 15 : 6,
                  },
                ]}
              />
            );
          })}
        </View> */}
      </View>
      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      {/* Like & Comment */}
      <View style={styles.footer}>
        <View style={styles.iconContainer} >
          <Icons.HandThumbUpIcon color={"black"}  onPress={() => likepost()}
          />
          <Text style={styles.footerItem} >{like1}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icons.ChatBubbleLeftEllipsisIcon color={"black"} />
          <Text style={styles.footerItem}>{comment}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  time: {
    color: "#bbbbbb",
    fontSize: 12,
    fontWeight: "bold",
  },
  postImageContainer: {
    height: HEIGHT * 0.3,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
  },
  slideContainer: {
    width: WIDTH,
    height: HEIGHT * 0.3,
    borderRadius: 10,
    // backgroundColor: "red",
  },
  postImage: {
    width: WIDTH,
    height: HEIGHT * 0.3,
    resizeMode: "cover",
    // borderRadius: 10,
  },
  dotContainer: {
    bottom: 0,
    alignSelf: "center",
    width: WIDTH,
    justifyContent: "center",
    margin: 1,
    flexDirection: "row",
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    margin: 2,
  },
  descriptionContainer: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
  footer: {
    flexDirection: "row",
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerItem: {
    marginHorizontal: 8,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#bbbbbb",
    marginVertical: 8,
  },
});
