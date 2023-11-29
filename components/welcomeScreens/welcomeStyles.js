import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width*0.9,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
        justifyContent: 'space-around',
        marginHorizontal:width*0.05,
    },
    titleStyle: {
      padding: 10,
      textAlign: 'center',
      fontSize: 18,
       fontFamily:'kollektif_bold',
    },
    paragraphStyle: {
      padding: 20,
      textAlign: 'center',
      fontSize: 16,
      fontFamily:'kollektif',
    },
    introImageStyle: {
      width: width,
      height: height,
      resizeMode:'contain',
    },
    introTextStyle: {
      fontSize: 18,
      color: 'gray',
      textAlign: 'center',
      paddingBottom:height*0.3,
      fontFamily:'kollektif',
      width:'70%',
      marginTop:10
    },
    introTitleStyle: {
      fontSize: 25,
      color: '#000',
      textAlign: 'center',
      marginBottom: 16,
       fontFamily:'kollektif_bold',
    },
    btnContainer: {
        overflow: 'hidden',
        marginVertical:height*0.01
    },
    skipBtnContainer : {
      overflow: 'hidden',
        marginVertical:height*0.01
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
    },
    skipBtnText: {
      color: '#000',
      backgroundColor: '#fff',
      borderColor:'lightgray',
      borderWidth:1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 25,
      textAlign: "center",
      fontSize: 20,
      fontFamily:'kollektif',
  }
});

export default styles;