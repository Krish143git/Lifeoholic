import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width*0.9,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        justifyContent: 'space-around',
        marginHorizontal:width*0.05
    },
    imgContainer:{
        height: height*0.25,
        justifyContent:'center',
        position:'relative'
    },
    label: {
        fontSize: height * 0.020,
        fontFamily:'kollektif_bold',
    },
    image:{
        fontSize:height*0.13
     },
     otpTextContainer:{
         height: height*0.4
     },
     otpText: {
         fontSize: height * 0.035,
         fontFamily:'kollektif_bold',
     },
     para: {
         marginVertical: height * 0.01,
         fontFamily:'kollektif',
     },
     otpPara: {
         color: 'gray',
         fontSize: height * 0.02,
         fontFamily:'kollektif',
     },
     mobileNumber: {
         fontSize:height*0.03,
         fontFamily:'kollektif',
     },
     otp:{
         position:'absolute',
         left:0,
         right:width*0.01,
         top:height*0.17
     },
     resend:{
         textAlign:'right',
         textDecorationLine:'underline',
         fontFamily:'kollektif',
         marginTop:height*0.01
     },
     btnContainer: {
         overflow: 'hidden',
     },
     input: {
         borderWidth: 2,
         padding: 10,
         borderColor: 'lightgray',
         borderRadius: 10,
     },
     btnText: {
         color: '#fff',
         backgroundColor: '#000',
         paddingVertical: 10,
         paddingHorizontal: 10,
         borderRadius: 25,
         textAlign: "center",
         fontSize: 20,
         fontFamily:'kollektif',
     }
});

export default styles;