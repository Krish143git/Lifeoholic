import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Text } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import styles from "./searchStyles";

const SearchComponent = (props) => {

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <View style={styles.searchBar}>
                <Feather
                    name="search"
                    size={17}
                    color="black"
                    style={{ marginLeft: 1, fontWeight:'bold'}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search Here..."
                />
            </View>
        </View>
    );
};
export default SearchComponent;