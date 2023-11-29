import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './grantlocationstyles'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location';

const GrantLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Ok";
  }


const Navigation = useNavigation();
const goToSettings = () => {
  Navigation.navigate('Map');
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/accessLocation.webp')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.head}>Allow Google to access your location</Text>
        </View>
        <View>
          <Text style={styles.para}>
          If you "Always Allow" access to your location, you can choose to share
          your live location, and it will update with the users around you even
          when you're not using the app
          </Text>
          <Text style={styles.para}>
          Select "Always Allow" to find the best around you and where ever
          you are...
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={goToSettings} >
            <Text style={styles.btnText}>{text}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  )
}

export default GrantLocation