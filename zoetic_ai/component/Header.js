import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = (props) => {
  let listOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date(props.date);
  return (
    <View style={{ ...styles.screen }}>
      <View style={styles.container}>
        <Feather
          onPress={props.onSelect}
          style={{ paddingRight: 50 }}
          name={`menu`}
          size={windowWidth * 0.1}
          color={"white"}
        />
        <Text style={styles.text}>{props.title}</Text>
        <MaterialIcons
          onPress={props.onSelect}
          style={{ paddingLeft: 50 }}
          name={`add`}
          size={windowWidth * 0.1}
          color={"white"}
        />
      </View>
      <View>
        <Text
          style={{
            ...styles.text,
            fontSize: windowWidth * 0.03,
            fontWeight: "bold",
            paddingLeft: 30,
            paddingBottom: "4%",
            paddingTop: "2%",
          }}
        >
          {listOfMonths[date.getMonth()]} {parseInt(date.getDate()) + 1},{" "}
          {date.getFullYear()}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: windowWidth * 0.04,
            fontWeight: "600",
            paddingLeft: 30,
          }}
        >
          How are you feeling today?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    backgroundColor: "#3d2667",
    height: `${windowHeight * 0.03}%`,
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: windowWidth * 0.09,
    fontWeight: "bold",
  },
});

export default Header;
