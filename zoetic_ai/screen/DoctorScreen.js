import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DoctorScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>DoctorScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoctorScreen;
