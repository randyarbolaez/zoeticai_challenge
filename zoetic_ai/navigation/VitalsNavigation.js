import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import AuthScreen from "../screen/AuthScreen";
import DoctorScreen from "../screen/DoctorScreen";
import HomeScreen from "../screen/HomeScreen";
import MeasureNowScreen from "../screen/MeasureNowScreen";
import StartupScreen from "../screen/StartupScreen";
import VitalsScreen from "../screen/VitalsScreen";

const Tab = createBottomTabNavigator();

const RootStack = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Startup"
      screenOptions={(props) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (props.route.name === "Home") {
            return (
              <MaterialIcons
                name="home"
                size={28}
                color={focused ? "#3d2667" : "#D3D3D3"}
              />
            );
          }
          if (props.route.name === "Doctor") {
            return (
              <MaterialCommunityIcons
                name="doctor"
                size={28}
                color={focused ? "#3d2667" : "#D3D3D3"}
              />
            );
          }
          if (props.route.name === "Vital") {
            return (
              <Entypo
                name="bar-graph"
                size={28}
                color={focused ? "#3d2667" : "#D3D3D3"}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#3d2667", shadowColor: "transparent" },
        activeTintColor: "#3d2667",
        inactiveTintColor: "grey",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Vital"
        component={VitalsScreen}
        options={{
          tabBarLabel: "Vitals",
          animationEnabled: false,
        }}
      />
      <Tab.Screen name="Doctor" component={DoctorScreen} />
      <Tab.Screen
        name="Startup"
        component={StartupScreen}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
      <Tab.Screen
        name="Measure Now"
        component={MeasureNowScreen}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
