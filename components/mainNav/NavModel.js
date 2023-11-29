import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "./mainNavStyles";

 const NavModel = (props) => {
    const {isModalVisible, setModelVisible, isNewModel,penActivity,description} = props;
  return (
    <Modal isVisible={isModalVisible}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"#000"}}>
                    <View style={styles.text}>
                      <Image
                        source={require("../../assets/images/icon_3.png")}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "contain",
                        }}
                      />
                      <Text style={styles.text1}>{isNewModel ? 'Create Details' : 'Update Details'}</Text>
                      <Text style={styles.text2}>
                       {description}
                      </Text>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => penActivity()}
                      >
                        <Text style={styles.btnText}>{isNewModel ? "Create Now" : "Edit Now"}</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                  </Modal>
  )
}

export default NavModel;