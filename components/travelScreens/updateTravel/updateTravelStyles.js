import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginHorizontal: width * 0.05,
        borderRadius: 20,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        paddingVertical:height*0.05,
    },
    text1: {
        fontSize: height*0.04,
        padding: 10,
        fontFamily:'kollektif_bold',
        
    },
    text2:{
       paddingBottom:20,
        fontSize:height*0.022,
        color:'gray',
        fontFamily:'kollektif',
        textAlign:"center"
    },
   

    btnText: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 18,
        fontFamily:'kollektif_bold',
    
    },

})

export default styles;