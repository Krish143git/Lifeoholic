import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { BookmarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { getListByType, likeFriends } from "../../../../services/discovery";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SwipeableCard = ({ item, removeCard, swipedDirection, type }) => {
  // let xPosition = new Animated.Value(0);
  const navigation = useNavigation();
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const swipeDir = useRef(0).current;
  const swipe = useRef(new Animated.ValueXY()).current;
  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      swipe.setValue({ x: gestureState.dx, y: gestureState.dy });
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      swipe.setValue({ x: 0, y: 0 });
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(swipeDirection);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(swipeDirection);
        });
      }
    },
  });
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          // backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          // backgroundColor: "red",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        onPress={() =>
          navigation.navigate("profileDetail", {
            pageTitle: "Friends",
            data: item,
            type,
          })
        }
      />
      {/* Saved */}
      <View style={{ position: "absolute", top: 10, zIndex: 1, right: 10 }}>
        <BookmarkIcon size={30} />
      </View>
      {/* Like And DisLike */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 1,
          // alignSelf: "center",
          alignItems: "center",
          opacity: likeOpacity,
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Icons.HeartIcon size={80} color={"#ff3e69"} />
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: "#ff3e69",
            }}
          >
            Like
          </Text>
        </View>
      </Animated.View>

      {/* Like */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 1,
          alignItems: "center",
          opacity: nopeOpacity,
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Icons.XMarkIcon size={80} color={"#ff3e69"} />
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: "#ff3e69",
            }}
          >
            Dislike
          </Text>
        </View>
      </Animated.View>
      <Image
        source={{ uri: item?.images && item.images[0] }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <View style={{ position: "absolute", zIndex: 1, bottom: 10, left: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}>
            {`${item.name}, ${item.age}`}
          </Text>
          <Icons.CheckBadgeIcon />
        </View>
        <Text
          style={{ color: "#fff" }}
        >{`${item.homeTown} • ${item.work}`}</Text>
      </View>
    </Animated.View>
  );
};

const ProfileCard = ({ type, setLoading, isLoading }) => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [friends, setFriends] = useState([]);


  const category = ["Online", "New", "Recommended"];

  useEffect(() => {
    setFriends([]);
    fetchFriends();
  }, [type]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      let data = await getListByType(type);
      console.log('data', data);
      if (Object.keys(data).includes(type)) {
        setFriends([...data[type]]);
      } else {
        setFriends([])
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCard = async (id, swipeDirection) => {
    setLoading(true);
    try {
      let userId = JSON.parse(await AsyncStorage.getItem("userId"));
      let response;
      if (swipeDirection === "Right") {
        response = await likeFriends("like", {
          sender: userId,
          receiver: id,
        });
      } else {
        response = await likeFriends("dislike", {
          sender: userId,
          receiver: id,
        });
      }
      friends.splice(
        friends.findIndex((item) => item._id == id),
        1
      );
      setFriends(friends);
      if (friends.length == 0) {
        setNoMoreCard(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  const CategoryButton = ({ title, active }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            padding: 10,
            borderWidth: 1,
            borderColor: "#bbbbbb",
            borderRadius: 50,
            minWidth: 100,
            backgroundColor: active ? "black" : "#fff",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: active ? "#fff" : "black",
              fontWeight: "bold",
              fontSize: 12
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
          marginBottom: -10,
          marginTop: 20
        }}
      >
        {category.map((el, i) => (
          <CategoryButton key={el} title={el} active={i === 0} />
        ))}
      </View>

      <View style={styles.container}>
        {friends.map((item, key) => (
          <SwipeableCard
            key={key}
            index={key}
            item={item}
            removeCard={(swipeDirection) =>
              removeCard(item._id, swipeDirection)
            }
            swipedDirection={lastSwipedDirection}
            direction={swipeDirection}
            type={type}
          />
        ))}
        {!friends.length && !isLoading ? (
          <Text style={{ fontSize: 22, color: "#000" }}>{type == "friends" ? "No Friends Found." : type == "business" ? "No Business Partners Found." : "No Match Making Found."}</Text>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "#7a7a7a", fontWeight: "bold" }}>Hide •</Text>
        <Text style={{ color: "#7a7a7a", fontWeight: "bold" }}>Report</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  cardStyle: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.65,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardTitleStyle: {
    color: "#fff",
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: "center",
  },
});

const DEMO_CONTENT = [
  {
    id: "1",
    name: "Mirian",
    age: "24",
    location: "Bangalore, India",
    role: "UI/UX designer",
    image:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    id: "2",
    name: "Mirian",
    age: "24",
    location: "Bangalore, India",
    role: "UI/UX designer",
    image:
      "https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg",
  },
  {
    id: "3",
    name: "Mirian",
    age: "24",
    location: "Bangalore, India",
    role: "UI/UX designer",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    id: "4",
    name: "Mirian",
    age: "24",
    location: "Bangalore, India",
    role: "UI/UX designer",
    image:
      "https://st2.depositphotos.com/2783505/42643/i/600/depositphotos_426437524-stock-photo-passport-photo-happy-laughing-latin.jpg",
  },
].reverse();
