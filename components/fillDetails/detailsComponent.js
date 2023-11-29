import { View, Text, Image, ScrollView, SafeAreaView, TextInput,Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './detailsStyles'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InstanceWithOutToken } from '../instance'
import axios from 'axios'
import { calculateAge } from '../../common/Common'
import Loader from '../../common/Loader'
import {API_BASE_URL} from '../../services/config'
const DetailsComponent = () => {
    const [referenceCode, setReferenceCode] = useState('');
    const [userDetails,setUserDetails] = useState(null);
    const [userIds,setUserId] = useState('');
    const [loading,setLoading] = useState(false);
    
    const [state, setState] = useState({
        userId:'',
        firstName:'',
        lastName:'',
        email: '',
        age: '',
        gender: '',
        motherTongue: '',
        education: '',
        work: '',
        location: '',
        hometown: '',
        // height: '',
        // religion: ''
        // interestedIn: '',
        // bodyType: '',
        // smoking: '',
        // drinking: '',
        
    });


    const Navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('userId').then(uId => {
            const UsrId = JSON.parse(uId);
        setState({...state,userId: UsrId });
        setUserId(UsrId);
    });
}, [])

 
useEffect(()=> {
    AsyncStorage.getItem('userdata').then((res)=> {
        let usrData = JSON.parse(res);
        console.log('usrData',usrData);
        let age = calculateAge(usrData.dateOfBirth);
        setUserDetails(usrData);
        if(usrData){
            setState({...state,
                firstName:usrData?.firstName,
                lastName:usrData?.lastName, 
                age: String(age),
                email: usrData?.email
        })}
    });
},[])


