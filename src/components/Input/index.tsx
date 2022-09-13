import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { Flex, TextMedium } from "../../styles/globalStyles";

interface InputProps extends TextInputProps {
  label?: string;
  colorFont?: string;
}

export function Input({ label, colorFont, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <Flex direction="column" align="flex-start">
      <TextMedium size={12} color={colorFont ? colorFont : theme.colors.white}>
        {label}
      </TextMedium>
      <InputContainer {...rest} />
    </Flex>
  );
}

export const InputContainer = styled(TextInput)`
  width: 100%;
  height: 48px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
`;
