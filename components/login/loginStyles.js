import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        justifyContent: 'space-between',
    },
    logoContainer: {
        height: height * 0.32,
        backgroundColor: '#000',
        width: width,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: width,
        height: height * 0.20,
        resizeMode: 'contain'
    },
    formContainer: {
        width: width * 0.9,
        marginHorizontal: width * 0.05,
        paddingTop: height * 0.01,
        marginTop:height*0.05
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
        marginVertical: height * 0.02
    }
    ,
    label: {
        fontSize: height * 0.023,
        fontFamily:'kollektif_bold',
    },
    input: {
        borderWidth: 2,
        padding: 10,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: height * 0.02
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
    }
});

export default styles;