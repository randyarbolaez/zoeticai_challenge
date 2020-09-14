import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Temperature = ({
  thermometer: {
    thermometer: { temperature },
  },
}) => {
  let data = {
    labels: ["", "", ""],
    datasets: [
      {
        data: [97.6, 97.2, 98.6, 98.0, 98.3, 99.0, 97.6],
        strokeWidth: 2, // optional
      },
    ],
  };
  let chartConfig = {
    backgroundColor: "#fd2372",
    backgroundGradientFrom: "#fd2372",
    backgroundGradientTo: "#fd2372",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome
          name={"thermometer"}
          size={windowWidth * 0.08}
          color={"white"}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
        <Text style={styles.title}>Temperature</Text>
      </View>
      <LineChart
        data={data}
        width={windowWidth * 0.4}
        height={65}
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

      <View style={styles.dataContainer}>
        <View>
          <Text style={styles.data}>{temperature.toFixed(1)}</Text>
        </View>
        <Text style={styles.degrees}>°F</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fd2372",
    height: "61%",
    padding: "1%",
    borderRadius: 15,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    marginLeft: 10,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  data: {
    textAlign: "right",
    fontSize: windowWidth * 0.1,
    color: "white",
    fontWeight: "bold",
  },
  degrees: {
    fontSize: windowWidth * 0.03,
    alignSelf: "flex-end",
    color: "white",
    marginRight: 5,
    marginBottom: 8,
  },
});

export default Temperature;
