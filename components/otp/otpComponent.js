import { View, Text, Image, TouchableOpacity,TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './otpStyles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../../firebase';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import OTPInput from '../../hoc/OtpInput';


const OtpComponent = () => {

    const Navigation = useNavigation();
    const route = useRoute();
    const [code, setCode] = useState('');
    // const [verificationId, setVerificationId] = useState();
  

   

    const submitOtp = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            route.params.verificationId,
            code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
                Navigation.navigate('Home');
                // alert(result);
            });


    }

    const onChangeCode = (e) => {
        setCode(e)
    }

    const handleOtpSubmit=()=> {
        Navigation.navigate("Reset Password");
    }

    return (
        <View style={styles.container}>


            <View style={styles.imgContainer}>
            <MaterialIcons name="verified-user" style={styles.image} color="black" />
            </View>

            <View style={styles.otpTextContainer}>
                <View style={styles.head}>
                    <Text style={styles.otpText}>OTP Verification</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.otpPara}>Please enter the OTP sent to</Text>
                </View>
                <View style={styles.mobileNumContainer}>
                    <Text style={styles.mobileNumber}>
                        {route.params.phoneNumber}
                    </Text>
                    <TouchableOpacity onPress={()=> Navigation.navigate("Forgot Password")}>
                    <AntDesign style={{marginLeft:5}} name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.otp}>

                    {/* <TextInput
                    onChangeText={onChangeCode}
                    keyboardType="phone-pad"
                    style={styles.input}
                    placeholder="Please Enter your OTP"
                    
                    /> */}
                    {/* <OTPInputView
                        pinCount={6}
                        autoFocusOnLoad
                        onChangeText={onChangeCode}
                        
                    /> */}
                    <OTPInput/>
                    <Text style={styles.resend}>Resend OTP</Text>
                </View>

            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>handleOtpSubmit()}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default OtpComponent;