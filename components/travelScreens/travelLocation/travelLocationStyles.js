import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({

    button: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttons: {
       // marginHorizontal: 5,
        borderWidth: 0.01,
        borderRadius: 30,
        width: width * 0.3,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },

    active: {
        backgroundColor: '#000',
        color: '#fff'
    },
    names: {
        color: "black",
        fontFamily:'kollektif',
    },
    item:{
        width:width * 0.9,
        marginHorizontal: width * 0.05,
        paddingVertical:height * 0.02,
    },
    imageConatiner:{
        position:'relative',
        width:width * 0.9,
        height:height * 0.25,
    },
    image:{
        width:width * 0.9,
        height:height * 0.25,
        resizeMode:'cover',
        borderRadius:20
    },
    textWrapper:{
        paddingVertical:height * 0.005,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        fontSize:height * 0.030,
        fontFamily:'kollektif_bold'
    },
    travellers:{
        fontSize:height * 0.02,
        fontFamily:'kollektif',
        marginTop:height * 0.005,
    },
    btnContainer: {
        overflow: 'hidden',
        //marginTop: height * 0.05
    },
    btnText: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        textAlign: "center",
        fontSize: 18,
        fontFamily:'kollektif',
    }
})

export default styles;