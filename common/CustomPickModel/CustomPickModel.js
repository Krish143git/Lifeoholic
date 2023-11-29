import { View, Text, Modal,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { upperLowerCharacter } from '../Common';
import styles from './custStyles'

export default function CustomPickModel(props) {
    const {item,onSelectItem,state,setState} = props;
    return (
        <Modal transparent={true} visible={true}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.headerText}>Please select {item.key}</Text>
                    <ScrollView style={styles.listView}>
                        {
                            item.listData.map((item1) => {
                                const itemLable = upperLowerCharacter(item.key);
                                return (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                             setState({...state, [itemLable] : item1 })
                                             onSelectItem()
                                        }} style={[styles.listItem,{backgroundColor: item1 == state[itemLable] ? 'lightgray' : null}]}>
                                            <Text style={styles.itemText}>{item1}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}