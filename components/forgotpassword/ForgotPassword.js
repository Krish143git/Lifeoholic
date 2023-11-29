import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './forgotPasswordStyle';
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
                <MaterialIcons name="lock" style={styles.image} color="black" />
            </View>

            <View style={styles.otpTextContainer}>
                <View style={styles.head}>
                    <Text style={styles.otpText}>Forgot Password?</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.otpPara}>Please enter your registered mobile number for the verification process. we will send you an OTP.</Text>
                </View>
                {/* <View>
            <Text style={styles.mobileNumber}>
                {route.params.phoneNumber}
            </Text>
        </View> */}
                <View style={{marginTop:8}}>
                    <Text style={styles.label}>
                        Mobile Number
                    </Text>
                </View>
                <View style={styles.otp}>

                    <TextInput
                        onChangeText={onChangeCode}
                        keyboardType="phone-pad"
                        style={styles.input}
                        placeholder="Enter your Mobile Number"

                    />
                </View>

            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity>
                    <Text style={styles.btnText} onPress={submitOtp} >Send OTP</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}