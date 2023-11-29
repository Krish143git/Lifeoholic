import { View, Text, Dimensions, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Switch, Modal } from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import styles from './editStyles';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5, Ionicons, Octicons, FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAge, upperLowerCharacter } from '../../../common/Common';
import CustomPickModel from '../../../common/CustomPickModel/CustomPickModel';
import { createFriends, fetchFriends, updateFriends } from '../../../services/mainNav';
import { showMessage } from '../../../hoc/showMessage'
const { width, height } = Dimensions.get('screen');

const EditComponent = (props) => {
    const Navigation = useNavigation();
    const isCarousel = React.useRef(null);
    const [selectedName, setSelectedName] = React.useState('');
    const [user, setUser] = React.useState(null);
    const [isDetailsExist, setIsDetailsExist] = React.useState(false);

    const [state, setState] = React.useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        bodyType: '',
        zodiacSign: '',
        religion: '',
        maritalStatus: '',
        motherTongue: '',
        educationLevel: '',
        education: '',
        languagesKnown: [],
        work: '',
        smoking: '',
        drinking: '',
        lookingFor: '',
        personality: [],
        interestedIn: [],
        homeTown: '',
        currentLocation: '',
        aboutMe: '',
        friendProfileId: '',
    });


    useEffect(() => {
        AsyncStorage.getItem('personalData').then((res) => {
            let usrData = JSON.parse(res);
            let age = calculateAge(usrData.dateOfBirth);
            if (usrData) {
                setState({
                    ...state,
                    name: usrData.firstName,
                    age: age
                })
            }
            setUser(usrData);
        });
    }, [])

    useEffect(() => {
        getFriends()
    }, [user])


    const getFriends = async () => {
        let data = await fetchFriends(user?._id);
        if (data.message == "fetched Successfully") {
            let uData = data.result;
            setIsDetailsExist(true);
            setState({
                ...state,
                friendProfileId: uData._id,
                gender: uData.gender,
                height: uData.height,
                bodyType: uData.bodyType,
                zodiacSign: uData.zodiacSign,
                religion: uData.religion,
                maritalStatus: uData.maritalStatus,
                motherTongue: uData.motherTongue,
                educationLevel: uData.educationLevel,
                education: uData.education,
                languagesKnown: uData.languagesKnown,
                work: uData.work,
                smoking: uData.smoking,
                drinking: uData.drinking,
                lookingFor: uData.lookingFor,
                personality: uData.personality,
                interestedIn: uData.interestedIn,
                homeTown: uData.homeTown,
                currentLocation: uData.currentLocation,
                aboutMe: uData.aboutMe
            })
        }
    }

    const validateFields = () => {
        let keys = Object.keys(state);
        for (let i = 0; i < keys.length; i++) {
            if (Array.isArray(state[keys[i]]) ? !state[keys[i]].length : !state[keys[i]]) {
                return false
            }
        }
        return true;
    }

    const updateFriendsProfile = async () => {
        let formData = new FormData();
        formData.append("aboutMe", state.aboutMe);
        formData.append("age", state.age);
        formData.append("bodyType", state.bodyType);
        formData.append("currentLocation", state.currentLocation);
        formData.append("drinking", state.drinking);
        formData.append("education", state.education);
        formData.append("educationLevel", state.educationLevel);
        formData.append("gender", state.gender);
        formData.append("height", state.height);
        formData.append("homeTown", state.homeTown);
        formData.append("interestedIn", state.interestedIn);
        formData.append("languagesKnown", state.languagesKnown);
        formData.append("lookingFor", state.lookingFor);
        formData.append("maritalStatus", state.maritalStatus);
        formData.append("motherTongue", state.motherTongue);
        formData.append("personality", state.personality);
        formData.append("religion", state.religion);
        formData.append("smoking", state.smoking);
        formData.append("work", state.work);
        formData.append("zodiacSign", state.zodiacSign);
        formData.append("userId", user?._id);
        formData.append("name", state.name);
        let data = await updateFriends(formData, state?.friendProfileId);
        console.log('updated dataaa', data);
    }


    const saveFriendsDetails = async () => {
        if (validateFields()) {
            let finalData = { ...state, userId: user?._id }
            let formData = new FormData();
            formData.append("aboutMe", state.aboutMe);
            formData.append("age", state.age);
            formData.append("bodyType", state.bodyType);
            formData.append("currentLocation", state.currentLocation);
            formData.append("drinking", state.drinking);
            formData.append("education", state.education);
            formData.append("educationLevel", state.educationLevel);
            formData.append("gender", state.gender);
            formData.append("height", state.height);
            formData.append("homeTown", state.homeTown);
            formData.append("interestedIn", state.interestedIn);
            formData.append("languagesKnown", state.languagesKnown);
            formData.append("lookingFor", state.lookingFor);
            formData.append("maritalStatus", state.maritalStatus);
            formData.append("motherTongue", state.motherTongue);
            formData.append("personality", state.personality);
            formData.append("religion", state.religion);
            formData.append("smoking", state.smoking);
            formData.append("work", state.work);
            formData.append("zodiacSign", state.zodiacSign);
            formData.append("userId", user?._id);
            formData.append("name", state.name);
            let data = await createFriends(formData);
            if (data.message == "Already Friends Profile is Present with the user") {
                showMessage({ text: 'Friends profile created!', color: 'gray' })
            } else {
                showMessage({ text: data.message, color: 'gray' })
            }
        } else {
            showMessage({ text: "All fields are mandatory!", color: 'gray' })
        }
    }

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
        { key: 'Age', icon: <FontAwesome5 name="calendar-day" size={16} color="black" style={{ marginLeft: 5 }} />, data: { name: state.age }, listData: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
        {
            key: 'Gender', icon: <MaterialCommunityIcons name="gender-male-female-variant" size={20} color="black" />, data: { name: state.gender },
            listData: [
                'Male', 'Female', 'Others'
            ]
        },
        {
            key: 'Height', icon: <MaterialIcons name="height" size={20} color="black" />, data: { name: state.height + 'cm' },
            listData: [
                160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180
            ]
        },
        {
            key: 'Body Type', icon: <FontAwesome5 name="male" size={20} color="black" style={{ marginLeft: 10 }} />, data: { name: state.bodyType },
            listData: ["Slim", "Athletic", "Fit", "Curvy", "Average", "Muscular", "Toned", "Petite", "Voluptuous", "Stocky", "Lean", "Thin", "Well-built", "Full-figured", "Hourglass", "Chubby", "Skinny,Heavyset", "Broad-shouldered", "Pear-shaped"]
        },
    ];

    const section2 = [
        {
            key: 'Zodiac SIgn', icon: <MaterialCommunityIcons name="zodiac-virgo" size={24} color="black" />, data: { name: state.zodiacSign },
            listData: ["Aries(Maish)", "Taurus(Vrish)", "Gemini(Mithun)", "Cancer(Kark)", "Leo(Singh)", "Virgo(Kanya)", "Libra(Tula)", "Scorpio(Vrishchik)", "Sagittarius(Dhanu)", "Capricorn(Makar)", "Aquarius(Kumbh)", "Pisces(Meen)"]
        },
        {
            key: 'Religion', icon: <FontAwesome5 name="praying-hands" size={18} color="black" />, data: { name: state.religion },
            listData: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Inter-Religion", "Buddhist"]
        },
        {
            key: 'Marital Status', icon: <AntDesign name="heart" size={18} color="black" />, data: { name: state.maritalStatus },
            listData: ["Single", "Married", "Widowed", "Divorced", "Separated"]
        },
        {
            key: 'Mother Tongue', icon: <Image source={require('../../../assets/images/language.png')} style={styles.icon} />, data: { name: state.motherTongue },
            listData: ["Angika", "Arunachali", "Assamese", "Awadhi", "Badaga", "Bengali", "Bhojpuri", "Bihari", "Brij", "Chatisgarhi", "Dogri", "English", "French", "Garhwali", "Garo", "Gujarati", "Haryanvi", "Himachali/Pahar",
                "Hindi", "Kanauji", "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni", "Kutchi", "Ladacki", "Lepcha", "Magahi", "Maithili", "Malayalam", "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nepali", "Nicobarese",
                "Oriya", "Punjabi", "Rajasthani", "Sanskrit", "Santhali", "Sindhi", "Sourashtra", "Tamil", "Telugu", "Tripuri", "Tulu", "Urdu"
            ]
        },
        {
            key: 'Languages Known', icon: <Image source={require('../../../assets/images/language.png')} style={styles.icon} />, data: { name: state.languagesKnown },
            listData: ["English", "Hindi", "Urdu", "Telugu", "Tamil", "Kannada"]
        },
    ]

    const section3 = [
        {
            key: 'Education Level', icon: <FontAwesome name="graduation-cap" size={20} color="black" />, data: { name: state.educationLevel },
            listData: ["Under Graduate", "Graduate", "Post Graduate"]
        },
        {
            key: 'Education', icon: <FontAwesome5 name="book-open" size={18} color="black" />, data: { name: state.education },
            listData: ["Engineering", "Degree", "Intermediate", "MCA", "Msc"]
        },
        {
            key: 'Work', icon: <Image source={require('../../../assets/images/portfolio.png')} style={{ width: 20, height: 20, marginTop: 20 }} />, data: { name: state.work },
            listData: ["Developer", "Software Tester", "UI/UX Designer", "Human Resource Manager", "Suppoer Engineer"]
        },
    ]

    const section4 = [
        {
            key: 'Smoking', icon: <FontAwesome5 name="smoking" size={20} color="black" />, data: { name: state.smoking },
            listData: ["Yes", "No"]
        },
        {
            key: 'Drinking', icon: <Entypo name="drink" size={20} color="black" />, data: { name: state.drinking },
            listData: ["Regular", "Socially", "No habbit"]
        },
        {
            key: 'Looking For', icon: <MaterialCommunityIcons name="human-male-female" size={24} color="black" />, data: { name: state.lookingFor },
            listData: ["Relationship", "Friendship", "Dating Partner", "Life Partner"]
        },
        {
            key: 'Personality', icon: <MaterialCommunityIcons name="human-child" size={24} color="black" />, data: { name: state.personality },
            listData: ["Kind", "Joyful", "Warrior", "Cool", "Scholar"]
        },
        {
            key: 'Interested In', icon: <FontAwesome name="paint-brush" size={18} color="black" />, data: { name: state.interestedIn },
            listData: {
                "Sports and Fitness": [
                    "Running", "Yoga", "Tennis", "Soccer", "Gym workouts", "Cycling", "Swimming", "Basketball", "Hiking", "Martial arts", "Chess", "Shattle"],
                "Arts and Culture": [
                    "Painting", "Photography", "Writing", "Sculpting", "Drawing", "Film and cinema", "Music (listening or playing)", "Theater", "Literature", "Dance"
                ],
                "Food and Dining": [
                    "Cooking", "Trying new restaurants", "Baking", "Wine tasting", "Coffee lovers", "Vegetarian/vegan cuisine", "Foodie adventures", "Farmers markets", "Culinary explorations", "Exotic cuisines"
                ],
                "Travel and Adventure": [
                    "Backpacking", "Road trips", "Camping", "Exploring new cities", "Adventure sports", "Hiking trails", "Beach destinations", "Cultural tourism", "Mountain climbing", "Historical sites"
                ],
                "Technology and Gaming": [
                    "Video games", "Coding/programming", "Virtual reality", "Mobile apps", "AI and machine learning", "Web development", "Tech gadgets", "E-sports",
                    "Science and technology news", "Computer hardware"
                ],
                "Nature and Outdoors": [
                    "Gardening", "Birdwatching", "Wildlife conservation", "Nature photography", "Beach walks", "Outdoor photography", "National parks", "Environmental activism", "Sailing", "Stargazing"
                ],
                "Music and Entertainment": [
                    "Live concerts", "Music festivals", "DJ events", "Karaoke", "Playing musical instruments", "Jazz and blues", "Pop and rock", "Classical music", "Broadway shows", "Stand-up comedy"
                ],
                "Reading and Learning": [
                    "Book clubs", "Self-improvement", "History", "Science and technology", "Philosophy", "Personal development", "TED Talks", "Podcasts", "Educational workshops", "Language learning"
                ],
                "Social Causes": [
                    "Volunteering", "Animal rights", "Environmental conservation", "Human rights", "Community service", "Sustainable living", "Charity work", "Fundraising events", "Social justice", "Advocacy"
                ],
                "Personal Development": [
                    "Meditation", "Mindfulness", "Self-reflection", "Goal setting", "Life coaching", "Fitness challenges", "Positive psychology", "Stress management", "Leadership skills", "Time management"
                ]
            }
        },
    ]

    const section5 = [
        {
            key: 'Home Town', icon: <FontAwesome name="home" size={22} color="black" />, data: { name: state.homeTown },
            listData: ["Mysore", "Koimbatur", "Nellore", "Tirupathi", "Guntur"]
        },
        {
            key: 'Current Location', icon: <Ionicons name="location-sharp" size={22} color="black" />, data: { name: state.currentLocation },
            listData: ["Banglore", "Chennai", "Andhra Pradesh", "Telangana", "Utter Pradesh"]
        },
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

    const addRemoveLanguages = (item, itemLable) => {
        console.log(itemLable)
        let tempArr = [...state[itemLable]];
        if (tempArr.includes(item)) {
            let index = tempArr.indexOf(item);
            tempArr.splice(index, 1);
        } else {
            tempArr.push(item);
        }
        setState({ ...state, [itemLable]: tempArr })
    }

    const renderOptionList = (optionsItem) => {
        const itemLable = upperLowerCharacter(optionsItem.key);
        let selectedItems = optionsItem.data.name;
        return (
            <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    optionsItem.listData.map((item, ind) => {
                        return (
                            <TouchableOpacity onPress={() => addRemoveLanguages(item, itemLable)} style={{ padding: 10, borderWidth: 1, borderRadius: 10, margin: 5, backgroundColor: selectedItems.includes(item) ? 'lightgray' : null }}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const renderOptionList1 = (optionsItem, item) => {
        const itemLable = upperLowerCharacter(item.key);
        let selectedItems = item.data.name;
        return (
            <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    optionsItem.map((item, ind) => {
                        return (
                            <TouchableOpacity onPress={() => addRemoveLanguages(item, itemLable)} style={{ padding: 10, borderWidth: 1, borderRadius: 10, margin: 5, backgroundColor: selectedItems.includes(item) ? 'lightgray' : null }}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const renderIntrest = (item) => {
        let keys = Object.keys(item.listData);
        let data = item.listData;
        return (
            <View style={{ margin: 10 }}>
                {
                    keys.map((itm) => {
                        return (
                            <View>
                                <Text style={{ color: '#000' }}>{itm}</Text>
                                {renderOptionList1(data[itm], item)}
                            </View>
                        )
                    })
                }
            </View>
        )
    }


    const navigateToPreviewProfile = () => {
        Navigation.navigate("FriendAboutme", { "personalData": state });
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
                <Text style={styles.name}>{state.name}</Text>
                <SafeAreaView>
                    <Text style={styles.text}>About Me</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter here"
                        editable={true}
                        value={state.aboutMe}
                        onChangeText={(v) => setState({ ...state, aboutMe: v })}
                        keyboardType="text" />
                </SafeAreaView>
            </View>
            <View>
                <Text style={styles.name1}>Basic Deatils</Text>

                <View style={styles.list}>
                    {
                        section1.map((item, ind) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedName(item.key)
                                    }} style={styles.listItem}>
                                        <View style={styles.iconTextContainer}>
                                            {item.icon}
                                            <Text style={[styles.item, item.style]}>{item.key}</Text>
                                        </View>
                                        <View style={styles.iconTextContainer}>
                                            <Text>{item.data.name}</Text>
                                            <Octicons name={selectedName == item.key ? "chevron-down" : "chevron-right"} size={20} color="black" style={{ marginLeft: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        selectedName == item.key ?
                                            <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>





                <View style={styles.list}>
                    {
                        section2.map((item, ind) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        if (selectedName == '') {
                                            setSelectedName(item.key)
                                        } else {
                                            setSelectedName('')
                                        }
                                    }} style={styles.listItem}>

                                        <View style={styles.iconTextContainer}>
                                            {item.icon}
                                            <Text style={[styles.item, item.style]}>{item.key}</Text>
                                        </View>
                                        <View style={styles.iconTextContainer}>
                                            <Text style={{ width: 90, textAlign: 'right' }}>
                                                {
                                                    Array.isArray(item.data.name) ?
                                                        item.data.name.map(n => n + ",")
                                                        : item.data.name}</Text>
                                            <Octicons name={selectedName == item.key ? "chevron-down" : "chevron-right"} size={20} color="black" style={{ marginLeft: 10 }} />
                                        </View>

                                    </TouchableOpacity>
                                    {
                                        selectedName == item.key ? Array.isArray(item.data.name) ?
                                            renderOptionList(item)
                                            :
                                            <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>





                <View style={styles.list}>
                    {
                        section3.map((item, ind) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedName(item.key)
                                    }} style={styles.listItem}>

                                        <View style={styles.iconTextContainer}>
                                            <Text>{item.icon}</Text>
                                            <Text style={[styles.item, item.style]}>{item.key}</Text>
                                        </View>
                                        <View style={styles.iconTextContainer}>
                                            <Text style={{ width: 100, textAlign: 'right' }}>{item.data.name}</Text>
                                            <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                                        </View>

                                    </TouchableOpacity>
                                    {
                                        selectedName == item.key ?
                                            <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>



                <View style={styles.list}>
                    {
                        section4.map((item, ind) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        if (selectedName == '') {
                                            setSelectedName(item.key)
                                        } else {
                                            setSelectedName('')
                                        }
                                    }} style={styles.listItem}>

                                        <View style={styles.iconTextContainer}>
                                            <Text>{item.icon}</Text>
                                            <Text style={[styles.item, item.style]}>{item.key}</Text>
                                        </View>
                                        <View style={styles.iconTextContainer}>
                                            <Text style={{ textAlign: 'right', width: 100 }}>
                                                {
                                                    Array.isArray(item.data.name) ?

                                                        item.data.name.map(n => n + ",")
                                                        : item.data.name}</Text>
                                            <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        selectedName == item.key ? Array.isArray(item.data.name) ? item.key == "Interested In" ? renderIntrest(item) :
                                            renderOptionList(item)
                                            :
                                            <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>




                <View style={styles.list}>
                    {
                        section5.map((item, ind) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedName(item.key)
                                    }} style={styles.listItem}>
                                        <View style={styles.iconTextContainer}>
                                            <Text>{item.icon}</Text>
                                            <Text style={[styles.item, item.style]}>{item.key}</Text>
                                        </View>
                                        <View style={styles.iconTextContainer}>
                                            <Text>{item.data.name}</Text>
                                            <Octicons name="chevron-right" size={20} color="black" style={{ marginLeft: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        selectedName == item.key ?
                                            <CustomPickModel state={state} item={item} setState={setState} onSelectItem={() => setSelectedName('')} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => navigateToPreviewProfile()}>
                        <Text style={styles.btnText}>Preview Profile</Text>
                    </TouchableOpacity>
                </View><View style={styles.btnContainer1}>
                    <TouchableOpacity onPress={() => isDetailsExist ? updateFriendsProfile() : saveFriendsDetails()}>
                        <Text style={styles.btnText1}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default EditComponent;