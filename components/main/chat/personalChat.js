import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as Icon from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import {
  deleteMessage,
  getChatRoom,
  sendMessage,
} from "../../../services/chat";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bubble, GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { socket } from "../../..";

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [attachedImage, setAttachedImage] = useState(null); // Track the attached image
  const [user, setUser] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    socket.connect();
    // fetchChat();
  }, []);

  const fetchChat = async () => {
    setLoading(true);
    try {
      let _user = JSON.parse(await AsyncStorage.getItem("userId"));
      setUser(_user);

      let data = await getChatRoom(
        route.params.data._id,
        route.params.data.requestUserId
      );
      if (data?.length) setMessages([...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatLongPress = (item) => {
    if (selectedMessages.length) return;
    console.log("Long Press");
    updateSelectedMessage(item);
  };

  const onChatPress = (item) => {
    if (!selectedMessages.length) return;
    updateSelectedMessage(item);
  };

  const updateSelectedMessage = (item) => {
    let _selectedMessages = selectedMessages;
    let isExist = _selectedMessages.indexOf(item._id);
    if (isExist !== -1) {
      _selectedMessages.splice(isExist, 1);
    } else {
      _selectedMessages.push(item._id);
    }
    console.log(selectedMessages, item._id);
    setSelectedMessages([..._selectedMessages]);
  };

  console.log(selectedMessages);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => handleChatLongPress(item)}
        onPress={() => onChatPress(item)}
        style={{
          backgroundColor: selectedMessages.includes(item._id)
            ? "rgba(0,0,0,0.1)"
            : "transparent",
          borderRadius: 10,
        }}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles.messageContainer,
            !item?.isSender ? styles.sentMessage : styles.receivedMessage,
          ]}
        >
          {item.images.length > 0 && (
            <Image
              source={{ uri: item.images[0] }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}
          <Text
            style={[
              styles.messageText,
              { color: item?.isSender ? "black" : "#fff" },
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.messageTime,
              { color: item?.isSender ? "black" : "#fff" },
            ]}
          >
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSendMessage = async () => {
    // Implement your logic to send the message
    // Example: call an API, update state, etc.
    Keyboard.dismiss();
    let payload = new FormData();
    payload.append("chatroom", route.params.data._id);
    payload.append("userId", user);
    payload.append("message", inputMessage);
    if (attachedImage) {
      payload.append("images", {
        uri: attachedImage.uri,
        type: "image/jpeg",
        name: "attachedImage.jpg",
      });
    }
    let response = await sendMessage(payload);
    let r = [response];
    setInputMessage("");
    setAttachedImage(null); // Clear the attached image after sending
    fetchChat();
    // setMessages([...messages, ...r]);
  };

  const handleAttachImage = async () => {
    // Check if image picker is available
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant access to your media library to attach an image."
        );
        return;
      }
    }

    // Show image picker
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setAttachedImage(result);
    }
  };


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://reactjs.org/logo-og.png',
        },
      },
    ])
  }, [])

  const onDeleteMessages = async () => {
    let updatedMsg = messages.filter((m) => !selectedMessages.includes(m._id));
    const selectedMsg = selectedMessages;
    setMessages([...updatedMsg]);
    setSelectedMessages([]);

    for (let msg of selectedMsg) {
      let data = await deleteMessage(msg);
      console.log(data, "@message deleted");
    }
  };

  const onSend = useCallback((messages = []) => {
    console.log("messages>>", messages)

   // Send message to Server
      socket.emit('message', {
        
      });
      
      // listen messages from Server
      socket.on('message', (data) => {
        console.log(data);
      });
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'black',

        },
        left: {
          backgroundColor: '	#F0F0F0',

        }
      }}

      textStyle={{
        right: {
          color: 'white'
        },
        left: {
          color: 'black'
        }
      }}

    />
  )

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Icon.PaperAirplaneIcon color={"#fff"} fill="white" size={22} style={{ backgroundColor: 'black' }} />
      </Send>



    )
  }

  const onMessageSendiconPressed = () =>{

  }

  const onAtatchementIconPressed =() =>{
    
  }

  const renderInputToolbar = (props) => {
    return (
      <View style={styles.inputToolBarContainer}>
        <TextInput style={styles.inputText} multiline />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity  onPress={onAtatchementIconPressed}>
            <Icon.PaperClipIcon color={'black'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMessageSendiconPressed} style={{ backgroundColor: 'black', height: 30, padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginHorizontal: 10 }}>
            <Icon.PaperAirplaneIcon size={20} fill={'white'} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }


  return (
    <>
      {/* {selectedMessages.length ? (
        <ActionHeader
          onClose={() => setSelectedMessages([])}
          onDelete={onDeleteMessages}
        />
      ) : (
        <Header onPressBack={navigation.goBack} />
      )} */}
      <View style={{ flex: 1, marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: 'white', paddingBottom: 10 }}>
        <Header title={"Chat"} onPressBack={navigation.goBack} />
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          renderBubble={renderBubble}
          alwaysShowSend={false}
          showAvatarForEveryMessage={true}
          renderInputToolbar={renderInputToolbar}
          // renderSend={renderSend}
          user={{
            _id: 1,
            name: 'React Native',
            avatar: 'https://reactjs.org/logo-og.png',
          }}
        />
      </View>


      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <View style={styles.container}>
          {isLoading && (
            <View
              style={{
                position: "absolute",
                // backgroundColor: "rgba(0,0,0,0.5)",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={50} color={"blue"} />
            </View>
          )}
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.messageList}
            inverted
          />
          <View
            style={{
              ...styles.inputContainer,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {attachedImage ? (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: 0,
                    backgroundColor: "black",
                  }}
                  onPress={() => setAttachedImage(null)}
                >
                  <Icon.XMarkIcon color={"#fff"} />
                </TouchableOpacity>
                <Image
                  source={{ uri: attachedImage.uri }}
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              </View>
            ) : null}
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.attachButton}
                onPress={handleAttachImage}
              >
                <Icon.CameraIcon size={24} color="#111827" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={inputMessage}
                onChangeText={setInputMessage}
                multiline
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <Icon.PaperAirplaneIcon size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView> */}
    </>
  );
};

const Header = ({ title, onPressBack, action = false }) => {
  if (action) {
    return <></>;
  }
  return (
    <View style={_styles.container}>
      <TouchableOpacity onPress={onPressBack} style={_styles.backButton}>
        <Icon.ArrowLeftIcon size={24} color="black" />
      </TouchableOpacity>
      <Text style={_styles.title}>{title}</Text>
    </View>
  );
};

const ActionHeader = ({ onClose, onDelete }) => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={onClose}>
        <Icon.XMarkIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Icon.TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

const headerStyles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: "#fff",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  deleteButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
  },
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "white",
    paddingHorizontal: 16,
    elevation: 4,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    maxWidth: "80%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#60A5FA",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F9FAFB",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  messageTime: {
    fontSize: 12,
    color: "#fff",
    alignSelf: "flex-end",
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
  },
  inputText: {
    width: '70%',
    height: 50,
    marginLeft: 8,
    fontSize: 18,
    color: "#111827",
    justifyContent: 'center',
    paddingVertical: 5
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  attachButton: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontFamily: "System",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#60A5FA",
    borderRadius: 16,
  },
  inputToolBarContainer: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default ChatScreen;
