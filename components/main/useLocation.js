import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.GRANTED) {
      let { coords } = await Location.getCurrentPositionAsync();
      setCurrentLocation({ ...coords });
      let address = await getAddressFromCoords(coords);
      setAddress(address);
    } else {
      Alert.alert("Permission required!", "Please allow location permission", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        { text: "Go to settings", onPress: () => Linking.openURL("settings") },
      ]);
      return;
    }
  };

  const getAddressFromCoords = async (coords) => {
    try {
      const result = await Location.reverseGeocodeAsync(coords);
      if (result.length > 0) {
        return `${result[0].name}, ${result[0].street}, ${result[0].city}`;
      }
    } catch (error) {
      console.log("Error getting address from coords", error);
    }
  };

  return { currentLocation, address };
};

export default useLocation;
