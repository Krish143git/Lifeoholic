import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const styles = StyleSheet.create({

  image: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.02,
    height: height * 0.5,
    borderRadius: 20,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    margin: 0
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },

  header: {
    color: "#222",
    fontSize: 28,
    fontFamily: 'kollektif_bold',
    paddingLeft: 20,
    paddingTop: 20
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    fontFamily: 'kollektif_bold',
    color: 'gray'
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'kollektif_bold',
  },
  name: {
    fontSize: 40,
    marginLeft: 20,
    fontFamily: 'kollektif_bold',
  },
  input: {
    borderWidth: 2,
    padding: 25,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: height * 0.001,
    marginHorizontal: width * 0.05,
  },

  name1: {
    marginTop: height * 0.03,
    fontSize: 21,
    marginLeft: 20,
    fontFamily: 'kollektif_bold',
  },
  item: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'kollektif_bold',
    textAlign: "left"
  },

  list: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginTop: 20
  },
  btnContainer: {
    overflow: 'hidden',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.05,
  },
  btnText: {
    color: '#000',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'kollektif_bold',
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
    fontFamily: 'kollektif_bold',
  },
  subnames: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'kollektif_bold',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {

    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,


  },
  buttons: {
    marginHorizontal: 10,
    borderWidth: 0.01,
    borderRadius: 30,
    width: width * 0.4,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    fontFamily: 'kollektif_bold',
  },

  line: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
    margin: 10,
    marginTop: 10,
  },
  listItem:{
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginHorizontal: 5
  },
  iconTextContainer:{
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
})

export default styles;