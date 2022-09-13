import React, { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";

import {
  ContainerRide,
  ButtonRide,
  AddressList,
  AddressItem,
  HeaderRide,
} from "./styled";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InputForm } from "../../components/InputForm";
import { Flex, TextMedium } from "../../styles/globalStyles";
import { useTheme } from "styled-components";
import { Spacer } from "../Login/styles";
import { api } from "../../services/axios";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";

interface PlacesProps {
  place_id: string;
  description: string;
  secondary_text: string;
}

export default function Ride({ navigation }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [listPlaces, setListPlaces] = useState<PlacesProps[]>([]);
  const [origin, setOrigin] = useState<PlacesProps>({} as PlacesProps);
  const [destiny, setDestiny] = useState<PlacesProps>({} as PlacesProps);

  const [activeInput, setActiveInput] = useState(null);

  //get address list
  async function getPlaces(address: string) {
    try {
      const { data } = await api.get(`address/${address}`);

      if (data.error) {
        Alert.alert(data);
        return;
      }

      setListPlaces(data.list);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ContainerRide>
      <HeaderRide marginTop={`${insets.top}px`}>
        <TouchableOpacity>
          <Text>Voltar</Text>
        </TouchableOpacity>

        <Text>Corrida</Text>

        <TouchableOpacity>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </HeaderRide>

      <Flex direction="column">
        <Input
          colorFont={theme.colors.black_dark}
          placeholder="Embarque"
          value={origin.description}
          onFocus={() => setActiveInput("setOrigin")}
          onChangeText={(address) => getPlaces(address)}
        />

        <Input
          colorFont={theme.colors.black_dark}
          placeholder="Destino"
          value={destiny.description}
          onFocus={() => setActiveInput("setDestiny")}
          onChangeText={(address) => getPlaces(address)}
        />

        <Spacer space="16px" />

        <ButtonRide
          onPress={() => navigation.navigate("Home", { origin, destiny })}
        >
          <TextMedium color={theme.colors.white} size={12} align="center">
            Partiu corrida
          </TextMedium>
        </ButtonRide>
      </Flex>

      <AddressList
        data={listPlaces}
        keyExtractor={(item: PlacesProps) => item.place_id}
        renderItem={({ item }) => (
          <AddressItem onPress={() => eval(activeInput)(item)}>
            <Text>{item.description}</Text>
            <Text>{item.secondary_text}</Text>
          </AddressItem>
        )}
      />
    </ContainerRide>
  );
}
