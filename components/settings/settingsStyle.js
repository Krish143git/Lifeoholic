import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'space-around',
    marginHorizontal: width * 0.05,
    marginTop: height * 0.010
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 5,
    color: 'gray',
  },
  activeIcon: {
    color: 'black',
  },
  boldHead: {
    textAlign: 'center',
    fontFamily: 'kollektif_bold',
    fontSize: height * 0.026,
    paddingVertical: height * 0.02

  },
  btnContainer: {
    overflow: 'hidden',
    marginTop: height * 0.005,
    paddingBottom: 20
  },
  header: {
    backgroundColor: "#fff",
    height: 120,
    borderRadius: 20,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: height * 0.03,
    width: width * 0.9,

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
    fontSize: 29,
    fontFamily: 'kollektif_bold',
  },

  body: {
    marginTop: 40,
  },

  edit: {
    textDecorationLine: "underline",
    fontSize: 18,
    marginLeft: 17,
  },
  btnText: {
    color: '#000',
    backgroundColor: 'transparent',
    fontFamily: 'kollektif_bold',
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    textAlign: "center",
    fontSize: 20,
  },
  settings: {
    fontFamily: 'kollektif_bold',
    fontSize: height * 0.026,
    paddingVertical: height * 0.02,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: height * 0.1,
    marginBottom: height * 0.3
  },
  currosalContainer: {
    alignItems: 'center'
  }

});

export default styles;