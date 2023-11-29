import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import Landing from "./Landing";
import { AdjustmentsVerticalIcon } from "react-native-heroicons/solid";
import Friends from "./friends";
import ProfileDetail from "./profileDetail";
import Traveler from "./traveller";
import ProfileCard from "./friends/profileCard";
import Discovery from "./Discovery";
import { Header } from "./Header";
import useLocation from "../useLocation";
import Loader from "../../../common/Loader";
const Stack = createNativeStackNavigator();

export default function Discover({ route }) {
  const navigation = useNavigation();
  const [filterModel, setFilterModal] = useState(false);
  const { address } = useLocation();
  const [isLoading, setLoading] = useState(false);
  const type = route.params?.type;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        {
          type ?
            <Header
              isFilterVisible={filterModel}
              isFromToggle={true}
              onFilterOpen={() => setFilterModal(true)}
              onClose={() => setFilterModal(false)}
              onSearch={(value) => {
                console.log(value);
                setFilterModal(false);
              }}
              address={address}
              onBackPress={() => navigation.navigate("Mainnav")}
            /> : null
        }
        {type == 'friends' ? <ProfileCard setLoading={setLoading} isLoading={isLoading} type={'friends'} /> : type == 'business' ?
          <ProfileCard setLoading={setLoading} isLoading={isLoading} type={'business'} /> : type == 'match' ?
            <ProfileCard setLoading={setLoading} isLoading={isLoading} type={'match'} /> :
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="landing" component={Landing} />
              <Stack.Screen name="friends" component={Friends} />
              <Stack.Screen
                name="profileDetail"
                component={ProfileDetail}
                initialParams={{ pageTitle: "" }}
              />
              <Stack.Screen name="travelPartner" component={Traveler} />
            </Stack.Navigator>
        }
      </SafeAreaView>
    </>
  );
}
