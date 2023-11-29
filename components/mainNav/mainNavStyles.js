import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        backgroundColor: "#fff"
    },
    nameContainer: {
        width: '50%'
    },
    header: {
        height: 120,
        // marginHorizontal: width * 0.05,
        borderRadius: 20,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: height * 0.03,
        width: width * 0.9,
        marginHorizontal: width * 0.05

    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginLeft: 10

    },
    textPr: {
        width: '100%',
        textAlign: 'center',
        marginTop: height * 0.015,
        marginLeft: 10,
        fontSize: 25,
         fontFamily:'kollektif_bold',
    },
    body: {
        marginTop: 40,
    },

    edit: {
        fontSize: 16,
        marginLeft: 17,
        fontFamily:'kollektif',
        color:'gray'
    },

    mainNav: {
        backgroundColor: "#fff",
        borderRadius: 20,
        width: width * 0.9,
        marginHorizontal: width * 0.05,
        paddingHorizontal: 15,
        paddingVertical: 5,
        elevation:3
    },
    bodyContent: {
    },
    item: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        paddingVertical: height * 0.025,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    name: {
        fontSize: height * 0.025,
        fontFamily:'kollektif_bold',
    },
    iconsContainer: {
        width: '50%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    icon:{
        fontSize:height*0.025,
        marginRight:width*0.05
    },
    btnContainer: {
        overflow: 'hidden',
        marginTop: height * 0.05,
        width: width * 0.9,
        marginHorizontal: width * 0.05
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
    text: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginHorizontal: width * 0.05,
        borderRadius: 20,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        padding:height*0.05,
    },
    text1: {
        fontSize: height*0.04,
        padding: 10,
         fontFamily:'kollektif_bold',
        
    },
    text2:{
        paddingBottom:20,
        fontSize:height*0.022,
        color:'gray',
        textAlign:"center",
        fontFamily:'kollektif',
        width:200
    },
   

    btnText: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 18,
        fontFamily:'kollektif_bold',
    
    },

});

export default styles;