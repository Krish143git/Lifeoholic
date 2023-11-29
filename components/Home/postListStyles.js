import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get('screen');
 const SLIDER_WIDTH = Dimensions.get('window').width + 80
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)


const styles = StyleSheet.create({

    input: {
       alignItems: 'center',
        padding: 5,
        marginTop: height * 0.001,
        marginHorizontal:width*0.05,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 20,
  
    },
  
    tinyLogo: {
        width: width* 0.1,
        height: height*0.05,
        flex: 0.5,
        
        // marginLeft:20,
        borderRadius: 30,
      },

      
  comment: {
    flex: 3,
    marginLeft: 10,
  },

  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    width: width * 0.9,
    position: 'relative',
    marginHorizontal: width * 0.05,
},

images: {
    width: width* 0.2,
    height: 80,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
},

image: {
    width: width*0.9,
    marginHorizontal:width*0.05,
    marginVertical:height*0.02,
    height: height*0.6,
    borderRadius:20,
    marginTop: StatusBar.currentHeight
  },

  mainContainer: {
    width: width* 0.9,
    marginHorizontal: width* 0.05,
  },

  postSymbols: {
    width: width* 0.9,
    marginHorizontal: width* 0.05,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  postLike: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  postComment: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: width* 0.05,
  },
})


export default styles;