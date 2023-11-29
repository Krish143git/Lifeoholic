import { View, Text, Image, FlatList } from 'react-native'
import React,{useState} from 'react';
import styles from './profileStyles';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import { Entypo, MaterialIcons, Ionicons, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileComponent = () => {
  const Navigation  = useNavigation();
  const[user,setUser] = useState({});
  AsyncStorage.getItem('personalData').then(user => {
    console.log(user);
    setUser(JSON.parse(user));
  })

 
  const Navigate = (path) => {
    Navigation.navigate(path);
  };
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.bodyContent}>
          <Text style={styles.textPr} onPress={() => Navigation.navigate("AllowLocation")}>{user !==null ? user.firstName+" "+user.lastName : "John Doe"}</Text>
          <Text style={styles.edit}>Edit Profile</Text>
        </View>

      </View>


      <View style={styles.list}><FlatList
        data={[
          { key: 'Activities', icon: <Entypo name="users" size={24} color="black" />, route: () => {Navigate("Activities")} },
          { key: 'Push Notifications', icon: <MaterialCommunityIcons name="bell" size={24} color="black" />, route: () => {Navigate("Push")} },
          { key: 'Privacy Policy', icon: <MaterialIcons name="privacy-tip" size={24} color="black" />, route: () => {Navigate("Privacy")} },
          { key: 'Terms & Conditions', icon: <Ionicons name="document-text" size={24} color="black" />,route: () => {Navigate("Terms")} },
          { key: 'About & Contact', icon: <MaterialIcons name="contact-mail" size={24} color="black" />, route: () => {Navigate("Aboutme")} },
          { key: 'Logout', icon: <Ionicons name="log-out" size={24} color="red" />,style:styles.log,  route: () => {AsyncStorage.removeItem('token').then(()=> {
          AsyncStorage.removeItem('userId').then(() => {
            AsyncStorage.removeItem('personalData');
            Navigation.navigate('LoginFlow');
          })
          });} },

        ]}
        renderItem={({ item }) => {
          return (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor:'lightgray',
            borderBottomWidth:1, paddingVertical:9 }}>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{item.icon}</Text>
                <View ><Text onPress={item.route} style={[styles.item, item.style]}>{item.key}</Text></View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Fontisto name="angle-right" size={18} color="lightgray" />
              </View>

            </View>
          )
        }
        }
      /></View>
      <View>
        <Text style={styles.delete}>Delete Account</Text>
      </View>
    </View>

  )
}

export default ProfileComponent;