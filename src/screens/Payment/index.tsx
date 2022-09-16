import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Box, TextMedium, TextRegular } from "../../styles/globalStyles";
import { Avatar } from "../Home/styles";
import { Spacer } from "../Login/styles";

export default function Payment({ navigation, route }) {
  const { user } = useAuth();

  console.log(route.params);

  return (
    <Box align="center" justify="center" direction="column">
      <Avatar
        source={{
          uri: user.avatar,
        }}
      />

      <Spacer space={16} />

      <TextRegular align="center">Tipo de chave</TextRegular>
      <TextMedium align="center">{route.params.payment.tipo}</TextMedium>

      <Spacer space={32} />

      <TextRegular align="center">Chave pix</TextRegular>
      <TextMedium align="center">{route.params.payment.chave}</TextMedium>

      <Spacer space={24} />

      <TouchableOpacity onPress={() => navigation.replace("Home")}>
        <TextMedium>Proxima corrida</TextMedium>
      </TouchableOpacity>
    </Box>
  );
}
