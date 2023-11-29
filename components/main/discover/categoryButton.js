import { Text, TouchableOpacity, View } from "react-native";

const CategoryButton = ({ title, active, onPress }) => {
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
        onPress={onPress}
      >
        <Text
          style={{
            textAlign: "center",
            color: active ? "#fff" : "black",
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryButton;
