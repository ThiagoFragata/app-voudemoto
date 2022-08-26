import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { Flex, TextMedium } from "../../styles/globalStyles";
import { Input } from "../Input";

interface InputFormProps extends TextInputProps {
  label?: string;
  name: string;
  control: Control;
}

export function InputForm({ label, control, name, ...rest }: InputFormProps) {
  const theme = useTheme();

  return (
    <Flex direction="column" align="flex-start">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            label={label}
            {...rest}
          />
        )}
      />
    </Flex>
  );
}

export const InputContainer = styled(TextInput)`
  width: 100%;
  height: 48px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  margin: 6px 0 16px;
  border-radius: 16px;
  font-size: 14px;
`;
