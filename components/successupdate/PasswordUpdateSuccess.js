import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './passwordUpdateStyles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PasswordUpdateSucess() {

    const Navigation = useNavigation();
    const route = useRoute();
    const [code, setCode] = useState('');
    // const [verificationId, setVerificationId] = useState();




    const submitOtp = () => {
        // const credential = firebase.auth.PhoneAuthProvider.credential(
        //     route.params.verificationId,
        //     code
        // );
        // firebase
        //     .auth()
        //     .signInWithCredential(credential)
        //     .then((result) => {
        //         Navigation.navigate('Home');
        //         // alert(result);
        //     });
        Navigation.navigate('OTP',{phoneNumber: +919676217522});

    }

    const onChangeCode = (e) => {
        setCode(e)
    }

    return (
        <View style={styles.container}>
 
         <View style={styles.iconText}>

            <View style={styles.imgContainer}>
                <MaterialCommunityIcons style={styles.image} name="shield-check" size={24} color="black" />
            </View>

            <View style={styles.otpTextContainer}>
                <View style={styles.head}>
                    <Text style={styles.otpText}>Password Updated!</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.otpPara}>Your password has been updated successfully.</Text>
                </View>
            </View>
            
        </View>   

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={submitOtp}>
                    <Text style={styles.btnText} >Reset Password</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}