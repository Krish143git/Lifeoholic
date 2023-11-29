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
    }
})