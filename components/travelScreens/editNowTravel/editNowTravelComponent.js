import { View, Text, Dimensions, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Switch } from 'react-native'
import React, { useEffect, useId } from 'react'
import styles from './editNowTravelStyles';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5, Ionicons, Octicons, FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAge } from '../../../common/Common';
const { width, height } = Dimensions.get('screen');
//MATCH MAKING SCREENS
const EditNowComponent = () => {

    const Navigation = useNavigation();
    const isCarousel = React.useRef(null);

    const [state, setState] = React.useState({
        name: 'Sai Chand',
        age: 26,
        aboutMe: 'This is sai chand',
        gender: 'Male',
        height: '162cm',
        bodyType: 'Slim',
        motherTongue: 'Telugu',
        languagesKnown: ['Telugu','English','Tamil','Hindi'],
        education: 'Computer Science Engineering',
        work: 'UI/UX Designer',
        industry: "Web Design",
        somoking: 'No',
        drinking: 'Socially',
        intrestedIn: ['Football','Chess','Music','Movies'],
        homeTown: 'Mysore',
        currentLocation: 'Banglore'
    });


    useEffect(() => {
        AsyncStorage.getItem('userId').then(uId => {
            console.log('useId', useId);
        });
        AsyncStorage.getItem('userdata').then((res) => {
            let usrData = JSON.parse(res);
            let age = calculateAge(usrData.dateOfBirth);
            if (usrData) {
                // setState({
                //     ...state,
                //     name: usrData.firstName,
                //     age: age
                // })
            }
        });
    }, [])

    const data = [
        {
            imgUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190430-make-friends-app-1556655645.jpg?crop=0.502xw:1.00xh;0.235xw,0&resize=640:*",
        },
        {

            imgUrl: "https://m.economictimes.com/thumb/msid-84889480,width-1200,height-900,resizemode-4,imgsize-143058/friends.jpg",
        },
        {

            imgUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/19/18/idoh-socialise.jpg?quality=75&width=982&height=726&auto=webp",
        },
    ];

    const section1 = [
        { key: 'Age', icon: <FontAwesome5 name="calendar-day" size={16} color="black" style={{ marginLeft: 5 }} />, data: { name: state.age } },
        { key: 'Gender', icon: <MaterialCommunityIcons name="gender-male-female-variant" size={20} color="black" />, data: { name: state.gender } },
        { key: 'Height', icon: <MaterialIcons name="height" size={20} color="black" />, data: { name: state.height } },
        { key: 'Body Type', icon: <FontAwesome5 name="male" size={20} color="black" style={{ marginLeft: 10 }} />, data: { name: state.bodyType } },
    ];

    const section2 = [
        { key: 'Mother Tongue', icon: <Image source={require('../../../assets/images/language.png')} style={styles.icon} />, data: { name: state.motherTongue } },
        { key: 'Languages Known', icon: <Image source={require('../../../assets/images/language.png')} style={styles.icon} />, data: { name: state.languagesKnown } },
    ]

    const section3 = [
        { key: 'Education', icon: <FontAwesome5 name="book-open" size={16} color="black" />, data: { name: state.education } },
        { key: 'Work', icon: <Image source={require('../../../assets/images/portfolio.png')} style={[styles.icon]} />, data: { name: state.work} },
        { key: 'Industry', icon: <Ionicons name="cube" size={20} color="black" />, data: { name: state.industry } },
    ]

    const section4 = [
        { key: 'Smoking', icon: <FontAwesome5 name="smoking" size={18} color="black" />, data: { name: state.somoking } },
        { key: 'Drinking', icon: <Entypo name="drink" size={18} color="black" />, data: { name: state.drinking } },
        { key: 'Interested In', icon: <FontAwesome name="paint-brush" size={16} color="black" />, data: { name: state.intrestedIn } },
    ]

    const section5 = [
        { key: 'Home Town', icon: <FontAwesome name="home" size={20} color="black" />, data: { name: state.homeTown } },
        { key: 'Current Location', icon: <Ionicons name="location-sharp" size={20} color="black" />, data: { name: state.currentLocation } },
    ]


    const renderImage = ({ item, index }) => {

        return (
            <View style={styles.container} key={index}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                />
            </View>
        );
    }


    const navigateToPreviewProfile = () => {
        Navigation.navigate("TravelAboutMe",{"personalData": state});
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Carousel
                layout="tinder"
                // layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={renderImage}
                sliderWidth={width}
                itemWidth={width}
                inactiveSlideShift={0}
                useScrollView={true}
            />
            {/* <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            /> */}
            <View>
                <Text style={styles.name}>{state.Name}</Text>
                <SafeAreaView>
                    <Text style={styles.text}>About Me</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter here"
                        editable={true}
                        value={state.AboutMe}
                        keyboardType="text" />
                </SafeAreaView>
            </View>
            <View>
                <Text style={styles.name1}>Basic Deatils</Text>
              
                
                <View style={styles.list}>
                    {
                        section1.map((item, ind) => {
                            return (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {/* <Text>{item.icon}</Text> */}
                                        {item.icon}
                                        <Text style={[styles.item, item.style]}>{item.key}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text>{item.data.name}</Text>
                                        <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>


               


                <View style={styles.list}>
                    {
                        section2.map((item, ind) => {
                            return (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>

                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {item.icon}
                                        <Text style={[styles.item, item.style]}>{item.key}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ width: 100, textAlign: 'right' }}>
                                            {
                                                Array.isArray(item.data.name) ?
                                                    item.data.name.map(n => n + ",")
                                                    : item.data.name}</Text>
                                        <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                                    </View>

                                </View>
                            )
                        })
                    }
                </View>



                

                <View style={styles.list}>
                   {
                    section3.map((item,ind)=>{
                        return(
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{item.icon}</Text>
                                <Text style={[styles.item, item.style]}>{item.key}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ width: 100, textAlign: 'right' }}>{item.data.name}</Text>
                                <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                            </View>

                        </View>
                        )
                    })
                   }
                </View>

               

                <View style={styles.list}>
                 {
                    section4.map((item,ind)=>{
                        return(
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{item.icon}</Text>
                                <Text style={[styles.item, item.style]}>{item.key}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'right', width: 100 }}>
                                    {
                                        Array.isArray(item.data.name) ?

                                            item.data.name.map(n => n + ",")
                                            : item.data.name}</Text>
                                <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                        )
                    })
                 }
                </View>



                <View style={styles.list}>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                 <MaterialCommunityIcons name="map-marker-path" size={20} color="black" />
                 {/* <FontAwesome name="travel" size={18} color="black" /> */}
                 <Text style={styles.item}>Trips</Text>
                </View>   
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.item}>+</Text>
                 <Text style={[styles.item,{marginLeft:-15}]}>Add</Text>
                </TouchableOpacity> 
                 </View>
                 <View style={{height:1,width:'100%',backgroundColor:'lightgray',marginVertical:10}}/>

                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

                 <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Text style={styles.item}>Goa, India</Text>
                </View>   

                <View style={{backgroundColor:'pink',padding:4,borderRadius:8}}>
                <MaterialCommunityIcons name="delete-outline" size={18} color="white" />
                </View> 

                 </View>
                 <Text style={{
                     paddingHorizontal: 10,
                     fontSize: 14,
                     textAlign: "left",
                     fontWeight:'600',
                 }}>Jan - Feb 2021</Text>
                 <View style={{height:1,width:'100%',backgroundColor:'lightgray',marginVertical:10}}/>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Text style={styles.item}>Mysore, India</Text>
                </View>   
                <View style={{backgroundColor:'pink',padding:4,borderRadius:8}}>
                <MaterialCommunityIcons name="delete-outline" size={18} color="white" />
                </View> 
                 </View>
                 <Text style={{
                     paddingHorizontal: 10,
                     fontSize: 14,
                     textAlign: "left",
                     fontWeight:'600',
                 }}>Jun - Jul 2021</Text>
                </View>



                

                <View style={styles.list}> 
                 {
                    section5.map((item,ind)=> {
                        return(
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{item.icon}</Text>
                                <Text style={[styles.item, item.style]}>{item.key}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{item.data.name}</Text>
                                <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                        )
                    })
                 }
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => navigateToPreviewProfile()}>
                        <Text style={styles.btnText}>Preview Profile</Text>
                    </TouchableOpacity>
                </View><View style={styles.btnContainer1}>
                    <TouchableOpacity>
                        <Text style={styles.btnText1}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default EditNowComponent;