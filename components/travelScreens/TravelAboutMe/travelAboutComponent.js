import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./travelAboutStyles";
import { useRoute } from '@react-navigation/native';
import UserService from "../../../services/user";
import { FontAwesome5,AntDesign, Ionicons, Octicons, FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
//Business screen

const image = {
  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
};

const AboutComponent = (props) => {
  const [about, setAbout] = useState([]);
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService();
  const route = useRoute();
  const { personalData } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      let friendsData = await userService.fetchFriendsData();
      console.log("HEllo", friendsData)
      if (friendsData) setPerson({ ...friendsData });
    };
    //uncomment later
    fetchData();
  }, []);


  const renderPersonalPreviewCard = (type) => {
    console.log(type)
    switch (type) {
      case "age":
      return ( <TouchableOpacity style={styles.badge2}>
        <FontAwesome5 name="calendar-day" size={16} color="black" style={{ marginLeft: 5 }} />
        <Text style={styles.badgeText}>{personalData[type]} Yrs</Text>
       </TouchableOpacity>)
        case "height":
          return ( <TouchableOpacity style={styles.badge2}>
            <MaterialIcons name="height" size={20} color="black" />
            <Text style={styles.badgeText}>{personalData[type]}</Text>
           </TouchableOpacity>)
         case "bodyType":
          return ( <TouchableOpacity style={styles.badge2}>
            <FontAwesome5 name="male" size={20} color="black" style={{ marginLeft: 10 }} />
            <Text style={styles.badgeText}>{personalData[type]}</Text>
           </TouchableOpacity>)
          case "zodiacSign":
            return ( <TouchableOpacity style={styles.badge2}>
              <MaterialCommunityIcons name="zodiac-virgo" size={24} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "religion":
            return ( <TouchableOpacity style={styles.badge2}>
             <FontAwesome5 name="praying-hands" size={18} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
             case "caste":
              return ( <TouchableOpacity style={styles.badge2}>
               <FontAwesome5 name="praying-hands" size={18} color="black" />
                <Text style={styles.badgeText}>{personalData[type]}</Text>
               </TouchableOpacity>)
           case "maritalStatus":
            return ( <TouchableOpacity style={styles.badge2}>
            <AntDesign name="heart" size={18} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
            case "motherTongue":
              return ( <TouchableOpacity style={styles.badge2}>
             <Image source={require('../../../assets/images/language.png')} style={styles.icon} />
                <Text style={styles.badgeText}>{personalData[type]}</Text>
               </TouchableOpacity>)
           case "education":
            return ( <TouchableOpacity style={styles.badge2}>
            <FontAwesome5 name="book-open" size={18} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "work":
            return ( <TouchableOpacity style={styles.badge2}>
           <Image source={require('../../../assets/images/portfolio.png')} style={{ width: 20, height: 20 }} />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "languagesKnown":
            return ( <TouchableOpacity style={styles.badge2}>
           <Image source={require('../../../assets/images/language.png')} style={styles.icon} />
              <Text style={styles.badgeText}>{personalData[type].join(',')}</Text>
             </TouchableOpacity>)
             case "educationLevel":
              return ( <TouchableOpacity style={styles.badge2}>
            <FontAwesome name="graduation-cap" size={20} color="black" />
                <Text style={styles.badgeText}>{personalData[type]}</Text>
               </TouchableOpacity>)
          case "industry":
            return ( <TouchableOpacity style={styles.badge2}>
            <Ionicons name="cube" size={20} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "salary":
            return ( <TouchableOpacity style={styles.badge2}>
           <FontAwesome5 name="comments-dollar" size={20} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "somoking":
            return ( <TouchableOpacity style={styles.badge2}>
           <FontAwesome5 name="smoking" size={20} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "drinking":
            return ( <TouchableOpacity style={styles.badge2}>
         <Entypo name="drink" size={20} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
           case "personality":
            return ( <TouchableOpacity style={styles.badge2}>
        <MaterialCommunityIcons name="human-child" size={24} color="black" />
              <Text style={styles.badgeText}>{personalData[type].join(',')}</Text>
             </TouchableOpacity>)
           case "lookingFor":
            return ( <TouchableOpacity style={styles.badge2}>
       <MaterialCommunityIcons name="human-male-female" size={24} color="black" />
              <Text style={styles.badgeText}>{personalData[type]}</Text>
             </TouchableOpacity>)
      default:
        return null
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
        >
        </ImageBackground>
        <View style={styles.header}>

        <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButon}>
            <MaterialIcons name="chat" size={24} color="black" />  
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButon}>
            <Octicons name="heart-fill" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButon}>
            <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.name}>{personalData.name}
            <Text>, {personalData.age}</Text>
            </Text>
            <Text
              style={styles.para}
            >{`${personalData?.currentLocation} ,${personalData?.work}`}</Text>
          </View>


          <View>
            <Text style={styles.subname}>About Me</Text>
            <Text style={styles.para}>{personalData?.aboutMe}</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
              }}
            />
            <SafeAreaView>
              <TextInput
                style={styles.text}
                placeholder="Type your Comment.."
                editable={true}
              />
            </SafeAreaView>
          </View>

          {/* <View style={styles.line} /> */}

          {/* <View>
            <Text style={styles.subnames}>Miriam's Post</Text>
            <View style={styles.box}>
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
            </View>
            <View style={styles.box}>
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
              <Image
                style={styles.images}
                source={{
                  uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
                }}
              />
              <TouchableOpacity style={styles.images}>
                <Text>+20</Text>
                <Text>View All</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={styles.line} />

          <View style={styles.button}>
            {
              Object.keys(personalData).map((item,ind)=>{
              return renderPersonalPreviewCard(item)
              })
            }
          </View>

          <View style={{ flexDirection: "row" }}>
            {person?.personality?.map((el) => (
              <TouchableOpacity style={styles.badge1}>
                <Text>{el}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.line} />

          <View>
            <Text style={styles.subnames}>Interests</Text>
            <View style={styles.button}>
              {
                personalData?.intrestedIn.map((item,ind)=> {
                  return (
                    <TouchableOpacity style={styles.interest}>
                    <Text style={styles.badgeText}>{item}</Text>
                  </TouchableOpacity>
                  )
                })
              }
            </View>
            {/* <View style={styles.button}>
              <TouchableOpacity style={styles.interest}>
                <Text>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interest}>
                <Text>Reading</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interest}>
                <Text>Movies</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.line} />

          <View>
          <Text style={styles.subnames}>Current Location</Text>

            <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10,alignItems:'center'}}>
            <FontAwesome name="home" size={22} color="black" />
            <Text style={styles.paraLoc}>{personalData?.homeTown}</Text>

            <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10,alignItems:'center'}}>
            <Ionicons name="location-sharp" size={22} color="black" />
            <Text style={styles.paraLoc}>{personalData?.currentLocation}</Text>
            </View>
            </View>
          </View>

          <View style={styles.iconContainerBottom}>
            <TouchableOpacity style={styles.iconButonBottom}>
            <MaterialIcons name="chat" size={24} color="black" />  
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButonBottom}>
            <Octicons name="heart-fill" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButonBottom}>
            <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* <View>
            <Text style={styles.subnames}>Current Location</Text>
            <Text style={styles.para}>{person?.currentLocation}</Text>
          </View> */}

          <Text style={styles.hideRepText}>Hide . Report</Text>

        </View>
      </View>
    </ScrollView>
  );
};

export default AboutComponent;
