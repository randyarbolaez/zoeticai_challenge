import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Agenda, WeekCalendar, CalendarList } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";

import Temperature from "../component/Temperature";
import Oximeter from "../component/Oximeter";
import Blood from "../component/Blood";
import Header from "../component/Header";
import MeasureNowButton from "../component/MeasureNowButton";

import * as vitalAction from "../store/action/vital-action";

const VitalsScreen = (props) => {
  const dispatch = useDispatch();

  const [markedDate, setMarkedDate] = useState();
  const [individualVitalKit, setIndividualVitalKit] = useState(null);

  const { userId, token } = useSelector((state) => state.auth);
  const vitals = useSelector((state) => state.vital.allVitals);

  const getVitalKitForThatDay = (date = markedDate) => {
    vitals.map((vital) => {
      if (
        new Date(vital.date).toISOString().split("T")[0] ==
        new Date(date).toISOString().split("T")[0]
      ) {
        return setIndividualVitalKit(vital);
      }
    });
    if (individualVitalKit) {
      return setIndividualVitalKit(null);
    }
  };

  useEffect(() => {
    setMarkedDate(`${year}-${month}-${day}`);
    const loadVitals = async () => {
      try {
        setMarkedDate(`${year}-${month}-${day}`);
        await dispatch(vitalAction.fetchAllVitals(userId, token));
        getVitalKitForThatDay();
      } catch (err) {
        console.log(err.message);
      }
    };
    loadVitals();
  }, [userId, token, setIndividualVitalKit]);

  let currentDate = new Date().toISOString().split("T")[0];
  let [year, month, day] = currentDate.split("-");

  const padNum = (n) => {
    return (n < 10 ? "0" + n : n) + "";
  };

  day = padNum(parseInt(day));

  return (
    <View style={styles.screen}>
      <Header
        title="Vitals"
        date={markedDate}
        props={props}
        onSelect={() => {
          props.navigation.navigate("Home");
        }}
      />
      <WeekCalendar
        markedDates={{
          [markedDate]: {
            selected: true,
            selectedColor: "#3d2667",
          },
        }}
        onDayPress={({ dateString }) => {
          setMarkedDate(dateString);
          getVitalKitForThatDay(dateString);
        }}
      />
      {individualVitalKit ? (
        <View
          style={{
            ...styles.screen,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <View>
              <Temperature thermometer={individualVitalKit} />
            </View>

            <View>
              <Oximeter oximeter={individualVitalKit} />
            </View>
          </View>
          <View>
            <View>
              <Blood blood={individualVitalKit} />
            </View>
            <View>
              <MeasureNowButton
                onDisabled={individualVitalKit}
                onSelect={() => {
                  props.navigation.navigate("Measure Now");
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color="#3d2667" />
          <View style={{ justifyContent: "center" }}>
            {markedDate !== currentDate ? (
              <Text style={{ textAlign: "center" }}>
                That's not todays' date. Retry.
              </Text>
            ) : (
              <MeasureNowButton
                onDisabled={markedDate !== currentDate}
                onSelect={() => {
                  props.navigation.navigate("Measure Now");
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // marginHorizontal: "10%",
    // marginTop: "40%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default VitalsScreen;
