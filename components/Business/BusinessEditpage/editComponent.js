import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Switch,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./editStyles";
import Carousel from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../../../services/user";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CustomPickModel from '../../../common/CustomPickModel/CustomPickModel';
import { FontAwesome5, Ionicons, Octicons, FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { fetchBusiness } from "../../../services/mainNav";
import TextInputModal from "../../../common/TextInputModal";
import { upperLowerCharacter } from "../../../common/Common";
import { API_BASE_URL } from "../../../services/config";

const { width, height } = Dimensions.get("screen");

const EditComponent = (props) => {
  const Navigation = useNavigation();
  const isCarousel = React.useRef(null);
  const userServices = new UserService();
  const [userid, setUserId] = React.useState('');
  const [selectedName, setSelectedName] = React.useState('');
  const [showAvardsModal, setShowAvardsModal] = useState(false);


  const [state, setState] = React.useState({
    name: 'HI',
    aboutMe: "F",
    lookingFor: "F",
    aboutBusiness: "F",
    educationLevel: "F",
    education: "F",
    school: "F",
    areUStudent: false,
    experience: "D",
    jobTitle: "D",
    industry: "D",
    organisation: "D",
    awardsAndAchievements: ["D"],
    languagesKnown: ["D"],
    personality: ["D"],
    interestedIn: ["D"],
    homeTown: "D",
    currentLocation: "D"
  });

  const SWITCH_SIZE = Platform.OS === "ios" ? 0.5 : 0.9;

  const data = [
    {
      imgUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190430-make-friends-app-1556655645.jpg?crop=0.502xw:1.00xh;0.235xw,0&resize=640:*",
    },
    {

      imgUrl: "https://m.economictimes.com/thumb/msid-84889480,width-1200,height-900,resizemode-4,imgsize-143058/friends.jpg",
    },
    {

      imgUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/19/18/idoh-socialise.jpg?quality=75&width=982&height=726&auto=webp",
    },
  ];

  const LookingFor = ['Hire Employees', 'Fine a New Job', 'Invest in Project', 'Find a Investor', 'Find a Mentor', 'Find a co-founder', 'Grow a business', 'Hire Freelancers', 'Make New Friends', 'Idea Validator'];

  const section1 = [
    {
      key: 'Education Level', icon: <FontAwesome name="graduation-cap" size={20} color="black" />, data: { name: state.educationLevel },
      listData: ["Under Graduate", "Graduate", "Post Graduate"]
    },
    {
      key: 'Education', icon: <FontAwesome5 name="book-open" size={18} color="black" />, data: { name: state.education },
      listData: ["Engineering", "Degree", "Intermediate", "MCA", "Msc"]
    },
    {
      key: 'School', icon: <FontAwesome5 name="school" size={20} color="black" />, data: { name: state.school },
      listData: ["IT, Madras", "IT, Khanpur", "Class X", "Class XII"]
    },
  ]

  const section2 = [
    {
      key: 'Experience', icon: <Ionicons name="calendar" size={20} color="black" />, data: { name: state.experience },
      listData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },
    {
      key: 'Job Title', icon: <Image source={require('../../../assets/images/portfolio.png')} style={{ width: 20, height: 20, marginTop: 20 }} />, data: { name: state.jobTitle },
      listData: ["S.E", "Consultant", "Assosiate Developer", "Manager", "Architect"]
    },
    {
      key: 'Industry', icon: <Ionicons name="logo-bitbucket" size={20} color="black" />, data: { name: state.industry },
      listData: ["I.T", "Auto mobile", "Tele communications", "Hardware", "Mechanical"]
    },
    {
      key: 'Organisation', icon: <FontAwesome name="building" size={16} color="black" />, data: { name: state.organisation },
      listData: ["OZONE", "TESLA", "Google", "Microsoft"]
    },
  ];

  const section3 = [
    {
      key: 'Languages Known', icon: <Image source={require('../../../assets/images/language.png')} style={styles.icon} />, data: { name: state.languagesKnown },
      listData: ["English", "Hindi", "Urdu", "Telugu", "Tamil", "Kannada"]
    },
    {
      key: 'Personality', icon: <MaterialCommunityIcons name="human-child" size={24} color="black" />, data: { name: state.personality },
      listData: ["Kind", "Joyful", "Warrior", "Cool", "Scholar"]
    },
    {
      key: 'Interested In', icon: <FontAwesome name="paint-brush" size={18} color="black" />, data: { name: state.interestedIn },
      listData: {
        "Sports and Fitness": [
          "Running", "Yoga", "Tennis", "Soccer", "Gym workouts", "Cycling", "Swimming", "Basketball", "Hiking", "Martial arts", "Chess", "Shattle"],
        "Arts and Culture": [
          "Painting", "Photography", "Writing", "Sculpting", "Drawing", "Film and cinema", "Music (listening or playing)", "Theater", "Literature", "Dance"
        ],
        "Food and Dining": [
          "Cooking", "Trying new restaurants", "Baking", "Wine tasting", "Coffee lovers", "Vegetarian/vegan cuisine", "Foodie adventures", "Farmers markets", "Culinary explorations", "Exotic cuisines"
        ],
        "Travel and Adventure": [
          "Backpacking", "Road trips", "Camping", "Exploring new cities", "Adventure sports", "Hiking trails", "Beach destinations", "Cultural tourism", "Mountain climbing", "Historical sites"
        ],
        "Technology and Gaming": [
          "Video games", "Coding/programming", "Virtual reality", "Mobile apps", "AI and machine learning", "Web development", "Tech gadgets", "E-sports",
          "Science and technology news", "Computer hardware"
        ],
        "Nature and Outdoors": [
          "Gardening", "Birdwatching", "Wildlife conservation", "Nature photography", "Beach walks", "Outdoor photography", "National parks", "Environmental activism", "Sailing", "Stargazing"
        ],
        "Music and Entertainment": [
          "Live concerts", "Music festivals", "DJ events", "Karaoke", "Playing musical instruments", "Jazz and blues", "Pop and rock", "Classical music", "Broadway shows", "Stand-up comedy"
        ],
        "Reading and Learning": [
          "Book clubs", "Self-improvement", "History", "Science and technology", "Philosophy", "Personal development", "TED Talks", "Podcasts", "Educational workshops", "Language learning"
        ],
        "Social Causes": [
          "Volunteering", "Animal rights", "Environmental conservation", "Human rights", "Community service", "Sustainable living", "Charity work", "Fundraising events", "Social justice", "Advocacy"
        ],
        "Personal Development": [
          "Meditation", "Mindfulness", "Self-reflection", "Goal setting", "Life coaching", "Fitness challenges", "Positive psychology", "Stress management", "Leadership skills", "Time management"
        ]
      }
    },
  ]

  const section4 = [
    {
      key: 'Home Town', icon: <FontAwesome name="home" size={22} color="black" />, data: { name: state.homeTown },
      listData: ["Mysore", "Koimbatur", "Nellore", "Tirupathi", "Guntur"]
    },
    {
      key: 'Current Location', icon: <Ionicons name="location-sharp" size={22} color="black" />, data: { name: state.currentLocation },
      listData: ["Banglore", "Chennai", "Andhra Pradesh", "Telangana", "Utter Pradesh"]
    },
  ]

  const handleSetAvardsAcheivements = (text) => {
    if (text) {
      const temp = [...state.awardsAndAchievements];
      temp.push(text);
      setState({ ...state, awardsAndAchievements: temp });
      setShowAvardsModal(false);
    }
  }



  useEffect(() => {
    AsyncStorage.getItem("userId").then((res) => {
      console.log(res)
      setUserId(res);
    }).catch((error) => {
      setUserId(error)
    })
    fetchBusinessData();
  }, []);



  const fetchBusinessData = async () => {
    AsyncStorage.getItem('personalData').then(async (res) => {
      let usrData = JSON.parse(res);
      if (usrData) {
        setState({
          ...state,
          name: usrData.firstName,
        })

      }
      const data = await fetchBusiness(usrData._id);
      console.log('usrData', data)
    })
  }

  const renderOptionList = (optionsItem) => {
    const itemLable = upperLowerCharacter(optionsItem.key);
    let selectedItems = optionsItem.data.name;
    return (
      <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          optionsItem.listData.map((item, ind) => {
            return (
              <TouchableOpacity onPress={() => addRemoveLanguages(item, itemLable)} style={{ padding: 10, borderWidth: 1, borderRadius: 10, margin: 5, backgroundColor: selectedItems.includes(item) ? 'lightgray' : null }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const addRemoveLanguages = (item, itemLable) => {
    let tempArr = [...state[itemLable]];
    if (tempArr.includes(item)) {
      let index = tempArr.indexOf(item);
      tempArr.splice(index, 1);
    } else {
      tempArr.push(item);
    }
    setState({ ...state, [itemLable]: tempArr })
  }

  const renderOptionList1 = (optionsItem, item) => {
    const itemLable = upperLowerCharacter(item.key);
    let selectedItems = item.data.name;
    return (
      <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          optionsItem.map((item, ind) => {
            return (
              <TouchableOpacity onPress={() => addRemoveLanguages(item, itemLable)} style={{ padding: 10, borderWidth: 1, borderRadius: 10, margin: 5, backgroundColor: selectedItems.includes(item) ? 'lightgray' : null }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const renderIntrest = (item) => {
    let keys = Object.keys(item.listData);
    let data = item.listData;
    return (
      <View style={{ margin: 10 }}>
        {
          keys.map((itm) => {
            return (
              <View>
                <Text style={{ color: '#000' }}>{itm}</Text>
                {renderOptionList1(data[itm], item)}
              </View>
            )
          })
        }
      </View>
    )
  }

  const createBusinessProfiles =async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/data/bussiness/create`, {
        userId: userid,
        aboutMe: state.aboutMe,
        lookingFor: state.lookingFor,
        aboutBusiness: state.aboutBusiness,
        educationLevel: state.educationLevel,
        education: state.education,
        school: state.school,
        areUStudent: state.areUStudent,
        experience: state.areUStudent ? "" : state.experience,
        jobTitle: state.areUStudent ? "" : state.jobTitle,
        industry: state.areUStudent ? "" : state.industry,
        organization: state.areUStudent ? "" : state.organisation,
        awardsAndAchievements: state.awardsAndAchievements,
        languageKnown: state.languagesKnown,
        personality: state.personality,
        interestedIn: state.interestedIn,
        homeTown: state.homeTown,
        currentLocation: state.currentLocation
      });
      // Process the API response here
      if (response.status === 200) {
        // Details updated successfully
        Alert.alert('Success', 'Details Created successfully');
      } else {
        // Handle other response statuses if needed
        Alert.alert('Error', 'Failed to Create Business details');
      }
    } catch (error) {
      alert(error.message)
      // Handle any errors that occurred during the API call
      Alert.alert('Error', 'An error occurred while updating details');
    }
  };


  const updateDetails = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/data/matchM/update/${""}`, {
        userId: userid,
        aboutMe: state.aboutMe,
        lookingFor: state.lookingFor,
        aboutBusiness: state.aboutBusiness,
        educationLevel: state.educationLevel,
        education: state.education,
        school: state.school,
        areUStudent: state.areUStudent,
        experience: state.areUStudent ? "" : state.experience,
        jobTitle: state.areUStudent ? "" : state.jobTitle,
        industry: state.areUStudent ? "" : state.industry,
        organization: state.areUStudent ? "" : state.organisation,
        awardsAndAchievements: state.awardsAndAchievements,
        languageKnown: state.languagesKnown,
        personality: state.personality,
        interestedIn: state.interestedIn,
        homeTown: state.homeTown,
        currentLocation: state.currentLocation
      });

      // Process the API response here
      if (response.status === 200) {
        // Details updated successfully
        Alert.alert('Success', 'Details updated successfully');
      } else {
        // Handle other response statuses if needed
        Alert.alert('Error', 'Failed to update details');
      }
    } catch (error) {
      alert(error.message)
      // Handle any errors that occurred during the API call
      Alert.alert('Error', 'An error occurred while updating details');
    }
  };

  const navigateToPreviewProfile = () => {
    Navigation.navigate("Aboutme", { "personalData": state });
  }

  const addRemoveLookingFor = (item, ind) => {
    let tempLooking = state.aboutBusiness;
    if (!tempLooking.includes(item)) {
      setState({ ...state, aboutBusiness: item })
    } else {
      setState({ ...state, aboutBusiness: '' })
    }
  }


  const renderImage = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Carousel
        layout="tinder"
        // layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={renderImage}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideShift={0}
        useScrollView={true}
      />
      {/* <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            /> */}
      <View>
        <Text style={styles.name}>{state.name}</Text>
        <SafeAreaView>
          <Text style={styles.text}>About Me</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter here"
            editable={true}
            keyboardType="text"
            onChangeText={(text) => { setState({ ...state, aboutMe: text }) }}
          />
          {/* <Text  style={styles.detailsText}>Bascic Details</Text> */}
        </SafeAreaView>
      </View>
      {/*
      commented following code becase of figma
      */}
      <View>
        <Text style={styles.subnames}>Looking For</Text>
        <Text style={styles.text}>What are you looking for</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          editable={true}
          keyboardType="text"
          onChangeText={(text) => { setState({ ...state, lookingFor: text }) }}
        />
      </View>

      <View style={styles.button}>
        {
          LookingFor.map((item, ind) => {
            return (
              <TouchableOpacity onPress={() => addRemoveLookingFor(item, ind)} style={[styles.buttons, { backgroundColor: state.aboutBusiness === item ? 'lightgray' : null }]}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>


      <View style={styles.list}>
        {
          section1.map((item, ind) => {
            return (
              <>
                <TouchableOpacity onPress={() => { setSelectedName(item.key) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.icon}</Text>
                    <Text style={[styles.item, item.style]}>{item.key}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ width: 100, textAlign: 'right' }}>{item.data.name}</Text>
                    <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                  </View>
                </TouchableOpacity>
                {
                  selectedName == item.key ?
                    <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                }
              </>
            )
          })
        }
      </View>


      <View style={styles.list}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <MaterialCommunityIcons name="zodiac-virgo" size={24} color="black" />
            <Text style={[styles.item]}>I am student</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Switch
              trackColor={{ false: "gray", true: "#00000" }}
              ios_backgroundColor="#3e3e3e"
              style={{
                transform: [
                  { scaleX: SWITCH_SIZE },
                  { scaleY: SWITCH_SIZE },
                ],
              }}
              onValueChange={() => setState({ ...state, areUStudent: !state.areUStudent })}
              value={state.areUStudent}
            />
          </View>
        </View>

        {!state.areUStudent && <>
          <View style={styles.line} />
          {
            section2.map((item, ind) => {
              return (
                <>
                  <TouchableOpacity onPress={() => { setSelectedName(item.key) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{item.icon}</Text>
                      <Text style={[styles.item, item.style]}>{item.key}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ width: 100, textAlign: 'right' }}>{item.data.name}</Text>
                      <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                    </View>

                  </TouchableOpacity>
                  {
                    selectedName == item.key ?
                      <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                  }
                </>
              )
            })
          }
        </>
        }
      </View>

      <>
        <View style={styles.list}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Ionicons name="trophy-sharp" size={24} color="black" />
              <Text style={[styles.item]}>{'Avards & Achievements'}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowAvardsModal(true)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.item, { fontSize: 14 }]}>{'+ Add'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={{ display: 'flex', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 5 }}>
            {
              state.awardsAndAchievements.map((item, ind) => {
                return (
                  <Text style={{ marginBottom: 5 }}>{ind + 1 + " " + item}</Text>
                )
              })
            }
          </View>
        </View>
        <TextInputModal title={'Avards & Achievements'} setShowAvardsModal={handleSetAvardsAcheivements} isVisible={showAvardsModal} />
      </>


      <View style={styles.list}>
        {
          section3.map((item, ind) => {
            return (
              <>
                <TouchableOpacity onPress={() => { setSelectedName(item.key) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.icon}
                    <Text style={[styles.item, item.style]}>{item.key}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ width: 90, textAlign: 'right' }}>
                      {
                        Array.isArray(item.data.name) ?
                          item.data.name.map(n => n + ",")
                          : item.data.name}</Text>
                    <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                  </View>

                </TouchableOpacity>
                {
                  selectedName == item.key ? Array.isArray(item.data.name) ? item.key == "Interested In" ? renderIntrest(item) :
                    renderOptionList(item)
                    : <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                }
              </>
            )
          })
        }
      </View>

      <View style={styles.list}>
        {
          section4.map((item, ind) => {
            return (
              <>
                <TouchableOpacity onPress={() => { setSelectedName(item.key) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.icon}</Text>
                    <Text style={[styles.item, item.style]}>{item.key}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.data.name}</Text>
                    <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                  </View>
                </TouchableOpacity>
                {
                  selectedName == item.key ?
                    <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                }
              </>
            )
          })
        }
      </View>



      <View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigateToPreviewProfile()}>
            <Text style={styles.btnText}>Preview Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer1}>
          <TouchableOpacity onPress={() => createBusinessProfiles()}>
            <Text style={styles.btnText1}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditComponent;
