import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({

    container: {
     marginTop:StatusBar.currentHeight,
    //   justifyContent: "flex-start",
    //   alignItems: "center",
    //   flexDirection: "row",
      width: width * 0.9,
      marginHorizontal:width*0.05,
    },
    text:{
      fontFamily:'kollektif_bold',
        fontSize:20,
    },
    searchBar:{
        display:"flex",
        flexDirection:'row-reverse',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        padding:9,
        marginTop:StatusBar.currentHeight/2,
        borderColor:'lightgray',
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: "90%",
      fontFamily:'kollektif',
    },
  });

  export default styles;