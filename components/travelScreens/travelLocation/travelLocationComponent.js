import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react';
import styles from './travelLocationStyles'
import { AntDesign } from '@expo/vector-icons'


const TravelLocationComponent = () => {
    return (


        <FlatList style={styles.list}
            ListHeaderComponent={
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.buttons, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.names}>Nearby</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.names}>Filter</Text>
                    </TouchableOpacity>
                </View>
            }
            data={[
                { key: 1, travellers: 99, title: 'Goa', image: require("../../../assets/images/goa.jpg") },
                { key: 2, travellers: 99, title: 'Himalayas', image: require("../../../assets/images/himalaya.jpg") },
                { key: 3, travellers: 99, title: 'Kerala', image: require("../../../assets/images/kerala.webp") },
            ]}
            renderItem={({ item }) => {
                return (
                    <View style={styles.item}>
                        <View style={styles.imageConatiner}>
                            <Image source={item.image} style={styles.image} />
                        </View>
                        <View style={styles.textWrapper}>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.travellers}>{item.travellers} Travellers</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.btnText}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                )
            }
            }
        />


    )
}

export default TravelLocationComponent;