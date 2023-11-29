import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./mainNavStyles";
import { SimpleLineIcons, Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "../BottomBar";
import { PlusIcon, XMarkIcon } from "react-native-heroicons/solid";
import { getProfileToggles, updateToggle } from "../../services/settings";
import { getProfileImage } from "../../services/discovery";
import { fetchFriends, fetchBusiness, fetchMatchMaking, fetchTravelPartner } from '../../services/mainNav';
import axios from "axios";
import NavModel from "./NavModel";
import Loader from "../../common/Loader";
const MainNavComponent = () => {
  const Navigation = useNavigation();
  const [isModalFriendsVisible, setModalFriendsVisible] = useState(false);
  const [isModalBusinessVisible, setModalBusinessVisible] = useState(false);
  const [isModalMatchMakingVisible, setModalMatchMakingVisible] = useState(false);
  const [isModalTravelPartnerVisible, setModalTravelPartnerVisible] = useState(false);
  const [isModalLiveLocationVisible, setModalLiveLocationVisible] = useState(false);
  const [user, setUser] = useState({});
  const [isEnabled, setEnabled] = useState([]);
  const [toggles, setToggles] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [userdata, setUserData] = useState({});
  const [isNewModel, setIsNewModel] = useState(true);
  const [loading,setLoading] = useState(false);

  const navigateTo = (editPage) => {
    console.log('editPage',editPage)
    Navigation.navigate(editPage);
  };


  // const toggleModal = (ind) => {
  //       setModalFriendsVisible(false);
  //       setIsNewModel(false);
  //       navigateTo(navData[ind].editRoute);
  // };

  useEffect(() => {
    AsyncStorage.getItem("personalData").then((user) => {
      setUser(JSON.parse(user));
    });
    fetchToggle();
  }, []);

  const fetchToggle = async () => {
    setLoading(true)
    let profileImage = await getProfileImage();
    setProfileImage(profileImage.image);
    let data = await getProfileToggles();
    let profileToggles = data['profile-toggle'];
    // const toggleObj = {};
    // for (let o in profileToggles) {
    //   if (profileToggles[o]?.type) toggleObj[profileToggles[o]?.type.toLowerCase()] = profileToggles[o].status;
    // }
    setToggles(profileToggles);
    setLoading(false)
  };

  const onToggle = async (nav) => {
    let obj = toggles;
    obj[nav.field]['status'] = !obj[nav.field]?.status;
    setToggles({
      ...obj,
    });
    let toggleReq = {
      id: obj[nav.field]?._id,
      status: obj[nav.field]?.status,
      privacy: false,
      type: obj[nav.field]?.type
    }
    updateToggle(toggleReq,user?._id);

    if (nav.name == "Friends" && obj[nav.field]?.status) {
      let data = await fetchFriends(user._id);
      if (data.message == "friends detail not found") {
        nav.switchRoute("friends detail not found");
      } else {
        nav.switchRoute("");
      }
    } else if (nav.name == "Business" && obj[nav.field]?.status) {
      let data = await fetchBusiness(user._id);
      if (data.message == "business detail not found") {
        nav.switchRoute("business detail not found");
      } else {
        nav.switchRoute("");
      }
    } else if (nav.name == "Match Making" && obj[nav.field]?.status) {
      let data = await fetchMatchMaking(user._id);
      if (data.message == "match making detail not found") {
        nav.switchRoute("match making detail not found");
      } else {
        nav.switchRoute("");
      }
    } else if (nav.name == "Travel Partner" && obj[nav.field]?.status) {
      let data = await fetchTravelPartner(user._id);
      if (data.message == "travel detail not found") {
        nav.switchRoute("travel detail not found");
      } else {
        nav.switchRoute("");
      }
    } else if (nav.name == "Live Location" && obj[nav.field]?.status) {
       nav.switchRoute();
    }
  };


  const navData = [
    {
      id: 1,
      name: "Friends",
      field: "friends",
      to: "friends",
      description: "Please enter your deatils to find new friends",
      toggleModal: () => {
        setIsNewModel(false);
        setModalFriendsVisible(true);
      },
      openActivity: () => {
        setModalFriendsVisible(false);
        setIsNewModel(false);
        navigateTo("FriendEditpage");
      },
      editRoute: "FriendEditpage",
      switchRoute: (res) => {
        if (res == "friends detail not found") {
          setIsNewModel(true);
          setModalFriendsVisible(true);
        } else {
          setIsNewModel(false);
          setModalFriendsVisible(true);
        }

      },
    },
    {
      id: 2,
      name: "Business",
      field: "business",
      to:"business",
      description: "Please enter your deatils to find business partners",
      toggleModal: () => {
        setIsNewModel(false);
        setModalBusinessVisible(true);
      },
      editRoute: "BusinessEditpage",
      openActivity: () => {
        setModalBusinessVisible(false);
        setIsNewModel(false);
        navigateTo("BusinessEditpage");
      },
      switchRoute: (res) => {
        if (res == "business detail not found") {
          setIsNewModel(true);
          setModalBusinessVisible(true);
        } else {
          setIsNewModel(false);
          setModalBusinessVisible(true);
        }
      },
    },
    {
      id: 3,
      name: "Match Making",
      field: "matchMaking",
      to:"match",
      description: "Please enter your deatils to start match making",
      toggleModal: () => {
        setIsNewModel(false);
        setModalMatchMakingVisible(true);
      },
      editRoute: "EditNowMatch",
      openActivity: () => {
        setModalMatchMakingVisible(false);
        setIsNewModel(false);
        navigateTo("EditNowMatch");
      },
      switchRoute: (res) => {
        if (res == "match making detail not found") {
          setIsNewModel(true);
          setModalMatchMakingVisible(true);
        } else {
          setIsNewModel(false);
          setModalMatchMakingVisible(true);
        }
      },
    },
    {
      id: 4,
      name: "Travel Partner",
      field: "travelPartner",
      to:"",
      description: "Please enter your deatils to find travel partner",
      toggleModal: () => {
        setIsNewModel(false);
        setModalTravelPartnerVisible(true);
      },
      openActivity: () => {
        setModalTravelPartnerVisible(false);
        setIsNewModel(false);
        navigateTo("EditNowTravel");
      },
      editRoute: "EditNowTravel",
      switchRoute: (res) => {
        if (res == "travel detail not found") {
          setIsNewModel(true);
          setModalTravelPartnerVisible(true);
        } else {
          setIsNewModel(false);
          setModalTravelPartnerVisible(true);
        }
      },
    },
    {
      id: 5,
      name: "Live Location",
      field: "liveLocation",
      to:"",
      toggleModal: () => {
       navigateTo("AllowLocation")
      },
      switchRoute: () => {
          navigateTo('AllowLocation')
      },
    },
  ];

  const SWITCH_SIZE = Platform.OS === "ios" ? 0.5 : 0.9;

  return (
    <>
      <ScrollView style={styles.container}>
      {loading && <Loader/>}
        <View style={styles.header}>
          <TouchableOpacity
          // onPress={() => Navigation.navigate("ProfileImageUpload")}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: profileImage?.length
                  ? profileImage[0]
                  : "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.bodyContent}>
            <Text style={styles.textPr}>
              {user !== null
                ? user.firstName + " " + user.lastName
                : "John Doe"}
            </Text>
            <Text style={styles.edit}>
              {user !== null ? user.email : "John Doe"}
            </Text>
          </View>
        </View>

        <View style={styles.mainNav}>
          {navData && navData.length > 0 ? (
            navData.map((nav, i) => {
              return (
                <>
                  <View key={nav.id} style={[styles.item, { borderBottomWidth: navData.length - 1 == i ? 0 : 1 }]}>
                    <TouchableOpacity style={styles.nameContainer} onPress={()=>{
                     if(toggles[nav.field]?.status){
                       Navigation.navigate("Home1",{screen: "Discover",params: { type: nav.to },})
                     }
                    }}>
                      <Text style={styles.name}>{nav.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.iconsContainer}>
                      <Feather name="eye-off" style={styles.icon} />
                      <SimpleLineIcons
                        name="pencil"
                        style={styles.icon}
                        disabled={!toggles[nav.field]}
                        onPress={() => nav.toggleModal(i)}
                        color={!toggles[nav.field]?.status ? 'lightgray' : null}
                      />

            
                      <Switch
                        trackColor={{ false: "gray", true: "#00000" }}
                        ios_backgroundColor="#3e3e3e"
                        style={{
                          transform: [
                            { scaleX: SWITCH_SIZE },
                            { scaleY: SWITCH_SIZE },
                          ],
                        }}
                        onValueChange={() => onToggle(nav)}
                        value={toggles[nav.field]?.status}
                      />
                    </View>
                  </View>
                </>
              );
            })
          ) : (
            <Text>No Data</Text>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("Settings");
            }}
          >
            <Text style={styles.btnText}>Subscribe to Premium</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 10,
            marginTop: 20
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "lightgray",
              padding: 5,
              borderRadius: 100,
              width: 45,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigateTo("Home1")}
          >
            {/* <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              X
            </Text> */}
            <XMarkIcon size={20} color={"#000"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isModalFriendsVisible && <NavModel isModalVisible={isModalFriendsVisible} description={navData[0].description} isNewModel={isNewModel} penActivity={() => navData[0].openActivity()} />}
      {isModalBusinessVisible && <NavModel isModalVisible={isModalBusinessVisible} description={navData[1].description} isNewModel={isNewModel} penActivity={() => navData[1].openActivity()} />}
      {isModalMatchMakingVisible && <NavModel isModalVisible={isModalMatchMakingVisible} description={navData[2].description} isNewModel={isNewModel} penActivity={() => navData[2].openActivity()} />}
      {isModalTravelPartnerVisible && <NavModel isModalVisible={isModalTravelPartnerVisible} description={navData[3].description} isNewModel={isNewModel} penActivity={() => navData[3].openActivity()} />}
    </>
  );
};

export default MainNavComponent;
