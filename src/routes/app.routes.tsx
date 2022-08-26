import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Ride from "../screens/Ride";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen name="Ride" component={Ride} options={{ headerShown: false }} />
    </Navigator>
  );
}
