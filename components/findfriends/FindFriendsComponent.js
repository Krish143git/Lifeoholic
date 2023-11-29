import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './findFriendsStyles'
import { useNavigation } from '@react-navigation/native'


const FindFriendsComponent = () => {

    const Navigation =useNavigation();

    const Login = () => {
        Navigation.navigate('Signin')
    }

    const Signup = () => {
        Navigation.navigate('Signup')
    }


    return (
        <>
            <ImageBackground source={require('../../assets/images/friends_nearby_final22.png')} style={{width:'100%',
            height:'100%'}} >
            <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    With millions of users all over the world, we give you the ability to connect with people no matter  where you are!
                </Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={Login}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={Signup}>
                    <Text style={styles.btnTextSignUp}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </View>
            </ImageBackground>
         </>
    )
}

export default FindFriendsComponent