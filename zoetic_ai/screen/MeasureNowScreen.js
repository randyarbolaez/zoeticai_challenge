import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import * as vitalActions from "../store/action/vital-action";

const MeasureNowScreen = (props) => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isCamera, setIsCamera] = useState(false);
  const [bodyOpacity, setBodyOpacity] = useState(true);
  const [bloodOpacity, setBloodOpacity] = useState(true);
  const [spO2Opacity, setSpO2Opacity] = useState(true);
  const [pulseRateOpacity, setPulseRateOpacity] = useState(true);

  const [temperature, setTemperature] = useState(0);
  const [systolicPressure, setSystolicPressure] = useState(0);
  const [diastolicPressure, setDiastolicPressure] = useState(0);
  const [sp02, setSp02] = useState(0);
  const [pulseRate, setPulseRate] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const getRandomNum = (min = 80, max = 100, float = true) => {
    if (float) {
      return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    } else {
      return parseInt((Math.random() * (max - min) + min).toFixed(2));
    }
  };

  const createVitalHandler = async () => {
    let action = vitalActions.createVital(
      temperature,
      systolicPressure,
      diastolicPressure,
      sp02,
      pulseRate,
      token
    );
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Vitals</Text>
      </View>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsCamera(!isCamera);
          }}
        >
          <View
            style={
              isCamera
                ? styles.disabledTitleBorderBottom
                : styles.titleBorderBottom
            }
          >
            <Text style={isCamera ? styles.disabledTitle : styles.title}>
              Vitals Kit
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsCamera(!isCamera);
          }}
        >
          <View
            style={
              !isCamera
                ? styles.disabledTitleBorderBottom
                : styles.titleBorderBottom
            }
          >
            <Text style={!isCamera ? styles.disabledTitle : styles.title}>
              Camera
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cameraOrKitsContainer}>
        {isCamera ? (
          <View style={{ display: "flex", justifyContent: "center" }}>
            <Text>Camera coming soon</Text>
          </View>
        ) : (
          <View style={styles.measurementsContainer}>
            <TouchableOpacity
              style={styles.cardContainer}
              disabled={!bodyOpacity}
              onPress={() => {
                setBodyOpacity(false);
                setTemperature(getRandomNum(80, 100, true));
              }}
            >
              <View style={styles.containerWrapper}>
                <View style={styles.leftContainerWrapper}>
                  <FontAwesome
                    name={"thermometer"}
                    size={40}
                    color={"#3c2865"}
                    style={styles.containerIcon}
                  />
                  <Text style={styles.containerText}>Body</Text>
                </View>

                <View
                  style={{
                    backgroundColor: `rgba(50, 38, 103,${
                      bodyOpacity ? "0.5" : "0"
                    })`,
                    borderRadius: 15,
                    padding: "8%",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      ...styles.rightContainerWrapper,
                    }}
                  >
                    <Text style={styles.measurement}>{temperature}</Text>
                    <Text style={styles.unitOfMeasurement}>°F</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!spO2Opacity}
              style={styles.cardContainer}
              onPress={() => {
                setSpO2Opacity(false);
                setSp02(getRandomNum(70, 100, false));
                setPulseRateOpacity(false);
                setPulseRate(getRandomNum(60, 130, false));
              }}
              style={{
                ...styles.cardContainer,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                  backgroundColor: `rgba(50, 38, 103,${
                    spO2Opacity ? "0.5" : "0"
                  })`,
                  flex: 1,
                  padding: "8%",
                  borderRadius: 15,
                }}
              >
                <Fontisto
                  name={"pulse"}
                  size={26}
                  color={"#3c2865"}
                  style={{ ...styles.containerIcon, marginLeft: 20 }}
                />
                <Text style={styles.containerText}>SP02</Text>
                <View
                  style={{
                    ...styles.rightContainerWrapper,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={styles.measurement}>{sp02}</Text>
                  </View>
                  <Text style={{ ...styles.unitOfMeasurement }}>%</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.containerText}>PR</Text>
                <View
                  style={{
                    ...styles.rightContainerWrapper,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ ...styles.measurement, marginLeft: 0 }}>
                      {pulseRate}
                    </Text>
                  </View>
                  <Text style={{ ...styles.unitOfMeasurement }}>bpm</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardContainer}
              disabled={!bloodOpacity}
              onPress={() => {
                setBloodOpacity(false);
                setSystolicPressure(getRandomNum(100, 130, false));
                setDiastolicPressure(getRandomNum(60, 100, false));
              }}
            >
              <View style={styles.containerWrapper}>
                <View style={styles.leftContainerWrapper}>
                  <Fontisto
                    name={"blood-drop"}
                    size={40}
                    color={"#3c2865"}
                    style={styles.containerIcon}
                  />
                  <Text style={styles.containerText}>Blood</Text>
                </View>

                <View
                  style={{
                    backgroundColor: `rgba(50, 38, 103,${
                      bloodOpacity ? "0.5" : "0"
                    })`,
                    borderRadius: 15,
                    padding: "8%",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      ...styles.rightContainerWrapper,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={styles.measurement}>
                        {systolicPressure}/
                      </Text>
                      <Text
                        style={{
                          ...styles.measurement,
                          color: "#10bcc2",
                        }}
                      >
                        {diastolicPressure}
                      </Text>
                    </View>
                    <Text style={{ ...styles.unitOfMeasurement }}>mmHg</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={
                  bodyOpacity || bloodOpacity || spO2Opacity || pulseRateOpacity
                }
                style={
                  bodyOpacity || bloodOpacity || spO2Opacity || pulseRateOpacity
                    ? styles.disabledButton
                    : styles.button
                }
                onPress={() => {
                  createVitalHandler();
                  props.navigation.navigate("Vital");
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    COMPLETE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    marginBottom: 25,
  },
  header: {
    fontSize: 20,
    color: "#3c2865",
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  titleBorderBottom: {
    borderBottomWidth: 3,
    borderBottomColor: "#3d2667",
    marginHorizontal: 5,
  },
  disabledTitleBorderBottom: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#3d2667",
    // borderWidth: 5,
    // borderBottomColor: '#3d2667',
    // borderTopWidth: 0,
  },
  disabledTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#ced4da",
  },
  cameraOrKitsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
  measurementsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e6e6ea",
    width: "80%",
    height: "23%",
    borderRadius: 15,
  },

  containerWrapper: {
    // display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    // paddingLeft: 10,
    alignItems: "center",
  },
  leftContainerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainerWrapper: {
    marginRight: 10,
  },
  containerIcon: {
    marginHorizontal: 10,
  },
  containerText: {
    color: "#3d2667",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: "10%",
  },
  measurement: {
    fontSize: 40,
    color: "#3d2667",
    fontWeight: "bold",
    textAlign: "right",
  },
  unitOfMeasurement: { fontSize: 14, color: "grey", textAlign: "right" },

  buttonContainer: {
    // marginTop: ,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#3d2667",
    width: "90%",
    borderRadius: 10,
    padding: 18,
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#ced4da",
    width: "90%",
    borderRadius: 10,
    padding: 18,
    color: "white",
  },
});

export default MeasureNowScreen;
