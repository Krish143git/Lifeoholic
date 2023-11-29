import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TextInputModal = (props) => {
    const { title, isVisible = false, setShowAvardsModal } = props;
    const [text, setText] = useState('');
    return (
        <Modal transparent={true} visible={isVisible}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.textHeadingStyle}>Please enter {title}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput value={text} style={styles.textInput} onChangeText={(v) => setText(v)} />
                        <TouchableOpacity onPress={() => {
                            setShowAvardsModal(text)
                            setText('')
                        }} style={styles.button}>
                            <Text style={styles.buttonLable}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        width: '60%',
        borderRadius: 10,
        paddingLeft: 10,
        paddingVertical: 5
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'black'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textHeadingStyle: {
        marginLeft: '10%',
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600'
    },
    buttonLable: {
        color: 'white'
    }
})

export default TextInputModal;