import { StyleSheet,StatusBar,Platform,Dimensions } from "react-native";
const {width,height} =Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:Platform.OS ==="Android" ? StatusBar.currentHeight : height*0.05,
        justifyContent:'center',
        alignItems:'center',
        width:width
    },
    item:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width: width,
        padding:10,
        borderBottomColor:'lightgray',
        borderBottomWidth:1
    },
    profilePic: {
        width:width*0.2
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:100
    },
    name:{
        fontFamily:'kollektif_bold',
        fontSize:height*0.02
    },
    para: {
        color:'gray',
        fontFamily:'kollektif',
    }
});

export default styles;