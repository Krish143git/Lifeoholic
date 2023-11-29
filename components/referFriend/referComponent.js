import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './referStyles'
import { FontAwesome5 } from '@expo/vector-icons';

const ReferComponent = () => {
  return (
    <View style={styles.container}>
     <ScrollView>
        <View style={styles.imageContainer}>
            <Image source={require('../../assets/referimages/referearn.png')} style={styles.image} />
        </View>
        <View>
            <Text style={styles.head}>Refer a friend a earn 14 Days Lifeaholic Premium Access!</Text>
        </View>
        {/* <View style={styles.codeContainer}>
            <Text style={styles.code}>L129SE </Text>
        </View> */}

        <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnC}>
                            <Text style={styles.btnText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container2}>
      <View style={styles.row}>
        <Image source={require('../../assets/referimages/facebook.png')} style={styles.icon} />
        <Image source={require('../../assets/referimages/facebook.png')} style={styles.icon} />
        <Image source={require('../../assets/referimages/instagram.png')}  style={styles.icon} />
      </View>
      <View style={styles.row}>
        <Image source={require('../../assets/referimages/twitter.png')} style={styles.icon} />
        <Image source={require('../../assets/referimages/gmail.png')} style={styles.icon} />
        <Image source={require('../../assets/referimages/gmail.png')} style={styles.icon} />
      </View>
    </View>
    <View style={styles.btnContainer}>
                        <TouchableOpacity >
                            <Text style={styles.btnText1}>Copy Link</Text>
                        </TouchableOpacity>
                    </View>
     </ScrollView>
    </View>
  )
}

export default ReferComponent;