import { Dimensions, StatusBar, StyleSheet } from "react-native";

const {width,height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgContainer:{
        justifyContent:'center',
        position:'relative',
    },
    image:{
        width:width*0.2,
        height:height*0.2,
        resizeMode:'contain'
    },
    formContainer: {
        width: width * 0.9,
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.015,
       
    },
    loginText: {
        fontSize: height * 0.035,
        fontFamily:'kollektif_bold',
    },
    para: {
        marginVertical: height * 0.01,
        fontFamily:'kollektif',
    },
    loginPara: {
        color: 'gray',
        fontSize: height * 0.02,
        fontFamily:'kollektif',
    },
    formGroup: {
        marginVertical: height * 0.01
    }
    ,
    label: {
        fontSize: height * 0.020,
        fontFamily:'kollektif_bold',
    },
    input: {
        borderWidth: 2,
        padding: 10,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: height * 0.01
    },
    passwordinput: {
        flex: 1,
        paddingVertical: 5,
        paddingRight: 30,
    },
    icon: {
        position: 'absolute',
        right: 10,
        padding: 10,
      },
    passinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical:6,
        borderColor: 'lightgray',
        marginTop: height * 0.01,
        borderRadius: 10,
    },
    otp:{
        fontFamily:'kollektif_bold',
        fontSize:height*0.017,
        color:'black'
    },
    black:{
        color:'#000',
        textDecorationLine:'underline'
    },
    checkBox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: 0,
        marginLeft: 0,
    },
    btnContainer: {
        overflow: 'hidden',
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
        fontFamily:'kollektif',
    },
    group:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:height*0.1
    },
    grpText:{
        fontSize:height*0.020,
        fontFamily:'kollektif_bold',
        marginLeft:width*0.01
    }
})

export default styles;