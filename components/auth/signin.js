import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InstanceWithOutToken } from '../instance'
import { CheckBox } from 'react-native-elements';
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/mini";
import {API_BASE_URL} from '../../services/config'

const Signin = () => {
    const Navigation = useNavigation();
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [secure,setSecure] = useState(true);


    const validate = () => {
        const { email, password } = state;
        if (email === "" || password === "") {
            alert("Required all fields!");
            return false;
        }

        return true;
    }


    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };


    const signin = () => {
        console.log('singin')
        if (validate()) {
            const payload = state;
            InstanceWithOutToken({
                method: "POST",
                url: `${API_BASE_URL}/login`,
                data: JSON.stringify(payload)
            }).then(res => {
                const userData = res.data;
                AsyncStorage.setItem("token", JSON.stringify(userData.data.token));
                AsyncStorage.setItem("personalData", JSON.stringify(userData.data.user));
                AsyncStorage.setItem("userId", JSON.stringify(userData.data.user._id));
                Navigation.navigate('Mainnav');
                setState({
                    email: '',
                    password: ''
                })
            })
                .catch(err => {
                    if (err.message === "Request failed with status code 400") {
                        alert("Invalid Credentails");

                    }
                    else {
                        alert(err);
                        setState({
                            email: '',
                            password: ''
                        })
                    }

                })

        }
    }


    return (
        <View style={styles.container}>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.image} />
                </View>
                <View style={styles.head}>
                    <Text style={styles.loginText}>Welcome Back</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.loginPara}>Enter your details to Login</Text>
                </View>
                <SafeAreaView>
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
                                Password
                            </Text>
                        </View>
                        <View style={styles.passinputContainer}>
                        <TextInput
                            style={styles.passwordinput}
                            placeholder="Enter your Password"
                            editable={true}
                            secureTextEntry={secure}
                            value={state.password}
                            onChangeText={(password) => setState({ ...state, password })}
                            name="password"
                        />
                          <TouchableOpacity style={styles.icon} onPress={()=> setSecure(!secure)}>
                           {secure ?  <EyeSlashIcon size={20} color={"#000"}/> : <EyeIcon size={20} color={"#000"}/>}
                          </TouchableOpacity>
                         
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* <Text onPress={() => Navigation.navigate('Login')} style={styles.otp}>Or Login with OTP</Text> */}
                        <CheckBox
                            containerStyle={styles.checkBox}
                            title='Remember Me'
                            checked={rememberMe}
                            onPress={toggleRememberMe}
                            checkedColor='#000'
                        />
                        <TouchableOpacity onPress={()=> Navigation.navigate("Forgot Password")}>
                            <Text style={[styles.otp, styles.black]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={signin}>
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.group}>
                        <Text>Don't Have an Account?</Text>
                        <Text style={styles.grpText} onPress={() => Navigation.navigate('Signup')} >Sign Up Here</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Signin