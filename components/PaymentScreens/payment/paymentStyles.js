import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";

const {width,height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: width*0.9,
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.03,
        paddingVertical: height * 0.03,
        borderRadius: 20,
        paddingHorizontal: width * 0.05,

    },
    body:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
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
        color:'#000',
        fontSize: height*0.03,
        fontFamily:'kollektif_bold',
    },
    para:{
        fontSize:height*0.015,
        color:'gray',
        fontFamily:'kollektif_bold',
    },
    priceContainer: {
        display:'flex',
        flexDirection:'row'
    },
    priceContainer:{

    },
    price:{
        color:'#000',
        fontSize: height*0.05,
        fontFamily:'kollektif_bold',
    },
    validity: {
        color: '#000',
        fontSize:height*0.025,
        fontFamily:'kollektif_bold',
    },
    monthlyprice:{
        color: '#000',
        fontSize:height*0.04,
        fontFamily:'kollektif_bold',
    },
    actualPrice:{
        color: '#000',
        fontFamily:'kollektif_bold',
        textDecorationLine:'line-through'
    },
    offer:{
        color: '#000',
        fontFamily:'kollektif_bold',
    },
   totalPrice:{
    color: '#000',
    fontFamily:'kollektif_bold',
   } ,
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
    fontFamily:'kollektif_bold',
},

name:{
    fontSize:23,
    marginLeft:25,
    fontFamily:'kollektif_bold',
    color:'#000',
    marginTop: 10, 
},

});

export default styles;