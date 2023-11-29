import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import styles from "./homeStyles";
import { Ionicons } from "@expo/vector-icons";
// import { InstanceWithOutToken } from '../instance';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import AuthHoc from "../../hoc/authHoc";
import * as ImagePicker from "expo-image-picker";

const CreatePost = (props) => {
  // const Navigation = useNavigation();
  const [content, setContent] = useState("");
  // const [user, setUser] = useState({});
  // const [token,setToken] = useState('');
  const [uploadImage, setImage] = useState(null);

  // AsyncStorage.getItem('token').then(token => {
  //     AsyncStorage.getItem('personalData').then(user => {
  //         setToken(token);
  //         setUser(JSON.parse(user));
  //     })
  // })

  const pickDocument = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  //     await ImagePicker.openPicker({
  //         multiple: true,
  //         width: 400,
  //         height: 400,
  //         cropping: true,
  //     }).then(images => {
  //         console.log(images,"   images    ")

  //             // console.log(images,"   images    ")
  //             for (let i in images) {
  //                 let tempObj = {};
  //                 // console.log(this.cropImage(images[i]),"   callback    ")
  //         tempObj.uri = images[i].path;
  //         tempObj.type = images[i].mime;
  //         tempObj.name = images[i].path.split("/")[images[i].path.split("/").length - 1];
  //         // resolve(tempObj)

  //        setImage({ postMedia });

  //         }
  //     }).catch((err)=>{
  //         console.log(err,"   Error    ")
  //     })
  // }

  // const pickDocument = async () => {
  //     let result = await DocumentPicker.getDocumentAsync({});
  //     console.log(result)
  //     setImage(result);
  //     alert("Image Uploaded Successfully");
  // }

  const validate = () => {
    if (content === "") {
      alert("Required all fields!");
      return false;
    }

    return true;
  };

  // alert(token);

  const postData = () => {
    // const payload = {
    //     userId: props.user._id,
    //     content: content,
    //     uploadImage: uploadImage
    // }

    const apiData = new FormData();
    apiData.append("userId", props.user._id);
    apiData.append("content", content);
    apiData.append("uploadImage", {
      name: new Date() + "_uploadImage",
      uri: uploadImage,
      type: "image/jpg",
    });

    alert(JSON.stringify(apiData));
    if (validate()) {
      axios({
        method: "POST",
        url: "https://lifeaholic-test1.onrender.com/api/v1/travel/places/create",
        data: apiData,
        headers: {
          // 'Accept': 'application/json',
          // "Authorization": `Bearer ${JSON.parse(props.token)}`,
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, err) => {
          return apiData;
        },
      })
        .then((res) => {
          alert(JSON.stringify(res.data));
          setContent(" ");
          setImage(null);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setContent(" ");
          setImage(null);
        });
    }
  };

  const fetchPosts = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://lifeaholic-test1.onrender.com/api/v1/data/post/get-all/${props.user._id}`,
    })
      .then((res) => {
        console.log(JSON.stringify(res));
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View style={styles.input}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/736x/be/04/2b/be042b0f63e612e8c283f7f24cd43808.jpg",
          }}
        />
        <TextInput
          style={styles.comment}
          placeholder="Create a new post..."
          editable={true}
          value={content}
          onChangeText={(e) => setContent(e)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Ionicons
              name="image-outline"
              size={24}
              color="black"
              onPress={pickDocument}
            />
          </View>
          <View>
            <Ionicons name="send" size={24} color="black" onPress={postData} />
          </View>
        </View>
      </View>

      {/* <View>
                <TouchableOpacity onPress={() => {
                    AsyncStorage.removeItem('token').then(() => {
                        AsyncStorage.removeItem('userId').then(() => {
                            AsyncStorage.removeItem('personalData');
                            Navigation.navigate('Signin')
                        })
                    });
                }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View> */}

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.touch, { backgroundColor: "black" }]}>
          <Text style={{ color: "white" }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Text>Places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Text>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Text>Nearby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthHoc(CreatePost);
