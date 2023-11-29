import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const styles = StyleSheet.create({

  image: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.02,
    height: height * 0.6,
    borderRadius: 20,
    marginTop: StatusBar.currentHeight
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
    marginBottom: 10,
    fontFamily: 'kollektif_bold',
    color: 'gray'
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  name: {
    fontSize: 40,
    marginLeft: 20,
    fontFamily: 'kollektif_bold',
  },
  input: {
    borderWidth: 2,
    padding: 15,
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

  icon: {
    width: 18,
    height: 18,
    // resizeMode: 'conatin'
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
    fontFamily: 'kollektif',
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
    fontFamily: 'kollektif',
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
    justifyContent: "flex-start",
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    flexWrap:'wrap'
  },
  buttons: {
    marginHorizontal: 5,
    //    backgroundColor: "#DDDDDD",
    borderWidth: 0.01,
    borderRadius: 30,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical:10,
    alignItems: "center",
    marginVertical:5
  },
  line: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    margin: 10,
    marginTop: 20,
  },
  detailsText:
  {
    fontSize: 16,
    marginLeft: 22,
    marginTop:10,
    fontFamily: 'kollektif_bold',
    color: 'black'
  },
  container:
  {

      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

  },
  picker:
  {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: height * 0.01,
    height:height*0.05,
    justifyContent:'center'
  }
})

export default styles;