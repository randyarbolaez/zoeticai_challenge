import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MeasureNowButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.onDisabled}
      onPress={() => {
        props.onSelect();
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
          paddingRight: 15,
          justifyContent: "flex-end",
          height: "70%",
        }}
      >
        <LinearGradient
          colors={[
            `${props.onDisabled ? "#ebebeb" : "#fd2372"}`,
            `${props.onDisabled ? "#c8c8c8" : "#3c2865"}`,
            `${props.onDisabled ? "#ebebeb" : "#07b9c2"}`,
          ]}
          style={{ borderRadius: 47.5, width: 95, height: 95 }}
        >
          <View
            style={{
              ...styles.circleGradient,
              backgroundColor: props.onDisabled ? "#e5e5e5" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.visit,
                color: props.onDisabled ? "#636b71" : "#3c2865",
              }}
            >
              Measure Now
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleGradient: {
    backgroundColor: "white",
    borderRadius: 40,
    margin: 7.5,
    width: 80,
    height: 80,
  },
  visit: {
    marginTop: "30%",
    paddingHorizontal: 6,
    textAlign: "center",
    fontSize: 16,
    justifyContent: "center",
  },
});

export default MeasureNowButton;
