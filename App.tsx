import React, { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import * as C from "./src/styles/globalStyles";
import { AuthProvider, useAuth } from "./src/hooks/auth";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  const [appIsReady] = useFonts({
    Poppins_100Thin,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!appIsReady || userStorageLoading) {
    return (
      <View>
        <Text>Carregando</Text>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Routes />
          </GestureHandlerRootView>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
