import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Logout = () => {

    const Navigation = useNavigation();
    return (
        <View >
            <MaterialIcons name="logout" size={22} color="black" onPress={() => {
            Alert.alert(
                //title
                'LOGOUT'
                ,
                'Do you want to logout?',
                [
                    {
                        text: 'Yes', onPress: () => {

                            AsyncStorage.removeItem('token').then(() => {
                                AsyncStorage.removeItem('userId').then(() => {
                                    AsyncStorage.removeItem('personalData');
                                    Navigation.navigate('Signin');
                                })
                            })
                        }
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
            );


        }} />
        </View>
    );
}

export default Logout;
