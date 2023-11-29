import { View, Text,Modal, ActivityIndicator,StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <Modal 
    visible={true}
    transparent={true}
    >
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <ActivityIndicator size={'large'} color="#000"/>
            </View>
        </View>
    </Modal>
  )
}

export default Loader;

const styles = StyleSheet.create({
    mainContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'rgba(0, 0, 0, 0.5)'
    },
    subContainer:{
      padding:15,
      backgroundColor:'#fff',
      elevation:3,
      borderRadius:10
    }
})