import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import VitalsNavigation from "./navigation/VitalsNavigation";
import MainNavigation from "./navigation/MainNavigation";
import authReducer from "./store/reducer/auth-reducer";
import vitalReducer from "./store/reducer/vital-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  vital: vitalReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  </Provider>
);

export default App;
