import { StyleSheet,StatusBar,Platform,Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    card:{
        backgroundColor:'black',
        borderRadius:20,
        // display:'flex',
        // flexDirection:'row',
        // justifyContent:'space-around',
        // alignItems:'center',
        height:height*0.20,
        marginVertical:height*0.01,
        padding:30

    },
    cardashok:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:20
    },
    cardtext:
    {
        color:'red'
    }
    ,
    iconContainer:{
        backgroundColor:'#fff',
        borderRadius:100,
        padding:25
    },
    textContainer: {
        display:'flex',
        flexDirection:'column'
    },
    text:{
        color:'#fff',
        fontSize: height*0.02,
        fontFamily:'kollektif_bold',
    },
    para:{
        fontSize:height*0.015,
        color:'gray',
        fontFamily:'kollektif',
    },
    priceContainer: {
        display:'flex',
        flexDirection:'row'
    },
    price:{
        color:'#fff',
        fontSize: height*0.05,
        fontFamily:'kollektif_bold',
    },
    btnContainer: {
        overflow: 'hidden',
        marginTop: height * 0.05,
        width: width * 0.9,
        marginHorizontal: width * 0.05
    },
    btnText: {
        color: 'black',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif_bold',
    },
});

export default styles