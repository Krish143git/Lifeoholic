import React, { useState, useRef } from 'react';


// import all the components we are going to use
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import styles from './welcomeStyles';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import Login from '../login';
import FindFriends from '../findfriends';
import ChatAndshare from '../../assets/images/intro/ChatAndshare.svg';
import TravelPatner from '../../assets/images/intro/TravelPatner.svg';
import FindSomeone from '../../assets/images/intro/FindSomeone.svg';
import KeepSurfing from '../../assets/images/intro/KeepSurfing.svg';
import Matchmaking from '../../assets/images/intro/Matchmaking.svg';
import { TextStroke } from '../../hoc/TextStrokeHoc';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen');
const slides = [
    {
        key: 's1',
        text: 'Lonely in a crowded place? Find interesting \n people nearby and make friends!',
        title: 'Find Someone',
        //image: <Image style={styles.introImageStyle} source={require('../../assets/images/onboarding_screen_find_some_final22.png' )} />
        image: <FindSomeone width={'100%'} height={'30%'} />
    },
    {
        key: 's2',
        title: 'Keep Surfing',
        text: 'Tap profiles and if you like them \n tap on the ❤️ icon!',
        //image: <Image style={styles.introImageStyle} source={require('../../assets/images/keep_surfing.png' )} />
        image: <KeepSurfing width={'100%'} height={'30%'} />
    },
    {
        key: 's3',
        title: 'Match Marketing',
        text: `If someone likes you back,\n It's a match and you can connect`,
        //image: <Image style={styles.introImageStyle} source={require('../../assets/images/onboarding_match_making_final.png' )} />
        image: <Matchmaking width={'100%'} height={'30%'} />
    },
    {
        key: 's4',
        title: 'Chat & Share',
        text: 'Start chatting with your match and \n share your feelings',
        //image: <Image style={styles.introImageStyle} source={require('../../assets/images/onboarding_screen_chat_share_final22.png' )} />
        image: <ChatAndshare width={'100%'} height={'30%'} />
    },
    {
        key: 's5',
        title: 'Find Travel Partner',
        text: 'Find a travel partner for your \n next adventure',
        //image: <Image style={styles.introImageStyle} source={require('../../assets/images/travel_partner.png' )} />
        image: <TravelPatner width={'100%'} height={'30%'} />
    }
   
];
const WelcomeComponent = () => {

    const [showRealApp, setShowRealApp] = useState(false);
    const flatRef = useRef(null);
    const Navigation =useNavigation();
    const onDone = () => {
        // setShowRealApp(true);
        AsyncStorage.setItem("existUser", true);
        Navigation.navigate('LoginFlow');
    };

    const onSkip = () => {
        setShowRealApp(true);
    };

    const skipButton = () => {
        return (
            <View style={styles.skipBtnContainer}>
                <TouchableOpacity>
                    <Text style={styles.skipBtnText} onPress={() => setShowRealApp(true)}>Skip</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const nextButton = () => {
        let ind = flatRef?.current?.state?.activeIndex + 1;
        return (
            <View style={[styles.btnContainer,{marginTop: height*0.1}]}>
                <TouchableOpacity onPress={() => flatRef?.current?.goToSlide(ind)}>
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }



    const RenderItem = ({ item }) => {
        const text = item.title?.split(" ");
        const sectext = text.slice(1).join(" ");
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 20,
                    backgroundColor: 'white',
                }}>
                {item.image}
                <TextStroke stroke={1} color={'#000000'}>
                    <Text style={{
                        fontSize: 26,
                        color: '#FFFFFF',
                        fontFamily:'kollektif',
                        letterSpacing:2,
                        marginLeft: - width * 0.2,
                        marginTop: 20
                    }}>{text[0]}</Text>
                </TextStroke>

                <TextStroke stroke={1} color={'#000'}>
                    <Text style={{
                        fontSize: 26,
                        color: '#000',
                        fontFamily:'kollektif',
                        letterSpacing:2,
                        marginLeft: width * 0.1
                    }}>{sectext}</Text>
                </TextStroke>
                {/* <Text style={styles.introTitleStyle}>{item.title}</Text> */}
                <Text style={styles.introTextStyle}>{item.text}</Text>
            </View>
        );
    };

    const doneButton = () => {
        return (
            <View style={[styles.btnContainer,{marginTop: height*0.18}]}>
                <TouchableOpacity onPress={() => onDone()}>
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {/* {showRealApp ? (
                <>
                    <FindFriends />
                </>
            ) : ( */}
                <AppIntroSlider
                    ref={flatRef}
                    data={slides}
                    renderItem={RenderItem}
                    //onDone={onDone}
                    showSkipButton={true}
                    onSkip={onSkip}
                    bottomButton
                    doneLabel='Get Started'
                    // showNextButton={false}
                    renderDoneButton={doneButton}
                    renderNextButton={nextButton}
                    renderSkipButton={skipButton}
                    activeDotStyle={{ backgroundColor: '#000', width: 30 }}
                />
            {/* )} */}
        </>
    )
}

export default WelcomeComponent