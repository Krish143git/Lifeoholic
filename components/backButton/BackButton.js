import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Alert,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const BackButton = () => {
    const Navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=> Navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
    )
};

export default BackButton;