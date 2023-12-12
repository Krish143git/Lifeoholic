import { View, Text, Modal,ScrollView,TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './custStyles'

export default function EditTextInputModal(props) {
    const {visibility,onAddButtonPressCb} = props;
    const [tripDetails, setTripDetails] =useState({
        country:'',
        state:'',
        date:'',
    })

     const onAddButtonPressed = () =>{
    const Data = Object.keys(tripDetails).every(item => tripDetails[item] != "" );
        if(Data){
            onAddButtonPressCb(tripDetails)
        }else{
            alert("Enter All the Fields!")
        }
     }
    return (
        <Modal transparent={true} visible={visibility}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.headerText}>Enter Trip Details </Text>
                    <TextInput placeholder='Enter the Country' style={styles.textInput} value={tripDetails.country} onChangeText={(v)=>{setTripDetails({...tripDetails,country:v})}}/>
                    <TextInput placeholder='Enter the state' style={styles.textInput} value={tripDetails.state} onChangeText={(v)=>{setTripDetails({...tripDetails,state:v})}}/>
                    <TextInput placeholder='From-To Date' style={styles.textInput} value={tripDetails.date} onChangeText={(v)=>{setTripDetails({...tripDetails,date:v})}}/>
                    <TouchableOpacity style={styles.buttonContainer}  onPress={onAddButtonPressed}>
                         <Text style={styles.buttonText}>ADD Trip</Text>
                    </TouchableOpacity>          
                </View>
            </View>
        </Modal>
    )
}