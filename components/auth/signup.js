import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { InstanceWithOutToken } from '../instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../common/Loader';


const Signup = () => {
    const Navigation = useNavigation();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: '',
        referalCode:''
    });
    const [loading,setLoading] = useState(false);

    const validate = () => {
        const { firstName, lastName, email, phoneNumber, password, dateOfBirth } = state;
        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || password === "" || dateOfBirth === "") {
            alert("Required all fields!");
            return false;
        }

        return true;
    }


    const signup = () => {
        // alert(JSON.stringify(state));
        Navigation.navigate('Form');
        if (validate()) {
              setLoading(true)
            const payload = state;

            InstanceWithOutToken({
                method: "POST",
                url: "http://16.171.175.25:3000/api/v1/signUp",
                data: JSON.stringify(payload)
            }).
                then(res => {
                    console.log("Testing signup data", res);
                    setLoading(false)
                    alert('User Registered Successfully');
                    AsyncStorage.setItem("userId", JSON.stringify(res.data.user._id));
                    AsyncStorage.setItem("userdata", JSON.stringify(res.data.user));
                }).then(res => {
                    setLoading(false)
                    Navigation.navigate('Form');
                    setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        dateOfBirth: '',
                        password: ''
                    })
                })
                .catch(err => {
                    setLoading(false)
                    alert(err);
                    setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        dateOfBirth: '',
                        password: ''
                    })


                })
        }

    };


    const verifyReferenceCode = async () => {
        try {
          const response = await axios.post('http://16.171.175.25:3000/api/v1/check/referal', {
            referalCode:state.referalCode,
          });
          console.log(JSON.stringify(response.data.message))
          // Process the API response here
          // You can check the response status or data and display appropriate messages to the user
          if (response.data.message==="referal code is present") {
            // Reference code is valid
         Alert.alert('Success', 'Reference code is valid');
          } else {
// Reference code is invalid
          Alert.alert('Error', 'Invalid reference code');
          }
        } catch (error) {
          // Handle any errors that occurred during the API call
        Alert.alert('Error', 'An error occurred while verifying the reference code');
        }
      };



    return (
        <View style={styles.container}>
            {loading &&  <Loader/>}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.image} />
                </View>
                <View style={styles.head}>
                    <Text style={styles.loginText}>Create Account</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.loginPara}>Signup to get started!</Text>
                </View>
                <SafeAreaView>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                First Name
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your First Name"
                            editable={true}
                            value={state.firstName}
                            onChangeText={(firstName) => setState({ ...state, firstName })}
                            name="firstName"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Last Name
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Last Name"
                            editable={true}
                            value={state.lastName}
                            onChangeText={(lastName) => setState({ ...state, lastName })}
                            name="lastName"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Email
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Email address"
                            editable={true}
                            keyboardType="email-address"
                            value={state.email}
                            onChangeText={(email) => setState({ ...state, email })}
                            name="email"
                        />
                    </View>
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
                            value={state.phoneNumber}
                            onChangeText={(phoneNumber) => setState({ ...state, phoneNumber })}
                            name="phoneNumber"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Date of Birth
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Date of Birth"
                            editable={true}
                            value={state.dateOfBirth}
                            onChangeText={(dateOfBirth) => setState({ ...state, dateOfBirth })}
                            name="dateofbirth"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Password
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Password"
                            editable={true}
                            secureTextEntry={true}
                            value={state.password}
                            onChangeText={(password) => setState({ ...state, password })}
                            name="password"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Referel Code
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please Enter Referal Code"
                                editable={true}
                                name="referalCode"
                                value={state.referalCode}
                                onChangeText={(referalCode) => setState({ ...state, referalCode })}
                                onBlur={verifyReferenceCode}
                            />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[styles.otp, styles.blue]}>Forgot Password?</Text>
                        <Text onPress={() => Navigation.navigate('Login')} style={styles.otp}>Or Login with OTP</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={signup}>
                            <Text style={styles.btnText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.group}>
                        <Text>Already a User?</Text>
                        <Text style={styles.grpText} onPress={() => Navigation.navigate('Signin')} >Signin</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Signup