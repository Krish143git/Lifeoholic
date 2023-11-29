import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import styles from './travelFilterStyles';
import Search from '../../search';

const TravelFilterComponent = () => {
    return (
        <ScrollView>
            <View style={styles.button}>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.names}>Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.names}>Nearby</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttons, styles.active]}>
                    <Text style={[styles.names, styles.active]}>Filter</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.subnames}>Gender</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Men</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interest}>
                        <Text style={styles.names}>Women</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interest}>
                        <Text style={styles.names}>Other</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={styles.container}>
                <View>
                    <RangeSlider min={5} max={26}
                        fromValueOnChange={value => setFromValue(value)}
                        toValueOnChange={value => setToValue(value)}
                        initialFromValue={11}
                    />
                    <Text>from value:  {fromValue}</Text>
                    <Text>to value:  {toValue}</Text>
                </View>
                <View>
                    <Slider min={0} max={40} step={4}
                        valueOnChange={value => setValue(value)}
                        initialValue={12}
                        knobColor='red'
                        valueLabelsBackgroundColor='black'
                        inRangeBarColor='purple'
                        outOfRangeBarColor='orange'
                    />
                    <View><Text>value:  {value}</Text></View>

                </View> */}
            {/* </View> */}
             
            <View>
               <Search title="Languages" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Hindi</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
            <Search title="Interests" />
                <View style={styles.button}>

                    <TouchableOpacity style={[styles.badge1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Running</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.badge1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Chess</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View >
            <Search title="Location" />
                <View style={styles.button}>

                    <TouchableOpacity style={[styles.badge1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Gulbarg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.badge1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Delhi</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.btnContainer1}>
                <TouchableOpacity>
                    <Text style={styles.btnText1}>Search</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default TravelFilterComponent;