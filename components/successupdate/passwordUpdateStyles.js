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
        alignSelf:'center'
    },
    label: {
        fontSize: height * 0.020,
        fontFamily:'kollektif_bold',
    },
    image:{
        fontSize:height*0.13
     },
     otpTextContainer:{
         height: height*0.4,
         textAlign:'center',
         alignSelf:'center',
         width:width* 0.8,
         alignItems:'center',
        //  backgroundColor:'red',
        //  justifyContent:'space-between'
     },
     otpText: {
         fontSize: height * 0.035,
         fontFamily:'kollektif_bold',
     },
     iconText:{
      justifyContent:'center'
     },
     para: {
         marginVertical: height * 0.01,
         fontFamily:'kollektif',
         textAlign:'center'
     },
     otpPara: {
         color: 'gray',
         fontSize: height * 0.02,
         fontFamily:'kollektif',
     },

     btnContainer: {
         overflow: 'hidden',
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