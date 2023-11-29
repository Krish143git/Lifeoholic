import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        //  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        backgroundColor: '#fff'

    },

    header: {
        backgroundColor: "#fff",
        marginHorizontal: width * 0.05,
        borderRadius: 10,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginTop:height*0.03

    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
         fontFamily:'kollektif_bold',
        textAlign: "left",
    },

    names: {
        marginHorizontal: width * 0.08,
         fontFamily:'kollektif_bold',
        marginTop: 15
    },
})


export default styles;