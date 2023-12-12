import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import ChatList from "./chatList";
import personalChat from "./personalChat";
const Stack = createNativeStackNavigator();

export default function ChatStack() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="chatList" component={ChatList} />        
      </Stack.Navigator>
    </SafeAreaView>
  );
}
