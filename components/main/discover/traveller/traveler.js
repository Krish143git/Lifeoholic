import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { getTravelers } from "../../../../services/discovery";

export default function TravelerTab() {
  const navigation = useNavigation();
  const [travelers, setTravelers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(["Trekking"]);
  const category = ["Trekking", "Adventure", "Mountains", "Beaches"];

  useEffect(() => {
    fetchTravelers();
  }, []);

  const fetchTravelers = async () => {
    let data = await getTravelers(selectedCategory);
    setTravelers([...data]);
  };

  useEffect(() => {
    if (selectedCategory.length) {
      fetchTravelers();
    }
  }, [selectedCategory]);

  const CategoryButton = ({ title, active, onPress }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            padding: 10,
            borderWidth: 1,
            borderColor: "#bbbbbb",
            borderRadius: 50,
            minWidth: 100,
            backgroundColor: active ? "black" : "#fff",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              textAlign: "center",
              color: active ? "#fff" : "black",
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={category}
          renderItem={({ item, index }) => (
            <CategoryButton
              key={item}
              title={item}
              active={selectedCategory.includes(item)}
              onPress={() => {
                let isExist = selectedCategory.indexOf(item);
                let d = selectedCategory;
                if (isExist > -1) {
                  d.splice(isExist, 1);
                } else {
                  d.push(item);
                }
                setSelectedCategory([...d]);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
        />
      </View>
      <View>
        <FlatList
          data={travelers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderBottomWidth: 1,
                  borderColor: "#e2e2e2",
                }}
                onPress={() =>
                  navigation.navigate("profileDetail", {
                    pageTitle: "Travel Partner",
                    data: item,
                  })
                }
              >
                <View>
                  <Avatar
                    imageUrl={item?.images?.length ? item?.images[0] : null}
                  />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.name}
                  </Text>
                  {item?.trips?.length ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      {/* <Icons.MapPinIcon color={"black"} />
                    <Text>John</Text> */}
                      <Icons.CalendarDaysIcon
                        color={"black"}
                        style={{ marginLeft: 10 }}
                      />
                      <Text>{item.trips[0].place}</Text>
                    </View>
                  ) : null}
                </View>

                <View>
                  <Icons.ChatBubbleBottomCenterTextIcon
                    color={"black"}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
