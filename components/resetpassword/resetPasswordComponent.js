import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './resetPasswordStyles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../../firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotPassword() {

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

            <View style={styles.imgContainer}>
                <MaterialIcons name="privacy-tip" style={styles.image} color="black" />
            </View>

            <View style={styles.otpTextContainer}>
                <View style={styles.head}>
                    <Text style={styles.otpText}>Reset Password</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.otpPara}>Set your new password for Lifeaholic.</Text>
                </View>
                {/* <View>
            <Text style={styles.mobileNumber}>
                {route.params.phoneNumber}
            </Text>
        </View> */}
                <View style={{marginTop:8}}>
                    <Text style={styles.label}>
                        New Password
                    </Text>
                </View>
                <View style={styles.otp}>
                    <TextInput
                        onChangeText={onChangeCode}
                        keyboardType="phone-pad"
                        style={styles.input}
                        placeholder="Enter your New Password"
                    />
                </View>

                <View style={{marginTop:15}}>
                    <Text style={styles.label}>
                       Confirm Password
                    </Text>
                </View>
                <View style={styles.otp}>

                    <TextInput
                        onChangeText={onChangeCode}
                        keyboardType="phone-pad"
                        style={styles.input}
                        placeholder="Confirm your New Password"

                    />
                </View>

            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=> {
                    Navigation.navigate("Password Update Success")
                }}>
                    <Text style={styles.btnText} >Reset Password</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}