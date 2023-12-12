import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    subContainer:{
        margin: 30, 
        backgroundColor: 'white', 
        padding: 20, 
        width: '80%', 
        borderRadius: 5 
    },
    headerText:{
        fontSize: 18, 
        fontWeight: '600' 
    },
    listView:{
        marginTop: 10, 
        maxHeight: 150
    },
    listItem:{
        padding: 10, 
        width: '100%',
    },
    itemText:{
        fontSize: 16, 
        fontWeight: '600'
    },
    textInput:{
        borderWidth:1,
        borderRadius:10,
        marginVertical:10,
        height:45,
        fontSize:16,
        paddingLeft:10
    },
    buttonContainer:{
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        height:50,
         marginTop:20
    },
    buttonText:{
        color:"white",
        fontSize:18,
        
    }
})