import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './filterMatchStyles'
import Search from '../../search';

const FilterMatchComponent = () => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);
    return (
        <ScrollView>
            <View>
                <Text style={styles.subnames}>Location</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.buttons}>
                        <Text>Telangana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text>Delhi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text>India</Text>
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
                <Search title="Religion" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Any</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Hindu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Jain</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Search title="Caste" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest]}>
                        <Text style={styles.names}>Any</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.interest, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Brahmin</Text>
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
            <View>
              <Search title="Education" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest1, styles.active]}>
                        <Text style={[styles.names, styles.active]}>Computer Science Engineering</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View>
            <Search title="Career" />
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
                    </TouchableOpacity></View>
            </View>
            <View >
            <Search title="Industry" />
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.interest2, styles.active]}>
                        <Text style={[styles.names, styles.active]}>web Design</Text>
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

export default FilterMatchComponent;