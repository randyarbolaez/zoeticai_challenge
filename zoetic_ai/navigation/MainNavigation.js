import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import VitalsNavigation from "./VitalsNavigation";

const MainNavigation = () => {
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      CommonActions.navigate("Auth");
    }
  }, [isAuth]);

  return <VitalsNavigation />;
};

export default MainNavigation;
