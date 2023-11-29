import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get('screen');
 const SLIDER_WIDTH = Dimensions.get('window').width + 80
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)


const styles = StyleSheet.create({

    text:{
        fontSize:16,
          marginLeft:20,
           fontFamily:'kollektif_bold',
          color:'gray'
      },

      name:{
        fontSize:40,
        marginLeft:20,
         fontFamily:'kollektif_bold',
    },

    input: {
      borderWidth: 2,
      padding: 5,
      borderColor: 'lightgray',
      borderRadius: 10,
      marginTop: height * 0.001,
      marginHorizontal:width*0.05,
      display:'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      marginTop: 15,

  },

  comment: {
    flex: 3,
    marginLeft: 10,
    alignItems:'center',
  },

  tinyLogo: {
    width: width* 0.1,
    height: height*0.05,
    flex: 0.5,
    
    // marginLeft:20,
    borderRadius: 30,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  touch: {
    borderWidth: 2,
    padding: 5,
    borderColor: 'lightgray',
    borderRadius: 20,
    width: width*0.2,
    marginHorizontal: width*0.02,
    alignItems: 'center',
  },
})


export default styles;