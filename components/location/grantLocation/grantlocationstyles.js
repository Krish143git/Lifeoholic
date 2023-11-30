import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        backgroundColor:'#fff',
        paddingVertical: height* 0.01,
    },
    imageContainer:{
        width:width,
        height:height*0.45,
        marginHorizontal:width*0.1,
        resizeMode:'contain'
    } ,
    image:{
        width:width*0.8,
        height:height*0.45,
        resizeMode:'contain'
    },
    textContainer: {
        width:width*0.8,
        // height:height*0.6,
        marginHorizontal:width*0.1,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    head:{
        fontSize:height*0.033,
        fontFamily:'kollektif_bold',
        textAlign:'center'
    },
    para:{
        fontSize:height*0.02,
        fontFamily:'kollektif',
        fontWeight:'100',
        textAlign:'justify',
        marginTop:height*0.01
    },
    btnContainer: {
        overflow: 'hidden',
        width:width*0.4,
        marginTop: height * 0.05
    },
    btnText: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        marginBottom:StatusBar.currentHeight,
        fontFamily:'kollektif_bold',
    }
});

export default styles;