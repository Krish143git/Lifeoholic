import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Avatar({
  imageUrl = "https://play-lh.googleusercontent.com/i1qvljmS0nE43vtDhNKeGYtNlujcFxq72WAsyD2htUHOac57Z9Oiew0FrpGKlEehOvo=w240-h480-rw",
  size = 60,
  onPress = () => {},
  ...rest
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { width: size, height: size },
        rest?.style && rest.style,
      ]}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.avatar}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: "hidden",
    elevation: 8,
  },
  avatar: { height: "100%", width: "100%" },
});
