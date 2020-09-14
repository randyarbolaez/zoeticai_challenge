import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Blood = ({
  blood: {
    bloodPressure: { diastolicPressure },
    bloodPressure: { systolicPressure },
  },
}) => {
  let data = {
    labels: ["", "", ""],
    datasets: [
      {
        data: [140, 55, 98, 56, 100, 140, 97.6],
        strokeWidth: 2, // optional
      },
    ],
  };

  let chartConfig = {
    // backgroundColor: 'grey',
    backgroundGradientFrom: "#07b9c2",
    backgroundGradientTo: "#07b9c2",
    decimalPlaces: 0, // optional, defaults to 2dp
    // color: (opacity = 1) => `rgba(255, 255, 255, ${20})`,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Fontisto
          name={"blood-drop"}
          size={windowWidth * 0.08}
          color={"white"}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
        <Text style={styles.title}>Blood</Text>
      </View>
      <LineChart
        data={data}
        width={windowWidth * 0.43}
        height={windowHeight * 0.13}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        withVerticalLabels={false}
        withShadow={false}
        segments={2}
        bezier
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
      />
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.dataContainer}>
          {systolicPressure ? (
            <Text style={styles.data}>{systolicPressure}</Text>
          ) : (
            <ActivityIndicator size={"large"} color="white" />
          )}
          <View
            style={{
              ...styles.minorDetailsContainer,
              marginRight: diastolicPressure ? 0 : "30%",
            }}
          >
            <Text style={styles.slash}>/</Text>
            {diastolicPressure ? (
              <Text style={styles.mmhgData}>{diastolicPressure}</Text>
            ) : (
              <ActivityIndicator size={"large"} color="white" />
            )}
          </View>
        </View>
        <Text style={styles.mmhgWord}>mmHg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#07b9c2",
    height: windowHeight * 0.35,
    borderRadius: 15,
    marginTop: 10,
    // paddingVertical: windowHeight * 0.041,
    paddingHorizontal: windowWidth * 0.044,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    // marginTop: 15,
    marginLeft: 10,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
  },
  data: {
    paddingLeft: 10,
    fontSize: windowWidth * 0.12,
    color: "white",
    fontWeight: "bold",
    // marginBottom: 6,
    // backgroundColor: 'black',
  },
  minorDetailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  slash: {
    color: "white",
    fontSize: windowWidth * 0.12,
    paddingRight: 1,
    // marginBottom: 1,
    fontWeight: "bold",
  },
  mmhgData: { color: "red", fontSize: windowWidth * 0.09, fontWeight: "bold" },
  mmhgWord: {
    color: "white",
    fontSize: windowWidth * 0.03,
  },
});

export default Blood;
