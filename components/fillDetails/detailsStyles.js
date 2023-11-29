import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        justifyContent: 'space-around',
        paddingHorizontal:width*0.05,
        backgroundColor:'#fff'
    },
    imgContainer:{
        height: height*0.20,
        justifyContent:'center',
        position:'relative'
    },
    image:{
        width:width*0.2,
        height:height*0.2,
        resizeMode:'contain'
    },
    formGroup: {
        marginTop: height * 0.01
    },
    formHead: {
        fontSize: height * 0.035,
        fontFamily:'kollektif_bold',
    },
    label: {
        fontSize: height * 0.02,
        fontFamily:'kollektif_bold',
    },
    input: {
        borderWidth: 2,
        padding: 10,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: height * 0.01,
        height:height*0.05
    },
    picker: {
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: height * 0.01,
        height:height*0.05,
        justifyContent:'center'
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
        marginBottom:StatusBar.currentHeight,
        fontFamily:'kollektif',
    }
});

export default styles;