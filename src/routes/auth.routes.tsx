import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Motoboy from "../screens/Steps/motoboy";
import Payment from "../screens/Steps/payment";
import Type from "../screens/Steps/type";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Type" component={Type} options={{ headerShown: false }} />
      <Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
      <Screen
        name="Motoboy"
        component={Motoboy}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
