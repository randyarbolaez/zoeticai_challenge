import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Oximeter = ({
  oximeter: {
    oximeter: { pulseRate },
    oximeter: { sp02 },
  },
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Fontisto
          name={"pulse"}
          size={windowWidth * 0.08}
          color={"white"}
          style={{ marginLeft: 10, marginTop: 10 }}
        />
        <Text style={styles.title}>Oximeter</Text>
      </View>
      <View style={styles.informationContainer}>
        <View>
          <Text style={styles.subTitle}>SpO2</Text>
          <View style={styles.dataInformation}>
            <Text style={styles.data}>{sp02}</Text>
            <Text style={{ color: "white", fontSize: windowWidth * 0.02 }}>
              %
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>PR</Text>
          <View style={styles.dataInformation}>
            <Text style={styles.data}>{pulseRate}</Text>
            <Text style={{ color: "white", fontSize: windowWidth * 0.02 }}>
              bpm
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3c2865",
    // height: windowHeight * 0.24,
    height: "77%",
    padding: "1%",
    // paddingHorizontal: windowWidth * 0.05,
    borderRadius: 15,
    marginTop: -80,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    marginLeft: 10,
  },
  informationContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // marginTop: 15,
  },
  subTitle: {
    color: "white",
    fontSize: windowWidth * 0.05,
    alignItems: "baseline",
    // paddingBottom,
  },
  dataInformation: {
    display: "flex",
    flexDirection: "row",
    height: "52%",
    paddingBottom: "70%",
    marginTop: 5,
    alignItems: "baseline",
  },
  data: {
    color: "white",
    fontSize: windowWidth * 0.08,
    fontWeight: "bold",
  },
});

export default Oximeter;
