import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "styled-components/native";

import { Container, ImageLogin, SafeContainer, Spacer } from "./styles";
import { TextBold, TextRegular } from "../../styles/globalStyles";

import motoboy3 from "../../assets/motoboy3.png";
import google from "../../assets/google.png";
import logo from "../../assets/logotipo.png";

import { ButtonSignIn } from "../../components/ButtonSignIn";

import { useAuth } from "../../hooks/auth";

export default function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [isLoading, setLoading] = useState(false);

  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      navigation.navigate("Type");
      return await signInWithGoogle();
    } catch (err) {
      Alert.alert("Não foi possível conectar na conta Google");
      navigation.replace("Login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeContainer>
      <Container>
        <Spacer space={`${insets.top}px`} />

        <Image style={styles.stretch} source={logo} />

        <Spacer space="32px" />

        <TextBold color={theme.colors.white} size="32" align="center">
          Seja bem-vindo!
        </TextBold>

        <TextRegular color={theme.colors.white} size="16" align="center">
          Seu aplicativo de transporte urbano de preferido!
        </TextRegular>

        <Spacer space="32px" />

        <ButtonSignIn
          title="Entrar com google"
          icon={google}
          onPress={handleSignInWithGoogle}
        />

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.secondary_dark}
            style={{ marginTop: 18 }}
          />
        )}
      </Container>

      <ImageLogin source={motoboy3} />
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  stretch: {
    height: 64,
    resizeMode: "contain",
  },
});
