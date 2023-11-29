import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './friendFilterStyles'
import Search from '../../search';

const FriendFilterComponent = () => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);
    return (
        <ScrollView>
            <View>
                <Text style={styles.subnames}>Interested in</Text>
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
                <Text style={styles.subnames}>Body Type</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Slim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Average</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Athletic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest,]}>
                        <Text style={styles.names}>Fat</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            <Text style={styles.subnames}>Religion</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Hindu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Muslim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Christian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Jain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Buddist</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
                <Text style={styles.subnames}>Smoking</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.badge1,styles.active]}>
                        <Text style={[styles.names, styles.active]}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.badge1}>
                        <Text style={styles.names}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.badge1,styles.active]}>
                        <Text style={[styles.names, styles.active]}> Socially</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
                <Text style={styles.subnames}>Drinking</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.badge1}>
                        <Text style={styles.names}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.badge1,styles.active]}>
                        <Text style={[styles.names , styles.active]}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.badge1}>
                        <Text  style={styles.names}> Socially</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
            <Search title="Interests" />
                <View style={styles.button}>
                
                    <TouchableOpacity  style={[styles.badge1,styles.active]}>
                        <Text style={[styles.names , styles.active]}>Running</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.badge1,styles.active]}>
                        <Text style={[styles.names , styles.active]}>Chess</Text>
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

export default FriendFilterComponent;