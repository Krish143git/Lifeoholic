import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import * as Icons from "react-native-heroicons/solid";
import Avatar from "../Avatar";
import { useNavigation } from "@react-navigation/native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export default function ProfileDetail(props) {
  const navigation = useNavigation();
  const { pageTitle, data, type } = props.route.params;
  const {
    name,
    age,
    images,
    homeTown,
    currentLocation,
    work,
    aboutMe,
    friendsList,
    mutual,
    personality,
    interestedIn,
    lookingFor,
    aboutBusiness,
    education,
    educationLevel,
    awardsAndAchievements,
    aboutMatchMaking,
    height,
    bodyType,
    gender,
    zodiacSign,
    religion,
    maritalStatus,
    drinking,
    smoking,
  } = data;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const isBusiness = type === "business";
  const isMatchMaking = type === "match";

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          {navigation.canGoBack() && <Icons.ArrowLeftIcon />}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pageTitle}</Text>
        <Icons.BookmarkIcon />
      </View>

      <ScrollView style={{ backgroundColor: "#fff" }}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: images && images[0],
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.floatingButtonContainer}>
            <RoundedButton
              icon={<Icons.ChatBubbleLeftEllipsisIcon color={"black"} />}
            />
            <RoundedButton icon={<Icons.HeartIcon color={"#ff4169"} />} />
            <RoundedButton
              icon={<Icons.EllipsisVerticalIcon color={"black"} />}
            />
          </View>

          {/* content */}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
              >
                {`${name}, ${age}`}
              </Text>
              <Icons.CheckBadgeIcon />
            </View>
            <Text
              style={{ color: "black" }}
            >{`${homeTown}, ${currentLocation} • ${work}`}</Text>
          </View>

          {Spacer}

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
              >
                {`About Me`}
              </Text>
            </View>
            <Text style={{ color: "black" }}>{`${aboutMe}`}</Text>
          </View>

          {isBusiness && (
            <Section title={"About Business"} description={aboutBusiness} />
          )}

          {aboutMatchMaking && (
            <Section
              title={"About Match Making"}
              description={aboutMatchMaking}
            />
          )}

          {isBusiness && (
            <Section title={"Educational Details"}>
              <View>
                <Text>
                  {education} - {educationLevel}
                </Text>
              </View>
            </Section>
          )}

          {isBusiness && (
            <>
              {Spacer}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
                >
                  {`Awards/Achievements`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {awardsAndAchievements.map((el) => {
                  return <CategoryButton title={el} />;
                })}
              </View>
            </>
          )}

          {Spacer}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              {`Basic Profile`}
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {[
              `${height} cm`,
              gender,
              maritalStatus,
              religion,
              bodyType,
              zodiacSign,
              drinking,
              smoking,
            ].map((el) => {
              if (!el) return null;
              return <CategoryButton title={el} />;
            })}
          </View>

          {Spacer}
          <View>
            <Friends friends={friendsList} mutual={mutual} />
          </View>

          {Divider}
          {personality ? (
            <>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
                >
                  {`Personality`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {personality[0].split(',').map((el) => {
                  return <CategoryButton title={el} />;
                })}
              </View>
              {Divider}
            </>
          ) : null}

          {interestedIn?.length ? (
            <>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
                >
                  {`Interests`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {interestedIn[0].split(',').map((el) => {
                  return <CategoryButton title={el} />;
                })}
              </View>
            </>
          ) : null}

         {lookingFor &&
          <>
          {Divider}

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              {`Looking for`}
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {console.log("lookingFor>>>>",lookingFor)}
            <CategoryButton title={lookingFor} />
          </View>
          </>
          }

          {Divider}

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <RoundedButton
              icon={<Icons.ChatBubbleLeftEllipsisIcon color={"black"} />}
            />
            <RoundedButton icon={<Icons.HeartIcon color={"#ff4169"} />} />
            <RoundedButton
              icon={<Icons.EllipsisVerticalIcon color={"black"} />}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Hide •</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>Report</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const Friends = ({ friends = [], mutual }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
          {`Friends`}
        </Text>
        <Text style={{ color: "black", fontSize: 14 }}>
          {` (${mutual} Mutual friends)`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // flexWrap: "wrap",
          // backgroundColor: "red",
        }}
      >
        {friends.slice(0, 5).map((el, i) => {
          return (
            <View
              key={el}
              style={{
                left: -i * 20,
                zIndex: friends.length - i,
              }}
            >
              <Avatar
                style={{ borderColor: "#fff", borderWidth: 3 }}
                imageUrl={el.images[0]}
              />
            </View>
          );
        })}
        {friends.length > 5 && (
          <Text style={{ fontWeight: "bold", left: -25 }}>25+ View all</Text>
        )}
      </View>
    </View>
  );
};

const Section = ({ title, description, children }) => (
  <View>
    {Spacer}
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
        {title}
      </Text>
    </View>
    {typeof description === "string" && (
      <Text style={{ color: "black" }}>{`${description}`}</Text>
    )}
    {children && children}
  </View>
);

const CategoryButton = ({ title, fill, icon }) => {
  return (
    <TouchableOpacity
      style={{
        minWidth: 80,
        borderRadius: 20,
        padding: 8,
        backgroundColor: fill ? "#dfdfdf" : "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 8,
        borderWidth: 0.5,
        borderColor: "#e2e2e2",
      }}
    >
      {icon && icon}
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const RoundedButton = ({ icon }) => {
  return (
    <TouchableOpacity style={styles.roundedButtonContainer}>
      {icon}
    </TouchableOpacity>
  );
};

const Spacer = <View style={{ marginVertical: 8 }} />;

const Divider = (
  <View style={{ height: 2, backgroundColor: "#f9f9f9", marginVertical: 8 }} />
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: { width: WIDTH, height: HEIGHT * 0.57 },
  image: { height: "100%", width: "100%" },
  contentContainer: {
    top: -30,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  floatingButtonContainer: {
    position: "absolute",
    top: -25,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  roundedButtonContainer: {
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
    width: 40,
    height: 40,
    margin: 5,
  },
});
