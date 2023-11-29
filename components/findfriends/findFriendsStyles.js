import { StyleSheet,StatusBar,Platform,Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        width: width*0.8,
        marginHorizontal:width*0.1,
        position:'absolute',
        bottom:height*0.14
    },
    image:{
        width: width*0.8,
        height:height*0.6,
        resizeMode:'cover'
    },
    text:{
    color:'lightgray',
    textAlign:'center',
    fontSize:height*0.019,
    marginTop:width*0.1,
    fontFamily:'kollektif',
    },

    btnContainer: {
        overflow: 'hidden',
        marginTop: height * 0.05,
        
    },
    btnText: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif_bold',
    },
    btnTextSignUp: {
        color: '#000',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        borderColor: '#000',
        borderWidth:1,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif_bold',
        marginTop:10
    }
});

export default styles;