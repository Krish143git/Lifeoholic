import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../useLocation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../../../app.json";
import CategoryButton from "../categoryButton";
import { MapPinIcon } from "react-native-heroicons/solid";
import Avatar from "../../Avatar";
import { getNearerListByType } from "../../../../services/discovery";
import { StatusBar } from "react-native";
import { Platform } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
const ASPECT_RATIO = WIDTH / HEIGHT;
const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map({ type }) {
  const { currentLocation: location, address } = useLocation();
  const autoPlaceCompleteRef = useRef();
  const mapRef = useRef();
  const [users, setUserList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          ...location,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        100
      );
    }
  }, [location]);

  useEffect(() => {
    if (autoPlaceCompleteRef.current && address) {
      console.log("address", address);
      autoPlaceCompleteRef.current.setAddressText(address);
    }
  }, [address]);

  const fetchList = async () => {
    let response = await getNearerListByType(type);
    if (response) {
      setUserList([...response.data]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          width: WIDTH * 0.95,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          paddingHorizontal: 2,
          paddingTop: Platform.OS === "android" ?  StatusBar.currentHeight : HEIGHT * 0.05
        }}
      >
        <GooglePlacesAutocomplete
          ref={autoPlaceCompleteRef}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: config.expo.android.config.googleMapsApiKey,
            language: "en",
            components: "country:in",
          }}
          onFail={(error) => {
            console.log("Error", error);
          }}
          styles={{
            container: {
              // position: "absolute",
              // zIndex: 1,
              // width: "100%",
            },
          }}
        />
        <MapPinIcon size={25} color={"black"} />
      </View>
      <View style={{ flex: 1, marginTop: 8 * 5 }}>
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            top: "10%",
            alignSelf: "center",
          }}
        >
          <FlatList
            data={["Around you", "Crossed you"]}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <CategoryButton
                  title={item}
                  active={index === activeCategory}
                  onPress={() => setActiveCategory(index)}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 8 }} />
            )}
          />
        </View>
        <MapView
          ref={mapRef}
          provider={"google"}
          initialRegion={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
              : {
                  latitude: 12.9716,
                  longitude: 77.5946,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
          }
          style={{ flex: 1 }}
        >
          {location?.latitude && location?.longitude && (
            <Marker coordinate={location}>
              <View>
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    alignSelf: "center",
                    top: 10,
                  }}
                >
                  <Avatar size={45} />
                </View>
                <MapPinIcon size={80} color={"#ff4169"} />
              </View>
            </Marker>
          )}

          {users.length
            ? users.map((user) => {
                if (user?.latitude && user?.longitude)
                  return (
                    <Marker
                      key={user.userId}
                      coordinate={{
                        latitude: user.latitude,
                        longitude: user.longitude,
                        longitudeDelta: 0.001,
                        latitudeDelta: 0.99,
                      }}
                    >
                      <View>
                        <View
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            alignSelf: "center",
                            top: 10,
                          }}
                        >
                          <Avatar size={45} />
                        </View>
                        <MapPinIcon size={80} color={"black"} />
                      </View>
                    </Marker>
                  );
              })
            : null}
        </MapView>
      </View>
    </View>
  );
}
