import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";

import * as authActions from "../store/action/auth-action";

const AuthScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(true);

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action = authActions.verify(username, password, isSignup);
    if (username.length < 3 || password.length < 3) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    if (username == undefined || password == undefined) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    try {
      await dispatch(action);
      props.navigation.navigate("Vital");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("ERRORSDF: ", err);
      setError(err);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text>AuthScreen</Text>
      <TextInput
        value={username}
        placeholderTextColor="red"
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
        initialValue=""
        required
      />
      <TextInput
        value={password}
        placeholderTextColor="red"
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        initialValue=""
        required
        secureTextEntry
      />
      <Button
        title={isSignup ? "Sign Up" : "Login"}
        onPress={authHandler}
        disabled={username.length < 3 || password.length < 3}
      />
      <Button
        title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
        onPress={() => {
          setIsSignup((prevState) => !prevState);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default AuthScreen;
