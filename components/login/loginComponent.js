import { View, Text, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './loginStyles'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { showMessage } from '../../hoc/showMessage';
const LoginComponent = () => {

    const Navigation = useNavigation();

    const [phoneNumber, setPhoneNumber] = useState(phoneNumber);
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const changeNumber = (e) => {
        setPhoneNumber(e);
    }



    const sendOtp = async() => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            Navigation.navigate('OTP', { phoneNumber: phoneNumber, verificationId: verificationId });
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            console.log(err,'err')
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }

        // const phoneProvider = new firebase.auth.PhoneAuthProvider();
        // const verificationId = await phoneProvider.verifyPhoneNumber(
        //     phoneNumber,
        //     recaptchaVerifier.current
        //   );
        // phoneProvider
        //     .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        //     .then(() => {
        //         setVerificationId(verificationId);
        //         alert(verificationId);
        //         Navigation.navigate('OTP', { phoneNumber: phoneNumber, verificationId: verificationId });
        //     });

    }

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/whiteLogo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.formContainer}>
                <View style={styles.head}>
                    <Text style={styles.loginText}>Welcome Back</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.loginPara}>Enter your details to proceed further.</Text>
                </View>
                <SafeAreaView>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Mobile Number
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Mobile Number"
                            editable={true}
                            keyboardType="phone-pad"
                            onChangeText={changeNumber}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={sendOtp}>
                            <Text style={styles.btnText}>SEND OTP</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>

        </View>
    )
}

export default LoginComponent