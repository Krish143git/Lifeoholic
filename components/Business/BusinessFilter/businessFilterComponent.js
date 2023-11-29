import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './businessFilterStyles'
import Search from '../../search';

const BusinessFilterComponent = () => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);
    return (
        <ScrollView>
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
                <Search title="Job Title" />
                <View style={styles.button}>
                <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>UI/UX Designer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Java Developer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Full Stack Developer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View >
            <Search title="Industry" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>web Design</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
              <Search title="Education" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Computer Science Engineering</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View>
              <Search title="Looking For" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Hire Employees</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Idea Validator</Text>
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

export default BusinessFilterComponent;