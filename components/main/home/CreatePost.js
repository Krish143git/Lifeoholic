import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import Avatar from "../Avatar";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import {API_BASE_URL} from '../../../services/config'

export default function CreatePost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  
  const [postDescription, setPostDescription] = useState("");

  const handleOpenImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Ashok123",result);

    if (!result.canceled) {
      setSelectedImages(result.uri);
    }
  };
  const handlePost = async () => {
    const userId=await AsyncStorage.getItem('userId');
    const apiData = new FormData();
    apiData.append("userId",userId);
    apiData.append("content", "hi");
    apiData.append("uploadImage", {
      name: new Date() + "_uploadImage",
      uri: selectedImages,
      type: "image/jpg",
    });

      axios({
        method: "POST",
        url: `${API_BASE_URL}/data/post/create`,
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
          console.log(res.data)
          setModalVisible(false)
          setSelectedImages(null);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setModalVisible(false)
          setSelectedImages(null);
        });

  }

  return (
    <View style={styles.container}>

      <View style={styles.inlineContainer}>
        {/* Avatar */}
        <Avatar size={40} />
        {/* Text Input */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Create a new post..."
          />
        </View>
        {/* Edit Icon */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Create Post</Text>
            <TouchableOpacity onPress={handlePost}>
              <Text style={styles.modalHeaderText}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
          {/* {selectedImages.map((image) => ( */}
   { selectedImages ? <Image  source={{ uri: selectedImages }} style={styles.selectedImage} /> : null }       
{/* ))} */}
      <TextInput
              style={styles.postDescription}
              placeholder="What's on your mind?"
              value={postDescription}
              onChangeText={setPostDescription}
              multiline
            />
            <View style={{height:1,width:'100%',backgroundColor:'lightgray'}}/>
            <TouchableOpacity style={styles.addButton} onPress={handleOpenImagePicker}>
            <Entypo name="images" size={24} color="green" />
              <Text style={styles.addButtonLabel}>Add Photo/Video</Text>
            </TouchableOpacity>
            <View style={{height:1,width:'100%',backgroundColor:'lightgray'}}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 7,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    paddingVertical: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    padding: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  addButton: {
    paddingVertical: 10,
    borderRadius: 5,
    // marginBottom: 20,
    flexDirection:'row'
  },
  addButtonLabel: {
    color: "black",
    fontSize: 16,
    marginLeft:10
  },
  postDescription: {
    fontSize: 20,
    height: 200,
    textAlignVertical: "top",
    marginBottom: 20,
    // borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    // padding: 10,
  },
});
