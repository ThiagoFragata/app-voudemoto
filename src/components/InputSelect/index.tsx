import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Flex, TextMedium } from "../../styles/globalStyles";
import { InputContainer, TextSelect } from "./styles";

interface InputSelectProps {
  label?: string;
}

export function InputSelect({ label }: InputSelectProps) {
  const theme = useTheme();

  return (
    <Flex direction="column">
      <TextMedium size={12} color={theme.colors.white}>
        {label}
      </TextMedium>
      <InputContainer>
        <TextSelect>Selecione um tipo</TextSelect>

        <Entypo
          name="chevron-small-down"
          size={24}
          color={theme.colors.black_light}
          marginRight={10}
        />
      </InputContainer>
    </Flex>
  );
}
