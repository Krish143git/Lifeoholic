import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({

    subname: {
        fontSize: 20,
        marginLeft: 20,
         fontFamily:'kollektif_bold',
        marginTop: 30,
    },

    subnames: {
        fontSize: 20,
        marginLeft: 20,
         fontFamily:'kollektif_bold',
        marginTop: 10,
    },
    line: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        margin: 10,
        marginTop: 30,
    },

    button: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttons: {
        marginHorizontal: 3,
        borderWidth: 0.01,
        borderRadius: 30,
        width: width * 0.3,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },

    subnames: {
        fontSize: 20,
        marginLeft: 20,
         fontFamily:'kollektif_bold',
        marginTop: 10,
    },

    button: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    interest: {
        marginHorizontal: 5,
        borderWidth: 0.01,
        borderRadius: 30,
        width: width * 0.2,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    active: {
        backgroundColor: '#000',
        color: '#fff',
        fontFamily:'kollektif',
    },
    names: {
        color: "gray",
        fontFamily:'kollektif',
    },
    interest1: {
        marginHorizontal: 5,
        borderWidth: 0.01,
        borderRadius: 30,
        width: width * 0.6,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
    },
    interest2: {
        marginHorizontal: 5,
        borderWidth: 0.01,
        borderRadius: 30,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },


    badge1: {
        marginHorizontal: 5,
        borderWidth: 0.01,
        borderRadius: 30,
        width: width * 0.2,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    btnContainer1: {
        overflow: 'hidden',
        marginVertical: height * 0.01,
        marginHorizontal: width * 0.05,
    },
    btnText1: {
        color: '#fff',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'kollektif',
    },


})

export default styles;