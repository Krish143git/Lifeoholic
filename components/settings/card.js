import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './cardStyles'
import { Entypo } from '@expo/vector-icons';

const Card = (props) => {

    const { name, months, price, discount, total } = props.item;

    return (
        <View style={styles.card}>
            <View style={styles.cardashok}>
                <View style={styles.cardtext}>
                    <Text style={styles.text}>{months <= 1 ? `${months} month` : `${months} months`}</Text>
                    <Text style={styles.text}>{price}<Text>/month</Text></Text>
                </View>
                <View style={styles.cardtext}>
                    <Text style={styles.text}>Save {discount}%</Text>
                    <Text style={styles.text}>Total:${total}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => props.choosePlan(props.item)}>
                <Text style={styles.btnText}>Choose Plan</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Card