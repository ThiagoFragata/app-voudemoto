import React from "react";
import { Alert, Image } from "react-native";

import { Box, TextBold, TextRegular } from "../../styles/globalStyles";
import { Background, Card, Paragraph } from "./styles";

import imgMotoboy from "../../assets/motoboy.png";
import imgPassenger from "../../assets/passenger.png";
import backgroundType from "../../assets/pin-marker2.png";
import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/auth";
import { userStorageKey } from "../../utils/keys";
import { api } from "../../services/axios";

export default function Type({ navigation }) {
  const theme = useTheme();
  const { user, setUser, avatar, signOut } = useAuth();

  function isMotoboy() {
    navigation.navigate("Motoboy");
  }

  async function isPassenger() {
    try {
      Alert.alert("Passageiro cadastrado com sucesso");

      const payload = {
        user: {
          gId: user.gId,
          nome: user.name,
          email: user.email,
          avatar: avatar,
          tipo: "P",
        },
      };

      const { data } = await api.post("/signup", payload);

      setUser({
        uId: data.finalUser.id,
        gId: data.finalUser.gId,
        name: data.finalUser.nome,
        email: data.finalUser.email,
        userType: data.finalUser.tipo,
        isAuthenticated: true,
      });

      await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));

      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Não foi possível concluir o cadastro!");
      signOut();
      navigation.replace("Login");
      console.log(err.message);
    }
  }

  return (
    <Box color={theme.colors.secondary_dark}>
      <Background source={backgroundType} />

      <TextBold size={32} color={theme.colors.black_dark} align="center">
        Vou de moto
      </TextBold>

      <TextRegular size={16} color={theme.colors.black_dark} align="center">
        Conectando passageiros a motoristas. O que você precisa?
      </TextRegular>

      <Card onPress={isMotoboy} active>
        <Image source={imgMotoboy} />
        <Paragraph>Sou Mototaxista</Paragraph>
      </Card>

      <TextBold align="center">ou</TextBold>

      <Card onPress={isPassenger}>
        <Image source={imgPassenger} />
        <Paragraph>Sou Passageiro</Paragraph>
      </Card>
    </Box>
  );
}
