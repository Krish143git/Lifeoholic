import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    //  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
    backgroundColor: "#fff",
  },

  image: {
   width:width,
   height:height * 0.5,
   justifyContent: "center",
   zIndex: 1
  },

  header: {
    backgroundColor: "#fff",
    borderRadius: 30,
    // height: height,
    position: "relative",
    zIndex:2,
    top:-20,
    
  },

  name: {
    fontSize: 25,
    marginLeft: 20,
    fontFamily: "kollektif_bold",
    marginTop: 30,
  },

  subname: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: "kollektif_bold",
    marginTop: 30,
  },

  subnames: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: "kollektif_bold",
    marginTop: 10,
  },

  para: {
    fontSize: 15,
    marginLeft: 20,
  },
  paraLoc: {
    fontSize: 15,
    marginLeft: 5,
    fontFamily: "kollektif",
  },
  tinyLogo: {
    width: width * 0.2,
    height: 70,

    // marginLeft:20,
    borderRadius: 30,
  },

  text: {
    borderWidth: 2,
    padding: 20,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: height * 0.001,
    marginHorizontal: width * 0.025,
    fontFamily: "kollektif_bold",
    width: width * 0.7,
  },

  line: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    margin: 10,
    marginTop: 20,
  },

  button: {
    // alignItems: "center",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap:'wrap',
    marginHorizontal:10,
  },
  buttons: {
    marginHorizontal: 10,
    //    backgroundColor: "#DDDDDD",
    borderWidth: 0.01,
    borderRadius: 30,
    width: width * 0.4,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    padding: 15,
    alignItems: "center",
  },

  badge: {
    marginHorizontal: 10,
    borderWidth: 0.01,
    borderRadius: 30,
    width: width * 0.7,
    padding: 15,
    alignItems: "center",
    backgroundColor: "lightgray",
  },

  badge1: {
    marginHorizontal: 11,
    borderWidth: 0.01,
    borderRadius: 30,
    width: width * 0.4,
    padding: 15,
    alignItems: "center",
    backgroundColor: "lightgray",
    marginTop: 4,
  },

  badge2: {
    marginHorizontal: 1,
    borderWidth: 0.01,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal:15,
    alignItems: "center",
    backgroundColor: "lightgray",
    margin: 10,
    flexDirection:'row',
    marginRight:10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode:'contain'
  },
   badgeText:{
    marginLeft:5,
    fontFamily: "kollektif",
   },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    width: width * 0.9,
    position: "relative",
    marginHorizontal: width * 0.05,
  },

  interest: {
    marginHorizontal: 5,
    //    backgroundColor: "#DDDDDD",
    borderWidth: 0.01,
    borderRadius: 30,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical:10,
    alignItems: "center",
    marginVertical:10
  },
  tripContainer:{
    width:'100%',
    borderWidth:0.2,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
  },
  tripDetails:{
     flexDirection:'row',
  },
  tripText:{
    fontSize:15,
    fontFamily: "kollektif_bold",
    paddingTop:5
  },

  images: {
    width: width * 0.2,
    height: 80,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButon:{
    backgroundColor: '#fff',
    marginHorizontal:5, 
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    elevation: 2,
    justifyContent:'center',
    alignItems:'center',
  },
  iconButonBottom:{
    backgroundColor: '#fff',
    marginHorizontal:5, 
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    elevation: 2,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  },
  iconContainer:{
    position: 'absolute', 
    top: -30, 
    right: 20, 
    flexDirection:'row',
  },
  iconContainerBottom:{
    flexDirection:'row',
    justifyContent:'center'
  },
  hideRepText:{
    marginTop:30,
    marginBottom:10,
    fontFamily: "kollektif",
    textAlign:'center',
    fontSize:16
  }
});

export default styles;
