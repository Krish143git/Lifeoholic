import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { AntDesign } from "@expo/vector-icons";
import { fetchSubscriptionPlans } from "../../services/subscription.js";

const SubscriptionCard = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      let response = await fetchSubscriptionPlans();
      setPlans([...response]);
    };
    fetchPlans();
  }, []);


  const DATA = [
    {
      id: "1",
      title: "Unlimited Likes",
    },
    {
      id: "2",
      title: "See who likes you",
    },
    {
      id: "3",
      title: "Access to all the Categories",
    },
    {
      id: "4",
      title: "Browse other profiles invisbily(Incognito)",
    },
    {
      id: "5",
      title: "No message restriction",
    },
    {
      id: "6",
      title: "See who viewed you",
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

  const Navigation = useNavigation();

  const onChoose = ({
    validity,
    monthlyprice,
    actualPrice,
    offer,
    totalPrice,
  }) => {
    Navigation.navigate("Payment", {
      validity: validity,
      monthlyprice: monthlyprice,
      actualPrice: actualPrice,
      offer: offer,
      totalPrice: totalPrice,
    });
  };

  const CardItem = ({
    validity,
    monthlyprice,
    actualPrice,
    offer,
    totalPrice,
  }) => (
    <View style={styles.card}>
      <View style={styles.body}>
        <View>
          <Text style={styles.validity}>{validity} Month</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.monthlyprice}>₹{monthlyprice}</Text>
            <Text style={{ color: "white", fontFamily: "kollektif_bold" }}>
              /month
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.actualPrice}>₹{actualPrice}</Text>
            <Text style={styles.offer}>Save{offer}%</Text>
          </View>
          <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
        </View>

        <View></View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() =>
            onChoose({ validity, monthlyprice, actualPrice, offer, totalPrice })
          }
        >
          <Text style={styles.btnText}>Choose This Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCardItem = ({ item }) => (
    <CardItem
      validity={item.months}
      monthlyprice={item.price}
      actualPrice={item.price}
      offer={item.discount}
      totalPrice={item.total}
    />
  );

  const Item = ({ title }) => (
    <View style={styles.item}>
      <AntDesign name="checksquare" size={20} color="green" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={plans}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: height * 0.005
  },
  item: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.005,
    paddingVertical: height * 0.005,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: height * 0.018,
    fontFamily: "kollektif",
    marginLeft: width * 0.03,
  },
  list: {
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    paddingVertical: height * 0.04,
  },
  card: {
    backgroundColor: "black",
    width: width * 0.9,
    marginRight: width * 0.05,
    marginVertical: height * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 20,
    paddingHorizontal: width * 0.05,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  validity: {
    color: "white",
    fontSize: height * 0.025,
    fontFamily: "kollektif_bold",
  },
  monthlyprice: {
    color: "white",
    fontSize: height * 0.04,
    fontFamily: "kollektif_bold",
  },
  actualPrice: {
    color: "white",
    textDecorationLine: "line-through",
  },
  offer: {
    color: "white",
    fontFamily: "kollektif",
  },
  totalPrice: {
    color: "white",
    fontFamily: "kollektif",
  },
  btnContainer: {
    overflow: "hidden",
    marginTop: height * 0.05,
  },
  btnText: {
    color: "#000",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "kollektif_bold",
  },
});

export default SubscriptionCard;