//     const verifyReferenceCode = async () => {
//         try {
//           const response = await axios.post('http://3.93.77.180:3000/api/v1/check/referal', {
//             referalCode:state.referalCode,
//           });
//           console.log(JSON.stringify(response.data.message))
//           // Process the API response here
//           // You can check the response status or data and display appropriate messages to the user
//           if (response.data.message==="referal code is present") {
//             // Reference code is valid
//          Alert.alert('Success', 'Reference code is valid');
//           } else {
// // Reference code is invalid
//           Alert.alert('Error', 'Invalid reference code');
//           }
//         } catch (error) {
//           // Handle any errors that occurred during the API call
//         Alert.alert('Error', 'An error occurred while verifying the reference code');
//         }
//       };
   

    // useEffect(() => {
    //     AsyncStorage.multiGet(['userId', 'firstName','lastName', 'email']).then(values => {
    //     //   const userId = JSON.parse(values[0][1]);
    //     //   const name = values[1][1];
    //     //   const email = values[2][1];
    //       setState({...state, userId, firstName,lastName, email});
    //     });
    //   }, []);

    

    const { userId, firstName,lastName,email, age, gender, motherTongue,education, work, location, hometown } = state;
    const validate = () => {
        if (age === "" || gender === "" || education === "" || work === "" || location === "" || hometown === "" ||   motherTongue ==="" ) {
            alert("Required all fields!");
            return false;
        }

        return true;
    }
    
    const handleFirstNameChange = (text) => {
        setState({ ...state, firstName: text });
      };
    
      const handleLastNameChange = (text) => {
        setState({ ...state, lastName: text });
      };
    
      const handleEmailChange = (text) => {
        setState({ ...state, email: text });
      };

    const SubmitForm = async () => {
       
        if (validate()) {
            setLoading(true)
            const payload = state;
            //needs to optimize here
            payload.userId = userIds;
            InstanceWithOutToken.post(
              `${API_BASE_URL}/data/details/create`,
               JSON.stringify(payload)
            ).then(res => {
                    AsyncStorage.setItem('userData',JSON.stringify(res.data));
                    setLoading(false)
                }).then(res => {
                    setLoading(false)
                    Navigation.navigate('ProfileImageUpload');
                    setState({
                        firstName:'',
                        lastName:'',
                        email:'',
                        age: '',
                        gender: '',
                        motherTongue: '',
                        education: '',
                        work: '',
                        location: '',
                        hometown: '',
                        // religion: ''
                        // interestedIn: '',
                        // bodyType: '',
                        // smoking: '',
                        // drinking: '',
                        // interests: []
                    })
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err);
                    // setState({
                    //     firstName: '',
                    //     lastName: '',
                    //     email: '',
                    //     phoneNumber: '',
                    //     dateOfBirth: '',
                    //     password: ''
                    // })
                

            })
        }
        else{
            console.log("hi")
        }
    }

    return (
        <View style={styles.container}>
            {loading && <Loader/>}
             <View style={styles.imgContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.image} />
            </View>
            <View style={styles.head}>
                <Text style={styles.formHead}>Fill Your Details</Text>
            </View>
            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                FirstName
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Please enter your firstName"
                            name="firstName"
                            value={state.firstName}
                            onChangeText={handleFirstNameChange}
                            editable={state.firstName ? false : true}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                LastName
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Please enter your lastName"
                            name="lastName"
                            value={state.lastName}
                            onChangeText={handleLastNameChange}
                            editable={state.lastName ? false : true}
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
                            placeholder="Please enter your email"
                            name="email"
                            value={state.email}
                            onChangeText={handleEmailChange}
                            editable={state.email ? false : true}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Age
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Please enter your Age"
                            editable={state.age ? false : true}
                            keyboardType="numeric"
                            maxLength={3}
                            name="age"
                            value={state.age}
                            onChangeText={(age) => setState({ ...state, age })}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Gender
                            </Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(gender) =>
                                    setState({ ...state, gender })
                                }>
                                <Picker.Item label='Please select an option...' value='0' style={{ color: 'lightgray' }} />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Others" value="Others" />
                            </Picker>
                        </View>

                    </View>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Mother Tongue
                            </Text>
                        </View>

                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Mother Tongue "
                                editable={true}
                                name="motherTongue"
                                value={motherTongue}
                                onChangeText={(motherTongue) => setState({ ...state, motherTongue })}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Education
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Education "
                                editable={true}
                                name="education"
                                value={education}
                                onChangeText={(education) => setState({ ...state, education })}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Work
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Work "
                                editable={true}
                                name="work"
                                value={work}
                                onChangeText={(work) => setState({ ...state, work })}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.formGroup}>
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
                                value={referalCode}
                                onChangeText={(referalCode) => setState({ ...state, referalCode })}
                                onBlur={verifyReferenceCode}
                            />
                        </View>
                    </View> */}

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Location
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Location "
                                editable={true}
                                name="location"
                                value={location}
                                onChangeText={(location) => setState({ ...state, location })}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Home Town
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Home Town "
                                editable={true}
                                name="hometown"
                                value={hometown}
                                onChangeText={(hometown) => setState({ ...state, hometown })}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Height
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Please enter your Height in CMS"
                            editable={true}
                            keyboardType="numeric"
                            maxLength={3}
                            name="height"
                            value={height}
                            onChangeText={(height) => setState({ ...state, height })}
                        />
                    </View> */}

                    {/* <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Religion
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Religion "
                                editable={true}
                                name="religion"
                                value={religion}
                                onChangeText={(religion) => setState({ ...state, religion })}
                            />
                        </View>
                    </View> */}
                    {/* <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Interests
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Please enter your Interests "
                                editable={true}
                                name="interests"
                                value={interests}
                                onChangeText={(interests) => setState({ ...state, interests })}
                            />
                        </View>
                    </View> */}
                    {/* <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Interested In
                            </Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={interestedIn}
                                onValueChange={(interestedIn) =>
                                    setState({ ...state, interestedIn })
                                }>
                                <Picker.Item label='Please select an option...' value='0' style={{ color: 'lightgray' }} />
                                <Picker.Item label="Men" value="Men" />
                                <Picker.Item label="Women" value="Women" />
                                <Picker.Item label="Others" value="Others" />
                            </Picker>
                        </View>

                    </View> */}
                    {/* <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Body Type
                            </Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={bodyType}
                                onValueChange={(bodyType) =>
                                    setState({ ...state, bodyType })
                                }>
                                <Picker.Item label='Please select an option...' value='0' style={{ color: 'lightgray' }} />
                                <Picker.Item label="Slim" value="Slim" />
                                <Picker.Item label="Average" value="Average" />
                                <Picker.Item label="Athletic" value="Athletic" />
                                <Picker.Item label="Fat" value="Fat" />
                            </Picker>
                        </View>

                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Smoking
                            </Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={smoking}
                                onValueChange={(smoking) =>
                                    setState({ ...state, smoking })
                                }>
                                <Picker.Item label='Please select an option...' value='0' style={{ color: 'lightgray' }} />
                                <Picker.Item label="Yes" value={true} />
                                <Picker.Item label="No" value={false} />
                            </Picker>
                        </View>

                    </View>

                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>
                                Drinking
                            </Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={drinking}
                                onValueChange={(drinking) =>
                                    setState({ ...state, drinking })
                                }>
                                <Picker.Item label='Please select an option...' value='0' style={{ color: 'lightgray' }} />
                                <Picker.Item label="Yes" value={true} />
                                <Picker.Item label="No" value={false} />
                            </Picker>
                        </View>

                    </View> */}

                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { SubmitForm() }} >
                            <Text style={styles.btnText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default DetailsComponent