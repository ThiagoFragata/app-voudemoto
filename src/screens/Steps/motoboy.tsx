import React from "react";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import {
  Box,
  ButtonCancel,
  ButtonSuccess,
  Flex,
  TextMedium,
} from "../../styles/globalStyles";
import { Spacer } from "../Login/styles";
import { InputForm } from "../../components/InputForm";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, userStorageKey } from "../../hooks/auth";

interface FormData {
  modelo: string;
  cor: string;
  placa: string;
  tipo: string;
  chave: string;
}

export default function Motoboy({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useAuth();

  const { control, handleSubmit } = useForm();

  async function handleRegister(form: FormData) {
    const payload = {
      model: form.modelo,
      color: form.cor,
      plate: form.placa,
      typeKey: form.tipo,
      keyPix: form.chave,
    };

    setUser({
      ...user,
      isAuthenticated: true,
      userType: "motoboy",
      model: form.modelo,
      color: form.cor,
      plate: form.placa,
      type: form.tipo,
      key: form.chave,
    });

    await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
    Alert.alert("Moto-taxista cadastrado com sucesso");
    navigation.navigate("Home");
  }

  return (
    <Box color={theme.colors.secondary_dark} justify="flex-start">
      <Flex
        marginTop={`${insets.top}px`}
        direction="column"
        padding={16}
        align="flex-start"
      >
        <KeyboardAwareScrollView
          style={{
            width: "100%",
          }}
        >
          <TextMedium color={theme.colors.white} size={16} align="center">
            Dados do veículo
          </TextMedium>

          <Spacer space="16px" />

          <InputForm
            label="Modelo do veículo"
            placeholder="Digite o modelo"
            control={control}
            name="modelo"
          />
          <InputForm
            label="Cor do veículo"
            placeholder="Digite o cor"
            control={control}
            name="cor"
          />
          <InputForm
            label="Placa do veículo"
            placeholder="Digite o Placa"
            control={control}
            name="placa"
          />

          <Spacer space="16px" />

          <TextMedium color={theme.colors.white} size={16} align="center">
            Dados de pagamento
          </TextMedium>

          <Spacer space="16px" />

          {/* <InputSelect label="Tipo de Chave" /> */}

          <InputForm
            label="Tipo de Chave"
            placeholder="Selecione um tipo"
            control={control}
            name="tipo"
          />

          <InputForm
            label="Chave pix"
            placeholder="Digite ou cole aqui a sua chave pix"
            control={control}
            name="chave"
          />

          <Spacer space="32px" />

          <ButtonCancel>
            <TextMedium
              color={theme.colors.danger_100}
              size={12}
              align="center"
            >
              Cancelar
            </TextMedium>
          </ButtonCancel>

          <Spacer space="24px" />

          <ButtonSuccess onPress={handleSubmit(handleRegister)}>
            <TextMedium color={theme.colors.white} size={12} align="center">
              Cadastrar
            </TextMedium>
          </ButtonSuccess>
        </KeyboardAwareScrollView>
      </Flex>
    </Box>
  );
}
