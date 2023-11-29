import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { PlusIcon, XMarkIcon } from "react-native-heroicons/solid";
import { BottomSheet } from "react-native-btr";
import { getProfileImage, updateProfile } from "../../../services/discovery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {API_BASE_URL} from '../../../services/config'
const { width, height } = Dimensions.get("screen");
const ProfileImageUpload = () => {
  const Navigation = useNavigation();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [personalData, setPersonalData] = useState([]);

  useEffect(() => {
AsyncStorage.getItem('userdata').then((res)=>
{
  console.log(res);
  setPersonalData(JSON.parse(res))
}).catch((error)=>
{
  console.log(error);
})
    // setPersonalData(userdata)
    fetchProfileImage();

  }, []);

  const fetchProfileImage = async () => {
    let profileImage = await getProfileImage();
    let oldImages = images;
    let i = 0;
    for (let img of profileImage.image) {
      if (oldImages.length) oldImages[i].uri = img;
      else oldImages.push({ uri: img });
      i++;
    }
    setImages([...oldImages]);
  };

  const pickImage = async (selectedOption, index) => {
    setIsVisible(false);
    let result = null;
    if (selectedOption === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      let _images = images;
      console.log(result, images);
      _images[index] = result;
      setImages([..._images]);
    }
  };


  const removeImage =(ind)=> {
    let _img = [...images];
   let fnImgs = _img.filter((itm,index)=> index != ind);
   setImages(fnImgs);
  }

  const handleUpload = async (index) => {
    const UserId=await AsyncStorage.getItem('userId')
    axios.post(`${API_BASE_URL}/picture-verify-step-1`,{uploadImage:images,useId:UserId}).then((res)=>
    {
      console.log(res);
    }).catch((error)=>
    {
      console.log(error.message);
    })
    console.log(index,'index')
    if(!index){
      pickImage("camera", index)
    }else{
      setIsVisible(true);
      setSelectedIndex(index);
    }
  };

  const handleUpdateImage = async () => {
    console.log('clicked')
    try {
      var pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      let userId =JSON.parse(await AsyncStorage.getItem("userId"));
      for (let img of images) {
        if (pattern.test(img.uri)) {
          const formData = new FormData();
          formData.append("userId", userId);
          formData.append("uploadImage", {
            uri: img.uri,
            name: `profile-image${img.uri.substr(img.uri.lastIndexOf("."))}`,
            type: `image/${img.uri.substr(img.uri.lastIndexOf(".") + 1)}`,
          });
          let response = await updateProfile(formData);
          console.log(response, "@upload Image");
          // navigation.goBack();
        }
      }
      Navigation.navigate('Mainnav')
    } catch (error) {
      console.log(error);
    }
  };

  const userFirstName = (name) => {
    const names = name.split(" ");
    return `${names[0]}!`;
  }

  const renderOptions = () => (
    <View style={{ padding: 16, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{ paddingVertical: 16 }}
        onPress={() => pickImage("camera", selectedIndex)}
      >
        <Text style={{ fontSize: 18 }}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 16 }}
        onPress={() => pickImage("gallery", selectedIndex)}
      >
        <Text style={{ fontSize: 18 }}>Open Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 16 }}
        onPress={() => setIsVisible(false)}
      >
        <Text style={{ fontSize: 18 }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.previewContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.previewImage}
              />
            ) : (
              <Image
                source={{
                  uri: images.length
                    ? images[0].uri
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                }}
                style={styles.previewImage}
              />
            )}
            <Text style={styles.welcomeText}>Welcome, {personalData.username ? userFirstName(personalData.username) : null}</Text>
            <Text style={styles.welcomeSubText}>Want to add more pictures?</Text>
          </View>
          <View style={styles.uploadContainer}>
            {/* {images.map((image, index) => ( */}
            {Array(3)
              .fill("_")
              .map((_, i) => {
                return (
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => handleUpload(i)}
                    disabled={images[i] ? true : false}
                  >
                    {images.length >= i + 1 ? (
                      <>
                       <TouchableOpacity 
                       onPress={()=> removeImage(i)}
                       style={{position:'absolute',
                       zIndex:2,
                       top:-10,
                       right:-5,
                       backgroundColor:'#000',
                       padding:5,
                       borderRadius:10
                       }}>
                       <XMarkIcon size={10} color={"#fff"}/>
                       </TouchableOpacity>
                       <Image
                        source={{ uri: images[i].uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                      </>
                    ) : (
                      <PlusIcon color={"grey"} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                );
              })}

            {/* ))} */}
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "75%",
            bottom: height * 0.01,
          }}
        >
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={navigation.goBack}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} onPress={()=>{handleUpdateImage()}}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>
              Upload{`(${images.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
      >
        {renderOptions()}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    // flex: 1,
    alignSelf: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  previewText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#aaa",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign:'center'
  },
  welcomeSubText: {
    fontSize: 12,
    fontWeight: "300",
    marginTop: 10,
    textAlign:'center'
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  uploadedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  uploadBox: {
    margin: 8,
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
  },
  cancelBtn: {
    padding: 8,
    paddingHorizontal: 16,
    minWidth: 120,
    alignItems: "center",
  },
  nextBtn: {
    padding: 8,
    backgroundColor: "#000000",
    borderRadius: 100,
    minWidth: 120,
    alignItems: "center",
  },
});

export default ProfileImageUpload;
