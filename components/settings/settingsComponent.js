import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './settingsStyle'
import Card from './card'
import SubscriptionCard from './subscriptionCard'
import { useNavigation } from '@react-navigation/native'
import MainNav from '../mainNav'
import Carousel from 'react-native-snap-carousel';
import RazorpayCheckout from 'react-native-razorpay';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getSubscriptionList } from '../../services/settings'

const SettingsComponent = () => {
  const carouselRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [subscription, setSubscription] = React.useState([]);
  const EXPO_PUBLIC_RAZORPAY_Key_ID = "rzp_test_7mw689RELAwLR7"
  const EXPO_PUBLIC_RAZORPAY_KEY_SECRETE = "8dz1sZhxtI3xneKwnZFjNg6b"

  const handleSnapToItem = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    getScriptionPlans();
  }, [])


  const getScriptionPlans = async () => {
    let plans = await getSubscriptionList();
    setSubscription(plans);
  }

  const placeOrder = (item) => {
    const { total } = item;
    let options = {
      description: 'Please make payment for lifeholic subscription',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: EXPO_PUBLIC_RAZORPAY_Key_ID,
      amount: total * 100,
      name: 'Life Holic',
      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'saiyckpm@gmail.com',
        contact: '6300517561',
        name: 'Sai Chand'
      },
      theme: { color: '#53a20e' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success`);
    }).catch((error) => {
      // handle failure
      console.log('error', error);
      alert(`Error`);
    });
  }

  const renderItem = ({ item }) => (
    <Card
      item={item}
      choosePlan={placeOrder}
    />
  );

  const data = [
    {
      head: 'Super Like',
      para: '20 Super Likes',
      price: '99',
    },
    {
      head: 'Boost Profile',
      para: '200 First Views Daily 20',
      price: '99',
    },
  ];

  const CARDDATA = [
    {
      id: "1",
      validity: "1 Month",
      monthlyprice: 399,
      actualPrice: 499,
      offer: 20,
      totalPrice: 199,
    },
    {
      id: "2",
      validity: "3 Months",
      monthlyprice: 299,
      actualPrice: 900,
      offer: 40,
      totalPrice: 850,
    },
    {
      id: "3",
      validity: "6 Months",
      monthlyprice: 199,
      actualPrice: 1200,
      offer: 60,
      totalPrice: 1100,
    },
  ];

  const [user, setUser] = useState({});
  const Navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('personalData').then(user => {
      setUser(JSON.parse(user));
    })
  }, []);

  const onRefer = () => {
    Navigation.navigate('Refer');
  }
  return (
    <View style={styles.container} >
      <ScrollView>
        <Text style={styles.boldHead}>Try Lifeaholic Premium Plans and unlock all these great features!</Text>
        <SubscriptionCard />
        <View style={styles.currosalContainer}>
          <Carousel
            ref={carouselRef}
            data={subscription}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            onSnapToItem={handleSnapToItem}
          />
        </View>
        <Text style={styles.boldHead}>Refer a friend and get 2weeks Lifeaholic Premium access!</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={onRefer} >
            <Text style={styles.btnText}>Refer a Friend</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  )
}

export default SettingsComponent