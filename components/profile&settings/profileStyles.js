import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get('screen');


const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: width,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : height * 0.05,
    // justifyContent: 'space-between',
  },

  header: {
    backgroundColor: "#fff",
    height: 120,
    marginHorizontal: width * 0.05,
    borderRadius: 20,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center'

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
    fontSize: width*0.05,
    fontFamily:'kollektif_bold',
  },

  body: {
    marginTop: 40,
  },

  // bodyContent: {
  //   flex: 1,
  //   alignItems: 'center',
  //   padding:30,
  // },

  edit: {
    textDecorationLine: "underline",
    fontSize: 18,
    fontFamily:'kollektif',
    marginLeft: 17,
  },
  item: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    fontFamily:'kollektif_bold',
    textAlign: "left",
  },

  shadowProp: {
    shadowColor: '#ffffff',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5,
  },
  delete: {
    textDecorationLine: "underline",
    fontSize: 18,
    textAlign: "center",
    color: 'gray',
    fontFamily:'kollektif',
  },

  list: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.05,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginTop:20
  },

  log: {
    color: "red",
    fontFamily:'kollektif',
  },

})

export default styles;