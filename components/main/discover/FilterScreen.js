import {
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Image,
    Switch,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import RangeSlider, { Slider } from "react-native-range-slider-expo";
  import { MapPinIcon } from "react-native-heroicons/solid";
  import { SimpleLineIcons, Feather } from "@expo/vector-icons";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import config from "../../../app.json";
  import useLocation from "../useLocation";
  import styles from "../../mainNav/mainNavStyles";
  
  const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
  const navData = [
    {
      id: 1,
      name: "Friends",
      field: "friendStatus",
    },
    {
      id: 2,
      name: "Business",
      field: "businessStatus",
    },
    {
      id: 3,
      name: "Match Making",
      field: "matchMakingStatus",
    },
    {
      id: 4,
      name: "Travel Partner",
      field: "travelPartnerStatus",
    },
    {
      id: 5,
      name: "Cross paths",
      field: "crossPathStatus",
    },
  ];
  
  export default function FilterScreen({
    visible,
    onClose,
    onSearch,
    isDiscoverFilter = true,
    address,
  }) {
    let discoverFilter = isDiscoverFilter
      ? {
          discoverPeople: {
            friendStatus: false,
            businessStatus: false,
            matchMakingStatus: false,
            travelPartnerStatus: false,
            crossPathStatus: false,
            height: {
              min: 160,
              max: 170,
            },
            gender: [],
            bodyType: [],
            religion: [],
            smoking: [],
            drinking: [],
          },
        }
      : {};
  
    const [state, setState] = useState({
      seeking: "Men",
      location: null,
      distance: {
        min: 16,
        max: 20,
      },
      age: {
        min: 21,
        max: 27,
      },

      ...discoverFilter,
    });
    const autoPlaceCompleteRef = useRef(null);
  
    useEffect(() => {
      if (autoPlaceCompleteRef.current && address) {
        autoPlaceCompleteRef.current.setAddressText(address);
      }
    }, [address]);
  
    const handleDiscoverAttribute = (attrName, value) => {
      let discover = state.discoverPeople[attrName];
      if (discover.includes(value)) discover.splice(discover.indexOf(value), 1);
      else discover.push(value);
  
      setState({
        ...state,
        discoverPeople: {
          ...state.discoverPeople,
          [attrName]: discover,
        },
      });
    };
  
    return (
      <Modal visible={visible}>
        <ScrollView
         showsVerticalScrollIndicator={false}
          style={{
            marginVertical: 8,
            paddingHorizontal: 8,
          }}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            <Text></Text>
            <Text style={{ fontWeight: "bold", fontSize: 22,textAlign:'center' }}>Preferences</Text>
            <Text style={{fontWeight:'bold'}} onPress={onClose}>Clear all</Text>
          </View>
          <View>
            <Section title={"Seeking"}>
              <View style={{ flexDirection: "row" }}>
                {seeking.map((el) => {
                  return (
                    <TouchableOpacity
                      key={el}
                      style={{
                        padding: 10,
                        borderWidth: 0.6,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        // marginHorizontal: 8,
                        marginTop: 8,
                        marginRight: 8,
                        minWidth: 80,
                        borderColor: "gray",
                        backgroundColor:
                          el === state.seeking ? "black" : "transparent",
                      }}
                      onPress={() =>
                        setState({
                          ...state,
                          seeking: el,
                        })
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: el === state.seeking ? "#fff" : "gray",
                        }}
                      >
                        {el}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Section>
  
            {isDiscoverFilter ? (
              <>
                {Spacer}
                <Section title={"Discover People"}>
                  {navData.map((nav) => {
                    return (
                      <>
                        <View key={nav.id} style={styles.item}>
                          <View style={styles.nameContainer}>
                            <Text style={styles.name}>{nav.name}</Text>
                          </View>
                          <View style={styles.iconsContainer}>
                            <Switch
                              trackColor={{ false: "gray", true: "#00000" }}
                              thumbColor={"#fff"}
                              ios_backgroundColor="#3e3e3e"
                              style={{
                                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                              }}
                              onValueChange={() => {
                                setState({
                                  ...state,
                                  discoverPeople: {
                                    ...state.discoverPeople,
                                    [nav.field]: !state.discoverPeople[nav.field],
                                  },
                                });
                              }}
                              value={state.discoverPeople[nav.field]}
                            />
                          </View>
                        </View>
                      </>
                    );
                  })}
                </Section>
              </>
            ) : null}
            {Spacer}
            <View
              style={{
                // position: "absolute",
                // zIndex: 1,
                // width: WIDTH * 0.95,
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 2,
                borderWidth: 0.8,
                borderRadius: 10,
                borderColor: "gray",
                marginTop: 10,
              }}
            >
              <GooglePlacesAutocomplete
                ref={autoPlaceCompleteRef}
                placeholder="Search"
                onPress={(data, details) => {
                  // 'details' is provided when fetchDetails = true
                  setState({
                    ...state,
                    location: {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    },
                  });
                }}
                fetchDetails
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
          </View>
          <Section
            title={"Distance"}
            description={`${state.distance.min}km - ${state.distance.max}km`}
          >
            <RangeSlider
              min={1}
              max={30}
              fromValueOnChange={(value) =>
                setState({
                  ...state,
                  distance: {
                    ...state.distance,
                    min: value,
                  },
                })
              }
              toValueOnChange={(value) =>
                setState({
                  ...state,
                  distance: {
                    ...state.distance,
                    max: value,
                  },
                })
              }
              initialFromValue={state.distance.min}
              initialToValue={state.distance.max}
              containerStyle={{
                padding: 0,
                paddingHorizontal: 16,
  
                height: 50,
                justifyContent: "center",
              }}
              showRangeLabels={false}
              fromKnobColor="#000000"
              toKnobColor="#000000"
              styleSize="small"
            />
          </Section>
  
          <Section
            title={"Age"}
            description={`${state.age.min} - ${state.age.max} Years`}
          >
            <RangeSlider
              min={1}
              max={30}
              fromValueOnChange={(value) =>
                setState({
                  ...state,
                  age: {
                    ...state.age,
                    min: value,
                  },
                })
              }
              toValueOnChange={(value) =>
                setState({
                  ...state,
                  age: {
                    ...state.age,
                    max: value,
                  },
                })
              }
              initialFromValue={state.age.min}
              initialToValue={state.age.max}
              containerStyle={{
                padding: 0,
                paddingHorizontal: 16,
                height: 50,
                justifyContent: "center",
              }}
              showRangeLabels={false}
              fromKnobColor="#000000"
              toKnobColor="#000000"
              styleSize="small"
            />
          </Section>
          {Spacer}
  
          {isDiscoverFilter ? (
            <>
              <Section
                title={"Height"}
                description={`${state.discoverPeople.height.min} - ${state.discoverPeople.height.max} Years`}
              >
                <RangeSlider
                  min={140}
                  max={220}
                  fromValueOnChange={(value) =>
                    setState({
                      ...state,
                      discoverPeople: {
                        ...state.discoverPeople,
                        height: {
                          ...state.discoverPeople.height,
                          min: value,
                        },
                      },
                    })
                  }
                  toValueOnChange={(value) =>
                    setState({
                      ...state,
                      discoverPeople: {
                        ...state.discoverPeople,
                        height: {
                          ...state.discoverPeople.height,
                          max: value,
                        },
                      },
                    })
                  }
                  initialFromValue={state.discoverPeople.height.min}
                  initialToValue={state.discoverPeople.height.max}
                  containerStyle={{
                    padding: 0,
                    paddingHorizontal: 16,
                    height: 50,
                    justifyContent: "center",
                  }}
                  showRangeLabels={false}
                  fromKnobColor="#000000"
                  toKnobColor="#000000"
                  styleSize="small"
                />
              </Section>
              {Spacer}
              {discoverPeopleElements.map((discover) => {
                return (
                  <Section title={discover.title}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {discover?.data &&
                        discover.data.map((el) => {
                          return (
                            <CategoryButton
                              title={el}
                              onPress={() =>
                                handleDiscoverAttribute(discover.field, el)
                              }
                              fill={state.discoverPeople[discover.field].includes(
                                el
                              )}
                            />
                          );
                        })}
                    </View>
                  </Section>
                );
              })}
  
              {Spacer}
            </>
          ) : null}
  
          {Spacer}
          <TouchableOpacity
            style={{
              width: "100%",
              // position: "absolute",
              // bottom: HEIGHT * 0.1,
              backgroundColor: "black",
              borderRadius: 50,
              padding: 20,
              alignSelf: "center",
            }}
            onPress={() => onSearch(state)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  }
  
  const Section = ({ title, description, children }) => (
    <View>
      {Spacer}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{ fontWeight: "bold", color: "black", fontSize: 20, flex: 1 }}
        >
          {title}
        </Text>
        <Text style={{ color: "black", fontSize: 14, marginTop: 3 }}>
          {description}
        </Text>
      </View>
      {children && children}
    </View>
  );
  
  const CategoryButton = ({ title, onPress, fill, icon }) => {
    return (
      <TouchableOpacity
        style={{
          minWidth: 80,
          borderRadius: 20,
          padding: 8,
          backgroundColor: fill ? "#000000" : "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: 8,
          borderWidth: 0.5,
          borderColor: "#e2e2e2",
        }}
        onPress={onPress}
      >
        {icon && icon}
        <Text style={{ textAlign: "center", color: fill ? "white" : "black" }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const Spacer = <View style={{ marginVertical: 8 }} />;
  const bodyTypes = ["Slim", "Average", "Athletic", "Muscular", "Chubby", "Fat"];
  const religions = [
    "Christian",
    "Hindu",
    "Muslim",
    "Jain",
    "Buddist",
    "Atheist",
  ];
  const smocking = ["Yes", "No", "Socially"];
  const drinking = ["Yes", "No", "Socially"];
  const seeking = ["Men", "Women", "Both"];
  const discoverPeopleElements = [
    {
      title: "Body Type",
      field: "bodyType",
      data: bodyTypes,
    },
    {
      title: "Religion",
      field: "religion",
      data: religions,
    },
    {
      title: "Smoking",
      field: "smoking",
      data: smocking,
    },
    {
      title: "Drink",
      field: "drinking",
      data: drinking,
    },
  ];
  