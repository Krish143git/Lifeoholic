import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState } from "react";
import styles from './updateStyles';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';


const UpdateComponent = () => {
    const [isModalVisible, setModalVisible] = useState(true);
    const Navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
    return (
        <View style={{ flex: 1 }}>
        {/* <Button title="Show modal" onPress={toggleModal} /> */}
  
        <Modal isVisible={isModalVisible}>
          <View style={styles.text}>   
                <Image source={require('../../../assets/images/icon_3.png')} style={{width:100, height:100, resizeMode:'contain'}}/>
            <Text style={styles.text1}> Update Details</Text>
            <Text style={styles.text2}>Please enter your details to start match making</Text>
            <TouchableOpacity style={styles.btn} onPress={()=> Navigation.navigate('EditNowMatch')}>
                    <Text style={styles.btnText}>Edit Now</Text>
                </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
}

export default UpdateComponent