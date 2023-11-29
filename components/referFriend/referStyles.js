import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:Platform.OS === "android" ? StatusBar.currentHeight : height*0.01,
        width:width*0.9,
        marginHorizontal:width*0.05,
               
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
      },
      icon: {
        width:30,
        height:30,
        marginHorizontal:20,
        marginVertical:20      },
    imageContainer:{
        width:width*0.9,
        height:height*0.4, 
    },
    image:{
        width:width*0.9,
        height:height*0.4,
        resizeMode:'contain'
    },
    head:{
        fontFamily:'kollektif_bold',
        textAlign:'center',
        fontSize:height*0.025,
        paddingTop:10
    },
    codeContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:height*0.05
    },
    code:{
        paddingHorizontal:width*0.2,
        paddingVertical:height*0.01,
        textAlign:'center',
        borderWidth:1,
        borderStyle:'dotted',
        fontFamily:'kollektif_bold',
        fontSize:width*0.08
    },
    btnContainer: {
        overflow: 'hidden',
        marginTop:height*0.05,
        paddingBottom:height*0.02,
    },

    btnText: {
        color: 'black',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif',
    },
    btnText1:
    {
        color: 'white',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif',
    },

});

export default styles;