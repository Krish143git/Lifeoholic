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
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import { MapPinIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../../app.json";
import useLocation from "../useLocation";
import styles from "../../mainNav/mainNavStyles";
import { AntDesign } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';

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

export default function FilterModal({
  visible,
  onClose,
  onSearch,
  isDiscoverFilter = false,
  address,
  type
}) {
  // let discoverFilter = isDiscoverFilter
  //   ? {
  //       discoverPeople: {
  //         friendStatus: false,
  //         businessStatus: false,
  //         matchMakingStatus: false,
  //         travelPartnerStatus: false,
  //         crossPathStatus: false,
  //         height: {
  //           min: 160,
  //           max: 170,
  //         },
  //         gender: [],
  //         bodyType: [],
  //         religion: [],
  //         smoking: [],
  //         drinking: [],
  //       },
  //     }
  //   : {};

  const [state, setState] = useState({
    intrestedIn: "Men",
    bodyTypes: "Slim",
    religions:"Hindu",
    smocking:"No",
    drinking:"Yes",
    location: null,
    distance: {
      min: 16,
      max: 20,
    },
    age: {
      min: 21,
      max: 27,
    },
    height: {
      min: 160,
      max: 170,
    },
    // ...discoverFilter,
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
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          paddingBottom: HEIGHT * 0.2,
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Filter</Text>
          <Text onPress={onClose}>Clear all</Text>
        </View>


          {
            type == "friends" ? 
            <>
            <Section title={"Intrested In"}>
            <View style={{ flexDirection: "row" }}>
              {intrestedIn.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
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
                        el === state.intrestedIn ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        intrestedIn: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.intrestedIn ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
          {Spacer}
            </> : null
          }


{
            type == "business" ? 
            <>
            <Section title={"Gender"}>
            <View style={{ flexDirection: "row" }}>
              {intrestedIn.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
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
                        el === state.intrestedIn ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        intrestedIn: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.intrestedIn ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
          {Spacer}
            </> : null
          }
          

          <Section
          title={"Distance"}
          description={`${state.distance.min}km - ${state.distance.max} KM`}
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


      {
        type == "match" ? (
          <>
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
        </>
        ) : null
      }

        {type == "friends" || type == "business"  ? (
          <>
            <Section
              title={"Height"}
              description={`${state.height.min} - ${state.height.max} CM`}
            >
              <RangeSlider
                min={140}
                max={220}
                fromValueOnChange={(value) =>
                  setState({
                    ...state,
                      height: {
                        ...state.height,
                        min: value,
                      },
                  })
                }
                toValueOnChange={(value) =>
                  setState({
                    ...state,
                      height: {
                        ...state.height,
                        max: value,
                      },
                  })
                }
                initialFromValue={state.height.min}
                initialToValue={state.height.max}
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
          </>
        ) : null}

        {
          type == "business" ? 
          <>
          <Section title={"Job Title"}>
         <View
            style={{
              alignItems:'center',
              flexDirection: "row",
              backgroundColor: "#fff",
              paddingLeft: 10,
              borderWidth: 0.8,
              borderRadius: 10,
              borderColor: "gray",
              marginTop: 10,
            }}
          >
            <TextInput placeholder="Search here..." style={{width:'90%',height:50}}/>
            <MagnifyingGlassIcon  size={20} color={"black"} />
          </View>
          </Section>
       {Spacer}
          </> : null
        }

       <Section title={"Body Type"}>
            <View style={{ flexDirection: "row",flexWrap:'wrap' }}>
              {bodyTypes.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
                      borderWidth: 0.6,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      // marginHorizontal: 8,
                      marginTop: 10,
                      marginRight: 8,
                      minWidth: 80,
                      borderColor: "gray",
                      backgroundColor:
                        el === state.bodyTypes ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        bodyTypes: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.bodyTypes ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
         {Spacer}

         <Section title={"Religion"}>
            <View style={{ flexDirection: "row",flexWrap:'wrap' }}>
              {religions.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
                      borderWidth: 0.6,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      // marginHorizontal: 8,
                      marginTop: 10,
                      marginRight: 8,
                      minWidth: 80,
                      borderColor: "gray",
                      backgroundColor:
                        el === state.religions ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        religions: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.religions ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
         
         {Spacer}

        {
          type == "friends" ? 
          <>
          <Section title={"Languages"}>
         <View
            style={{
              alignItems:'center',
              flexDirection: "row",
              backgroundColor: "#fff",
              paddingLeft: 10,
              borderWidth: 0.8,
              borderRadius: 10,
              borderColor: "gray",
              marginTop: 10,
            }}
          >
            <TextInput placeholder="Search here..." style={{width:'90%',height:50}}/>
            <MagnifyingGlassIcon  size={20} color={"black"} />
          </View>
          </Section>
       {Spacer}
          </> : null
        }

<Section title={"Smoking"}>
            <View style={{ flexDirection: "row" }}>
              {intrestedIn.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
                      borderWidth: 0.6,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      // marginHorizontal: 8,
                      marginTop: 10,
                      marginRight: 8,
                      minWidth: 80,
                      borderColor: "gray",
                      backgroundColor:
                        el === state.smocking ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        smocking: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.smocking ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {Spacer}
         
       <Section title={"Drinking"}>
            <View style={{ flexDirection: "row" }}>
              {drinking.map((el) => {
                return (
                  <TouchableOpacity
                    key={el}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical:10,
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
                        el === state.drinking ? "black" : "transparent",
                    }}
                    onPress={() =>
                      setState({
                        ...state,
                        drinking: el,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: el === state.drinking ? "#fff" : "gray",
                      }}
                    >
                      {el}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {Spacer}

          {
          type == "friends" ? 
          <>
          <Section title={"Interests"}>
         <View
            style={{
              alignItems:'center',
              flexDirection: "row",
              backgroundColor: "#fff",
              paddingLeft: 10,
              borderWidth: 0.8,
              borderRadius: 10,
              borderColor: "gray",
              marginTop: 10,
            }}
          >
            {/* <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              hideResults={false}
              data={Intrests}
              placeholder="Search here..."
              renderItem={({item}) => (
                // For the suggestion view
                <TouchableOpacity
                  onPress={() => {
                   
                  }}>
                  <Text>
                      {item}
                  </Text>
                </TouchableOpacity>
              )}
            /> */}
            <TextInput placeholder="Search here..." style={{width:'90%',height:50}}/>
            <MagnifyingGlassIcon  size={20} color={"black"} />
          </View>
          </Section>
       {Spacer}
          </> : null
        }

        <TouchableOpacity
          style={{
            width: "100%",
            position: "absolute",
            bottom: 20,
            backgroundColor: "black",
            borderRadius: 50,
            padding: 15,
            alignItems:'center'
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
const intrestedIn = ["Men", "Women", "Other"];
const Intrests = [
  "Running","Yoga","Tennis","Soccer","Gym workouts","Cycling","Swimming","Basketball","Hiking","Martial arts","Chess","Shattle"
]
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
