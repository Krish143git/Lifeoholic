import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
  Image,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Avatar from "../../Avatar";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Post from "./post";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import {API_BASE_URL} from '../../../../services/config'
export default function Places({ recentPosts = [], posts = [] }) {
  const category = ["Hiking", "Adventure", "Mountains", "Beaches"];
  const [attachedImage, setAttachedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [postDescription, setPostDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const itemOptions = [
    { label: "Hiking", value: "Hiking" },
    { label: "Adventure", value: "Adventure" },
    { label: "Trekking", value: "Trekking" },
    { label: "Beaches", value: "Beaches" },
    // Add more options as needed
  ];

  const dataOptions = [
    { label: "23-3-2000", value: "23-3-2000" },
    { label: "22-3-2000", value: "22-3-2000" },
    { label: "21-3-2000", value: "21-3-2000" },
    // Add more options as needed
  ];

  const daysOptions = [
    { label: "1 Day", value: "1" },
    { label: "3 Days", value: "3" },
    { label: "7 Days", value: "7" },
    // Add more options as needed
  ];

  const handleOpenImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.uri]);
    }
  };

  const handlePost = () => {
  axios.post(`${API_BASE_URL}/travel/places/create` ,{tripDays:selectedDays,travelDate:selectedData}).then((res)=>
  {
    console.log(res.config.data);
  }).catch((error)=>
  {
    console.log(error);
  })
    setModalVisible(false);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/* Header */}
      <View>
        <FlatList
          data={category}
          renderItem={({ item, index }) => (
            <CategoryButton key={item} title={item} active={index === 0} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
        />
      </View>
      <ScrollView>
        {/* Search Box */}
        <View
          style={{
            padding: 10,
            backgroundColor: "#fff",
            marginVertical: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: "#e2e2e2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Icons.MagnifyingGlassIcon color={"black"} /> */}
          </TouchableOpacity>
          <TextInput
            placeholder="Search Places"
            style={{ marginLeft: 10, flex: 1 }}
          />
          <View>
            <CategoryButton
              title={"Upload Your Places"}
              active
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Recently Posted Places
          </Text>
          <FlatList
            data={recentPosts}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
            renderItem={({ item }) => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                
                  <Avatar imageUrl={item.images[0]} />
                  <Text>{item.name}</Text>
                </View>
              );
            }}
            contentContainerStyle={{ marginTop: 10 }}
          />
        </View>
        <View>
          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <Post
                  name={item?.name}
                  userProfile={item?.images?.length ? item.images[0] : null}
                  description={item.content}
                  tags={
                    item?.category?.length
                      ? item?.category?.map((el) => `#${el}`).join(" ")
                      : null
                  }
                  like={item?.likes?.length}
                  post={item?.uploadImage}
                />
              );
            }}
          />
        </View>
      </ScrollView>

      {/* Modal */}
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
            {selectedImages.map((imageUri) => (
              <Image
                key={imageUri}
                source={{ uri: imageUri }}
                style={styles.selectedImage}
              />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleOpenImagePicker}
            >
              <Text style={styles.addButtonLabel}>Add Photo/Video</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.postDescription}
              placeholder="What's on your mind?"
              value={postDescription}
              onChangeText={setPostDescription}
              multiline
            />

            {/* Three horizontal Pickers */}
            <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedItem}
    onValueChange={(itemValue) => setSelectedItem(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Place" value="" />
    {itemOptions.map((option) => (
      <Picker.Item
        key={option.value}
        label={option.label}
        value={option.value}
      />
    ))}
  </Picker>

  <Picker
    style={styles.datePicker}
    date={selectedData}
    mode="date"
    placeholder="Select Date"
    format="YYYY-MM-DD"
    minDate={new Date()}
    maxDate={new Date().setDate(new Date().getDate() + 15)}
    onDateChange={(date) => setSelectedData(date)}
  />

  <Picker
    selectedValue={selectedDays}
    onValueChange={(itemValue) => setSelectedDays(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="NO.days" value="" />
    {Array.from({ length: 15 }, (_, i) => i + 1).map((value) => (
      <Picker.Item key={value} label={`${value} days`} value={value.toString()} />
    ))}
  </Picker>
</View>
          </View>
        </View>

      </Modal>
    </View>
  );
}

const CategoryButton = ({ title, active, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          padding: 10,
          backgroundColor:"black",
          borderRadius: 10,
        }}
        onPress={onPress}
      >
        <Text style={{ color:  "white" }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
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
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  postDescription: {
    height: 100,
    borderWidth: 1,
    borderColor: "lightgray",
    marginTop: 10,
    padding: 5,
    textAlignVertical: "top",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    ...Platform.select({
      android: {
        color: "black",
        backgroundColor: "#fff",
      },
    }),
  },
};